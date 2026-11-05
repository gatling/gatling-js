import {
  ActionBuilder,
  CheckBuilder,
  Duration,
  Expression,
  Session,
  toJvmDuration,
  underlyingSessionTo
} from "@gatling.io/core";

import JvmConsumeActionBuilder = io.gatling.javaapi.kafka.ConsumeActionBuilder;
import JvmConsumeActionBuilderBase = io.gatling.javaapi.kafka.ConsumeActionBuilder$Base;

export namespace ConsumeActionBuilder {
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
    correlationId(correlationId: string): ConsumeActionBuilder;

    /**
     * Provide the correlation id of the expected record, as the protocol's matcher reads it: its
     * key, its header or the value extracted from it, as UTF-8 text
     *
     * @param correlationId - the correlation id, expressed as a function
     * @returns a new ActionBuilder instance
     */
    correlationId(correlationId: (session: Session) => string): ConsumeActionBuilder;
  }

  export const wrapBase = (_underlying: JvmConsumeActionBuilderBase): Base => ({
    correlationId: (correlationId: Expression<string>) =>
      wrapConsumeActionBuilder(
        typeof correlationId === "function"
          ? _underlying.correlationId(underlyingSessionTo(correlationId))
          : _underlying.correlationId(correlationId)
      )
  });
}

/**
 * DSL for actions that wait for a record another part of the system produces on a topic, matched to
 * the virtual user by the protocol's matcher with the correlation id it supplies. Timed from when
 * the action starts, or from a timestamp saved in the session, see startTimestampFrom.
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface ConsumeActionBuilder extends ActionBuilder {
  /**
   * Apply checks on the expected record
   *
   * @param checks - the checks
   * @returns a new ActionBuilder instance
   */
  check(...checks: CheckBuilder[]): ConsumeActionBuilder;

  /**
   * Define how long the virtual user waits for the record, overriding the protocol's reply timeout
   *
   * @param timeout - the timeout
   * @returns a new ActionBuilder instance
   */
  timeout(timeout: Duration): ConsumeActionBuilder;

  /**
   * Time the record from a timestamp in the session instead of from when the action starts, e.g.
   * saved before an earlier action sent the record a pipeline turns into this one, to measure the
   * latency across the pipeline. A record read before this timestamp is a previous one with the
   * same correlation id, and is ignored.
   *
   * @param attributeName - the name of the session attribute holding the timestamp, in epoch millis
   * @returns a new ActionBuilder instance
   */
  startTimestampFrom(attributeName: string): ConsumeActionBuilder;
}

const wrapConsumeActionBuilder = (_underlying: JvmConsumeActionBuilder): ConsumeActionBuilder => ({
  _underlying,
  check: (...checks: CheckBuilder[]) =>
    wrapConsumeActionBuilder(_underlying.check(...checks.map((check) => check._underlying))),
  timeout: (timeout: Duration) => wrapConsumeActionBuilder(_underlying.timeout(toJvmDuration(timeout))),
  startTimestampFrom: (attributeName: string) => wrapConsumeActionBuilder(_underlying.startTimestampFrom(attributeName))
});
