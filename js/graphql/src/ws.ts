import {
  ActionBuilder,
  CheckBuilder,
  Duration,
  Session,
  SessionTo,
  SessionTransform,
  Wrapper,
  asJava,
  isSessionTo,
  toJvmDuration,
  underlyingSessionToJava,
  underlyingSessionTransform,
  wrapActionBuilder
} from "@gatling.io/core";

import { GraphQlJsonScope, wrapGraphQlJsonScope } from "./jsonScope";
import { WithVariables, withVariables } from "./variables";

import JvmGraphQlWs = io.gatling.javaapi.graphql.GraphQlWs;
import JvmGraphQlWsConnectActionBuilder = io.gatling.javaapi.graphql.GraphQlWsConnectActionBuilder;
import JvmGraphQlWsNextCheck = io.gatling.javaapi.graphql.GraphQlWsNextCheck;
import JvmGraphQlWsSubscribeActionBuilder = io.gatling.javaapi.graphql.GraphQlWsSubscribeActionBuilder;
import JvmGraphQlWsSubscribeActionBuilderAwait = io.gatling.javaapi.graphql.GraphQlWsSubscribeActionBuilder$Await;
import JvmGraphQlWsUnsubscribeActionBuilder = io.gatling.javaapi.graphql.GraphQlWsUnsubscribeActionBuilder;

/**
 * DSL for building actions that open a GraphQL WebSocket and perform the
 * connection_init/connection_ack handshake
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface GraphQlWsConnectActionBuilder extends ActionBuilder {
  /**
   * Override the request name
   *
   * @param name - the request name, expressed as a Gatling Expression Language String
   * @returns a new GraphQlWsConnectActionBuilder instance
   */
  requestName(name: string): GraphQlWsConnectActionBuilder;

  /**
   * Override the wsEndpoint defined in the protocol configuration
   *
   * @param endpoint - the endpoint, expressed as a Gatling Expression Language String
   * @returns a new GraphQlWsConnectActionBuilder instance
   */
  endpoint(endpoint: string): GraphQlWsConnectActionBuilder;

  /**
   * Set an entry of the connection_init payload, typically for passing credentials
   *
   * @param name - the entry name
   * @param value - the entry value, expressed as a Gatling Expression Language String
   * @returns a new GraphQlWsConnectActionBuilder instance
   */
  connectionInitPayload(name: string, value: string): GraphQlWsConnectActionBuilder;

  /**
   * Set an entry of the connection_init payload, typically for passing credentials
   *
   * @param name - the entry name
   * @param value - the entry value, expressed as a function
   * @returns a new GraphQlWsConnectActionBuilder instance
   */
  connectionInitPayload(name: string, value: (session: Session) => any): GraphQlWsConnectActionBuilder;

  /**
   * Set an entry of the connection_init payload, typically for passing credentials
   *
   * @param name - the entry name
   * @param value - the static entry value, such as a number, a boolean, an array or an object
   * @returns a new GraphQlWsConnectActionBuilder instance
   */
  connectionInitPayload(name: string, value: any): GraphQlWsConnectActionBuilder;

  /**
   * Set multiple entries of the connection_init payload
   *
   * @param payload - the entries, expressed as a function
   * @returns a new GraphQlWsConnectActionBuilder instance
   */
  connectionInitPayload(payload: (session: Session) => Record<string, any>): GraphQlWsConnectActionBuilder;

  /**
   * Set multiple entries of the connection_init payload
   *
   * @param payload - the static entries, use a function for dynamic values
   * @returns a new GraphQlWsConnectActionBuilder instance
   */
  connectionInitPayload(payload: Record<string, any>): GraphQlWsConnectActionBuilder;

  /**
   * Set the whole connection_init payload as a JSON object
   *
   * @param json - the payload JSON object, expressed as a Gatling Expression Language String
   * @returns a new GraphQlWsConnectActionBuilder instance
   */
  connectionInitPayloadJson(json: string): GraphQlWsConnectActionBuilder;

  /**
   * Define the timeout for receiving the connection_ack message, defaults to 10 seconds
   *
   * @param timeout - the timeout, as a duration
   * @returns a new GraphQlWsConnectActionBuilder instance
   */
  ackTimeout(timeout: Duration): GraphQlWsConnectActionBuilder;
}

const toJavaExpression = (value: any): any =>
  isSessionTo(value) ? underlyingSessionToJava(value as SessionTo<any>) : asJava(value);

export const wrapGraphQlWsConnectActionBuilder = (
  _underlying: JvmGraphQlWsConnectActionBuilder
): GraphQlWsConnectActionBuilder => ({
  _underlying,
  requestName: (name: string) => wrapGraphQlWsConnectActionBuilder(_underlying.requestName(name)),
  endpoint: (endpoint: string) => wrapGraphQlWsConnectActionBuilder(_underlying.endpoint(endpoint)),
  connectionInitPayload: (nameOrPayload: any, value?: any) =>
    wrapGraphQlWsConnectActionBuilder(
      typeof nameOrPayload === "string"
        ? _underlying.connectionInitPayload(nameOrPayload, toJavaExpression(value))
        : isSessionTo(nameOrPayload)
          ? // a JS function is applicable to both connectionInitPayload(Map) and connectionInitPayload(Function), so select the overload explicitly
            (_underlying as any)["connectionInitPayload(java.util.function.Function)"](
              underlyingSessionToJava(nameOrPayload)
            )
          : _underlying.connectionInitPayload(asJava(nameOrPayload) as any)
    ),
  connectionInitPayloadJson: (json: string) =>
    wrapGraphQlWsConnectActionBuilder(_underlying.connectionInitPayloadJson(json)),
  ackTimeout: (timeout: Duration) => wrapGraphQlWsConnectActionBuilder(_underlying.ackTimeout(toJvmDuration(timeout)))
});

/**
 * DSL for building checks on GraphQL subscription "next" messages
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface GraphQlWsNextCheck extends Wrapper<JvmGraphQlWsNextCheck> {
  /**
   * Apply some checks
   *
   * @param checks - the checks
   * @returns a new GraphQlWsNextCheck instance
   */
  check(...checks: CheckBuilder[]): GraphQlWsNextCheck;

  /**
   * Apply a function on the Session resulting from the checks
   *
   * @param postCheck - the function
   * @returns a new GraphQlWsNextCheck instance
   */
  postCheck(postCheck: SessionTransform): GraphQlWsNextCheck;

  /**
   * Have this check ignored in the statistics
   *
   * @returns a new GraphQlWsNextCheck instance
   */
  silent(): GraphQlWsNextCheck;
}

export const wrapGraphQlWsNextCheck = (_underlying: JvmGraphQlWsNextCheck): GraphQlWsNextCheck => ({
  _underlying,
  check: (...checks: CheckBuilder[]) =>
    wrapGraphQlWsNextCheck(_underlying.check(checks.map((c: CheckBuilder) => c._underlying))),
  postCheck: (postCheck: SessionTransform) =>
    wrapGraphQlWsNextCheck(_underlying.postCheck(underlyingSessionTransform(postCheck))),
  silent: () => wrapGraphQlWsNextCheck(_underlying.silent())
});

export namespace GraphQlWsSubscribeActionBuilder {
  export interface Await {
    /**
     * Define the checks to apply on the next messages, one message per check
     *
     * @param checks - the checks
     * @returns a new GraphQlWsSubscribeActionBuilder instance
     */
    on(...checks: GraphQlWsNextCheck[]): GraphQlWsSubscribeActionBuilder;
  }

  export const wrapAwait = (_underlying: JvmGraphQlWsSubscribeActionBuilderAwait): Await => ({
    on: (...checks: GraphQlWsNextCheck[]) =>
      wrapGraphQlWsSubscribeActionBuilder(_underlying.on(checks.map((c: GraphQlWsNextCheck) => c._underlying)))
  });
}

/**
 * DSL for building actions that start a GraphQL subscription
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface GraphQlWsSubscribeActionBuilder extends ActionBuilder, WithVariables<GraphQlWsSubscribeActionBuilder> {
  /**
   * Override the request name
   *
   * @param name - the request name, expressed as a Gatling Expression Language String
   * @returns a new GraphQlWsSubscribeActionBuilder instance
   */
  requestName(name: string): GraphQlWsSubscribeActionBuilder;

  /**
   * Select the operation to execute when the document contains multiple operations, sent as the
   * operationName of the subscribe message payload. Defaults to the name of the operation of the
   * document, if any.
   *
   * @param name - the static operation name
   * @returns a new GraphQlWsSubscribeActionBuilder instance
   */
  operationName(name: string): GraphQlWsSubscribeActionBuilder;

  /**
   * Define the name of the subscription, used as the subscription id and to unsubscribe
   *
   * @param name - the subscription name, expressed as a Gatling Expression Language String
   * @returns a new GraphQlWsSubscribeActionBuilder instance
   */
  subscriptionName(name: string): GraphQlWsSubscribeActionBuilder;

  /**
   * Wait for some messages, the checks are passed in the next step
   *
   * @param timeout - the timeout, as a duration
   * @returns the next DSL step
   */
  await(timeout: Duration): GraphQlWsSubscribeActionBuilder.Await;

  /**
   * Wait for some additional messages, each with its own timeout, with no checks
   *
   * @param timeout - the timeout for each message, as a duration
   * @param count - the number of messages
   * @returns a new GraphQlWsSubscribeActionBuilder instance
   */
  awaitNext(timeout: Duration, count: number): GraphQlWsSubscribeActionBuilder;
}

export const wrapGraphQlWsSubscribeActionBuilder = (
  _underlying: JvmGraphQlWsSubscribeActionBuilder
): GraphQlWsSubscribeActionBuilder => ({
  _underlying,
  ...withVariables(_underlying, wrapGraphQlWsSubscribeActionBuilder),
  requestName: (name: string) => wrapGraphQlWsSubscribeActionBuilder(_underlying.requestName(name)),
  operationName: (name: string) => wrapGraphQlWsSubscribeActionBuilder(_underlying.operationName(name)),
  subscriptionName: (name: string) => wrapGraphQlWsSubscribeActionBuilder(_underlying.subscriptionName(name)),
  await: (timeout: Duration) => GraphQlWsSubscribeActionBuilder.wrapAwait(_underlying.await(toJvmDuration(timeout))),
  awaitNext: (timeout: Duration, count: number) =>
    wrapGraphQlWsSubscribeActionBuilder(_underlying.awaitNext(toJvmDuration(timeout), count))
});

/**
 * DSL for building actions that complete a GraphQL subscription
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface GraphQlWsUnsubscribeActionBuilder extends ActionBuilder {
  /**
   * Override the request name, defaults to "subscription &lt;name&gt; complete"
   *
   * @param name - the request name, expressed as a Gatling Expression Language String
   * @returns a new GraphQlWsUnsubscribeActionBuilder instance
   */
  requestName(name: string): GraphQlWsUnsubscribeActionBuilder;
}

export const wrapGraphQlWsUnsubscribeActionBuilder = (
  _underlying: JvmGraphQlWsUnsubscribeActionBuilder
): GraphQlWsUnsubscribeActionBuilder => ({
  _underlying,
  requestName: (name: string) => wrapGraphQlWsUnsubscribeActionBuilder(_underlying.requestName(name))
});

/**
 * The entrypoint of the GraphQL subscriptions DSL, using the graphql-transport-ws protocol
 */
export interface GraphQlWs {
  /**
   * Scope for checks on the data of the "next" messages
   */
  data: GraphQlJsonScope;

  /**
   * Scope for checks on the errors of the "next" messages
   */
  errors: GraphQlJsonScope;

  /**
   * Bootstrap an action that opens a WebSocket and performs the connection_init/connection_ack handshake
   *
   * @returns the next DSL step
   */
  connect(): GraphQlWsConnectActionBuilder;

  /**
   * Bootstrap an action that starts a subscription
   *
   * @param document - the subscription document
   * @returns the next DSL step
   */
  subscribe(document: string): GraphQlWsSubscribeActionBuilder;

  /**
   * Bootstrap an action that starts a subscription whose document is loaded from a file
   *
   * @param filePath - the path of the file, in the resources folder
   * @returns the next DSL step
   */
  subscribeFile(filePath: string): GraphQlWsSubscribeActionBuilder;

  /**
   * Bootstrap an action that completes a subscription
   *
   * @param subscriptionName - the name of the subscription, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  unsubscribe(subscriptionName: string): GraphQlWsUnsubscribeActionBuilder;

  /**
   * Bootstrap an action that closes the WebSocket
   *
   * @returns an ActionBuilder
   */
  close(): ActionBuilder;

  /**
   * Bootstrap a check on the next message
   *
   * @returns the next DSL step
   */
  checkNext(): GraphQlWsNextCheck;

  /**
   * Bootstrap a check on the next message
   *
   * @param name - the name of the check, used for reporting
   * @returns the next DSL step
   */
  checkNext(name: string): GraphQlWsNextCheck;
}

export const wrapGraphQlWs = (jvmGraphQlWs: JvmGraphQlWs): GraphQlWs => ({
  // fields aren't generated by java2ts
  data: wrapGraphQlJsonScope((jvmGraphQlWs as any).data),
  errors: wrapGraphQlJsonScope((jvmGraphQlWs as any).errors),
  connect: () => wrapGraphQlWsConnectActionBuilder(jvmGraphQlWs.connect()),
  subscribe: (document: string) => wrapGraphQlWsSubscribeActionBuilder(jvmGraphQlWs.subscribe(document)),
  subscribeFile: (filePath: string) => wrapGraphQlWsSubscribeActionBuilder(jvmGraphQlWs.subscribeFile(filePath)),
  unsubscribe: (subscriptionName: string) =>
    wrapGraphQlWsUnsubscribeActionBuilder(jvmGraphQlWs.unsubscribe(subscriptionName)),
  close: () => wrapActionBuilder(jvmGraphQlWs.close()),
  checkNext: (name?: string) =>
    wrapGraphQlWsNextCheck(name === undefined ? jvmGraphQlWs.checkNext() : jvmGraphQlWs.checkNext(name))
});
