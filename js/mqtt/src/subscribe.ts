import { ActionBuilder, CheckBuilder, Duration, isDuration, toJvmDuration } from "@gatling.io/core";
import JvmSubscribeActionBuilder = io.gatling.javaapi.mqtt.SubscribeActionBuilder;

export namespace SubscribeActionBuilder {
  import JvmCheckable = io.gatling.javaapi.mqtt.SubscribeActionBuilder$Checkable;

  export interface Checkable extends ActionBuilder {
    /**
     * Use an at-most-once QoS
     *
     * @returns a new ActionBuilder instance
     */
    qosAtMostOnce(): SubscribeActionBuilder;

    /**
     * Use an at-least-once QoS
     *
     * @returns a new ActionBuilder instance
     */
    qosAtLeastOnce(): SubscribeActionBuilder;

    /**
     * Use an exactly-once QoS
     *
     * @returns a new ActionBuilder instance
     */
    qosExactlyOnce(): SubscribeActionBuilder;

    /**
     * Apply some checks
     *
     * @param checks - the checks
     * @returns a new ActionBuilder instance
     */
    check(...checks: Array<CheckBuilder>): SubscribeActionBuilder.Checkable;
  }

  export const wrapCheckable = (_underlying: JvmCheckable): Checkable => ({
    _underlying,

    qosAtMostOnce: () => wrapSubscribeActionBuilder(_underlying.qosAtMostOnce()),
    qosAtLeastOnce: () => wrapSubscribeActionBuilder(_underlying.qosAtLeastOnce()),
    qosExactlyOnce: () => wrapSubscribeActionBuilder(_underlying.qosExactlyOnce()),

    check: (...checks) => wrapCheckable(_underlying.check(checks.map((cb) => cb._underlying)))
  });
}

/**
 * DSL for actions that subscribe to MQTT topics
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface SubscribeActionBuilder extends ActionBuilder {
  /**
   * Use an at-most-once QoS
   *
   * @returns a new ActionBuilder instance
   */
  qosAtMostOnce(): SubscribeActionBuilder;

  /**
   * Use an at-least-once QoS
   *
   * @returns a new ActionBuilder instance
   */
  qosAtLeastOnce(): SubscribeActionBuilder;

  /**
   * Use an exactly-once QoS
   *
   * @returns a new ActionBuilder instance
   */
  qosExactlyOnce(): SubscribeActionBuilder;

  // Checkable

  /**
   * Wait for the checks to complete
   *
   * @param timeout - the check timeout
   * @returns a new ActionBuilder instance
   */
  await(timeout: Duration): SubscribeActionBuilder.Checkable;

  /**
   * Perform checks in the background, meaning state will have to be reconciled with {@link
   * MqttDsl#waitForMessages()}
   *
   * @param timeout - the check timeout
   * @returns the next DSL step
   */
  expect(timeout: Duration): SubscribeActionBuilder.Checkable;
}

export const wrapSubscribeActionBuilder = (_underlying: JvmSubscribeActionBuilder): SubscribeActionBuilder => ({
  _underlying,

  qosAtMostOnce: () => wrapSubscribeActionBuilder(_underlying.qosAtMostOnce()),
  qosAtLeastOnce: () => wrapSubscribeActionBuilder(_underlying.qosAtLeastOnce()),
  qosExactlyOnce: () => wrapSubscribeActionBuilder(_underlying.qosExactlyOnce()),

  // Checkable

  await: (timeout: Duration) => {
    if (isDuration(timeout)) {
      return SubscribeActionBuilder.wrapCheckable(_underlying.await(toJvmDuration(timeout)));
    }

    throw Error(`await() called with invalid argument ${timeout}`);
  },

  expect: (timeout: Duration) => {
    if (isDuration(timeout)) {
      return SubscribeActionBuilder.wrapCheckable(_underlying.expect(toJvmDuration(timeout)));
    }

    throw Error(`expect() called with invalid argument ${timeout}`);
  }
});
