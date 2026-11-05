import {
  ActionBuilder,
  CheckBuilder,
  Duration,
  Expression,
  Session,
  toJvmDuration,
  underlyingSessionTo
} from "@gatling.io/core";

import JvmSubscribeActionBuilder = io.gatling.javaapi.kafka.SubscribeActionBuilder;
import JvmSubscribeActionBuilderBase = io.gatling.javaapi.kafka.SubscribeActionBuilder$Base;

export namespace SubscribeActionBuilder {
  /**
   * The step that defines the correlation id of the expected record
   */
  export interface Base {
    /**
     * Provide the correlation id of the expected record, as the protocol's matcher reads it: its
     * key, its header or the value extracted from it, as UTF-8 text
     *
     * @param correlationId - the correlation id, expressed as a Gatling Expression Language String
     * @returns a new ActionBuilder instance
     */
    correlationId(correlationId: string): SubscribeActionBuilder;

    /**
     * Provide the correlation id of the expected record, as the protocol's matcher reads it: its
     * key, its header or the value extracted from it, as UTF-8 text
     *
     * @param correlationId - the correlation id, expressed as a function
     * @returns a new ActionBuilder instance
     */
    correlationId(correlationId: (session: Session) => string): SubscribeActionBuilder;
  }

  export const wrapBase = (_underlying: JvmSubscribeActionBuilderBase): Base => ({
    correlationId: (correlationId: Expression<string>) =>
      wrapSubscribeActionBuilder(
        typeof correlationId === "function"
          ? _underlying.correlationId(underlyingSessionTo(correlationId))
          : _underlying.correlationId(correlationId)
      )
  });
}

/**
 * DSL for subscriptions: they start waiting for a record another part of the system produces on a
 * topic, matched to the virtual user by the protocol's matcher with the correlation id it supplies,
 * without blocking the virtual user, which polls later with kafka.poll(). Place a subscription
 * before what makes its record, or attach it to a send or a request-reply. Timed from when it
 * starts, or from a timestamp saved in the session, see startTimestampFrom.
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface SubscribeActionBuilder extends ActionBuilder {
  /**
   * Apply checks on the expected record
   *
   * @param checks - the checks
   * @returns a new ActionBuilder instance
   */
  check(...checks: CheckBuilder[]): SubscribeActionBuilder;

  /**
   * Define how long the virtual user waits for the record, overriding the protocol's reply timeout
   *
   * @param timeout - the timeout
   * @returns a new ActionBuilder instance
   */
  timeout(timeout: Duration): SubscribeActionBuilder;

  /**
   * Time the record from a timestamp in the session instead of from when the action starts, e.g.
   * saved before an earlier action sent the record a pipeline turns into this one, to measure the
   * latency across the pipeline. A record read before this timestamp is a previous one with the
   * same correlation id, and is ignored.
   *
   * @param attributeName - the name of the session attribute holding the timestamp, in epoch millis
   * @returns a new ActionBuilder instance
   */
  startTimestampFrom(attributeName: string): SubscribeActionBuilder;
}

const wrapSubscribeActionBuilder = (_underlying: JvmSubscribeActionBuilder): SubscribeActionBuilder => ({
  _underlying,
  check: (...checks: CheckBuilder[]) =>
    wrapSubscribeActionBuilder(_underlying.check(...checks.map((check) => check._underlying))),
  timeout: (timeout: Duration) => wrapSubscribeActionBuilder(_underlying.timeout(toJvmDuration(timeout))),
  startTimestampFrom: (attributeName: string) =>
    wrapSubscribeActionBuilder(_underlying.startTimestampFrom(attributeName))
});
