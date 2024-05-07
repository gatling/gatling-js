import { CheckBuilder } from "../checks";

import JvmCheckBuilder = io.gatling.javaapi.core.CheckBuilder;

interface JvmCondition<T> {
  equals(arg0: any /*java.lang.Object*/): boolean;
  then(...arg0: JvmCheckBuilder[]): T;
  then(arg0: java.util.List<JvmCheckBuilder>): T;
  toString(): string;
}

export interface Condition<T> {
  /**
   * Define the checks to apply when the condition holds true.
   *
   * @param thenChecks - the checks
   * @returns a new HttpProtocolBuilder instance
   */
  then(...thenChecks: CheckBuilder[]): T;
}

export const wrapCondition = <J, T>(jvmCondition: JvmCondition<J>, wrap: (underlying: J) => T): Condition<T> => ({
  then: (...thenChecks: CheckBuilder[]): T => wrap(jvmCondition.then(thenChecks.map((c) => c._underlying)))
});
