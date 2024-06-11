import { HttpDsl, HttpDsl as JvmHttpDsl } from "@gatling.io/jvm-types";
import {
  underlyingSessionTo,
  wrapCheckBuilderCaptureGroup,
  wrapCheckBuilderFind,
  wrapCheckBuilderMultipleFind,
  CheckBuilderCaptureGroup,
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
export const currentLocation = (): CheckBuilderFind<string> => wrapCheckBuilderFind(JvmHttpDsl.currentLocation());

export interface CurrentLocationRegexFunction {
  /**
   * Bootstrap a check that capture some <a
   * href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java Regular
   * Expression</a> capture groups on the response location, eg the landing url in a chain of
   * redirects
   *
   * @param pattern - the regular expression, expressed as a Gatling Expression Language String
   * @returns the next step in the check DSL
   */
  (pattern: string): CheckBuilderCaptureGroup;

  /**
   * Bootstrap a check that capture some <a
   * href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java Regular
   * Expression</a> capture groups on the response location, eg the landing url in a chain of
   * redirects
   *
   * @param pattern - the regular expression, expressed as a function
   * @returns the next step in the check DSL
   */
  (pattern: (session: Session) => string): CheckBuilderCaptureGroup;
}

export const currentLocationRegex: CurrentLocationRegexFunction = (pattern: Expression<string>) =>
  wrapCheckBuilderCaptureGroup(
    typeof pattern === "function"
      ? JvmHttpDsl.currentLocationRegex(underlyingSessionTo(pattern))
      : JvmHttpDsl.currentLocationRegex(pattern)
  );

export interface HeaderFunction {
  /**
   * Bootstrap a check that capture the value of a HTTP header
   *
   * @param name the name of the HTTP header, expressed as a Gatling Expression Language String
   * @return the next step in the check DSL
   */
  (name: string): CheckBuilderMultipleFind<string>;

  /**
   * Bootstrap a check that capture the value of a HTTP header
   *
   * @param name - the name of the HTTP header, expressed as a function
   * @returns the next step in the check DSL
   */
  (name: (session: Session) => string): CheckBuilderMultipleFind<string>;
}

export const header: HeaderFunction = (name: Expression<string>) =>
  wrapCheckBuilderMultipleFind(
    typeof name === "function" ? JvmHttpDsl.header(underlyingSessionTo(name)) : JvmHttpDsl.header(name)
  );

export interface HeaderRegexFunction {
  /**
   * Bootstrap a check that capture some <a
   * href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java Regular
   * Expression</a> capture groups on a response header
   *
   * @param name - the name of the HTTP header, expressed as a Gatling Expression Language String
   * @param pattern - the regular expression, expressed as a Gatling Expression Language String
   * @returns the next step in the check DSL
   */
  (name: string, pattern: string): CheckBuilderCaptureGroup;

  /**
   * Bootstrap a check that capture some <a
   * href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java Regular
   * Expression</a> capture groups on a response header
   *
   * @param name - the name of the HTTP header, expressed as a function
   * @param pattern - the regular expression, expressed as a Gatling Expression Language String
   * @returns the next step in the check DSL
   */
  (name: (session: Session) => string, pattern: string): CheckBuilderCaptureGroup;

  /**
   * Bootstrap a check that capture some <a
   * href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java Regular
   * Expression</a> capture groups on a response header
   *
   * @param name - the name of the HTTP header, expressed as a Gatling Expression Language String
   * @param pattern - the regular expression, expressed as a function
   * @returns the next step in the check DSL
   */
  (name: string, pattern: (session: Session) => string): CheckBuilderCaptureGroup;

  /**
   * Bootstrap a check that capture some <a
   * href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java Regular
   * Expression</a> capture groups on a response header
   *
   * @param name the name of the HTTP header, expressed as a function
   * @param pattern the regular expression, expressed as a function
   * @return the next step in the check DSL
   */
  (name: (session: Session) => string, pattern: (session: Session) => string): CheckBuilderCaptureGroup;
}

export const headerRegex: HeaderRegexFunction = (name: Expression<string>, pattern: Expression<string>) =>
  wrapCheckBuilderCaptureGroup(
    typeof name === "function"
      ? typeof pattern === "function"
        ? HttpDsl.headerRegex(underlyingSessionTo(name), underlyingSessionTo(pattern))
        : HttpDsl.headerRegex(underlyingSessionTo(name), pattern)
      : typeof pattern === "function"
        ? HttpDsl.headerRegex(name, underlyingSessionTo(pattern))
        : // FIXME forced to use the charsequence version
          HttpDsl.headerRegex(name, pattern)
  );

/**
 * Bootstrap a check that capture the response HTTP status code
 *
 * @returns the next step in the check DSL
 */
export const status = (): CheckBuilderFind<number> =>
  wrapCheckBuilderFind(JvmHttpDsl.status() as JvmCheckBuilderFind<number>);
