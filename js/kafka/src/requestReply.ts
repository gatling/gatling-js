import { ActionBuilder, Body, CheckBuilder, Duration, toJvmDuration } from "@gatling.io/core";

import { KafkaRecordBuilder, kafkaRecordBuilderImpl } from "./record";
import { SchemaBody } from "./schemaBody";
import { SubscribeActionBuilder } from "./subscribe";

import JvmRequestReplyActionBuilder = io.gatling.javaapi.kafka.RequestReplyActionBuilder;
import JvmRequestReplyActionBuilderBase = io.gatling.javaapi.kafka.RequestReplyActionBuilder$Base;

export namespace RequestReplyActionBuilder {
  /**
   * The step that defines the request record's value
   */
  export interface Base {
    /**
     * Provide the record's value
     *
     * @param body - a body
     * @returns a new ActionBuilder instance
     */
    value(body: Body): RequestReplyActionBuilder;

    /**
     * Provide the record's value, serialized with the protocol's schema registry
     *
     * @param body - a body, see {@link avro}, {@link protobuf} and {@link jsonSchema}
     * @returns a new ActionBuilder instance
     */
    value(body: SchemaBody): RequestReplyActionBuilder;
  }

  export const wrapBase = (_underlying: JvmRequestReplyActionBuilderBase): Base => ({
    value: (body: Body | SchemaBody) => wrapRequestReplyActionBuilder(_underlying.value(body._underlying))
  });
}

/**
 * DSL for actions that send a record to a Kafka topic and wait for its reply, timed until the reply
 * is read
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface RequestReplyActionBuilder extends ActionBuilder, KafkaRecordBuilder<RequestReplyActionBuilder> {
  /**
   * Apply checks on the reply
   *
   * @param checks - the checks
   * @returns a new ActionBuilder instance
   */
  check(...checks: CheckBuilder[]): RequestReplyActionBuilder;

  /**
   * Define how long this request waits for its reply, overriding the protocol's
   *
   * @param timeout - the timeout
   * @returns a new ActionBuilder instance
   */
  replyTimeout(timeout: Duration): RequestReplyActionBuilder;

  /**
   * Decode the reply's value with the schema registry's Avro deserializer, from
   * io.confluent:kafka-avro-serializer: the string, substring, regex, jsonPath and jmesPath checks
   * read it as JSON, the bytes checks still read its bytes
   *
   * @returns a new ActionBuilder instance
   */
  decodeAvroReply(): RequestReplyActionBuilder;

  /**
   * Decode the reply's value with the schema registry's Protobuf deserializer, from
   * io.confluent:kafka-protobuf-serializer, into the protobuf JSON mapping: the string, substring,
   * regex, jsonPath and jmesPath checks read it as JSON, the bytes checks still read its bytes
   *
   * @returns a new ActionBuilder instance
   */
  decodeProtobufReply(): RequestReplyActionBuilder;

  /**
   * Decode the reply's value with the schema registry's JSON Schema deserializer, from
   * io.confluent:kafka-json-schema-serializer: the string, substring, regex, jsonPath and jmesPath
   * checks read it as JSON, the bytes checks still read its bytes
   *
   * @returns a new ActionBuilder instance
   */
  decodeJsonSchemaReply(): RequestReplyActionBuilder;

  /**
   * Start waiting, before sending, for a record another part of the system produces on a topic
   * because of this request, besides its reply, without blocking the virtual user, which polls
   * later with kafka.poll()
   *
   * @param requestName - the subscription's name, expressed as a Gatling Expression Language String
   * @param topic - the name of the topic, expressed as a Gatling Expression Language String
   * @param correlationId - the record's correlation id, expressed as a Gatling Expression Language
   *     String
   * @returns a new ActionBuilder instance
   */
  subscribe(requestName: string, topic: string, correlationId: string): RequestReplyActionBuilder;

  /**
   * Start waiting, before sending, for a record another part of the system produces because of this
   * request, besides its reply, without blocking the virtual user, which polls later with
   * kafka.poll()
   *
   * @param subscription - the subscription, built with kafka(name).subscribe(topic)
   * @returns a new ActionBuilder instance
   */
  subscribe(subscription: SubscribeActionBuilder): RequestReplyActionBuilder;
}

const wrapRequestReplyActionBuilder = (_underlying: JvmRequestReplyActionBuilder): RequestReplyActionBuilder => ({
  _underlying,
  ...kafkaRecordBuilderImpl(_underlying, wrapRequestReplyActionBuilder),
  check: (...checks: CheckBuilder[]) =>
    wrapRequestReplyActionBuilder(_underlying.check(...checks.map((check) => check._underlying))),
  replyTimeout: (timeout: Duration) => wrapRequestReplyActionBuilder(_underlying.replyTimeout(toJvmDuration(timeout))),
  decodeAvroReply: () => wrapRequestReplyActionBuilder(_underlying.decodeAvroReply()),
  decodeProtobufReply: () => wrapRequestReplyActionBuilder(_underlying.decodeProtobufReply()),
  decodeJsonSchemaReply: () => wrapRequestReplyActionBuilder(_underlying.decodeJsonSchemaReply()),
  subscribe: (requestNameOrSubscription: string | SubscribeActionBuilder, topic?: string, correlationId?: string) =>
    wrapRequestReplyActionBuilder(
      typeof requestNameOrSubscription === "string"
        ? _underlying.subscribe(requestNameOrSubscription, topic!, correlationId!)
        : _underlying.subscribe(requestNameOrSubscription._underlying as any)
    )
});
