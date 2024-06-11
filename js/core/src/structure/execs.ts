import { Wrapper } from "../common";
import { SessionTransform, underlyingSessionTransform } from "../session";

import JvmActionBuilder = io.gatling.javaapi.core.ActionBuilder;
import JvmExecs = io.gatling.javaapi.core.exec.Execs;
import JvmExecutable = io.gatling.javaapi.core.exec.Executable;

export interface Executable<T extends JvmExecutable> extends Wrapper<T> {}

export interface ActionBuilder extends Executable<JvmActionBuilder> {}

export const wrapActionBuilder = (_underlying: JvmActionBuilder): ActionBuilder => ({
  _underlying
});

// interface JvmExecs {
//   exec<T>(arg0: JvmExecutable, ...arg1: JvmExecutable[]): T;
//   exec<T>(arg0: JvmChainBuilder[]): T;
//   exec<T>(arg0: Func<JvmSession, JvmSession>): T;
// }

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

export interface Execs<T extends Execs<T>> {
  exec: ExecFunction<T>;
}

export const execImpl =
  <J2, J1 extends JvmExecs<J2, any>, T extends Execs<T>>(jvmExecs: J1, wrap: (wrapped: J2) => T): ExecFunction<T> =>
  (arg0: Executable<any> | SessionTransform, ...arg1: Array<Executable<any>>) =>
    wrap(
      typeof arg0 === "function"
        ? jvmExecs.exec(underlyingSessionTransform(arg0)) // arg0: SessionTransform
        : jvmExecs.exec(arg0._underlying, ...arg1.map((e) => e._underlying)) // arg0: Executable, ...arg1: Executable[]
    );
