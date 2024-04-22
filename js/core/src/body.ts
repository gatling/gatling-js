import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { Wrapper } from "./common";
import { wrapCallback } from "./gatlingJvm/callbacks";
import { Expression, Session, underlyingSessionTo } from "./session";

import JvmBody = io.gatling.javaapi.core.Body;

export interface Body extends Wrapper<JvmBody> {}

const wrapBody = (_underlying: JvmBody): Body => ({
  _underlying
});

export interface StringBodyFunction {
  /**
   * Create a body from a String.
   *
   * <p>Can also be used as a Function<Session, String> to define the expected value in a check.
   *
   * @param string the body expressed as a gatling Expression Language String
   * @return a body
   */
  (string: string): Body;

  /**
   * Create a body from a String.
   *
   * <p>Can also be used as a Function<Session, String> to define the expected value in a check.
   *
   * @param f the body expressed as a function
   * @return a body
   */
  (f: (session: Session) => string): Body;
}

export const StringBody: StringBodyFunction = (string: Expression<string>): Body =>
  typeof string === "function"
    ? wrapBody(JvmCoreDsl.StringBody(wrapCallback(underlyingSessionTo(string))))
    : wrapBody(JvmCoreDsl.StringBody(string));
