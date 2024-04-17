import JvmExecutable = io.gatling.javaapi.core.exec.Executable;

import { Executable } from "./execs";

interface JvmOn<T> {
  // In the Java DSL, there is a different On class for each type of condition/loop, but the signature of the on method
  // remains the same.
  on(arg0: JvmExecutable, ...arg1: JvmExecutable[]): T;
  equals(arg0: any /*java.lang.Object*/): boolean;
  toString(): string;
}

export interface On<T> {
  on(executable: Executable<any>, ...executables: Executable<any>[]): T;
}

export const wrapOn = <J, T>(jvmOn: JvmOn<J>, wrap: (underlying: J) => T): On<T> => ({
  on: (executable: Executable<any>, ...executables: Executable<any>[]): T =>
    wrap(jvmOn.on(executable._underlying, ...executables.map((e) => e._underlying)))
});
