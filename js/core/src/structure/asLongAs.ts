import { SessionTo, underlyingSessionTo } from "../session";
import { On, wrapOn } from "./on";

import JvmAsLongAs = io.gatling.javaapi.core.loop.AsLongAs;

export interface AsLongAsFunction<T extends AsLongAs<T>> {
  /**
   * Define a loop that will iterate as long as the condition holds true
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @returns a DSL component for defining the loop content
   */
  (condition: string): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param exitASAP - if the loop must be interrupted if the condition becomes false inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: string, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (condition: string, counterName: string): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param counterName - the name of the loop counter, as stored in the Session
   * @param exitASAP - if the loop must be interrupted if the condition becomes false inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: string, counterName: string, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true
   *
   * @param condition - the condition, expressed as a function
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionTo<boolean>): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true
   *
   * @param condition - the condition, expressed as a function
   * @param exitASAP - if the loop must be interrupted if the condition becomes false inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionTo<boolean>, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true
   *
   * @param condition - the condition, expressed as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionTo<boolean>, counterName: string): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true
   *
   * @param condition - the condition, expressed as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @param exitASAP - if the loop must be interrupted if the condition becomes false inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionTo<boolean>, counterName: string, exitASAP: boolean): On<T>;
}

export interface AsLongAs<T extends AsLongAs<T>> {
  asLongAs: AsLongAsFunction<T>;
}

export const asLongAsImpl =
  <J2, J1 extends JvmAsLongAs<J2, any>, T extends AsLongAs<T>>(
    jvmAsLongAs: J1,
    wrap: (wrapped: J2) => T
  ): AsLongAsFunction<T> =>
  (condition: SessionTo<boolean> | string, arg1?: boolean | string, arg2?: boolean) => {
    if (arg2 !== undefined && typeof arg1 === "string") {
      // asLongAs(condition, counterName, exitASAP)
      if (typeof condition === "function") {
        return wrapOn(jvmAsLongAs.asLongAs(underlyingSessionTo(condition), arg1, arg2), wrap);
      } else {
        return wrapOn(jvmAsLongAs.asLongAs(condition, arg1, arg2), wrap);
      }
    } else if (typeof arg1 === "string") {
      // asLongAs(condition, counterName)
      if (typeof condition === "function") {
        return wrapOn(jvmAsLongAs.asLongAs(underlyingSessionTo(condition), arg1), wrap);
      } else {
        return wrapOn(jvmAsLongAs.asLongAs(condition, arg1), wrap);
      }
    } else if (typeof arg1 === "boolean") {
      // asLongAs(condition, exitASAP)
      if (typeof condition === "function") {
        return wrapOn(jvmAsLongAs.asLongAs(underlyingSessionTo(condition), arg1), wrap);
      } else {
        return wrapOn(jvmAsLongAs.asLongAs(condition, arg1), wrap);
      }
    } else if (arg1 === undefined) {
      // asLongAs(condition)
      if (typeof condition === "function") {
        return wrapOn(jvmAsLongAs.asLongAs(underlyingSessionTo(condition)), wrap);
      } else {
        return wrapOn(jvmAsLongAs.asLongAs(condition), wrap);
      }
    }

    throw Error(`asLongAs() called with invalid arguments ${condition}, ${arg1}, ${arg2}`);
  };
