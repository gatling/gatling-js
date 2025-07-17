import {
  ActionBuilder,
  ChainBuilder,
  CheckBuilder,
  Duration,
  Session,
  SessionTo,
  Wrapper,
  XWithSessionTo,
  isDuration,
  toJvmDuration,
  underlyingSessionTo,
  underlyingSessionToDuration,
  underlyingXWithSessionTo,
  underlyingXWithSessionToSession,
  wrapActionBuilder
} from "@gatling.io/core";
import { HttpDsl as JvmHttpDsl, Ws$Prefix as JvmWsPrefixStatic } from "@gatling.io/jvm-types";

import { RequestActionBuilder, requestActionBuilderImpl } from "./request";

import JvmWs = io.gatling.javaapi.http.Ws;
import JvmWsPrefix = io.gatling.javaapi.http.Ws$Prefix;
import JvmWsConnectActionBuilder = io.gatling.javaapi.http.WsConnectActionBuilder;
import JvmWsSendTextActionBuilder = io.gatling.javaapi.http.WsSendTextActionBuilder;
import JvmWsSendBinaryActionBuilder = io.gatling.javaapi.http.WsSendBinaryActionBuilder;
import JvmWsAwaitActionBuilder = io.gatling.javaapi.http.WsAwaitActionBuilder;
import JvmWsAwaitActionBuilderOn = io.gatling.javaapi.http.WsAwaitActionBuilder$On;
import JvmWsFrameCheckBinary = io.gatling.javaapi.http.WsFrameCheck$Binary;
import JvmWsFrameCheckBinaryUntypedCondition = io.gatling.javaapi.http.Binary$TypedCondition; // TODO should be io.gatling.javaapi.http.WsFrameCheck$Binary$TypedCondition, bug in java2ts
import JvmWsFrameCheckBinaryTypedCondition = io.gatling.javaapi.http.Binary$TypedCondition;
import JvmWsFrameCheckText = io.gatling.javaapi.http.WsFrameCheck$Text;
import JvmWsFrameCheckTextUntypedCondition = io.gatling.javaapi.http.Text$UntypedCondition;
import JvmWsFrameCheckTextTypedCondition = io.gatling.javaapi.http.Text$TypedCondition;

/**
 * DSL for building WebSocket configurations
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface Ws {
  /**
   * Define a custom WebSocket name so multiple WebSockets for the same virtual users don't conflict
   *
   * @param wsName - the name, expressed as a Gatling Expression Language String
   * @returns a new Ws instance
   */
  wsName(wsName: string): Ws;

  /**
   * Define a custom WebSocket name so multiple WebSockets for the same virtual users don't conflict
   *
   * @param wsName - the name, expressed as a function
   * @returns a new Ws instance
   */
  wsName(wsName: (session: Session) => string): Ws;

  /**
   * Boostrap an action to connect the WebSocket
   *
   * @param url - the url to connect to, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  connect(url: string): WsConnectActionBuilder;

  /**
   * Boostrap an action to connect the WebSocket
   *
   * @param url - the url to connect to, expressed as a function
   * @returns the next DSL step
   */
  connect(url: (session: Session) => string): WsConnectActionBuilder;

  /**
   * Boostrap an action to send a TEXT frame
   *
   * @param text - the text to send, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  sendText(text: string): WsSendTextActionBuilder;

  /**
   * Boostrap an action to send a TEXT frame
   *
   * @param text - the text to send, expressed as a function
   * @returns the next DSL step
   */
  sendText(text: (session: Session) => string): WsSendTextActionBuilder;

  /**
   * Boostrap an action to send a BINARY frame
   *
   * @param bytes - the static bytes to send
   * @returns the next DSL step
   */
  sendBytes(bytes: number[]): WsSendBinaryActionBuilder;

  /**
   * Boostrap an action to send a BINARY frame
   *
   * @param bytes - the bytes to send, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  sendBytes(bytes: string): WsSendBinaryActionBuilder;

  /**
   * Boostrap an action to send a BINARY frame
   *
   * @param bytes - the bytes to send, expressed as a function
   * @returns the next DSL step
   */
  sendBytes(bytes: (session: Session) => number[]): WsSendBinaryActionBuilder;

  /**
   * Boostrap an action to send a CLOSE frame with the default 1000 status code
   *
   * @returns the next DSL step
   */
  close(): ActionBuilder;

  /**
   * Boostrap an action to send a CLOSE frame with specified status and reason
   *
   * @param statusCode - the close frame status code
   * @param reason - the close frame reason
   * @returns the next DSL step
   */
  close(statusCode: number, reason: string): ActionBuilder;
}

type WsProcessUnmatchedMessagesCallback = (messages: WsInboundMessage[], session: Session) => Session;

export interface WsPrefix {
  /**
   * Bootstrap a check on inbound TEXT frames
   *
   * @param name - the name of the check, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  checkTextMessage(name: string): WsFrameCheckText;

  /**
   * Bootstrap a check on inbound TEXT frames
   *
   * @param name - the name of the check, expressed as a function
   * @returns the next DSL step
   */
  checkTextMessage(name: (session: Session) => string): WsFrameCheckText;

  /**
   * Bootstrap a check on inbound BINARY frames
   *
   * @param name - the name of the check, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  checkBinaryMessage(name: string): WsFrameCheckBinary;

  /**
   * Bootstrap a check on inbound BINARY frames
   *
   * @param name - the name of the check, expressed as a function
   * @returns the next DSL step
   */
  checkBinaryMessage(name: (session: Session) => string): WsFrameCheckBinary;

  /**
   * Process the currently buffered inbound WebSocket messages and empty the buffer
   *
   * @param f - the function to process the buffered messages
   * @returns an ActionBuilder
   */
  processUnmatchedMessages(f: WsProcessUnmatchedMessagesCallback): ActionBuilder;

  /**
   * Process the currently buffered inbound WebSocket messages and empty the buffer
   *
   * @param wsName - the name of the WebSocket, expressed as a Gatling Expression Language String
   * @param f - the function to process the buffered messages
   * @returns an ActionBuilder
   */
  processUnmatchedMessages(wsName: string, f: WsProcessUnmatchedMessagesCallback): ActionBuilder;

  /**
   * Process the currently buffered inbound WebSocket messages and empty the buffer
   *
   * @param wsName - the name of the WebSocket, expressed as a function
   * @param f - the function to process the buffered messages
   * @returns an ActionBuilder
   */
  processUnmatchedMessages(wsName: (session: Session) => string, f: WsProcessUnmatchedMessagesCallback): ActionBuilder;
}

const jvmWsPrefix = (JvmWsPrefixStatic as any).INSTANCE as JvmWsPrefix;
const wsPrefix: WsPrefix = {
  checkBinaryMessage: (name) =>
    wrapWsFrameCheckBinary(
      typeof name === "function"
        ? jvmWsPrefix.checkBinaryMessage(underlyingSessionTo(name))
        : jvmWsPrefix.checkBinaryMessage(name)
    ),
  checkTextMessage: (name) =>
    wrapWsFrameCheckText(
      typeof name === "function"
        ? jvmWsPrefix.checkTextMessage(underlyingSessionTo(name))
        : jvmWsPrefix.checkTextMessage(name)
    ),
  processUnmatchedMessages: (arg0, arg1?) => {
    if (arg1 !== undefined) {
      // arg1 is the WsProcessUnmatchedMessagesCallback if it is defined
      // arg0 is the sseName
      const f = arg1 as WsProcessUnmatchedMessagesCallback;
      if (typeof arg0 === "string") {
        const sseName = arg0 as string;
        return wrapActionBuilder(jvmWsPrefix.processUnmatchedMessages(sseName, underlyingXWithSessionToSession(f)));
      } else if (typeof arg0 === "function") {
        const sseName = arg0 as SessionTo<string>;
        return wrapActionBuilder(
          jvmWsPrefix.processUnmatchedMessages(underlyingSessionTo(sseName), underlyingXWithSessionToSession(f))
        );
      }
    } else if (typeof arg0 === "function") {
      // arg0 is the SseProcessUnmatchedMessagesCallback if arg1 is undefined
      const f = arg0 as WsProcessUnmatchedMessagesCallback;
      return wrapActionBuilder(jvmWsPrefix.processUnmatchedMessages(underlyingXWithSessionToSession(f)));
    }

    throw Error(`processUnmatchedMessages() called with invalid arguments ${arg0}, ${arg1}`);
  }
};

export interface WsAwaitActionBuilder<T> {
  /**
   * Boostrap a check that waits for a given duration
   *
   * @param timeout - the static wait duration
   * @returns the next DSL step
   */
  await(timeout: Duration): WsAwaitActionBuilderOn<T>;

  /**
   * Boostrap a check that waits for a given duration
   *
   * @param timeout - the wait duration, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  await(timeout: string): WsAwaitActionBuilderOn<T>;

  /**
   * Boostrap a check that waits for a given duration
   *
   * @param timeout - the wait duration, expressed as a function
   * @returns the next DSL step
   */
  await(timeout: (session: Session) => Duration): WsAwaitActionBuilderOn<T>;
}

const wsAwaitActionBuilderImpl = <T, J extends JvmWsAwaitActionBuilder<J, any>>(
  jvmBuilder: J,
  wrap: (_underlying: J) => T
): WsAwaitActionBuilder<T> => ({
  await: (timeout) =>
    wrapWsAwaitActionBuilderOn(
      isDuration(timeout)
        ? jvmBuilder.await(toJvmDuration(timeout))
        : typeof timeout === "function"
          ? jvmBuilder.await(underlyingSessionToDuration(timeout))
          : jvmBuilder.await(timeout),
      wrap
    )
});

export interface WsAwaitActionBuilderOn<T> {
  /**
   * Define the checks to wait on
   *
   * @param checks - the checks
   * @returns a usable ActionBuilder
   */
  on(...checks: WsFrameCheck[]): T;
}

const wrapWsAwaitActionBuilderOn = <J, T>(
  jvmOn: JvmWsAwaitActionBuilderOn<J>,
  wrap: (underlying: J) => T
): WsAwaitActionBuilderOn<T> => ({
  on: (...checks: WsFrameCheck[]): T => wrap(jvmOn.on(checks.map((c) => c._underlying)))
});

/**
 * DSL for building WebSocket connect actions
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface WsConnectActionBuilder
  extends RequestActionBuilder<WsConnectActionBuilder>,
    WsAwaitActionBuilder<WsConnectActionBuilder>,
    ActionBuilder {
  /**
   * Define a WebSocket subprotocol
   *
   * @param sub - the subprotocol, expressed as a Gatling Expression Language String
   * @returns a new WsConnectActionBuilder instance
   */
  subprotocol(sub: string): WsConnectActionBuilder;

  /**
   * Define a WebSocket subprotocol
   *
   * @param sub - the subprotocol, expressed as a function
   * @returns a new WsConnectActionBuilder instance
   */
  subprotocol(sub: (session: Session) => string): WsConnectActionBuilder;

  /**
   * Define a chain to execute when the WebSocket gets connected or re-connected
   *
   * @param chain - the chain
   * @returns a new WsConnectActionBuilder instance
   */
  onConnected(chain: ChainBuilder): WsConnectActionBuilder;
}

const wrapWsConnectActionBuilder = (_underlying: JvmWsConnectActionBuilder): WsConnectActionBuilder => ({
  _underlying,
  subprotocol: (sub) =>
    wrapWsConnectActionBuilder(
      typeof sub === "function" ? _underlying.subprotocol(underlyingSessionTo(sub)) : _underlying.subprotocol(sub)
    ),
  onConnected: (chain) => wrapWsConnectActionBuilder(_underlying.onConnected(chain._underlying)),
  ...requestActionBuilderImpl(_underlying, wrapWsConnectActionBuilder),
  ...wsAwaitActionBuilderImpl(_underlying, wrapWsConnectActionBuilder)
});

/**
 * DSL for building actions to send TEXT frames
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface WsSendTextActionBuilder extends WsAwaitActionBuilder<WsSendTextActionBuilder>, ActionBuilder {}

const wrapWsSendTextActionBuilder = (_underlying: JvmWsSendTextActionBuilder): WsSendTextActionBuilder => ({
  _underlying,
  ...wsAwaitActionBuilderImpl(_underlying, wrapWsSendTextActionBuilder)
});

/**
 * DSL for building actions to send BINARY frames
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface WsSendBinaryActionBuilder extends WsAwaitActionBuilder<WsSendBinaryActionBuilder>, ActionBuilder {}

const wrapWsSendBinaryActionBuilder = (_underlying: JvmWsSendBinaryActionBuilder): WsSendBinaryActionBuilder => ({
  _underlying,
  ...wsAwaitActionBuilderImpl(_underlying, wrapWsSendBinaryActionBuilder)
});

export type WsFrameCheck = WsFrameCheckBinary | WsFrameCheckText;

/**
 * DSL for building WebSocket BINARY frames checks
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface WsFrameCheckBinary extends Wrapper<JvmWsFrameCheckBinary> {
  /**
   * Define conditions that have to hold true to match inbound messages and apply the checks on
   * them
   *
   * @param newMatchConditions - the conditions to match
   * @returns a new Binary instance
   */
  matching(...newMatchConditions: CheckBuilder[]): WsFrameCheckBinary;

  /**
   * Define the checks to apply on inbound messages
   *
   * @param checks - the checks
   * @returns a new Binary instance
   */
  check(...checks: CheckBuilder[]): WsFrameCheckBinary;

  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param condition - a condition, expressed as a function
   * @returns the next DSL step
   */
  checkIf(condition: (session: Session) => boolean): WsFrameCheckBinaryUntypedCondition;

  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param condition - a condition, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  checkIf(condition: string): WsFrameCheckBinaryUntypedCondition;

  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param condition - a condition, expressed as a function that's aware of the HTTP response and
   *     the Session
   * @returns the next DSL step
   */
  checkIf(condition: (response: number[], session: Session) => boolean): WsFrameCheckBinaryTypedCondition;

  /**
   * Make the check silent, not logged by the reporting engine
   *
   * @returns a new Binary instance
   */
  silent(): WsFrameCheckBinary;
}

const wrapWsFrameCheckBinary = (_underlying: JvmWsFrameCheckBinary): WsFrameCheckBinary => ({
  _underlying,
  matching: (...newMatchConditions) =>
    wrapWsFrameCheckBinary(_underlying.check(newMatchConditions.map((cb) => cb._underlying))),
  check: (...checks) => wrapWsFrameCheckBinary(_underlying.check(checks.map((cb) => cb._underlying))),
  checkIf: (condition) => {
    if (typeof condition === "function") {
      if (condition.length === 1) {
        return wrapWsFrameCheckBinaryUntypedCondition(
          _underlying.checkIf(underlyingSessionTo(condition as SessionTo<boolean>))
        );
      } else {
        return wrapWsFrameCheckBinaryTypedCondition(
          _underlying.checkIf(underlyingXWithSessionTo(condition as XWithSessionTo<number[], boolean>))
        );
      }
    } else {
      return wrapWsFrameCheckBinaryUntypedCondition(_underlying.checkIf(condition));
    }
  },
  silent: () => wrapWsFrameCheckBinary(_underlying.silent())
});

export interface WsFrameCheckBinaryUntypedCondition {
  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param thenChecks - the checks
   * @returns a new Binary instance
   */
  then(...thenChecks: CheckBuilder[]): WsFrameCheckBinary;
}

const wrapWsFrameCheckBinaryUntypedCondition = (
  _underlying: JvmWsFrameCheckBinaryUntypedCondition
): WsFrameCheckBinaryUntypedCondition => ({
  then: (...thenChecks) => wrapWsFrameCheckBinary(_underlying.then(thenChecks.map((cb) => cb._underlying)))
});

export interface WsFrameCheckBinaryTypedCondition {
  /**
   * Define the checks to apply when the condition holds true.
   *
   * @param thenChecks - the checks
   * @returns a new Binary instance
   */
  then(...thenChecks: CheckBuilder[]): WsFrameCheckBinary;
}

const wrapWsFrameCheckBinaryTypedCondition = (
  _underlying: JvmWsFrameCheckBinaryTypedCondition
): WsFrameCheckBinaryTypedCondition => ({
  then: (...thenChecks) => wrapWsFrameCheckBinary(_underlying.then(thenChecks.map((cb) => cb._underlying)))
});

/**
 * DSL for building WebSocket TEXT frames checks
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface WsFrameCheckText extends Wrapper<JvmWsFrameCheckText> {
  /**
   * Define conditions that have to hold true to match inbound messages and apply the checks on
   * them
   *
   * @param newMatchConditions - the conditions to match
   * @returns a new Text instance
   */
  matching(...newMatchConditions: CheckBuilder[]): WsFrameCheckText;

  /**
   * Define the checks to apply on inbound messages
   *
   * @param checks - the checks
   * @returns a new Text instance
   */
  check(...checks: CheckBuilder[]): WsFrameCheckText;

  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param condition - a condition, expressed as a function
   * @returns the next DSL step
   */
  checkIf(condition: (session: Session) => boolean): WsFrameCheckTextUntypedCondition;

  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param condition - a condition, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  checkIf(condition: string): WsFrameCheckTextUntypedCondition;

  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param condition - a condition, expressed as a function that's aware of the HTTP response and
   *     the Session
   * @returns the next DSL step
   */
  checkIf(condition: (response: string, session: Session) => boolean): WsFrameCheckTextTypedCondition;

  /**
   * Make the check silent, not logged by the reporting engine
   *
   * @returns a new Text instance
   */
  silent(): WsFrameCheckText;
}

const wrapWsFrameCheckText = (_underlying: JvmWsFrameCheckText): WsFrameCheckText => ({
  _underlying,
  matching: (...newMatchConditions) =>
    wrapWsFrameCheckText(_underlying.check(newMatchConditions.map((cb) => cb._underlying))),
  check: (...checks) => wrapWsFrameCheckText(_underlying.check(checks.map((cb) => cb._underlying))),
  checkIf: (condition) => {
    if (typeof condition === "function") {
      if (condition.length === 1) {
        return wrapWsFrameCheckTextUntypedCondition(
          _underlying.checkIf(underlyingSessionTo(condition as SessionTo<boolean>))
        );
      } else {
        return wrapWsFrameCheckTextTypedCondition(
          _underlying.checkIf(underlyingXWithSessionTo(condition as XWithSessionTo<string, boolean>))
        );
      }
    } else {
      return wrapWsFrameCheckTextUntypedCondition(_underlying.checkIf(condition));
    }
  },
  silent: () => wrapWsFrameCheckText(_underlying.silent())
});

export interface WsFrameCheckTextUntypedCondition {
  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param thenChecks - the checks
   * @returns a new Text instance
   */
  then(...thenChecks: CheckBuilder[]): WsFrameCheckText;
}

const wrapWsFrameCheckTextUntypedCondition = (
  _underlying: JvmWsFrameCheckTextUntypedCondition
): WsFrameCheckTextUntypedCondition => ({
  then: (...thenChecks) => wrapWsFrameCheckText(_underlying.then(thenChecks.map((cb) => cb._underlying)))
});

export interface WsFrameCheckTextTypedCondition {
  /**
   * Define the checks to apply when the condition holds true.
   *
   * @param thenChecks - the checks
   * @returns a new Text instance
   */
  then(...thenChecks: CheckBuilder[]): WsFrameCheckText;
}

const wrapWsFrameCheckTextTypedCondition = (
  _underlying: JvmWsFrameCheckTextTypedCondition
): WsFrameCheckTextTypedCondition => ({
  then: (...thenChecks) => wrapWsFrameCheckText(_underlying.then(thenChecks.map((cb) => cb._underlying)))
});

export type WsInboundMessage = WsInboundMessageBinary | WsInboundMessageText;
export interface WsInboundMessageBinary {
  timestamp(): number;
  message(): number[];
}
export const isWsInboundMessageBinary = (message: WsInboundMessage): message is WsInboundMessageBinary =>
  typeof message.message() !== "string";
export interface WsInboundMessageText {
  timestamp(): number;
  message(): string;
}
export const isWsInboundMessageText = (message: WsInboundMessage): message is WsInboundMessageText =>
  typeof message.message() === "string";

const wrapWs = (jvmWs: JvmWs): Ws => ({
  wsName: (wsName) =>
    wrapWs(typeof wsName === "function" ? jvmWs.wsName(underlyingSessionTo(wsName)) : jvmWs.wsName(wsName)),
  connect: (url) =>
    wrapWsConnectActionBuilder(
      typeof url === "function" ? jvmWs.connect(underlyingSessionTo(url)) : jvmWs.connect(url)
    ),
  sendText: (text) =>
    wrapWsSendTextActionBuilder(
      typeof text === "function" ? jvmWs.sendText(underlyingSessionTo(text)) : jvmWs.sendText(text)
    ),
  sendBytes: (bytes) =>
    wrapWsSendBinaryActionBuilder(
      typeof bytes === "function"
        ? jvmWs.sendBytes(underlyingSessionTo(bytes))
        : typeof bytes === "string"
          ? jvmWs.sendBytes(bytes)
          : jvmWs.sendBytes(bytes)
    ),
  close: () => wrapActionBuilder(jvmWs.close())
});

export interface WsApply {
  /**
   * Bootstrap a WebSocket request configuration
   *
   * @param name - the WebSocket request name, expressed as a Gatling Expression Language String
   * @param wsName - the name of the WebSocket so multiple WebSockets for the same virtual users don't
   *     conflict, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string, wsName?: string): Ws;
}

const wsApply: WsApply = (name, wsName) => {
  const jvmWs = wsName === undefined ? JvmHttpDsl.ws(name) : JvmHttpDsl.ws(name, wsName);
  return wrapWs(jvmWs);
};

export const ws: WsApply & WsPrefix = Object.assign(wsApply, wsPrefix);
