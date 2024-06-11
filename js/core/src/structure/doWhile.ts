import { SessionTo, underlyingSessionTo } from "../session";
import { On, wrapOn } from "./on";

import JvmDoWhile = io.gatling.javaapi.core.loop.DoWhile;

export interface DoWhileFunction<T extends DoWhile<T>> {
  /**
   * Define a loop that will iterate as long as the condition holds true. The condition is evaluated
   * at the end of the loop.
   *
   * @param condition the condition, expressed as a Gatling Expression Language String
   * @param counterName the name of the loop counter, as stored in the Session
   * @return a DSL component for defining the loop content
   */
  (condition: string, counterName?: string): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true. The condition is evaluated
   * at the end of the loop.
   *
   * @param condition the condition, expressed as a function
   * @param counterName the name of the loop counter, as stored in the Session
   * @return a DSL component for defining the loop content
   */
  (condition: SessionTo<boolean>, counterName?: string): On<T>;
}

export interface DoWhile<T extends DoWhile<T>> {
  doWhile: DoWhileFunction<T>;
}

export const doWhileImpl =
  <J2, J1 extends JvmDoWhile<J2, any>, T extends DoWhile<T>>(
    jvmDoWhile: J1,
    wrap: (wrapped: J2) => T
  ): DoWhileFunction<T> =>
  (condition: SessionTo<boolean> | string, counterName?: string) => {
    if (counterName !== undefined) {
      // doWhile(condition, counterName)
      if (typeof condition === "function") {
        return wrapOn(jvmDoWhile.doWhile(underlyingSessionTo(condition), counterName), wrap);
      } else {
        return wrapOn(jvmDoWhile.doWhile(condition, counterName), wrap);
      }
    } else {
      // doWhile(condition)
      if (typeof condition === "function") {
        return wrapOn(jvmDoWhile.doWhile(underlyingSessionTo(condition)), wrap);
      } else {
        return wrapOn(jvmDoWhile.doWhile(condition), wrap);
      }
    }
  };
