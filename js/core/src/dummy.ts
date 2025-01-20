import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";
import JvmDummyBuilder = io.gatling.javaapi.core.DummyBuilder;

import { Expression, SessionTo, SessionTransform, underlyingSessionTo, underlyingSessionTransform } from "./session";
import { ActionBuilder } from "./structure";

export interface DummyBuilder extends ActionBuilder {
  /**
   * Set the successful outcome of the dummy action. If undefined, the outcome is a success.
   *
   * @param newSuccess - if the outcome of the dummy action must be a success
   * @return a new DummyBuilder with the success outcome defined
   */
  withSuccess(newSuccess: boolean): DummyBuilder;

  /**
   * Set the successful outcome of the dummy action. If undefined, the outcome is a success.
   *
   * @param newSuccess - if the outcome of the dummy action must be a success, as a Gatling EL String
   * @return a new DummyBuilder with the success outcome defined
   */
  withSuccess(newSuccess: string): DummyBuilder;

  /**
   * Set the successful outcome of the dummy action. If undefined, the outcome is a success.
   *
   * @param newSuccess - if the outcome of the dummy action must be a success, as a function
   * @return a new DummyBuilder with the success outcome defined
   */
  withSuccess(newSuccess: SessionTo<boolean>): DummyBuilder;

  /**
   * Modify the Session like an exec(f) block would, as part of this dummy action
   *
   * @param f - a function to return an updated Session
   * @return a new DummyBuilder with the Session function defined
   */
  withSessionUpdate(f: SessionTransform): DummyBuilder;
}

const wrapDummyBuilder = (_underlying: JvmDummyBuilder): DummyBuilder => ({
  _underlying,
  withSuccess: (newSuccess: Expression<boolean> | string) =>
    wrapDummyBuilder(
      typeof newSuccess === "function"
        ? _underlying.withSuccess(underlyingSessionTo(newSuccess))
        : typeof newSuccess === "string"
          ? _underlying.withSuccess(newSuccess)
          : _underlying.withSuccess(newSuccess)
    ),
  withSessionUpdate: (f: SessionTransform) =>
    wrapDummyBuilder(_underlying.withSessionUpdate(underlyingSessionTransform(f)))
});

export interface DummyFunction {
  /**
   * Bootstrap a builder for performing a dummy action that emulates a network remote call
   *
   * @param actionName - the name of the action, as a Gatling EL String
   * @param responseTime - the response time of the action in milliseconds
   * @return a DummyBuilder
   */
  (actionName: string, responseTime: number): DummyBuilder;

  /**
   * Bootstrap a builder for performing a dummy action that emulates a network remote call
   *
   * @param actionName - the name of the action, as a Gatling EL String
   * @param responseTime - the response time of the action in milliseconds, as a Gatling EL String
   * @return a DummyBuilder
   */
  (actionName: string, responseTime: string): DummyBuilder;

  /**
   * Bootstrap a builder for performing a dummy action that emulates a network remote call
   *
   * @param actionName - the name of the action, as a Gatling EL String
   * @param responseTime - the response time of the action in milliseconds, as a function
   * @return a DummyBuilder
   */
  (actionName: string, responseTime: SessionTo<number>): DummyBuilder;

  /**
   * Bootstrap a builder for performing a dummy action that emulates a network remote call
   *
   * @param actionName - the name of the action, as a function
   * @param responseTime - the response time of the action in milliseconds
   * @return a DummyBuilder
   */
  (actionName: SessionTo<string>, responseTime: number): DummyBuilder;

  /**
   * Bootstrap a builder for performing a dummy action that emulates a network remote call
   *
   * @param actionName - the name of the action, as a Gatling EL String
   * @param responseTime - the response time of the action in milliseconds, as function
   * @return a DummyBuilder
   */
  (actionName: SessionTo<string>, responseTime: string): DummyBuilder;

  /**
   * Bootstrap a builder for performing a dummy action that emulates a network remote call
   *
   * @param actionName - the name of the action, as a function
   * @param responseTime - the response time of the action in milliseconds, as a function
   * @return a DummyBuilder
   */
  (actionName: SessionTo<string>, responseTime: SessionTo<number>): DummyBuilder;
}

export const dummy: DummyFunction = (
  actionName: Expression<string>,
  responseTime: Expression<number> | string
): DummyBuilder => {
  if (typeof actionName === "function") {
    if (typeof responseTime === "function") {
      return wrapDummyBuilder(JvmCoreDsl.dummy(underlyingSessionTo(actionName), underlyingSessionTo(responseTime)));
    } else if (typeof responseTime === "string") {
      return wrapDummyBuilder(JvmCoreDsl.dummy(underlyingSessionTo(actionName), responseTime));
    } else {
      return wrapDummyBuilder(JvmCoreDsl.dummy(underlyingSessionTo(actionName), responseTime));
    }
  } else {
    if (typeof responseTime === "function") {
      return wrapDummyBuilder(JvmCoreDsl.dummy(actionName, underlyingSessionTo(responseTime)));
    } else if (typeof responseTime === "string") {
      return wrapDummyBuilder(JvmCoreDsl.dummy(actionName, responseTime));
    } else {
      return wrapDummyBuilder(JvmCoreDsl.dummy(actionName, responseTime));
    }
  }
};
