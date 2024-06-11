import { SessionTo, underlyingSessionTo } from "../session";
import { Executable } from "./execs";

import JvmDoIfOrElse = io.gatling.javaapi.core.condition.DoIfOrElse;
import JvmDoIfEqualsOrElse = io.gatling.javaapi.core.condition.DoIfEqualsOrElse;
import JvmExecutable = io.gatling.javaapi.core.exec.Executable;

interface JvmThen<T> {
  then(executable: JvmExecutable, ...executables: JvmExecutable[]): JvmOrElse<T>;
}

export interface Then<T> {
  then(executable: Executable<any>, ...executables: Executable<any>[]): OrElse<T>;
}

const wrapThen = <J, T>(jvmThen: JvmThen<J>, wrap: (underlying: J) => T): Then<T> => ({
  then: (executable: Executable<any>, ...executables: Executable<any>[]): OrElse<T> =>
    wrapOrElse(jvmThen.then(executable._underlying, ...executables.map((e) => e._underlying)), wrap)
});

interface JvmOrElse<T> {
  orElse(executable: JvmExecutable, ...executables: JvmExecutable[]): T;
}

export interface OrElse<T> {
  orElse(executable: Executable<any>, ...executables: Executable<any>[]): T;
}

const wrapOrElse = <J, T>(jvmOrElse: JvmOrElse<J>, wrap: (underlying: J) => T): OrElse<T> => ({
  orElse: (executable: Executable<any>, ...executables: Executable<any>[]): T =>
    wrap(jvmOrElse.orElse(executable._underlying, ...executables.map((e) => e._underlying)))
});

export interface DoIfOrElseFunction<T extends DoIfOrElse<T>> {
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

export interface DoIfOrElse<T extends DoIfOrElse<T>> {
  doIfOrElse: DoIfOrElseFunction<T>;
}

export const doIfOrElseImpl =
  <J2, J1 extends JvmDoIfOrElse<J2, any>, T extends DoIfOrElse<T>>(
    jvmDoIfOrElse: J1,
    wrap: (wrapped: J2) => T
  ): DoIfOrElseFunction<T> =>
  (condition: string | SessionTo<boolean>) =>
    wrapThen(
      typeof condition === "function"
        ? jvmDoIfOrElse.doIfOrElse(underlyingSessionTo(condition))
        : jvmDoIfOrElse.doIfOrElse(condition),
      wrap
    );

export interface DoIfEqualsOrElseFunction<T extends DoIfEqualsOrElse<T>> {
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
   * @param actual - the actual value expressed as a function
   * @param expected - the expected value expressed as a Gatling Expression Language String
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

export interface DoIfEqualsOrElse<T extends DoIfEqualsOrElse<T>> {
  doIfEqualsOrElse: DoIfEqualsOrElseFunction<T>;
}

export const doIfEqualsOrElseImpl =
  <J2, J1 extends JvmDoIfEqualsOrElse<J2, any>, T extends DoIfEqualsOrElse<T>>(
    jvmDoIfEqualsOrElse: J1,
    wrap: (wrapped: J2) => T
  ): DoIfEqualsOrElseFunction<T> =>
  (actual: string | SessionTo<unknown>, expected: string | SessionTo<unknown> | unknown) => {
    if (typeof actual === "function") {
      const wrappedActual = underlyingSessionTo(actual);
      if (typeof expected === "function") {
        return wrapThen(
          jvmDoIfEqualsOrElse.doIfEqualsOrElse(wrappedActual, underlyingSessionTo(expected as SessionTo<unknown>)),
          wrap
        );
      } else if (typeof expected === "string") {
        return wrapThen(jvmDoIfEqualsOrElse.doIfEqualsOrElse(wrappedActual, expected), wrap);
      } else {
        return wrapThen(jvmDoIfEqualsOrElse.doIfEqualsOrElse(wrappedActual, expected), wrap);
      }
    } else {
      if (typeof expected === "function") {
        return wrapThen(
          jvmDoIfEqualsOrElse.doIfEqualsOrElse(actual, underlyingSessionTo(expected as SessionTo<unknown>)),
          wrap
        );
      } else if (typeof expected === "string") {
        return wrapThen(jvmDoIfEqualsOrElse.doIfEqualsOrElse(actual, expected), wrap);
      } else {
        return wrapThen(jvmDoIfEqualsOrElse.doIfEqualsOrElse(actual, expected), wrap);
      }
    }
  };
