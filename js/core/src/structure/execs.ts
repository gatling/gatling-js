import { Worker } from "worker_threads";

import { Wrapper } from "../common";
import { Session, SessionTransform, underlyingSessionTransform, wrapSession } from "../session";

import { LinkedBlockingDeque } from "@gatling.io/jvm-types";

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

export interface Execs<T extends Execs<T>> {
  exec: ExecFunction<T>;
  execNode: (executable: SessionTransform) => T;
}

export const execImpl =
  <J2, J1 extends JvmExecs<J2, any>, T extends Execs<T>>(jvmExecs: J1, wrap: (wrapped: J2) => T): ExecFunction<T> =>
  (arg0: Executable<any> | SessionTransform, ...arg1: Array<Executable<any>>) =>
    wrap(
      typeof arg0 === "function"
        ? jvmExecs.exec(underlyingSessionTransform(arg0)) // arg0: SessionTransform
        : jvmExecs.exec(arg0._underlying, ...arg1.map((e) => e._underlying)) // arg0: Executable, ...arg1: Executable[]
    );

const println = Java.type<any>("java.lang.System").out.println;

const queue = new LinkedBlockingDeque();
new Worker(`
  const { workerData, parentPort } = require('worker_threads');
  const println = Java.type("java.lang.System").out.println;
  while (true) {
    println("before take");
    const data = workerData.queue.take();
    try {
      println("after take");
      throw Error("lol"); // works here, but not if called from the \`executable\` callback
      data.onComplete(data.newSession());
      println("after onComplete");
    } catch (e) {
      println("ERROR in worker thread: " + e.message);
      println("ERROR in worker thread: " + e.stack);
      data.onError("Error: " + e.message);
    }
  }`,
  { eval: true, workerData: { queue } }
);

export const execNodeImpl =
  <J2, J1 extends JvmExecs<J2, any>, T extends Execs<T>>(
    jvmExecs: J1,
    wrap: (wrapped: J2) => T
  ) => (executable: SessionTransform): T =>
    wrap(jvmExecs.execAsync2((session, callback) => {
      const onComplete = (newSession: Session) =>
        callback(newSession._underlying, null as any);
      const onError = (msg: string) => {
        println("onError: " + msg);
        callback(null as any, msg as any);
      }
      queue.offer({ newSession: () => executable(wrapSession(session)), onComplete, onError });
    }));
