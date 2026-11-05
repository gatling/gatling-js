import { ActionBuilder, Body } from "@gatling.io/core";

import { KafkaRecordBuilder, kafkaRecordBuilderImpl } from "./record";
import { SchemaBody } from "./schemaBody";
import { SubscribeActionBuilder } from "./subscribe";

import JvmSendActionBuilder = io.gatling.javaapi.kafka.SendActionBuilder;
import JvmSendActionBuilderBase = io.gatling.javaapi.kafka.SendActionBuilder$Base;

export namespace SendActionBuilder {
  /**
   * The step that defines the record's value
   */
  export interface Base {
    /**
     * Provide the record's value
     *
     * @param body - a body
     * @returns a new ActionBuilder instance
     */
    value(body: Body): SendActionBuilder;

    /**
     * Provide the record's value, serialized with the protocol's schema registry
     *
     * @param body - a body, see {@link avro}, {@link protobuf} and {@link jsonSchema}
     * @returns a new ActionBuilder instance
     */
    value(body: SchemaBody): SendActionBuilder;
  }

  export const wrapBase = (_underlying: JvmSendActionBuilderBase): Base => ({
    value: (body: Body | SchemaBody) => wrapSendActionBuilder(_underlying.value(body._underlying as any))
  });
}

/**
 * DSL for actions that send a record to a Kafka topic, timed until the broker acknowledges it
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface SendActionBuilder extends ActionBuilder, KafkaRecordBuilder<SendActionBuilder> {
  /**
   * Start waiting, before sending, for a record another part of the system produces on a topic
   * because of this one, without blocking the virtual user, which polls later with kafka.poll()
   *
   * @param requestName - the subscription's name, expressed as a Gatling Expression Language String
   * @param topic - the name of the topic, expressed as a Gatling Expression Language String
   * @param correlationId - the record's correlation id, expressed as a Gatling Expression Language
   *     String
   * @returns a new ActionBuilder instance
   */
  subscribe(requestName: string, topic: string, correlationId: string): SendActionBuilder;

  /**
   * Start waiting, before sending, for a record another part of the system produces because of this
   * one, without blocking the virtual user, which polls later with kafka.poll()
   *
   * @param subscription - the subscription, built with kafka(name).subscribe(topic)
   * @returns a new ActionBuilder instance
   */
  subscribe(subscription: SubscribeActionBuilder): SendActionBuilder;
}

const wrapSendActionBuilder = (_underlying: JvmSendActionBuilder): SendActionBuilder => ({
  _underlying,
  ...kafkaRecordBuilderImpl(_underlying, wrapSendActionBuilder),
  subscribe: (requestNameOrSubscription: string | SubscribeActionBuilder, topic?: string, correlationId?: string) =>
    wrapSendActionBuilder(
      typeof requestNameOrSubscription === "string"
        ? _underlying.subscribe(requestNameOrSubscription, topic!, correlationId!)
        : _underlying.subscribe(requestNameOrSubscription._underlying as any)
    )
});
