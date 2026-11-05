import { Body, Wrapper } from "@gatling.io/core";

import { KafkaDsl as JvmKafkaDsl } from "@gatling.io/jvm-types";

import JvmSchemaBody = io.gatling.javaapi.kafka.SchemaBody;

/**
 * A record key or value serialized with the protocol's schema registry, by Confluent's serializer
 * for its format, see {@link avro}, {@link protobuf} and {@link jsonSchema}
 */
export interface SchemaBody extends Wrapper<JvmSchemaBody> {}

const wrapSchemaBody = (_underlying: JvmSchemaBody): SchemaBody => ({ _underlying });

/**
 * Bootstrap an Avro key or value, serialized with the protocol's schema registry. Needs
 * io.confluent:kafka-avro-serializer, see the README for how to declare it.
 *
 * @param schema - the Avro schema
 * @param payload - the value in Avro's JSON encoding, where a union's non-null value is wrapped in
 *     an object keyed by its type
 * @returns the body
 */
export const avro = (schema: string, payload: Body): SchemaBody =>
  wrapSchemaBody(JvmKafkaDsl.avro(schema, payload._underlying));

/**
 * Bootstrap an Avro key or value, serialized with the protocol's schema registry with the latest
 * schema of a subject, read once per run. Needs io.confluent:kafka-avro-serializer, see the README
 * for how to declare it.
 *
 * @param subject - the subject
 * @param payload - the value in Avro's JSON encoding, where a union's non-null value is wrapped in
 *     an object keyed by its type
 * @returns the body
 */
export const avroSubject = (subject: string, payload: Body): SchemaBody =>
  wrapSchemaBody(JvmKafkaDsl.avroSubject(subject, payload._underlying));

/**
 * Bootstrap a Protobuf key or value, serialized with the protocol's schema registry. Needs
 * io.confluent:kafka-protobuf-serializer, which brings jars under the Confluent Community License,
 * see the README for how to declare it.
 *
 * @param schema - the .proto schema, whose first message is the value's
 * @param payload - the value in the protobuf JSON mapping
 * @returns the body
 */
export const protobuf = (schema: string, payload: Body): SchemaBody =>
  wrapSchemaBody(JvmKafkaDsl.protobuf(schema, payload._underlying));

/**
 * Bootstrap a Protobuf key or value, serialized with the protocol's schema registry with the latest
 * schema of a subject, read once per run. Needs io.confluent:kafka-protobuf-serializer, which
 * brings jars under the Confluent Community License, see the README for how to declare it.
 *
 * @param subject - the subject, whose schema's first message is the value's
 * @param payload - the value in the protobuf JSON mapping
 * @returns the body
 */
export const protobufSubject = (subject: string, payload: Body): SchemaBody =>
  wrapSchemaBody(JvmKafkaDsl.protobufSubject(subject, payload._underlying));

/**
 * Bootstrap a JSON Schema key or value, serialized with the protocol's schema registry. Needs
 * io.confluent:kafka-json-schema-serializer, which brings jars under the Confluent Community
 * License, see the README for how to declare it. The serializer validates the value only with the
 * schema registry property json.fail.invalid.schema=true.
 *
 * @param schema - the JSON schema
 * @param payload - the value, as JSON
 * @returns the body
 */
export const jsonSchema = (schema: string, payload: Body): SchemaBody =>
  wrapSchemaBody(JvmKafkaDsl.jsonSchema(schema, payload._underlying));

/**
 * Bootstrap a JSON Schema key or value, serialized with the protocol's schema registry with the
 * latest schema of a subject, read once per run. Needs io.confluent:kafka-json-schema-serializer,
 * which brings jars under the Confluent Community License, see the README for how to declare it.
 * The serializer validates the value only with the schema registry property
 * json.fail.invalid.schema=true.
 *
 * @param subject - the subject
 * @param payload - the value, as JSON
 * @returns the body
 */
export const jsonSchemaSubject = (subject: string, payload: Body): SchemaBody =>
  wrapSchemaBody(JvmKafkaDsl.jsonSchemaSubject(subject, payload._underlying));
