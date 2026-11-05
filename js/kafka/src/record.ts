import { Body, Expression, Session, SessionTo, Wrapper, underlyingSessionTo } from "@gatling.io/core";

import { SchemaBody } from "./schemaBody";

import { Body as JvmBodyClass } from "@gatling.io/jvm-types";

/**
 * A record key: a String expressed as Gatling Expression Language, a function, a Body, or a
 * SchemaBody serialized with the protocol's schema registry
 */
export type KafkaKey = Expression<string> | Body | SchemaBody;

/**
 * Methods shared by the DSLs for building actions that send a record
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 *
 * @typeParam T - the type of the builder
 */
export interface KafkaRecordBuilder<T> {
  /**
   * Define the record's key
   *
   * @param key - the key, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  key(key: string): T;

  /**
   * Define the record's key
   *
   * @param key - the key, expressed as a function
   * @returns a new ActionBuilder instance
   */
  key(key: (session: Session) => string): T;

  /**
   * Define the record's key
   *
   * @param key - the key, as a body
   * @returns a new ActionBuilder instance
   */
  key(key: Body): T;

  /**
   * Define the record's key, serialized with the protocol's schema registry. With request-reply,
   * the protocol must then match replies by header.
   *
   * @param key - the key, see {@link avro}, {@link protobuf} and {@link jsonSchema}
   * @returns a new ActionBuilder instance
   */
  key(key: SchemaBody): T;

  /**
   * Add a header to the record
   *
   * @param name - the header name, expressed as a Gatling Expression Language String
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  header(name: string, value: string): T;

  /**
   * Add a header to the record
   *
   * @param name - the header name, expressed as a Gatling Expression Language String
   * @param value - the header value, expressed as a function
   * @returns a new ActionBuilder instance
   */
  header(name: string, value: (session: Session) => string): T;

  /**
   * Send the record to a given partition, instead of the one the producer's partitioner picks
   *
   * @param partition - the partition
   * @returns a new ActionBuilder instance
   */
  partition(partition: number): T;

  /**
   * Send the record to a given partition, instead of the one the producer's partitioner picks
   *
   * @param partition - the partition, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  partition(partition: string): T;

  /**
   * Send the record to a given partition, instead of the one the producer's partitioner picks
   *
   * @param partition - the partition, expressed as a function
   * @returns a new ActionBuilder instance
   */
  partition(partition: (session: Session) => number): T;
}

// Bodies are functions too, so look for a wrapped JVM object first
const isWrapper = (value: unknown): value is Wrapper<unknown> =>
  (typeof value === "object" || typeof value === "function") && value !== null && "_underlying" in value;

interface JvmKafkaRecordBuilder<J> {
  key(key: any): J;
  header(name: string, value: any): J;
  partition(partition: any): J;
}

export const kafkaRecordBuilderImpl = <J, T>(
  _underlying: JvmKafkaRecordBuilder<J>,
  wrap: (underlying: J) => T
): KafkaRecordBuilder<T> => ({
  key: (key: KafkaKey): T =>
    wrap(
      typeof key === "string"
        ? _underlying.key(key)
        : isWrapper(key)
          ? key._underlying instanceof (JvmBodyClass as any)
            ? // Body.WithString and Body.WithBytes are also Functions, applicable to both key(Body) and key(Function),
              // so select the overload explicitly
              (_underlying as any)["key(io.gatling.javaapi.core.Body)"](key._underlying)
            : _underlying.key(key._underlying)
          : _underlying.key(underlyingSessionTo(key as SessionTo<string>))
    ),
  header: (name: string, value: Expression<string>): T =>
    wrap(
      typeof value === "function"
        ? _underlying.header(name, underlyingSessionTo(value))
        : _underlying.header(name, value)
    ),
  partition: (partition: Expression<number> | string): T =>
    wrap(
      typeof partition === "function"
        ? _underlying.partition(underlyingSessionTo(partition))
        : _underlying.partition(partition)
    )
});
