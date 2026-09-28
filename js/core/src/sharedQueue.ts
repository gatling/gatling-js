import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";
import JvmSharedQueueBuilder = io.gatling.javaapi.core.SharedQueueBuilder;
import JvmSharedQueueTakeBuilder = io.gatling.javaapi.core.SharedQueueTakeBuilder;

import { Wrapper } from "./common";
import { ActionBuilder, wrapActionBuilder } from "./structure";
import { SessionTo, underlyingSessionTo } from "./session";
import { Duration, toJvmDuration } from "./utils/duration";

export interface SharedQueueBuilder extends Wrapper<JvmSharedQueueBuilder> {
  /**
   * Define an action that stores a value into this queue, then moves on without waiting.
   *
   * @param value - the value to be enqueued, expressed as a Gatling Expression Language String
   * @returns an ActionBuilder
   */
  put(value: string): ActionBuilder;

  /**
   * Define an action that stores a value into this queue, then moves on without waiting.
   *
   * @param value - the static value to be enqueued
   * @returns an ActionBuilder
   */
  put<T>(value: unknown): ActionBuilder;

  /**
   * Define an action that stores a value into this queue, then moves on without waiting.
   *
   * @param value - the value to be enqueued, expressed as a function
   * @returns an ActionBuilder
   */
  put(value: SessionTo<unknown>): ActionBuilder;

  /**
   * Define an action that pops the oldest value of this queue into the virtual user's Session. If
   * the queue is empty, the virtual user waits until a value is available, possibly forever unless
   * {@link SharedQueueTakeBuilder.timeout} is used.
   *
   * @param key - the name of the Session attribute the value is stored into
   * @returns a new SharedQueueTakeBuilder
   */
  take(key: string): SharedQueueTakeBuilder;

  /**
   * Define an action that pops the oldest value of this queue into the virtual user's Session. If
   * the queue is empty, the virtual user is marked as failed and moves on instead of waiting, and
   * the Session attribute is left untouched.
   *
   * @param key - the name of the Session attribute the value is stored into
   * @returns an ActionBuilder
   */
  poll(key: string): ActionBuilder;

  /**
   * Define an action that stores the current number of values in this queue into the virtual user's
   * Session.
   *
   * @param key - the name of the Session attribute the size is stored into
   * @returns an ActionBuilder
   */
  size(key: string): ActionBuilder;
}

/**
 * A factory of actions that exchange values over an in-memory queue, so virtual users can
 * communicate with each other.
 *
 * The queue is owned by this very instance, so it must be stored in a field that's then used
 * everywhere the queue must be accessed.
 *
 * The queue is local to this load generator: when running a distributed test with Gatling
 * Enterprise, each load generator has its own queue and they don't exchange values with each other.
 */
const wrapSharedQueueBuilder = (_underlying: JvmSharedQueueBuilder): SharedQueueBuilder => ({
  _underlying,
  put: (value: string | unknown | SessionTo<unknown>) =>
    wrapActionBuilder(
      typeof value === "function"
        ? _underlying.put(underlyingSessionTo<unknown>(value as SessionTo<unknown>))
        : _underlying.put(value)
    ),
  take: (key) => wrapSharedQueueTakeBuilder(_underlying.take(key)),
  poll: (key) => wrapActionBuilder(_underlying.poll(key)),
  size: (key) => wrapActionBuilder(_underlying.size(key))
});

/**
 * Builder of an action that pops the oldest value of a queue into the virtual user's Session,
 * waiting for one to be available if the queue is empty.
 *
 * Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface SharedQueueTakeBuilder extends Wrapper<JvmSharedQueueTakeBuilder> {
  /**
   * Give up after the given duration instead of waiting forever. The virtual user is then marked as
   * failed and moves on, and the Session attribute is left untouched.
   *
   * Timeouts are only meant to avoid stalling virtual users forever, so they're best effort:
   * expired virtual users are released periodically, hence they can wait up to one extra second.
   *
   * @param timeout - the maximum duration the virtual user waits for a value
   * @returns a new SharedQueueTakeBuilder
   */
  timeout(timeout: Duration): SharedQueueTakeBuilder;
}

const wrapSharedQueueTakeBuilder = (_underlying: JvmSharedQueueTakeBuilder): SharedQueueTakeBuilder => ({
  _underlying,
  timeout: (timeout) => wrapSharedQueueTakeBuilder(_underlying.timeout(toJvmDuration(timeout)))
});

/**
 * Bootstrap a factory of actions that exchange values over an in-memory queue, so virtual users
 * can communicate with each other.
 *
 * The queue is owned by the returned instance, so it must be stored in a field that's then
 * used everywhere the queue must be accessed.
 *
 * The queue is local to this load generator: when running a distributed test with Gatling
 * Enterprise, each load generator has its own queue and they don't exchange values with each
 * other.
 *
 * @param name - the name of the queue, only used for logging
 * @returns a new SharedQueueBuilder
 */
export const sharedQueue = (name: string): SharedQueueBuilder => wrapSharedQueueBuilder(JvmCoreDsl.sharedQueue(name));
