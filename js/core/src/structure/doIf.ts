import "@gatling.io/jvm-types";
import JvmDoIf = io.gatling.javaapi.core.condition.DoIf;
import JvmDoIfEquals = io.gatling.javaapi.core.condition.DoIfEquals;
import JvmExecutable = io.gatling.javaapi.core.exec.Executable;

import { SessionTo, underlyingSessionTo } from "../session";
import { wrapCallback } from "../gatlingJvm/callbacks";

import { Executable } from "./execs";

// DoIf$Then and DoIfEquals$Then are equivalent for us
interface JvmThen<T> {
  then(executable: JvmExecutable, ...executables: JvmExecutable[]): T;
}

export interface Then<T> {
  then(executable: Executable<any>, ...executables: Executable<any>[]): T;
}

const wrapThen = <J, T>(jvmThen: JvmThen<J>, wrap: (underlying: J) => T): Then<T> => ({
  then: (executable: Executable<any>, ...executables: Executable<any>[]): T =>
    wrap(jvmThen.then(executable._underlying, ...executables.map((e) => e._underlying)))
});

export interface DoIfFunction<T extends DoIf<T>> {
  /**
   * Execute the "then" block only if the condition is true
   *
   * @param condition - the condition expressed as a Gatling Expression Language String that must
   *     evaluate to a Boolean
   * @returns a DSL component for defining the "then" block
   */
  (condition: string): Then<T>;

  /**
   * Execute the "then" block only if the condition is true
   *
   * @param condition - the condition expressed as a function
   * @returns a DSL component for defining the "then" block
   */
  (condition: SessionTo<boolean>): Then<T>;
}

export interface DoIf<T extends DoIf<T>> {
  doIf: DoIfFunction<T>;
}

export const doIfImpl =
  <J2, J1 extends JvmDoIf<J2, any>, T extends DoIf<T>>(jvmDoIf: J1, wrap: (wrapped: J2) => T) =>
  (condition: string | SessionTo<boolean>): Then<T> =>
    wrapThen(
      typeof condition === "function"
        ? jvmDoIf.doIf(wrapCallback(underlyingSessionTo(condition)))
        : jvmDoIf.doIf(condition),
      wrap
    );

export interface DoIfEqualsFunction<T extends DoIfEquals<T>> {
  /**
   * Execute the "then" block only if the actual value is equal to the expected one
   *
   * @param actual - the actual value expressed as a Gatling Expression Language String
   * @param expected - the expected value expressed as a Gatling Expression Language String
   * @returns a DSL component for defining the "then" block
   */
  (actual: string, expected: string): Then<T>;

  /**
   * Execute the "then" block only if the actual value is equal to the expected one
   *
   * @param actual - the actual value expressed as a Gatling Expression Language String
   * @param expected - the expected static value
   * @returns a DSL component for defining the "then" block
   */
  (actual: string, expected: unknown): Then<T>;

  /**
   * Execute the "then" block only if the actual value is equal to the expected one
   *
   * @param actual - the actual value expressed as a Gatling Expression Language String
   * @param expected - the expected value expressed as a function
   * @returns a DSL component for defining the "then" block
   */
  (actual: string, expected: SessionTo<unknown>): Then<T>;

  /**
   * Execute the "then" block only if the actual value is equal to the expected one
   *
   * @param actual - the actual value expressed as a function
   * @param expected - the expected value expressed as a Gatling Expression Language String
   * @returns a DSL component for defining the "then" block
   */
  (actual: SessionTo<unknown>, expected: string): Then<T>;

  /**
   * Execute the "then" block only if the actual value is equal to the expected one
   *
   * @param actual - the actual value expressed as a function
   * @param expected - the expected static value
   * @returns a DSL component for defining the "then" block
   */
  (actual: SessionTo<unknown>, expected: unknown): Then<T>;

  /**
   * Execute the "then" block only if the actual value is equal to the expected one
   *
   * @param actual - the actual value expressed as a function
   * @param expected - the expected value expressed as a function
   * @returns a DSL component for defining the "then" block
   */
  (actual: SessionTo<unknown>, expected: SessionTo<unknown>): Then<T>;
}

export interface DoIfEquals<T extends DoIfEquals<T>> {
  doIfEquals: DoIfEqualsFunction<T>;
}

export const doIfEqualsImpl =
  <J2, J1 extends JvmDoIfEquals<J2, any>, T extends DoIfEquals<T>>(jvmDoIfEquals: J1, wrap: (wrapped: J2) => T) =>
  (actual: string | SessionTo<unknown>, expected: string | SessionTo<unknown> | unknown): Then<T> => {
    if (typeof actual === "function") {
      const wrappedActual = wrapCallback(underlyingSessionTo(actual));
      if (typeof expected === "function") {
        return wrapThen(
          jvmDoIfEquals.doIfEquals(wrappedActual, wrapCallback(underlyingSessionTo(expected as SessionTo<unknown>))),
          wrap
        );
      } else if (typeof expected === "string") {
        return wrapThen(jvmDoIfEquals.doIfEquals(wrappedActual, expected), wrap);
      } else {
        return wrapThen(jvmDoIfEquals.doIfEquals(wrappedActual, expected), wrap);
      }
    } else {
      if (typeof expected === "function") {
        return wrapThen(
          jvmDoIfEquals.doIfEquals(actual, wrapCallback(underlyingSessionTo(expected as SessionTo<unknown>))),
          wrap
        );
      } else if (typeof expected === "string") {
        return wrapThen(jvmDoIfEquals.doIfEquals(actual, expected), wrap);
      } else {
        return wrapThen(jvmDoIfEquals.doIfEquals(actual, expected), wrap);
      }
    }
  };
