import {
  ActionBuilder,
  Body,
  CheckBuilder,
  Duration,
  Expression,
  Session,
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
    qosAtLeastOnce: () => wrapPublishActionBuilder(_underlying.qosAtMostOnce()),
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
