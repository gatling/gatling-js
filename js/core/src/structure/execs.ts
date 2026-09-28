import { Wrapper } from "../common";
import { SessionTo, SessionTransform, underlyingSessionTo, underlyingSessionTransform } from "../session";

import JvmActionBuilder = io.gatling.javaapi.core.ActionBuilder;
import JvmExecs = io.gatling.javaapi.core.exec.Execs;
import JvmExecutable = io.gatling.javaapi.core.exec.Executable;

export interface Executable<T extends JvmExecutable> extends Wrapper<T> {}

export interface ActionBuilder extends Executable<JvmActionBuilder> {}

export const wrapActionBuilder = (_underlying: JvmActionBuilder): ActionBuilder => ({
  _underlying
});

export interface ExecFunction<T extends Execs<T>> {
  /**
   * Attach some `Executable`s. Chains will be attached sequentially.
   *
   * @example
   * ```ts
   * const chain1: ChainBuilder = ???
   * const chain2: ChainBuilder = ???
   * const chain1ThenChain2 = exec(chain1, chain2)
   * ```
   *
   * @param executable - some `ChainBuilder` or `ActionBuilder`
   * @param executables - other `ChainBuilder`s or `ActionBuilder`s
   * @returns a new `StructureBuilder`
   */
  (executable: Executable<any>, ...executables: Array<Executable<any>>): T;

  /**
   * Attach a new action that will execute a function. Important: the function must only perform
   * fast in-memory operations. In particular, it mustn't perform any long block I/O operation, or
   * it will hurt Gatling performance badly.
   *
   * @example
   * ```ts
   * exec(session => session.set("foo", "bar"))
   * ```
   *
   * @param executable - the function
   * @returns a new `StructureBuilder`
   */
  (executable: SessionTransform): T;
}

export interface SetInSessionFunction<T extends Execs<T>> {
  /**
   * Attach a new action that will evaluate a Gatling Expression Language String and store the
   * result in the Session. Typically useful when the expression is non-deterministic, eg random,
   * and its result must be used in multiple places.
   *
   * @example
   * ```ts
   * setInSession("#{randomUuid()}", "uuid")
   * ```
   *
   * @param input - the value to store, expressed as a Gatling Expression Language String
   * @param attributeName - the name of the attribute to store the value into
   * @returns a new StructureBuilder
   */
  (input: string, attributeName: string): T;

  /**
   * Attach a new action that will evaluate a function and store the result in the Session.
   * Important: the function must only perform fast in-memory operations.
   *
   * @example
   * ```ts
   * setInSession(session -> UUID.randomUUID().toString(), "uuid")
   * ```
   *
   * @param input - the value to store, expressed as a function
   * @param attributeName - the name of the attribute to store the value into
   * @returns a new StructureBuilder
   */
  (input: SessionTo<unknown>, attributeName: string): T;
}

export interface Execs<T extends Execs<T>> {
  exec: ExecFunction<T>;
  setInSession: SetInSessionFunction<T>;
}

export const execImpl =
  <J2, J1 extends JvmExecs<J2, any>, T extends Execs<T>>(jvmExecs: J1, wrap: (wrapped: J2) => T): ExecFunction<T> =>
  (arg0: Executable<any> | SessionTransform, ...arg1: Array<Executable<any>>) =>
    wrap(
      typeof arg0 === "function"
        ? jvmExecs.exec(underlyingSessionTransform(arg0)) // arg0: SessionTransform
        : jvmExecs.exec(arg0._underlying, ...arg1.map((e) => e._underlying)) // arg0: Executable, ...arg1: Executable[]
    );

export const setInSessionImpl =
  <J2, J1 extends JvmExecs<J2, any>, T extends Execs<T>>(
    jvmExecs: J1,
    wrap: (wrapped: J2) => T
  ): SetInSessionFunction<T> =>
  (input, attributeName) =>
    wrap(
      typeof input === "function"
        ? jvmExecs.setInSession(underlyingSessionTo(input), attributeName)
        : jvmExecs.setInSession(input, attributeName)
    );
