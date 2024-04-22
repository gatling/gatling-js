import { HttpDsl as JvmHttpDsl } from "@gatling.io/jvm-types";
import {
  underlyingSessionTo,
  wrapCallback,
  wrapCheckBuilderFind,
  wrapCheckBuilderMultipleFind,
  CheckBuilderFind,
  CheckBuilderMultipleFind,
  Expression,
  Session
} from "@gatling.io/core";

import JvmCheckBuilderFind = io.gatling.javaapi.core.CheckBuilder$Find;

/**
 * Bootstrap a check that capture the response location, eg the landing url in a chain of
 * redirects
 *
 * @returns the next step in the check DSL
 */
export const currentLocation = (): CheckBuilderFind<string> =>
  wrapCheckBuilderFind(JvmHttpDsl.currentLocation())

// currentLocationRegex

// header
// headerRegex

/**
 * Bootstrap a check that capture the response HTTP status code
 *
 * @returns the next step in the check DSL
 */
export const status = (): CheckBuilderFind<number> =>
  wrapCheckBuilderFind(JvmHttpDsl.status() as JvmCheckBuilderFind<number>);
