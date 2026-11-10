import {
  ActionBuilder,
  Body,
  CheckBuilder,
  Duration,
  Expression,
  Session,
  asByteArray,
  asByteArrayFunction,
  isDuration,
  toJvmDuration,
  underlyingSessionTo
} from "@gatling.io/core";

import JvmPublishActionBuilder = io.gatling.javaapi.mqtt.PublishActionBuilder;

export namespace PublishActionBuilder {
  import JvmBase = io.gatling.javaapi.mqtt.PublishActionBuilder$Base;
  import JvmCheckable = io.gatling.javaapi.mqtt.PublishActionBuilder$Checkable;

  export interface Base {
    /**
     * Provide the message to send
     *
     * @param body - a body
     * @returns a new ActionBuilder instance
     */
    message(body: Body): PublishActionBuilder;
  }

  export interface Checkable extends ActionBuilder {
    /**
     * Use an at-most-once QoS
     *
     * @returns a new ActionBuilder instance
     */
    qosAtMostOnce(): PublishActionBuilder;

    /**
     * Use an at-least-once QoS
     *
     * @returns a new ActionBuilder instance
     */
    qosAtLeastOnce(): PublishActionBuilder;

    /**
     * Use an exactly-once QoS
     *
     * @returns a new ActionBuilder instance
     */
    qosExactlyOnce(): PublishActionBuilder;

    /**
     * Apply some checks
     *
     * @param checks - the checks
     * @returns the next DSL step
     */
    check(...checks: Array<CheckBuilder>): PublishActionBuilder.Checkable;
  }

  export const wrapBase = (_underlying: JvmBase): PublishActionBuilder.Base => ({
    message: (body) => wrapPublishActionBuilder(_underlying.message(body._underlying))
  });

  export const wrapCheckable = (_underlying: JvmCheckable): PublishActionBuilder.Checkable => ({
    _underlying,

    qosAtMostOnce: () => wrapPublishActionBuilder(_underlying.qosAtMostOnce()),
    qosAtLeastOnce: () => wrapPublishActionBuilder(_underlying.qosAtLeastOnce()),
    qosExactlyOnce: () => wrapPublishActionBuilder(_underlying.qosExactlyOnce()),

    check: (...checks) => wrapCheckable(_underlying.check(checks.map((cb) => cb._underlying)))
  });
}

/**
 * DSL for actions that publish MQTT messages
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface PublishActionBuilder extends ActionBuilder {
  /**
   * Use an at-most-once QoS
   *
   * @returns a new ActionBuilder instance
   */
  qosAtMostOnce(): PublishActionBuilder;

  /**
   * Use an at-least-once QoS
   *
   * @returns a new ActionBuilder instance
   */
  qosAtLeastOnce(): PublishActionBuilder;

  /**
   * Use an exactly-once QoS
   *
   * @returns a new ActionBuilder instance
   */
  qosExactlyOnce(): PublishActionBuilder;

  /**
   * Set the retain flag, overriding the protocol's default
   *
   * @param retain - true to have the broker retain the message
   * @returns a new ActionBuilder instance
   */
  retain(retain: boolean): PublishActionBuilder;

  /**
   * MQTT 5 only: add a user property. Can be called several times, also with the same name.
   *
   * @param name - the property name, expressed as a Gatling Expression Language String
   * @param value - the property value, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  userProperty(name: string, value: string): PublishActionBuilder;

  /**
   * MQTT 5 only: add a user property. Can be called several times, also with the same name.
   *
   * @param name - the property name, expressed as a Gatling Expression Language String
   * @param value - the property value, expressed as a function
   * @returns a new ActionBuilder instance
   */
  userProperty(name: string, value: (session: Session) => string): PublishActionBuilder;

  /**
   * MQTT 5 only: add a user property. Can be called several times, also with the same name.
   *
   * @param name - the property name, expressed as a function
   * @param value - the property value, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  userProperty(name: (session: Session) => string, value: string): PublishActionBuilder;

  /**
   * MQTT 5 only: add a user property. Can be called several times, also with the same name.
   *
   * @param name - the property name, expressed as a function
   * @param value - the property value, expressed as a function
   * @returns a new ActionBuilder instance
   */
  userProperty(name: (session: Session) => string, value: (session: Session) => string): PublishActionBuilder;

  /**
   * MQTT 5 only: set the content type.
   *
   * @param contentType - the content type, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  contentType(contentType: string): PublishActionBuilder;

  /**
   * MQTT 5 only: set the content type.
   *
   * @param contentType - the content type, expressed as a function
   * @returns a new ActionBuilder instance
   */
  contentType(contentType: (session: Session) => string): PublishActionBuilder;

  /**
   * MQTT 5 only: set the response topic.
   *
   * @param responseTopic - the response topic, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  responseTopic(responseTopic: string): PublishActionBuilder;

  /**
   * MQTT 5 only: set the response topic.
   *
   * @param responseTopic - the response topic, expressed as a function
   * @returns a new ActionBuilder instance
   */
  responseTopic(responseTopic: (session: Session) => string): PublishActionBuilder;

  /**
   * MQTT 5 only: set the correlation data, encoded in UTF-8.
   *
   * @param correlationData - the correlation data, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  correlationData(correlationData: string): PublishActionBuilder;

  /**
   * MQTT 5 only: set the correlation data, encoded in UTF-8.
   *
   * @param correlationData - the correlation data, expressed as a function
   * @returns a new ActionBuilder instance
   */
  correlationData(correlationData: (session: Session) => string): PublishActionBuilder;

  /**
   * MQTT 5 only: set the correlation data.
   *
   * @param correlationData - the correlation data bytes
   * @returns a new ActionBuilder instance
   */
  correlationDataBytes(correlationData: number[]): PublishActionBuilder;

  /**
   * MQTT 5 only: set the correlation data.
   *
   * @param correlationData - the correlation data bytes, expressed as a function
   * @returns a new ActionBuilder instance
   */
  correlationDataBytes(correlationData: (session: Session) => number[]): PublishActionBuilder;

  /**
   * MQTT 5 only: set how long the broker keeps the message for subscribers that haven't received it
   * yet.
   *
   * @param interval - the message expiry interval
   * @returns a new ActionBuilder instance
   */
  messageExpiryInterval(interval: Duration): PublishActionBuilder;

  /**
   * MQTT 5 only: set the Payload Format Indicator, meaning the payload is UTF-8 encoded text.
   * Brokers may validate it, and refuse the message with PAYLOAD_FORMAT_INVALID otherwise.
   *
   * @returns a new ActionBuilder instance
   */
  payloadFormatUtf8(): PublishActionBuilder;

  // Checkable

  /**
   * Wait for the checks to complete
   *
   * @param timeout - the check timeout
   * @returns the next DSL step
   */
  await(timeout: Duration): PublishActionBuilder.Checkable;

  /**
   * Wait for the checks to complete
   *
   * @param timeout - the check timeout
   * @param expectedTopic - the topic where the response message is expected to be published,
   *     expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  await(timeout: Duration, expectedTopic: string): PublishActionBuilder.Checkable;

  /**
   * Wait for the checks to complete
   *
   * @param timeout - the check timeout
   * @param expectedTopic - the topic where the response message is expected to be published,
   *     expressed as a function
   * @returns the next DSL step
   */
  // FIXME wait?
  await(timeout: Duration, expectedTopic: (session: Session) => string): PublishActionBuilder.Checkable;

  /**
   * Perform checks in the background, meaning state will have to be reconciled with {@link
   * MqttDsl#waitForMessages()}
   *
   * @param timeout - the check timeout
   * @returns the next DSL step
   */
  expect(timeout: Duration): PublishActionBuilder.Checkable;

  /**
   * Perform checks in the background, meaning state will have to be reconciled with {@link
   * MqttDsl#waitForMessages()}
   *
   * @param timeout - the check timeout
   * @param expectedTopic - the topic where the response message is expected to be published,
   *     expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  expect(timeout: Duration, expectedTopic: string): PublishActionBuilder.Checkable;

  /**
   * Perform checks in the background, meaning state will have to be reconciled with {@link
   * MqttDsl#waitForMessages()}
   *
   * @param timeout - the check timeout
   * @param expectedTopic - the topic where the response message is expected to be published,
   *     expressed as a function
   * @returns the next DSL step
   */
  expect(timeout: Duration, expectedTopic: (session: Session) => string): PublishActionBuilder.Checkable;
}

const wrapPublishActionBuilder = (_underlying: JvmPublishActionBuilder): PublishActionBuilder => ({
  _underlying,

  qosAtMostOnce: () => wrapPublishActionBuilder(_underlying.qosAtMostOnce()),
  qosAtLeastOnce: () => wrapPublishActionBuilder(_underlying.qosAtLeastOnce()),
  qosExactlyOnce: () => wrapPublishActionBuilder(_underlying.qosExactlyOnce()),

  retain: (retain) => wrapPublishActionBuilder(_underlying.retain(retain)),

  userProperty: (name: Expression<string>, value: Expression<string>) =>
    wrapPublishActionBuilder(
      typeof name === "function"
        ? typeof value === "function"
          ? _underlying.userProperty(underlyingSessionTo(name), underlyingSessionTo(value))
          : _underlying.userProperty(underlyingSessionTo(name), value)
        : typeof value === "function"
          ? _underlying.userProperty(name, underlyingSessionTo(value))
          : _underlying.userProperty(name, value)
    ),
  contentType: (contentType: Expression<string>) =>
    wrapPublishActionBuilder(
      typeof contentType === "function"
        ? _underlying.contentType(underlyingSessionTo(contentType))
        : _underlying.contentType(contentType)
    ),
  responseTopic: (responseTopic: Expression<string>) =>
    wrapPublishActionBuilder(
      typeof responseTopic === "function"
        ? _underlying.responseTopic(underlyingSessionTo(responseTopic))
        : _underlying.responseTopic(responseTopic)
    ),
  correlationData: (correlationData: Expression<string>) =>
    wrapPublishActionBuilder(
      typeof correlationData === "function"
        ? _underlying.correlationData(underlyingSessionTo(correlationData))
        : _underlying.correlationData(correlationData)
    ),
  correlationDataBytes: (correlationData: Expression<number[]>) =>
    wrapPublishActionBuilder(
      typeof correlationData === "function"
        ? _underlying.correlationDataBytes(asByteArrayFunction(underlyingSessionTo(correlationData)))
        : _underlying.correlationDataBytes(asByteArray(correlationData))
    ),
  messageExpiryInterval: (interval) => {
    if (isDuration(interval)) {
      return wrapPublishActionBuilder(_underlying.messageExpiryInterval(toJvmDuration(interval)));
    }

    throw Error(`messageExpiryInterval() called with invalid argument ${interval}`);
  },
  payloadFormatUtf8: () => wrapPublishActionBuilder(_underlying.payloadFormatUtf8()),

  // Checkable

  await: (timeout: Duration, expectedTopic?: Expression<string>): PublishActionBuilder.Checkable => {
    if (expectedTopic !== undefined) {
      if (isDuration(timeout)) {
        const jvmTimeout = toJvmDuration(timeout);
        if (typeof expectedTopic === "function") {
          return PublishActionBuilder.wrapCheckable(_underlying.await(jvmTimeout, underlyingSessionTo(expectedTopic)));
        } else {
          return PublishActionBuilder.wrapCheckable(_underlying.await(jvmTimeout, expectedTopic));
        }
      }
      throw Error(`await() called with invalid arguments ${timeout}, ${expectedTopic}`);
    } else {
      if (isDuration(timeout)) {
        return PublishActionBuilder.wrapCheckable(_underlying.await(toJvmDuration(timeout)));
      }
      throw Error(`await() called with invalid argument ${timeout}`);
    }
  },

  expect: (timeout: Duration, expectedTopic?: Expression<string>): PublishActionBuilder.Checkable => {
    if (expectedTopic !== undefined) {
      if (isDuration(timeout)) {
        const jvmTimeout = toJvmDuration(timeout);
        if (typeof expectedTopic === "function") {
          return PublishActionBuilder.wrapCheckable(_underlying.expect(jvmTimeout, underlyingSessionTo(expectedTopic)));
        } else {
          return PublishActionBuilder.wrapCheckable(_underlying.expect(jvmTimeout, expectedTopic));
        }
      }
      throw Error(`expect() called with invalid arguments ${timeout}, ${expectedTopic}`);
    } else {
      if (isDuration(timeout)) {
        return PublishActionBuilder.wrapCheckable(_underlying.expect(toJvmDuration(timeout)));
      }
      throw Error(`expect() called with invalid argument ${timeout}`);
    }
  }
});
