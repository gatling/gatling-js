import {
  Body,
  Duration,
  Expression,
  Session,
  Wrapper,
  asByteArray,
  asByteArrayFunction,
  isDuration,
  toJvmDuration,
  underlyingSessionTo
} from "@gatling.io/core";
import { MqttDsl as JvmMqttDsl } from "@gatling.io/jvm-types";

import JvmLastWillBuilder = io.gatling.javaapi.mqtt.LastWillBuilder;

export interface LastWillBuilder extends Wrapper<JvmLastWillBuilder> {
  /**
   * Use an at-most-once QoS
   *
   * @returns a new LastWillBuilder instance
   */
  qosAtMostOnce(): LastWillBuilder;

  /**
   * Use an at-least-once QoS
   *
   * @returns a new LastWillBuilder instance
   */
  qosAtLeastOnce(): LastWillBuilder;

  /**
   * Use an exactly-once QoS
   *
   * @returns a new LastWillBuilder instance
   */
  qosExactlyOnce(): LastWillBuilder;

  /**
   * Instruct the server to retain the last will message
   *
   * @returns a new LastWillBuilder instance
   */
  retain(newRetain: boolean): LastWillBuilder;

  /**
   * MQTT 5 only: add a user property. Can be called several times, also with the same name.
   *
   * @param name - the property name, expressed as a Gatling Expression Language String
   * @param value - the property value, expressed as a Gatling Expression Language String
   * @returns a new LastWillBuilder instance
   */
  userProperty(name: string, value: string): LastWillBuilder;

  /**
   * MQTT 5 only: add a user property. Can be called several times, also with the same name.
   *
   * @param name - the property name, expressed as a Gatling Expression Language String
   * @param value - the property value, expressed as a function
   * @returns a new LastWillBuilder instance
   */
  userProperty(name: string, value: (session: Session) => string): LastWillBuilder;

  /**
   * MQTT 5 only: add a user property. Can be called several times, also with the same name.
   *
   * @param name - the property name, expressed as a function
   * @param value - the property value, expressed as a Gatling Expression Language String
   * @returns a new LastWillBuilder instance
   */
  userProperty(name: (session: Session) => string, value: string): LastWillBuilder;

  /**
   * MQTT 5 only: add a user property. Can be called several times, also with the same name.
   *
   * @param name - the property name, expressed as a function
   * @param value - the property value, expressed as a function
   * @returns a new LastWillBuilder instance
   */
  userProperty(name: (session: Session) => string, value: (session: Session) => string): LastWillBuilder;

  /**
   * MQTT 5 only: set the content type.
   *
   * @param contentType - the content type, expressed as a Gatling Expression Language String
   * @returns a new LastWillBuilder instance
   */
  contentType(contentType: string): LastWillBuilder;

  /**
   * MQTT 5 only: set the content type.
   *
   * @param contentType - the content type, expressed as a function
   * @returns a new LastWillBuilder instance
   */
  contentType(contentType: (session: Session) => string): LastWillBuilder;

  /**
   * MQTT 5 only: set the response topic.
   *
   * @param responseTopic - the response topic, expressed as a Gatling Expression Language String
   * @returns a new LastWillBuilder instance
   */
  responseTopic(responseTopic: string): LastWillBuilder;

  /**
   * MQTT 5 only: set the response topic.
   *
   * @param responseTopic - the response topic, expressed as a function
   * @returns a new LastWillBuilder instance
   */
  responseTopic(responseTopic: (session: Session) => string): LastWillBuilder;

  /**
   * MQTT 5 only: set the correlation data, encoded in UTF-8.
   *
   * @param correlationData - the correlation data, expressed as a Gatling Expression Language String
   * @returns a new LastWillBuilder instance
   */
  correlationData(correlationData: string): LastWillBuilder;

  /**
   * MQTT 5 only: set the correlation data, encoded in UTF-8.
   *
   * @param correlationData - the correlation data, expressed as a function
   * @returns a new LastWillBuilder instance
   */
  correlationData(correlationData: (session: Session) => string): LastWillBuilder;

  /**
   * MQTT 5 only: set the correlation data.
   *
   * @param correlationData - the correlation data bytes
   * @returns a new LastWillBuilder instance
   */
  correlationDataBytes(correlationData: number[]): LastWillBuilder;

  /**
   * MQTT 5 only: set the correlation data.
   *
   * @param correlationData - the correlation data bytes, expressed as a function
   * @returns a new LastWillBuilder instance
   */
  correlationDataBytes(correlationData: (session: Session) => number[]): LastWillBuilder;

  /**
   * MQTT 5 only: set how long the broker keeps the message for subscribers that haven't received it
   * yet.
   *
   * @param interval - the message expiry interval
   * @returns a new LastWillBuilder instance
   */
  messageExpiryInterval(interval: Duration): LastWillBuilder;

  /**
   * MQTT 5 only: set the Payload Format Indicator, meaning the payload is UTF-8 encoded text.
   * Brokers may validate it, and refuse the message with PAYLOAD_FORMAT_INVALID otherwise.
   *
   * @returns a new LastWillBuilder instance
   */
  payloadFormatUtf8(): LastWillBuilder;

  /**
   * MQTT 5 only: set how long the broker waits after the connection is lost before publishing the
   * last will.
   *
   * @param interval - the will delay interval
   * @returns a new LastWillBuilder instance
   */
  delayInterval(interval: Duration): LastWillBuilder;
}

export const wrapLastWillBuilder = (_underlying: JvmLastWillBuilder): LastWillBuilder => ({
  _underlying,
  qosAtMostOnce: (): LastWillBuilder => wrapLastWillBuilder(_underlying.qosAtMostOnce()),
  qosAtLeastOnce: (): LastWillBuilder => wrapLastWillBuilder(_underlying.qosAtLeastOnce()),
  qosExactlyOnce: (): LastWillBuilder => wrapLastWillBuilder(_underlying.qosExactlyOnce()),
  retain: (newRetain: boolean): LastWillBuilder => wrapLastWillBuilder(_underlying.retain(newRetain)),

  userProperty: (name: Expression<string>, value: Expression<string>) =>
    wrapLastWillBuilder(
      typeof name === "function"
        ? typeof value === "function"
          ? _underlying.userProperty(underlyingSessionTo(name), underlyingSessionTo(value))
          : _underlying.userProperty(underlyingSessionTo(name), value)
        : typeof value === "function"
          ? _underlying.userProperty(name, underlyingSessionTo(value))
          : _underlying.userProperty(name, value)
    ),
  contentType: (contentType: Expression<string>) =>
    wrapLastWillBuilder(
      typeof contentType === "function"
        ? _underlying.contentType(underlyingSessionTo(contentType))
        : _underlying.contentType(contentType)
    ),
  responseTopic: (responseTopic: Expression<string>) =>
    wrapLastWillBuilder(
      typeof responseTopic === "function"
        ? _underlying.responseTopic(underlyingSessionTo(responseTopic))
        : _underlying.responseTopic(responseTopic)
    ),
  correlationData: (correlationData: Expression<string>) =>
    wrapLastWillBuilder(
      typeof correlationData === "function"
        ? _underlying.correlationData(underlyingSessionTo(correlationData))
        : _underlying.correlationData(correlationData)
    ),
  correlationDataBytes: (correlationData: Expression<number[]>) =>
    wrapLastWillBuilder(
      typeof correlationData === "function"
        ? _underlying.correlationDataBytes(asByteArrayFunction(underlyingSessionTo(correlationData)))
        : _underlying.correlationDataBytes(asByteArray(correlationData))
    ),
  messageExpiryInterval: (interval) => {
    if (isDuration(interval)) {
      return wrapLastWillBuilder(_underlying.messageExpiryInterval(toJvmDuration(interval)));
    }

    throw Error(`messageExpiryInterval() called with invalid argument ${interval}`);
  },
  payloadFormatUtf8: () => wrapLastWillBuilder(_underlying.payloadFormatUtf8()),
  delayInterval: (interval) => {
    if (isDuration(interval)) {
      return wrapLastWillBuilder(_underlying.delayInterval(toJvmDuration(interval)));
    }

    throw Error(`delayInterval() called with invalid argument ${interval}`);
  }
});

export namespace LastWill {
  export interface Apply {
    /**
     * Bootstrap a builder for last will messages
     *
     * @param topic - the topic to send last will messages to, expressed as a Gatling Expression
     *     Language String
     * @param message - the last will message
     * @returns the next DSL step
     */
    (topic: string, message: Body): LastWillBuilder;

    /**
     * Bootstrap a builder for last will messages
     *
     * @param topic - the topic to send last will messages to, expressed as a function
     * @param message - the last will message
     * @returns the next DSL step
     */
    (topic: (session: Session) => string, message: Body): LastWillBuilder;
  }
}

export const LastWill: LastWill.Apply = (topic: Expression<string>, message: Body): LastWillBuilder =>
  typeof topic === "function"
    ? wrapLastWillBuilder(JvmMqttDsl.LastWill(underlyingSessionTo(topic), message._underlying))
    : wrapLastWillBuilder(JvmMqttDsl.LastWill(topic, message._underlying));
