import { HttpDsl as JvmHttpDsl } from "@gatling.io/jvm-types";
import JvmPolling = io.gatling.javaapi.http.Polling;
import JvmPollingEvery = io.gatling.javaapi.http.Polling$Every;

import { ActionBuilder, Duration, wrapActionBuilder, toJvmDuration } from "@gatling.io/core";

import { HttpRequestActionBuilder } from "./request";

/** The prefix to bootstrap polling specific DSL */
export const poll = (): Polling => wrapPolling(JvmHttpDsl.poll());

/**
 * DSL for building HTTP polling configurations
 *
 * Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface Polling {
  /**
   * Define a custom poller name so multiple pollers for the same virtual users don't conflict
   *
   * @param pollerName - the name
   * @returns the next DSL step
   */
  pollerName(pollerName: string): Polling;

  /**
   * Define the polling period
   *
   * @param period - the period
   * @returns the next DSL step
   */
  every(period: Duration): PollingEvery;

  /**
   * Stop polling
   *
   * @returns an ActionBuilder
   */
  stop(): ActionBuilder;
}

const wrapPolling = (_underlying: JvmPolling): Polling => ({
  pollerName: (pollerName) => wrapPolling(_underlying.pollerName(pollerName)),
  every: (period) => wrapPollingEvery(_underlying.every(toJvmDuration(period))),
  stop: () => wrapActionBuilder(_underlying.stop())
});

export interface PollingEvery {
  /**
   * Define the polling request
   *
   * @returns an ActionBuilder
   */
  exec(requestBuilder: HttpRequestActionBuilder): ActionBuilder;
}

const wrapPollingEvery = (_underlying: JvmPollingEvery): PollingEvery => ({
  exec: (requestBuilder) => wrapActionBuilder(_underlying.exec(requestBuilder._underlying))
});
