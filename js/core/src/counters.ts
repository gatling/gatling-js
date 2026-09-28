import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";
import JvmCounterBuilder = io.gatling.javaapi.core.CounterBuilder;

import { Wrapper } from "./common";

/**
 * Builder of an action that stores an incrementing value into the virtual users' Session.
 *
 * Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface CounterBuilder extends Wrapper<JvmCounterBuilder> {
  /**
   * Set the first value to be emitted. Must be positive. Default is 0.
   *
   * @param start - the first value
   * @returns a new CounterBuilder
   */
  startingAt(start: number): CounterBuilder;

  /**
   * Set the gap between 2 successive values. Default is 1.
   *
   * @param increment - the gap between 2 successive values
   * @returns a new CounterBuilder
   */
  withIncrement(increment: number): CounterBuilder;

  /**
   * Set the inclusive upper bound. Default is Integer.MAX_VALUE. Once it's reached, the load
   * generator is stopped, unless {@link wrapAround} is used.
   *
   * @param end - the inclusive upper bound
   * @returns a new CounterBuilder
   */
  upTo(end: number): CounterBuilder;

  /**
   * Start over from the first value once the upper bound is reached, instead of stopping the load
   * generator. Beware values are then no longer unique.
   *
   * @returns a new CounterBuilder
   */
  wrapAround(): CounterBuilder;

  /**
   * Track the counter independently for each virtual user, so they all get the very same sequence
   * of values, instead of sharing one single sequence.
   *
   * @returns a new CounterBuilder
   */
  perUser(): CounterBuilder;

  /**
   * Distribute the values evenly amongst all the load generators of a Gatling Enterprise cluster,
   * so they remain unique cluster wide. Only effective when the test is running with Gatling
   * Enterprise, noop otherwise. Each load generator only gets a slice of the range, so the values
   * emitted by the whole cluster have holes.
   *
   * @returns a new CounterBuilder
   */
  shard(): CounterBuilder;
}

const wrapCounterBuilder = (_underlying: JvmCounterBuilder): CounterBuilder => ({
  _underlying,
  startingAt: (start) => wrapCounterBuilder(_underlying.startingAt(start)),
  withIncrement: (increment) => wrapCounterBuilder(_underlying.withIncrement(increment)),
  upTo: (end) => wrapCounterBuilder(_underlying.upTo(end)),
  wrapAround: () => wrapCounterBuilder(_underlying.wrapAround()),
  perUser: () => wrapCounterBuilder(_underlying.perUser()),
  shard: () => wrapCounterBuilder(_underlying.shard())
});

/**
 * Bootstrap a builder for an action that stores an incrementing value into the virtual users' Session. Values are
 * shared amongst all the virtual users of this load generator, unless {@link CounterBuilder.perUser } is used.
 *
 * @param key - the name of the Session attribute the value is stored into
 * @returns a new CounterBuilder
 */
export const counter = (key: string): CounterBuilder => wrapCounterBuilder(JvmCoreDsl.counter(key));
