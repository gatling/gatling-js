import {
  ActionBuilder,
  CheckBuilder,
  Duration,
  Session,
  SessionTo,
  XWithSessionTo,
  Wrapper,
  isDuration,
  toJvmDuration,
  underlyingSessionToDuration,
  underlyingSessionTo,
  underlyingXWithSessionTo,
  wrapActionBuilder,
  underlyingXWithSessionToSession
} from "@gatling.io/core";
import { HttpDsl as JvmHttpDsl, Sse$Prefix as JvmSsePrefixStatic } from "@gatling.io/jvm-types";

import {
  RequestActionBuilder,
  RequestWithBodyActionBuilder,
  requestActionBuilderImpl,
  requestWithBodyActionBuilderImpl
} from "./request";

import JvmSse = io.gatling.javaapi.http.Sse;
import JvmSseAwaitActionBuilder = io.gatling.javaapi.http.SseAwaitActionBuilder;
import JvmSseAwaitActionBuilderOn = io.gatling.javaapi.http.SseAwaitActionBuilder$On;
import JvmSseConnectActionBuilder = io.gatling.javaapi.http.SseConnectActionBuilder;
import JvmSseMessageCheck = io.gatling.javaapi.http.SseMessageCheck;
import JvmSsePrefix = io.gatling.javaapi.http.Sse$Prefix;
import JvmSseSetCheckActionBuilder = io.gatling.javaapi.http.SseSetCheckActionBuilder;
import JvmTypedCondition = io.gatling.javaapi.http.SseMessageCheck$TypedCondition;
import JvmUntypedCondition = io.gatling.javaapi.http.SseMessageCheck$UntypedCondition;

export interface SseUntypedCondition {
  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param thenChecks - the checks
   * @returns a new Text instance
   */
  then(...thenChecks: Array<CheckBuilder>): SseMessageCheck;
}

const wrapUntypedCondition = (_underlying: JvmUntypedCondition): SseUntypedCondition => ({
  then: (...thenChecks) => wrapSseMessageCheck(_underlying.then(thenChecks.map((cb) => cb._underlying)))
});

export interface SseTypedCondition {
  /**
   * Define the checks to apply when the condition holds true.
   *
   * @param thenChecks - the checks
   * @returns a new Text instance
   */
  then(...thenChecks: Array<CheckBuilder>): SseMessageCheck;
}

const wrapTypedCondition = (_underlying: JvmTypedCondition): SseTypedCondition => ({
  then: (...thenChecks) => wrapSseMessageCheck(_underlying.then(thenChecks.map((cb) => cb._underlying)))
});

export interface SseMessageCheck extends Wrapper<JvmSseMessageCheck> {
  /**
   * Define conditions that have to hold true to match inbound messages and apply the checks on them
   *
   * @param newMatchConditions - the conditions to match
   * @returns a new SseMessageCheck instance
   */
  matching(...newMatchConditions: Array<CheckBuilder>): SseMessageCheck;

  /**
   * Define the checks to apply on inbound messages
   *
   * @param checks - the checks
   * @returns a new SseMessageCheck instance
   */
  check(...checks: Array<CheckBuilder>): SseMessageCheck;

  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param condition - a condition, expressed as a function
   * @returns the next DSL step
   */
  checkIf(condition: (session: Session) => boolean): SseUntypedCondition;

  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param condition - a condition, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  checkIf(condition: string): SseUntypedCondition;

  /**
   * Define the checks to apply on inbound messages when a condition holds true.
   *
   * @param condition - a condition, expressed as a function that's aware of the HTTP response and the
   *     Session
   * @returns the next DSL step
   */
  checkIf(condition: (response: string, session: Session) => boolean): SseTypedCondition;
}

const wrapSseMessageCheck = (_underlying: JvmSseMessageCheck): SseMessageCheck => ({
  _underlying,
  matching: (...newMatchConditions) =>
    wrapSseMessageCheck(_underlying.matching(newMatchConditions.map((cb) => cb._underlying))),
  check: (...checks) => wrapSseMessageCheck(_underlying.check(checks.map((cb) => cb._underlying))),
  checkIf: (condition) => {
    if (typeof condition === "string") {
      return wrapUntypedCondition(_underlying.checkIf(condition));
    } else if (typeof condition === "function") {
      if (condition.length === 1) {
        return wrapUntypedCondition(_underlying.checkIf(underlyingSessionTo(condition as SessionTo<boolean>)));
      } else if (condition.length === 2) {
        return wrapTypedCondition(
          _underlying.checkIf(underlyingXWithSessionTo(condition as XWithSessionTo<string, boolean>))
        );
      }
    }

    throw Error(`checkIf() called with invalid argument ${condition}`);
  }
});

export interface SseAwaitActionBuilderOn<T> {
  /**
   * Define the checks to wait on
   *
   * @param checks - the checks
   * @returns a usable ActionBuilder
   */
  on(...checks: Array<SseMessageCheck>): T;
}

const wrapSseAwaitActionBuilderOn = <J, T>(
  jvmOn: JvmSseAwaitActionBuilderOn<J>,
  wrap: (underlying: J) => T
): SseAwaitActionBuilderOn<T> => ({
  on: (...checks) => wrap(jvmOn.on(checks.map((c) => c._underlying)))
});

export interface SseAwaitActionBuilder<T> {
  /**
   * Boostrap a check that waits for a given duration
   *
   * @param timeout - the static wait duration
   * @returns the next DSL step
   */
  await(timeout: Duration): SseAwaitActionBuilderOn<T>;

  /**
   * Boostrap a check that waits for a given duration
   *
   * @param timeout - the wait duration, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  await(timeout: string): SseAwaitActionBuilderOn<T>;

  /**
   * Boostrap a check that waits for a given duration
   *
   * @param timeout - the wait duration, expressed as a function
   * @returns the next DSL step
   */
  await(timeout: SessionTo<Duration>): SseAwaitActionBuilderOn<T>;
}

const sseAwaitActionBuilderImpl = <T, J extends JvmSseAwaitActionBuilder<J, any>>(
  jvmBuilder: J,
  wrap: (_underlying: J) => T
): SseAwaitActionBuilder<T> => ({
  await: (timeout) => {
    if (typeof timeout === "string") {
      return wrapSseAwaitActionBuilderOn(jvmBuilder.await(timeout), wrap);
    } else if (typeof timeout === "function") {
      return wrapSseAwaitActionBuilderOn(jvmBuilder.await(underlyingSessionToDuration(timeout)), wrap);
    } else if (isDuration(timeout)) {
      return wrapSseAwaitActionBuilderOn(jvmBuilder.await(toJvmDuration(timeout)), wrap);
    }

    throw Error(`await() called with invalid argument ${timeout}`);
  }
});

export interface SseConnectActionBuilder
  extends
    SseAwaitActionBuilder<SseConnectActionBuilder>,
    RequestWithBodyActionBuilder<SseConnectActionBuilder>,
    RequestActionBuilder<SseConnectActionBuilder>,
    ActionBuilder {
  // Assembling all original subtypes
  _underlying: JvmSseConnectActionBuilder;
}

const wrapSseConnectActionBuilder = (_underlying: JvmSseConnectActionBuilder): SseConnectActionBuilder => ({
  _underlying,
  ...requestActionBuilderImpl(_underlying, wrapSseConnectActionBuilder),
  ...requestWithBodyActionBuilderImpl(_underlying, wrapSseConnectActionBuilder),
  ...sseAwaitActionBuilderImpl(_underlying, wrapSseConnectActionBuilder)
});

export interface SseSetCheckActionBuilder extends SseAwaitActionBuilder<SseSetCheckActionBuilder>, ActionBuilder {
  // Assembling all original subtypes
  _underlying: JvmSseSetCheckActionBuilder;
}

const wrapSseSetCheckActionBuilder = (_underlying: JvmSseSetCheckActionBuilder): SseSetCheckActionBuilder => ({
  _underlying,
  ...sseAwaitActionBuilderImpl(_underlying, wrapSseSetCheckActionBuilder)
});

/**
 * DSL for building <a
 * href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events">SSE</a>
 * configurations
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface Sse {
  /**
   * Define a custom stream name so multiple SSEs for the same virtual users don't conflict
   *
   * @param sseName - the name, expressed as a Gatling Expression Language String
   * @returns a new Sse instance
   */
  sseName(sseName: string): Sse;

  /**
   * Define a custom stream name so multiple SSEs for the same virtual users don't conflict
   *
   * @param sseName - the name, expressed as a function
   * @returns a new Sse instance
   */
  sseName(sseName: (session: Session) => string): Sse;

  /**
   * Boostrap an action to connect the SSE with a GET request
   *
   * @param url - the url to connect to, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  get(url: string): SseConnectActionBuilder;

  /**
   * Boostrap an action to connect the SSE with a POST request
   *
   * @param url - the url to connect to, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  post(url: string): SseConnectActionBuilder;

  /**
   * Boostrap an action to connect the SSE with a GET request
   *
   * @param url - the url to connect to, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  get(url: (session: Session) => string): SseConnectActionBuilder;

  /**
   * Boostrap an action to connect the SSE with a POST request
   *
   * @param url - the url to connect to, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  post(url: (session: Session) => string): SseConnectActionBuilder;

  /**
   * Boostrap an action to set a check
   *
   * @returns the next DSL step
   */
  setCheck(): SseSetCheckActionBuilder;

  /**
   * Create an action to close the stream
   *
   * @returns an ActionBuilder
   */
  close(): ActionBuilder;
}

const wrapSse = (jvmSse: JvmSse): Sse => ({
  sseName: (sseName) =>
    wrapSse(typeof sseName === "function" ? jvmSse.sseName(underlyingSessionTo(sseName)) : jvmSse.sseName(sseName)),
  get: (url) =>
    wrapSseConnectActionBuilder(typeof url === "function" ? jvmSse.get(underlyingSessionTo(url)) : jvmSse.get(url)),
  post: (url) =>
    wrapSseConnectActionBuilder(typeof url === "function" ? jvmSse.post(underlyingSessionTo(url)) : jvmSse.post(url)),
  setCheck: () => wrapSseSetCheckActionBuilder(jvmSse.setCheck()),
  close: () => wrapActionBuilder(jvmSse.close())
});

export interface SseApply {
  /**
   * Bootstrap a <a
   * href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events">SSE</a> request
   * configuration
   *
   * @param name - the SSE request name, expressed as a Gatling Expression Language String
   * @param sseName - the name of the SSE stream so multiple SSE streams for the same virtual users
   *     don't conflict, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string, sseName?: string): Sse;
}

const sseApply = (name: string, sseName?: string): Sse => {
  // Handle overloading
  const jvmSse = typeof sseName === "undefined" ? JvmHttpDsl.sse(name) : JvmHttpDsl.sse(name, sseName);
  return wrapSse(jvmSse);
};

export interface SseInboundMessage {
  message(): string;
  timestamp(): number;
}

export interface SsePrefix {
  /**
   * Boostrap a SSE check
   *
   * @param name - the name of the check
   * @returns the next DSL step
   */
  checkMessage(name: string): SseMessageCheck;

  /**
   * Process the currently buffered inbound SSE messages and empty the buffer
   *
   * @param f - the function to process the buffered messages
   * @returns an ActionBuilder
   */
  processUnmatchedMessages(f: (messages: Array<SseInboundMessage>, session: Session) => Session): ActionBuilder;

  /**
   * Process the currently buffered inbound SSE messages and empty the buffer
   *
   * @param sseName - the name of the SSE stream, expressed as a Gatling Expression Language String
   * @param f - the function to process the buffered messages
   * @returns an ActionBuilder
   */
  processUnmatchedMessages(
    sseName: string,
    f: (messages: Array<SseInboundMessage>, session: Session) => Session
  ): ActionBuilder;

  /**
   * Process the currently buffered inbound SSE messages and empty the buffer
   *
   * @param sseName - the name of the SSE stream, expressed as a function
   * @param f - the function to process the buffered messages
   * @returns an ActionBuilder
   */
  processUnmatchedMessages(
    sseName: (session: Session) => string,
    f: (messages: Array<SseInboundMessage>, session: Session) => Session
  ): ActionBuilder;
}

const jvmSsePrefix = (JvmSsePrefixStatic as any).INSTANCE as JvmSsePrefix;

type SseProcessUnmatchedMessagesCallback = (messages: Array<SseInboundMessage>, session: Session) => Session;

const ssePrefix: SsePrefix = {
  checkMessage: (name) => wrapSseMessageCheck(jvmSsePrefix.checkMessage(name)),
  processUnmatchedMessages: (arg0, arg1?): ActionBuilder => {
    if (arg1 !== undefined) {
      // arg1 is the SseProcessUnmatchedMessagesCallback if it is defined
      // arg0 is the sseName
      const f = arg1 as SseProcessUnmatchedMessagesCallback;
      if (typeof arg0 === "string") {
        const sseName = arg0 as string;
        return wrapActionBuilder(jvmSsePrefix.processUnmatchedMessages(sseName, underlyingXWithSessionToSession(f)));
      } else if (typeof arg0 === "function") {
        const sseName = arg0 as SessionTo<string>;
        return wrapActionBuilder(
          jvmSsePrefix.processUnmatchedMessages(underlyingSessionTo(sseName), underlyingXWithSessionToSession(f))
        );
      }
    } else if (typeof arg0 === "function") {
      // arg0 is the SseProcessUnmatchedMessagesCallback is arg1 is undefined
      const f = arg0 as SseProcessUnmatchedMessagesCallback;
      return wrapActionBuilder(jvmSsePrefix.processUnmatchedMessages(underlyingXWithSessionToSession(f)));
    }

    throw Error(`processUnmatchedMessages() called with invalid arguments ${arg0}, ${arg1}`);
  }
};

// FIXME Sse.Apply && Prefix?
export const sse: SseApply & SsePrefix = Object.assign(sseApply, ssePrefix);
