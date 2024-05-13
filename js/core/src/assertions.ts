import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { Wrapper } from "./common";

import JvmAssertion = io.gatling.javaapi.core.Assertion;
import JvmAssertionWithPath = io.gatling.javaapi.core.Assertion$WithPath;
import JvmAssertionWithPathAndTarget = io.gatling.javaapi.core.Assertion$WithPathAndTarget;
import JvmAssertionWithPathAndCountMetric = io.gatling.javaapi.core.Assertion$WithPathAndCountMetric;
import JvmAssertionWithPathAndTimeMetric = io.gatling.javaapi.core.Assertion$WithPathAndTimeMetric;

/**
 * Bootstrap a new global assertion that targets stats aggregated on all requests
 *
 * @returns the next DSL step
 */
export const global = (): AssertionWithPath => wrapAssertionWithPath(JvmCoreDsl.global());

/**
 * Bootstrap a new forAll assertion that targets stats on each individual request type
 *
 * @returns the next DSL step
 */
export const forAll = (): AssertionWithPath => wrapAssertionWithPath(JvmCoreDsl.forAll());

/**
 * Bootstrap a new details assertion that targets stats on a specific request type
 *
 * @returns the next DSL step
 */
export const details = (...parts: string[]): AssertionWithPath => wrapAssertionWithPath(JvmCoreDsl.details(...parts));

/**
 * Step 2 of the Assertion DSL (path defined). Immutable, so all methods return a new occurrence
 * and leave the original unmodified.
 */
export interface AssertionWithPath {
  /**
   * Specify the Assertion targets the response time metric
   *
   * @returns the next Assertion DSL step
   */
  responseTime(): AssertionWithPathAndTimeMetric;

  /**
   * Specify the Assertion targets the all requests count metric
   *
   * @returns the next Assertion DSL step
   */
  allRequests(): AssertionWithPathAndCountMetric;

  /**
   * Specify the Assertion targets the failed requests count metric
   *
   * @returns the next Assertion DSL step
   */
  failedRequests(): AssertionWithPathAndCountMetric;

  /**
   * Specify the Assertion targets the successful requests count metric
   *
   * @returns the next Assertion DSL step
   */
  successfulRequests(): AssertionWithPathAndCountMetric;

  /**
   * Specify the Assertion targets the requests/s metric
   *
   * @returns the next Assertion DSL step
   */
  requestsPerSec(): AssertionWithPathAndTarget;
}

const wrapAssertionWithPath = (_underlying: JvmAssertionWithPath): AssertionWithPath => ({
  responseTime: () => wrapAssertionWithPathAndTimeMetric(_underlying.responseTime()),
  allRequests: () => wrapAssertionWithPathAndCountMetric(_underlying.allRequests()),
  failedRequests: () => wrapAssertionWithPathAndCountMetric(_underlying.failedRequests()),
  successfulRequests: () => wrapAssertionWithPathAndCountMetric(_underlying.successfulRequests()),
  requestsPerSec: () => wrapAssertionWithPathAndTarget(_underlying.requestsPerSec())
});

/**
 * Step 3 of the Assertion DSL (path and time metric defined). Immutable, so all methods return a
 * new occurrence and leave the original unmodified.
 */
export interface AssertionWithPathAndTimeMetric {
  /**
   * Specify the Assertion targets the min value metric
   *
   * @returns the next Assertion DSL step (condition in the next step must be specified with integer values only)
   */
  min(): AssertionWithPathAndTarget;

  /**
   * Specify the Assertion targets the max value metric
   *
   * @returns the next Assertion DSL step (condition in the next step must be specified with integer values only)
   */
  max(): AssertionWithPathAndTarget;

  /**
   * Specify the Assertion targets the mean value metric
   *
   * @returns the next Assertion DSL step (condition in the next step must be specified with integer values only)
   */
  mean(): AssertionWithPathAndTarget;

  /**
   * Specify the Assertion targets the standard deviation metric
   *
   * @returns the next Assertion DSL step (condition in the next step must be specified with integer values only)
   */
  stdDev(): AssertionWithPathAndTarget;

  /**
   * Specify the Assertion targets the percentile1 metric, as defined in gatling.conf
   *
   * @returns the next Assertion DSL step (condition in the next step must be specified with integer values only)
   */
  percentile1(): AssertionWithPathAndTarget;

  /**
   * Specify the Assertion targets the percentile2 metric, as defined in gatling.conf
   *
   * @returns the next Assertion DSL step (condition in the next step must be specified with integer values only)
   */
  percentile2(): AssertionWithPathAndTarget;

  /**
   * Specify the Assertion targets the percentile3 metric, as defined in gatling.conf
   *
   * @returns the next Assertion DSL step
   */
  percentile3(): AssertionWithPathAndTarget;

  /**
   * Specify the Assertion targets the percentile4 metric, as defined in gatling.conf
   *
   * @returns the next Assertion DSL step (condition in the next step must be specified with integer values only)
   */
  percentile4(): AssertionWithPathAndTarget;

  /**
   * Specify the Assertion targets the given percentile metric
   *
   * @param value - the value of targeted percentile, between 0 and 100)
   * @returns the next Assertion DSL step (condition in the next step must be specified with integer values only)
   */
  percentile(value: number): AssertionWithPathAndTarget;
}

const wrapAssertionWithPathAndTimeMetric = (
  _underlying: JvmAssertionWithPathAndTimeMetric
): AssertionWithPathAndTimeMetric => ({
  min: () => wrapAssertionWithPathAndTarget(_underlying.min()),
  max: () => wrapAssertionWithPathAndTarget(_underlying.max()),
  mean: () => wrapAssertionWithPathAndTarget(_underlying.mean()),
  stdDev: () => wrapAssertionWithPathAndTarget(_underlying.stdDev()),
  percentile1: () => wrapAssertionWithPathAndTarget(_underlying.percentile1()),
  percentile2: () => wrapAssertionWithPathAndTarget(_underlying.percentile2()),
  percentile3: () => wrapAssertionWithPathAndTarget(_underlying.percentile3()),
  percentile4: () => wrapAssertionWithPathAndTarget(_underlying.percentile4()),
  percentile: (value: number) => wrapAssertionWithPathAndTarget(_underlying.percentile(value))
});

/**
 * Step 3 of the Assertion DSL (path and count metric defined). Immutable, so all methods return a
 * new occurrence and leave the original unmodified.
 */
export interface AssertionWithPathAndCountMetric {
  /**
   * Specify the Assertion targets the count metric
   *
   * @returns the next Assertion DSL step (condition in the next step must be specified with integer values only)
   */
  count(): AssertionWithPathAndTarget;

  /**
   * Specify the Assertion targets the percentage of total executions metric
   *
   * @returns the next Assertion DSL step (condition in the next step can be specified with a floating point value)
   */
  percent(): AssertionWithPathAndTarget;
}

const wrapAssertionWithPathAndCountMetric = (
  _underlying: JvmAssertionWithPathAndCountMetric
): AssertionWithPathAndCountMetric => ({
  count: () => wrapAssertionWithPathAndTarget(_underlying.count()),
  percent: () => wrapAssertionWithPathAndTarget(_underlying.percent())
});

/**
 * Step 4 of the Assertion DSL (path and target defined). Immutable, so all methods return a new
 * occurrence and leave the original unmodified.
 */
export interface AssertionWithPathAndTarget {
  /**
   * Specify the metric must be strictly less than the expected value
   *
   * @param value - the value
   * @returns a complete Assertion
   */
  lt(value: number): Assertion;

  /**
   * Specify the metric must be less than or equal to the expected value
   *
   * @param value - the value
   * @returns a complete Assertion
   */
  lte(value: number): Assertion;

  /**
   * Specify the metric must be strictly greater than the expected value
   *
   * @param value - the value
   * @returns a complete Assertion
   */
  gt(value: number): Assertion;

  /**
   * Specify the metric must be greater than or equal to the expected value
   *
   * @param value - the value
   * @returns a complete Assertion
   */
  gte(value: number): Assertion;

  /**
   * Specify the metric must be included in the given range
   *
   * @param min - the min, included
   * @param max - the max, included
   * @param inclusive - if bounds must be included in the range
   * @returns a complete Assertion
   */
  between(min: number, max: number, inclusive?: boolean): Assertion;

  /**
   * Specify the metric must be included in a range defined around a mean value with a half range
   * expressed as an absolute value
   *
   * @param mean - the mean of the range
   * @param plusOrMinus - the range half width
   * @param inclusive - if bounds must be included in the range
   * @returns a complete Assertion
   */
  around(mean: number, plusOrMinus: number, inclusive?: boolean): Assertion;

  /**
   * Specify the metric must be included in a range defined around a mean value with a half range
   * expressed as an percentage of the mean value
   *
   * @param mean - the mean of the range
   * @param percentDeviation - the range half width expressed as a percent of the mean
   * @param inclusive - if bounds must be included in the range
   * @returns a complete Assertion
   */
  deviatesAround(mean: number, percentDeviation: number, inclusive?: boolean): Assertion;

  /**
   * Specify the metric must be equal to an expected value
   *
   * @param value - the expected value
   * @returns a complete Assertion
   */
  is(value: number): Assertion;

  /**
   * Specify the metric must be included in a set of values
   *
   * @param values - the expected values
   * @returns a complete Assertion
   */
  in(...values: number[]): Assertion;
}

const wrapAssertionWithPathAndTarget = (
  _underlying: JvmAssertionWithPathAndTarget<unknown>
): AssertionWithPathAndTarget => ({
  lt: (value) => wrapAssertion(_underlying.lt(value)),
  lte: (value) => wrapAssertion(_underlying.lte(value)),
  gt: (value) => wrapAssertion(_underlying.gt(value)),
  gte: (value) => wrapAssertion(_underlying.gte(value)),
  between: (min, max, inclusive) =>
    wrapAssertion(inclusive !== undefined ? _underlying.between(min, max, inclusive) : _underlying.between(min, max)),
  around: (mean, plusOrMinus, inclusive) =>
    wrapAssertion(
      inclusive !== undefined ? _underlying.around(mean, plusOrMinus, inclusive) : _underlying.around(mean, plusOrMinus)
    ),
  deviatesAround: (mean, percentDeviation, inclusive) =>
    wrapAssertion(
      inclusive !== undefined
        ? _underlying.deviatesAround(mean, percentDeviation, inclusive)
        : _underlying.deviatesAround(mean, percentDeviation)
    ),
  is: (value) => wrapAssertion(_underlying.is(value)),
  in: (...values) => wrapAssertion(_underlying.in(values))
});

export interface Assertion extends Wrapper<JvmAssertion> {}

const wrapAssertion = (_underlying: JvmAssertion): Assertion => ({
  _underlying
});
