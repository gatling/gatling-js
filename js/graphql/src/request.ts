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

import JvmGraphQlDynamicRequestActionBuilder = io.gatling.javaapi.graphql.GraphQlDynamicRequestActionBuilder;
import JvmGraphQlRequestActionBuilder = io.gatling.javaapi.graphql.GraphQlRequestActionBuilder;
import JvmGraphQlRequestActionBuilderBase = io.gatling.javaapi.graphql.GraphQlRequestActionBuilderBase;

/**
 * Methods shared by the DSLs for building GraphQL operations sent over HTTP, whether their document
 * is known when the simulation is built or only at runtime
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 *
 * @typeParam T - the type of the builder
 */
export interface GraphQlRequestActionBuilderBase<T> extends WithVariables<T> {
  /**
   * Override the request name, defaults to "&lt;operation type&gt; &lt;operation name&gt;" for
   * documents known when the simulation is built, and to the name passed to dynamicDocument() for
   * dynamic ones
   *
   * @param name - the request name, expressed as a Gatling Expression Language String
   * @returns a new instance
   */
  requestName(name: string): T;

  /**
   * Override the request name, defaults to "&lt;operation type&gt; &lt;operation name&gt;" for
   * documents known when the simulation is built, and to the name passed to dynamicDocument() for
   * dynamic ones
   *
   * @param name - the request name, expressed as a function
   * @returns a new instance
   */
  requestName(name: (session: Session) => string): T;

  /**
   * Override the endpoint defined in the protocol configuration
   *
   * @param endpoint - the endpoint, expressed as a Gatling Expression Language String
   * @returns a new instance
   */
  endpoint(endpoint: string): T;

  /**
   * Override the endpoint defined in the protocol configuration
   *
   * @param endpoint - the endpoint, expressed as a function
   * @returns a new instance
   */
  endpoint(endpoint: (session: Session) => string): T;

  /**
   * Apply some checks
   *
   * @param checks - the checks
   * @returns a new instance
   */
  check(...checks: CheckBuilder[]): T;

  /**
   * Apply a function on the Session resulting from the checks
   *
   * @param postCheck - the function
   * @returns a new instance
   */
  postCheck(postCheck: SessionTransform): T;

  /**
   * Set a header
   *
   * @param name - the static header name
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new instance
   */
  header(name: string, value: string): T;

  /**
   * Set a header
   *
   * @param name - the static header name
   * @param value - the header value, expressed as a function
   * @returns a new instance
   */
  header(name: string, value: (session: Session) => string): T;

  /**
   * Set multiple headers
   *
   * @param headers - the headers, names are static but values are expressed as a Gatling Expression
   *     Language String
   * @returns a new instance
   */
  headers(headers: Record<string, string>): T;

  /**
   * Have this request ignored in the statistics
   *
   * @returns a new instance
   */
  silent(): T;

  /**
   * Force this request to be reported in the statistics, even if it would be considered silent otherwise
   *
   * @returns a new instance
   */
  notSilent(): T;

  /**
   * Ignore the checks defined in the GraphQL and HTTP protocol configurations
   *
   * @returns a new instance
   */
  ignoreProtocolChecks(): T;

  /**
   * Define a request timeout that overrides the one defined in gatling.conf
   *
   * @param timeout - the timeout, as a duration
   * @returns a new instance
   */
  requestTimeout(timeout: Duration): T;
}

export const graphQlRequestActionBuilderBaseImpl = <T, J extends JvmGraphQlRequestActionBuilderBase<J, any>>(
  jvmBuilder: J,
  wrap: (_underlying: J) => T
): GraphQlRequestActionBuilderBase<T> => ({
  ...withVariables(jvmBuilder, wrap),
  requestName: (name: Expression<string>): T =>
    wrap(typeof name === "function" ? jvmBuilder.requestName(underlyingSessionTo(name)) : jvmBuilder.requestName(name)),
  endpoint: (endpoint: Expression<string>): T =>
    wrap(
      typeof endpoint === "function"
        ? jvmBuilder.endpoint(underlyingSessionTo(endpoint))
        : jvmBuilder.endpoint(endpoint)
    ),
  check: (...checks: CheckBuilder[]): T => wrap(jvmBuilder.check(checks.map((c: CheckBuilder) => c._underlying))),
  postCheck: (postCheck: SessionTransform): T => wrap(jvmBuilder.postCheck(underlyingSessionTransform(postCheck))),
  header: (name: string, value: Expression<string>): T =>
    wrap(
      typeof value === "function" ? jvmBuilder.header(name, underlyingSessionTo(value)) : jvmBuilder.header(name, value)
    ),
  headers: (headers: Record<string, string>): T => wrap(jvmBuilder.headers(asJava(headers) as any)),
  silent: (): T => wrap(jvmBuilder.silent()),
  notSilent: (): T => wrap(jvmBuilder.notSilent()),
  ignoreProtocolChecks: (): T => wrap(jvmBuilder.ignoreProtocolChecks()),
  requestTimeout: (timeout: Duration): T => wrap(jvmBuilder.requestTimeout(toJvmDuration(timeout)))
});

/**
 * DSL for building GraphQL queries and mutations whose document is known when the simulation is
 * built, sent over HTTP
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface GraphQlRequestActionBuilder
  extends ActionBuilder, GraphQlRequestActionBuilderBase<GraphQlRequestActionBuilder> {
  /**
   * Select the operation to execute when the document contains multiple operations, sent as the
   * operationName of the request payload. Defaults to the name of the operation of the document, if
   * any.
   *
   * @param name - the static operation name
   * @returns a new GraphQlRequestActionBuilder instance
   */
  operationName(name: string): GraphQlRequestActionBuilder;

  /**
   * Send this query with a GET request, variables being passed as query parameters. Only
   * supported for queries, not with mutations or persisted queries.
   *
   * @returns a new GraphQlRequestActionBuilder instance
   */
  overGet(): GraphQlRequestActionBuilder;
}

export const wrapGraphQlRequestActionBuilder = (
  _underlying: JvmGraphQlRequestActionBuilder
): GraphQlRequestActionBuilder => ({
  _underlying,
  ...graphQlRequestActionBuilderBaseImpl(_underlying, wrapGraphQlRequestActionBuilder),
  operationName: (name: string) => wrapGraphQlRequestActionBuilder(_underlying.operationName(name)),
  overGet: () => wrapGraphQlRequestActionBuilder(_underlying.overGet())
});

/**
 * DSL for building GraphQL operations whose document is only known at runtime, sent over HTTP
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface GraphQlDynamicRequestActionBuilder
  extends ActionBuilder, GraphQlRequestActionBuilderBase<GraphQlDynamicRequestActionBuilder> {
  /**
   * Define the operation to execute, sent as the operationName of the request payload. Not sent by
   * default, as the document isn't parsed when the simulation is built, but required when the
   * document contains multiple operations.
   *
   * @param name - the operation name, expressed as a Gatling Expression Language String
   * @returns a new GraphQlDynamicRequestActionBuilder instance
   */
  operationName(name: string): GraphQlDynamicRequestActionBuilder;

  /**
   * Define the operation to execute, sent as the operationName of the request payload. Not sent by
   * default, as the document isn't parsed when the simulation is built, but required when the
   * document contains multiple operations.
   *
   * @param name - the operation name, expressed as a function
   * @returns a new GraphQlDynamicRequestActionBuilder instance
   */
  operationName(name: (session: Session) => string): GraphQlDynamicRequestActionBuilder;
}

export const wrapGraphQlDynamicRequestActionBuilder = (
  _underlying: JvmGraphQlDynamicRequestActionBuilder
): GraphQlDynamicRequestActionBuilder => ({
  _underlying,
  ...graphQlRequestActionBuilderBaseImpl(_underlying, wrapGraphQlDynamicRequestActionBuilder),
  operationName: (name: Expression<string>) =>
    wrapGraphQlDynamicRequestActionBuilder(
      typeof name === "function"
        ? _underlying.operationName(underlyingSessionTo(name))
        : _underlying.operationName(name)
    )
});
