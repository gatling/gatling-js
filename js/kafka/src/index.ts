import {
  ActionBuilder,
  CheckBuilderFind,
  Expression,
  Session,
  underlyingSessionTo,
  wrapActionBuilder,
  wrapCheckBuilderFind
} from "@gatling.io/core";

import { ConsumeActionBuilder } from "./consume";
import { KafkaProtocolBuilder, wrapKafkaProtocolBuilder } from "./protocol";
import { RequestReplyActionBuilder } from "./requestReply";
import { SendActionBuilder } from "./send";
import { SubscribeActionBuilder } from "./subscribe";

export * from "./consume";
export * from "./protocol";
export * from "./record";
export * from "./requestReply";
export * from "./schemaBody";
export * from "./send";
export * from "./subscribe";

import { KafkaDsl as JvmKafkaDsl } from "@gatling.io/jvm-types";

import JvmKafka = io.gatling.javaapi.kafka.Kafka;
import JvmKafkaBuilder = io.gatling.javaapi.kafka.KafkaBuilder;

/**
 * DSL for Kafka actions
 */
export interface KafkaBuilder {
  /**
   * Create a builder for actions that send a record to a Kafka topic
   *
   * @param topic - the name of the topic, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  send(topic: string): SendActionBuilder.Base;

  /**
   * Create a builder for actions that send a record to a Kafka topic
   *
   * @param topic - the name of the topic, expressed as a function
   * @returns the next DSL step
   */
  send(topic: (session: Session) => string): SendActionBuilder.Base;

  /**
   * Create a builder for actions that send a record to a Kafka topic and wait for its reply on
   * another one
   *
   * @param requestTopic - the name of the topic to send the request to, expressed as a Gatling
   *     Expression Language String
   * @param replyTopic - the name of the topic to read the reply from, expressed as a Gatling
   *     Expression Language String
   * @returns the next DSL step
   */
  requestReply(requestTopic: string, replyTopic: string): RequestReplyActionBuilder.Base;

  /**
   * Create a builder for actions that send a record to a Kafka topic and wait for its reply on
   * another one
   *
   * @param requestTopic - the name of the topic to send the request to, expressed as a function
   * @param replyTopic - the name of the topic to read the reply from, expressed as a function
   * @returns the next DSL step
   */
  requestReply(
    requestTopic: (session: Session) => string,
    replyTopic: (session: Session) => string
  ): RequestReplyActionBuilder.Base;

  /**
   * Create a builder for actions that wait for a record another part of the system produces on a
   * topic, matched to the virtual user by the protocol's matcher
   *
   * @param topic - the name of the topic, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  consume(topic: string): ConsumeActionBuilder.Base;

  /**
   * Create a builder for actions that wait for a record another part of the system produces on a
   * topic, matched to the virtual user by the protocol's matcher
   *
   * @param topic - the name of the topic, expressed as a function
   * @returns the next DSL step
   */
  consume(topic: (session: Session) => string): ConsumeActionBuilder.Base;

  /**
   * Create a builder for subscriptions: they start waiting for a record another part of the system
   * produces on a topic, without blocking the virtual user, which polls later with kafka.poll().
   * Place a subscription before what makes its record.
   *
   * @param topic - the name of the topic, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  subscribe(topic: string): SubscribeActionBuilder.Base;

  /**
   * Create a builder for subscriptions: they start waiting for a record another part of the system
   * produces on a topic, without blocking the virtual user, which polls later with kafka.poll().
   * Place a subscription before what makes its record.
   *
   * @param topic - the name of the topic, expressed as a function
   * @returns the next DSL step
   */
  subscribe(topic: (session: Session) => string): SubscribeActionBuilder.Base;
}

const wrapKafkaBuilder = (_underlying: JvmKafkaBuilder): KafkaBuilder => ({
  send: (topic: Expression<string>) =>
    SendActionBuilder.wrapBase(
      typeof topic === "function" ? _underlying.send(underlyingSessionTo(topic)) : _underlying.send(topic)
    ),
  requestReply: (requestTopic: Expression<string>, replyTopic: Expression<string>) => {
    if (typeof requestTopic === "function" && typeof replyTopic === "function") {
      return RequestReplyActionBuilder.wrapBase(
        _underlying.requestReply(underlyingSessionTo(requestTopic), underlyingSessionTo(replyTopic))
      );
    } else if (typeof requestTopic === "string" && typeof replyTopic === "string") {
      return RequestReplyActionBuilder.wrapBase(_underlying.requestReply(requestTopic, replyTopic));
    }
    throw Error(`requestReply() called with invalid arguments ${requestTopic}, ${replyTopic}`);
  },
  consume: (topic: Expression<string>) =>
    ConsumeActionBuilder.wrapBase(
      typeof topic === "function" ? _underlying.consume(underlyingSessionTo(topic)) : _underlying.consume(topic)
    ),
  subscribe: (topic: Expression<string>) =>
    SubscribeActionBuilder.wrapBase(
      typeof topic === "function" ? _underlying.subscribe(underlyingSessionTo(topic)) : _underlying.subscribe(topic)
    )
});

export interface KafkaApply {
  /**
   * Bootstrap a builder for a Kafka action
   *
   * @param name - the action name, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string): KafkaBuilder;

  /**
   * Bootstrap a builder for a Kafka action
   *
   * @param name - the action name, expressed as a function
   * @returns the next DSL step
   */
  (name: (session: Session) => string): KafkaBuilder;
}

const kafkaApply = (name: Expression<string>): KafkaBuilder =>
  wrapKafkaBuilder(typeof name === "function" ? JvmKafkaDsl.kafka(underlyingSessionTo(name)) : JvmKafkaDsl.kafka(name));

/**
 * The Kafka protocol configuration DSL entrypoint
 */
export interface Kafka extends KafkaProtocolBuilder {
  /**
   * Wait for the virtual user's subscriptions to complete, then apply what their checks saved, and
   * their failures, to its session
   *
   * @returns an ActionBuilder
   */
  poll(): ActionBuilder;
}

// static fields aren't generated by java2ts
const jvmKafka = (JvmKafkaDsl as any).kafka as JvmKafka;

/**
 * The entrypoint of the Kafka DSL: kafka.bootstrapServers(...) bootstraps a protocol, kafka("name")
 * an action, kafka.poll() waits for the virtual user's subscriptions
 */
export const kafka: KafkaApply & Kafka = Object.assign(kafkaApply, {
  ...wrapKafkaProtocolBuilder(jvmKafka),
  poll: () => wrapActionBuilder(jvmKafka.poll())
});

/**
 * Bootstrap a check on the value of the record's last header with this name, decoded as UTF-8
 *
 * @param name - the header name
 * @returns the next DSL step
 */
export const kafkaHeader = (name: string): CheckBuilderFind<string> =>
  wrapCheckBuilderFind(JvmKafkaDsl.kafkaHeader(name));

/**
 * Bootstrap a check on the record's key, decoded as UTF-8
 *
 * @returns the next DSL step
 */
export const kafkaKey = (): CheckBuilderFind<string> => wrapCheckBuilderFind(JvmKafkaDsl.kafkaKey());
