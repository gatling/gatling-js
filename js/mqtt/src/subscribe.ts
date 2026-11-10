import {
  ActionBuilder,
  CheckBuilder,
  Duration,
  Session,
  isDuration,
  toJvmDuration,
  underlyingSessionTo
} from "@gatling.io/core";
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

  /**
   * MQTT 5 only: don't receive the messages this virtual user publishes to the subscribed topics.
   *
   * @returns a new ActionBuilder instance
   */
  noLocal(): SubscribeActionBuilder;

  /**
   * MQTT 5 only: keep the retain flag of the messages forwarded for this subscription.
   *
   * @returns a new ActionBuilder instance
   */
  retainAsPublished(): SubscribeActionBuilder;

  /**
   * MQTT 5 only: receive the retained messages when subscribing, the default.
   *
   * @returns a new ActionBuilder instance
   */
  retainHandlingSendAtSubscribe(): SubscribeActionBuilder;

  /**
   * MQTT 5 only: receive the retained messages when subscribing, unless the subscription already
   * exists.
   *
   * @returns a new ActionBuilder instance
   */
  retainHandlingSendAtNewSubscribe(): SubscribeActionBuilder;

  /**
   * MQTT 5 only: don't receive the retained messages when subscribing.
   *
   * @returns a new ActionBuilder instance
   */
  retainHandlingDontSend(): SubscribeActionBuilder;

  /**
   * MQTT 5 only: set the Subscription Identifier (1 to 268,435,455), which the broker adds to the
   * messages it forwards for this subscription.
   *
   * @param id - the identifier
   * @returns a new ActionBuilder instance
   */
  subscriptionIdentifier(id: number): SubscribeActionBuilder;

  /**
   * MQTT 5 only: set the Subscription Identifier (1 to 268,435,455), which the broker adds to the
   * messages it forwards for this subscription.
   *
   * @param id - the identifier, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  subscriptionIdentifier(id: string): SubscribeActionBuilder;

  /**
   * MQTT 5 only: set the Subscription Identifier (1 to 268,435,455), which the broker adds to the
   * messages it forwards for this subscription.
   *
   * @param id - the identifier, expressed as a function
   * @returns a new ActionBuilder instance
   */
  subscriptionIdentifier(id: (session: Session) => number): SubscribeActionBuilder;

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

  noLocal: () => wrapSubscribeActionBuilder(_underlying.noLocal()),
  retainAsPublished: () => wrapSubscribeActionBuilder(_underlying.retainAsPublished()),
  retainHandlingSendAtSubscribe: () => wrapSubscribeActionBuilder(_underlying.retainHandlingSendAtSubscribe()),
  retainHandlingSendAtNewSubscribe: () => wrapSubscribeActionBuilder(_underlying.retainHandlingSendAtNewSubscribe()),
  retainHandlingDontSend: () => wrapSubscribeActionBuilder(_underlying.retainHandlingDontSend()),

  subscriptionIdentifier: (id: number | string | ((session: Session) => number)) =>
    wrapSubscribeActionBuilder(
      typeof id === "function"
        ? _underlying.subscriptionIdentifier(underlyingSessionTo(id))
        : typeof id === "number"
          ? _underlying.subscriptionIdentifier(id)
          : _underlying.subscriptionIdentifier(id)
    ),

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
