import {
  ActionBuilder,
  CheckBuilder,
  Duration,
  Expression,
  Session,
  SessionTransform,
  asJava,
  toJvmDuration,
  underlyingSessionTo,
  underlyingSessionTransform
} from "@gatling.io/core";

import { WithVariables, withVariables } from "./variables";

import JvmGraphQlRequestActionBuilder = io.gatling.javaapi.graphql.GraphQlRequestActionBuilder;

/**
 * DSL for building GraphQL queries and mutations, sent over HTTP
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface GraphQlRequestActionBuilder extends ActionBuilder, WithVariables<GraphQlRequestActionBuilder> {
  /**
   * Override the request name, defaults to "&lt;operation type&gt; &lt;operation name&gt;"
   *
   * @param name - the request name, expressed as a Gatling Expression Language String
   * @returns a new GraphQlRequestActionBuilder instance
   */
  requestName(name: string): GraphQlRequestActionBuilder;

  /**
   * Override the request name, defaults to "&lt;operation type&gt; &lt;operation name&gt;"
   *
   * @param name - the request name, expressed as a function
   * @returns a new GraphQlRequestActionBuilder instance
   */
  requestName(name: (session: Session) => string): GraphQlRequestActionBuilder;

  /**
   * Override the endpoint defined in the protocol configuration
   *
   * @param endpoint - the endpoint, expressed as a Gatling Expression Language String
   * @returns a new GraphQlRequestActionBuilder instance
   */
  endpoint(endpoint: string): GraphQlRequestActionBuilder;

  /**
   * Override the endpoint defined in the protocol configuration
   *
   * @param endpoint - the endpoint, expressed as a function
   * @returns a new GraphQlRequestActionBuilder instance
   */
  endpoint(endpoint: (session: Session) => string): GraphQlRequestActionBuilder;

  /**
   * Send this query with a GET request, variables being passed as query parameters. Only
   * supported for queries with a known document, not with mutations, dynamic documents or persisted
   * queries.
   *
   * @returns a new GraphQlRequestActionBuilder instance
   */
  overGet(): GraphQlRequestActionBuilder;

  /**
   * Apply some checks
   *
   * @param checks - the checks
   * @returns a new GraphQlRequestActionBuilder instance
   */
  check(...checks: CheckBuilder[]): GraphQlRequestActionBuilder;

  /**
   * Apply a function on the Session resulting from the checks
   *
   * @param postCheck - the function
   * @returns a new GraphQlRequestActionBuilder instance
   */
  postCheck(postCheck: SessionTransform): GraphQlRequestActionBuilder;

  /**
   * Set a header
   *
   * @param name - the static header name
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new GraphQlRequestActionBuilder instance
   */
  header(name: string, value: string): GraphQlRequestActionBuilder;

  /**
   * Set a header
   *
   * @param name - the static header name
   * @param value - the header value, expressed as a function
   * @returns a new GraphQlRequestActionBuilder instance
   */
  header(name: string, value: (session: Session) => string): GraphQlRequestActionBuilder;

  /**
   * Set multiple headers
   *
   * @param headers - the headers, names are static but values are expressed as a Gatling Expression
   *     Language String
   * @returns a new GraphQlRequestActionBuilder instance
   */
  headers(headers: Record<string, string>): GraphQlRequestActionBuilder;

  /**
   * Have this request ignored in the statistics
   *
   * @returns a new GraphQlRequestActionBuilder instance
   */
  silent(): GraphQlRequestActionBuilder;

  /**
   * Force this request to be reported in the statistics, even if it would be considered silent otherwise
   *
   * @returns a new GraphQlRequestActionBuilder instance
   */
  notSilent(): GraphQlRequestActionBuilder;

  /**
   * Ignore the checks defined in the GraphQL and HTTP protocol configurations
   *
   * @returns a new GraphQlRequestActionBuilder instance
   */
  ignoreProtocolChecks(): GraphQlRequestActionBuilder;

  /**
   * Define a request timeout that overrides the one defined in gatling.conf
   *
   * @param timeout - the timeout, as a duration
   * @returns a new GraphQlRequestActionBuilder instance
   */
  requestTimeout(timeout: Duration): GraphQlRequestActionBuilder;
}

export const wrapGraphQlRequestActionBuilder = (
  _underlying: JvmGraphQlRequestActionBuilder
): GraphQlRequestActionBuilder => ({
  _underlying,
  ...withVariables(_underlying, wrapGraphQlRequestActionBuilder),
  requestName: (name: Expression<string>) =>
    wrapGraphQlRequestActionBuilder(
      typeof name === "function" ? _underlying.requestName(underlyingSessionTo(name)) : _underlying.requestName(name)
    ),
  endpoint: (endpoint: Expression<string>) =>
    wrapGraphQlRequestActionBuilder(
      typeof endpoint === "function"
        ? _underlying.endpoint(underlyingSessionTo(endpoint))
        : _underlying.endpoint(endpoint)
    ),
  overGet: () => wrapGraphQlRequestActionBuilder(_underlying.overGet()),
  check: (...checks: CheckBuilder[]) =>
    wrapGraphQlRequestActionBuilder(_underlying.check(checks.map((c: CheckBuilder) => c._underlying))),
  postCheck: (postCheck: SessionTransform) =>
    wrapGraphQlRequestActionBuilder(_underlying.postCheck(underlyingSessionTransform(postCheck))),
  header: (name: string, value: Expression<string>) =>
    wrapGraphQlRequestActionBuilder(
      typeof value === "function"
        ? _underlying.header(name, underlyingSessionTo(value))
        : _underlying.header(name, value)
    ),
  headers: (headers: Record<string, string>) =>
    wrapGraphQlRequestActionBuilder(_underlying.headers(asJava(headers) as any)),
  silent: () => wrapGraphQlRequestActionBuilder(_underlying.silent()),
  notSilent: () => wrapGraphQlRequestActionBuilder(_underlying.notSilent()),
  ignoreProtocolChecks: () => wrapGraphQlRequestActionBuilder(_underlying.ignoreProtocolChecks()),
  requestTimeout: (timeout: Duration) =>
    wrapGraphQlRequestActionBuilder(_underlying.requestTimeout(toJvmDuration(timeout)))
});
