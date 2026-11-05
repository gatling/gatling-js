/*
 * Copyright 2011-2026 GatlingCorp (https://gatling.io)
 *
 * All rights reserved.
 */

package io.gatling.javaapi.kafka;

import static io.gatling.javaapi.core.internal.Expressions.*;

import io.gatling.javaapi.core.Body;
import io.gatling.javaapi.core.CheckBuilder;
import io.gatling.javaapi.core.Session;
import io.gatling.javaapi.kafka.internal.KafkaCheckType;
import java.util.function.Function;
import org.jspecify.annotations.NonNull;

/**
 * The entrypoint of the Gatling Kafka DSL
 *
 * <p>The {@link #avro}, {@link #protobuf} and {@link #jsonSchema} keys and values are serialized
 * with the protocol's schema registry by Confluent's serializers, which the plugin loads by class
 * name and doesn't depend on: add the one of each format you use to your project, from Confluent's
 * repository https://packages.confluent.io/maven/: io.confluent:kafka-avro-serializer,
 * io.confluent:kafka-protobuf-serializer or io.confluent:kafka-json-schema-serializer. The Protobuf
 * and JSON Schema serializers bring jars under the Confluent Community License:
 * io.confluent:kafka-protobuf-provider and io.confluent:kafka-json-schema-provider.
 */
public final class KafkaDsl {
  private KafkaDsl() {}

  // Patched copy: java2typescript loads this class, and the original static field initialization fails as it needs
  // Gatling's configuration
  /** Bootstrap a Kafka protocol configuration */
  public static final Kafka kafka = null;
  //    new Kafka(io.gatling.kafka.Predef.kafka(io.gatling.core.Predef.configuration()));

  /**
   * Bootstrap a builder for a Kafka action
   *
   * @param name the action name, expressed as a Gatling Expression Language String
   * @return the next DSL step
   */
  public static @NonNull KafkaBuilder kafka(@NonNull String name) {
    return new KafkaBuilder(toStringExpression(name));
  }

  /**
   * Bootstrap a builder for a Kafka action
   *
   * @param name the action name, expressed as a function
   * @return the next DSL step
   */
  public static @NonNull KafkaBuilder kafka(@NonNull Function<Session, String> name) {
    return new KafkaBuilder(javaFunctionToExpression(name));
  }

  /**
   * Bootstrap a check on the value of the record's last header with this name, decoded as UTF-8
   *
   * @param name the header name
   * @return the next DSL step
   */
  public static CheckBuilder.@NonNull Find<String> kafkaHeader(@NonNull String name) {
    return new CheckBuilder.Find.Default<>(
        io.gatling.kafka.Predef.kafkaHeader(name), KafkaCheckType.Header, String.class, null);
  }

  /**
   * Bootstrap a check on the record's key, decoded as UTF-8
   *
   * @return the next DSL step
   */
  public static CheckBuilder.@NonNull Find<String> kafkaKey() {
    return new CheckBuilder.Find.Default<>(
        io.gatling.kafka.Predef.kafkaKey(), KafkaCheckType.Key, String.class, null);
  }

  /**
   * Bootstrap an Avro key or value, serialized with the protocol's schema registry; needs
   * io.confluent:kafka-avro-serializer
   *
   * @param schema the Avro schema
   * @param payload the value in Avro's JSON encoding, where a union's non-null value is wrapped in
   *     an object keyed by its type
   * @return the body
   */
  public static @NonNull SchemaBody avro(@NonNull String schema, @NonNull Body payload) {
    return new SchemaBody(io.gatling.kafka.Predef.avro(schema, payload.asScala()));
  }

  /**
   * Bootstrap an Avro key or value, serialized with the protocol's schema registry with the latest
   * schema of a subject, read once per run; needs io.confluent:kafka-avro-serializer
   *
   * @param subject the subject
   * @param payload the value in Avro's JSON encoding, where a union's non-null value is wrapped in
   *     an object keyed by its type
   * @return the body
   */
  public static @NonNull SchemaBody avroSubject(@NonNull String subject, @NonNull Body payload) {
    return new SchemaBody(io.gatling.kafka.Predef.avroSubject(subject, payload.asScala()));
  }

  /**
   * Bootstrap a Protobuf key or value, serialized with the protocol's schema registry; needs
   * io.confluent:kafka-protobuf-serializer, which brings jars under the Confluent Community License
   *
   * @param schema the .proto schema, whose first message is the value's
   * @param payload the value in the protobuf JSON mapping
   * @return the body
   */
  public static @NonNull SchemaBody protobuf(@NonNull String schema, @NonNull Body payload) {
    return new SchemaBody(io.gatling.kafka.Predef.protobuf(schema, payload.asScala()));
  }

  /**
   * Bootstrap a Protobuf key or value, serialized with the protocol's schema registry with the
   * latest schema of a subject, read once per run; needs io.confluent:kafka-protobuf-serializer,
   * which brings jars under the Confluent Community License
   *
   * @param subject the subject, whose schema's first message is the value's
   * @param payload the value in the protobuf JSON mapping
   * @return the body
   */
  public static @NonNull SchemaBody protobufSubject(
      @NonNull String subject, @NonNull Body payload) {
    return new SchemaBody(io.gatling.kafka.Predef.protobufSubject(subject, payload.asScala()));
  }

  /**
   * Bootstrap a JSON Schema key or value, serialized with the protocol's schema registry; needs
   * io.confluent:kafka-json-schema-serializer, which brings jars under the Confluent Community
   * License. The serializer validates the value only with the schema registry property
   * json.fail.invalid.schema=true.
   *
   * @param schema the JSON schema
   * @param payload the value, as JSON
   * @return the body
   */
  public static @NonNull SchemaBody jsonSchema(@NonNull String schema, @NonNull Body payload) {
    return new SchemaBody(io.gatling.kafka.Predef.jsonSchema(schema, payload.asScala()));
  }

  /**
   * Bootstrap a JSON Schema key or value, serialized with the protocol's schema registry with the
   * latest schema of a subject, read once per run; needs io.confluent:kafka-json-schema-serializer,
   * which brings jars under the Confluent Community License. The serializer validates the value
   * only with the schema registry property json.fail.invalid.schema=true.
   *
   * @param subject the subject
   * @param payload the value, as JSON
   * @return the body
   */
  public static @NonNull SchemaBody jsonSchemaSubject(
      @NonNull String subject, @NonNull Body payload) {
    return new SchemaBody(io.gatling.kafka.Predef.jsonSchemaSubject(subject, payload.asScala()));
  }
}
