import "@gatling.io/jvm-types";
import JvmAsLongAs = io.gatling.javaapi.core.loop.AsLongAs;

import { SessionToBoolean, underlyingSessionToBoolean } from "../session";
import { wrapCallback } from "../gatlingJvm/callbacks";

import { On, wrapOn } from "./on";

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
  (condition: SessionToBoolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true
   *
   * @param condition - the condition, expressed as a function
   * @param exitASAP - if the loop must be interrupted if the condition becomes false inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionToBoolean, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true
   *
   * @param condition - the condition, expressed as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionToBoolean, counterName: string): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true
   *
   * @param condition - the condition, expressed as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @param exitASAP - if the loop must be interrupted if the condition becomes false inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionToBoolean, counterName: string, exitASAP: boolean): On<T>;
}

export interface AsLongAs<T extends AsLongAs<T>> {
  asLongAs: AsLongAsFunction<T>;
}

export const asLongAsImpl =
  <J2, J1 extends JvmAsLongAs<J2, any>, T extends AsLongAs<T>>(jvmAsLongAs: J1, wrap: (wrapped: J2) => T) =>
  (condition: SessionToBoolean | string, arg1?: boolean | string, arg2?: boolean): On<T> => {
    if (arg2 !== undefined && typeof arg1 === "string") {
      // asLongAs(condition, counterName, exitASAP)
      if (typeof condition === "function") {
        wrapOn(jvmAsLongAs.asLongAs(wrapCallback(underlyingSessionToBoolean(condition)), arg1, arg2), wrap);
      } else {
        wrapOn(jvmAsLongAs.asLongAs(condition, arg1, arg2), wrap);
      }
    } else if (typeof arg1 === "string") {
      // asLongAs(condition, counterName)
      if (typeof condition === "function") {
        wrapOn(jvmAsLongAs.asLongAs(wrapCallback(underlyingSessionToBoolean(condition)), arg1), wrap);
      } else {
        wrapOn(jvmAsLongAs.asLongAs(condition, arg1), wrap);
      }
    } else if (typeof arg1 === "boolean") {
      // asLongAs(condition, exitASAP)
      if (typeof condition === "function") {
        wrapOn(jvmAsLongAs.asLongAs(wrapCallback(underlyingSessionToBoolean(condition)), arg1), wrap);
      } else {
        wrapOn(jvmAsLongAs.asLongAs(condition, arg1), wrap);
      }
    } else if (arg1 === undefined) {
      // asLongAs(condition)
      if (typeof condition === "function") {
        wrapOn(jvmAsLongAs.asLongAs(wrapCallback(underlyingSessionToBoolean(condition))), wrap);
      } else {
        wrapOn(jvmAsLongAs.asLongAs(condition), wrap);
      }
    }

    throw Error(`asLongAs() called with invalid arguments ${condition}, ${arg1}, ${arg2}`);
  };
