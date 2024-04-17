import "@gatling.io/jvm-types";
import JvmDoWhileDuring = io.gatling.javaapi.core.loop.DoWhileDuring;

import { Duration, isDuration, toJvmDuration } from "../utils/duration";
import {
  SessionToBoolean,
  underlyingSessionToBoolean,
  SessionToDuration,
  underlyingSessionToDuration
} from "../session";
import { wrapCallback } from "../gatlingJvm/callbacks";

import { On, wrapOn } from "./on";

export interface DoWhileDuringFunction<T extends DoWhileDuring<T>> {
  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, either an integer number of seconds or an object with an explicit time unit
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: Duration): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, either an integer number of seconds or an object with an explicit time unit
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: Duration, counterName: string): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, either an integer number of seconds or an object with an explicit time unit
   * @param exitASAP - if the loop must be interrupted if the condition becomes false or the maximum duration is reached
   * inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: Duration, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, either an integer number of seconds or an object with an explicit time unit
   * @param counterName - the name of the loop counter, as stored in the Session
   * @param exitASAP - if the loop must be interrupted if the condition becomes false or the maximum duration is reached
   * inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: Duration, counterName: string, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, expressed as a function
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: SessionToDuration): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, expressed as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: SessionToDuration, counterName: string): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, expressed as a function
   * @param exitASAP - if the loop must be interrupted if the condition becomes false or the maximum duration is reached
   * inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: SessionToDuration, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, expressed as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @param exitASAP - if the loop must be interrupted if the condition becomes false or the maximum duration is reached
   * inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: SessionToDuration, counterName: string, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, expressed as a Gatling Expression Language String that
   *     must either evaluate to an integer number of seconds or an object with an explicit time unit
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: string): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, expressed as a Gatling Expression Language String that
   *     must either evaluate to an integer number of seconds or an object with an explicit time unit
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: string, counterName: string): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, expressed as a Gatling Expression Language String that
   *     must either evaluate to an integer number of seconds or an object with an explicit time unit
   * @param exitASAP - if the loop must be interrupted if the condition becomes false or the maximum duration is reached
   * inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: string, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @param duration - the maximum duration, expressed as a Gatling Expression Language String that
   *     must either evaluate to an integer number of seconds or an object with an explicit time unit
   * @param counterName - the name of the loop counter, as stored in the Session
   * @param exitASAP - if the loop must be interrupted if the condition becomes false or the maximum duration is reached
   * inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: string, duration: string, counterName: string, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a function
   * @param duration - the maximum duration, either an integer number of seconds or an object with an explicit time unit
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionToBoolean, duration: Duration): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a function
   * @param duration - the maximum duration, either an integer number of seconds or an object with an explicit time unit
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionToBoolean, duration: Duration, counterName: string): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a function
   * @param duration - the maximum duration, either an integer number of seconds or an object with an explicit time unit
   * @param exitASAP - if the loop must be interrupted if the condition becomes false or the maximum duration is reached
   * inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionToBoolean, duration: Duration, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a function
   * @param duration - the maximum duration, either an integer number of seconds or an object with an explicit time unit
   * @param counterName - the name of the loop counter, as stored in the Session
   * @param exitASAP - if the loop must be interrupted if the condition becomes false or the maximum duration is reached
   * inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionToBoolean, duration: Duration, counterName: string, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a function
   * @param duration - the maximum duration, expressed as a function
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionToBoolean, duration: SessionToDuration): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a function
   * @param duration - the maximum duration, expressed as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionToBoolean, duration: SessionToDuration, counterName: string): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a function
   * @param duration - the maximum duration, expressed as a function
   * @param exitASAP - if the loop must be interrupted if the condition becomes false or the maximum duration is reached
   * inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionToBoolean, duration: SessionToDuration, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate as long as the condition holds true and a maximum duration
   * isn't reached. The condition is evaluated at the end of the loop.
   *
   * @param condition - the condition, expressed as a function
   * @param duration - the maximum duration, expressed as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @param exitASAP - if the loop must be interrupted if the condition becomes false or the maximum duration is reached
   * inside the loop
   * @returns a DSL component for defining the loop content
   */
  (condition: SessionToBoolean, duration: SessionToDuration, counterName: string, exitASAP: boolean): On<T>;
}

export interface DoWhileDuring<T extends DoWhileDuring<T>> {
  doWhileDuring: DoWhileDuringFunction<T>;
}

export const doWhileDuringImpl =
  <J2, J1 extends JvmDoWhileDuring<J2, any>, T extends DoWhileDuring<T>>(
    jvmDoWhileDuring: J1,
    wrap: (wrapped: J2) => T
  ) =>
  (
    condition: SessionToBoolean | string,
    duration: Duration | SessionToDuration | string,
    arg2?: string | boolean,
    arg3?: boolean
  ): On<T> => {
    if (arg3 !== undefined && typeof arg2 === "string") {
      // doWhileDuring(condition, duration, counterName, exitASAP)
      if (typeof condition === "function") {
        const wrappedCondition = wrapCallback(underlyingSessionToBoolean(condition));
        if (isDuration(duration)) {
          wrapOn(jvmDoWhileDuring.doWhileDuring(wrappedCondition, toJvmDuration(duration), arg2, arg3), wrap);
        } else if (typeof duration === "function") {
          wrapOn(
            jvmDoWhileDuring.doWhileDuring(
              wrappedCondition,
              wrapCallback(underlyingSessionToDuration(duration)),
              arg2,
              arg3
            ),
            wrap
          );
        }
      } else {
        if (isDuration(duration)) {
          wrapOn(jvmDoWhileDuring.doWhileDuring(condition, toJvmDuration(duration), arg2, arg3), wrap);
        } else if (typeof duration === "function") {
          wrapOn(
            jvmDoWhileDuring.doWhileDuring(condition, wrapCallback(underlyingSessionToDuration(duration)), arg2, arg3),
            wrap
          );
        }
      }
    } else if (typeof arg2 === "string") {
      // doWhileDuring(condition, duration, counterName)
      if (typeof condition === "function") {
        const wrappedCondition = wrapCallback(underlyingSessionToBoolean(condition));
        if (isDuration(duration)) {
          wrapOn(jvmDoWhileDuring.doWhileDuring(wrappedCondition, toJvmDuration(duration), arg2), wrap);
        } else if (typeof duration === "function") {
          wrapOn(
            jvmDoWhileDuring.doWhileDuring(wrappedCondition, wrapCallback(underlyingSessionToDuration(duration)), arg2),
            wrap
          );
        }
      } else {
        if (isDuration(duration)) {
          wrapOn(jvmDoWhileDuring.doWhileDuring(condition, toJvmDuration(duration), arg2), wrap);
        } else if (typeof duration === "function") {
          wrapOn(
            jvmDoWhileDuring.doWhileDuring(condition, wrapCallback(underlyingSessionToDuration(duration)), arg2),
            wrap
          );
        }
      }
    } else if (typeof arg2 === "boolean") {
      // doWhileDuring(condition, duration, exitASAP)
      if (typeof condition === "function") {
        const wrappedCondition = wrapCallback(underlyingSessionToBoolean(condition));
        if (isDuration(duration)) {
          wrapOn(jvmDoWhileDuring.doWhileDuring(wrappedCondition, toJvmDuration(duration), arg2), wrap);
        } else if (typeof duration === "function") {
          wrapOn(
            jvmDoWhileDuring.doWhileDuring(wrappedCondition, wrapCallback(underlyingSessionToDuration(duration)), arg2),
            wrap
          );
        }
      } else {
        if (isDuration(duration)) {
          wrapOn(jvmDoWhileDuring.doWhileDuring(condition, toJvmDuration(duration), arg2), wrap);
        } else if (typeof duration === "function") {
          wrapOn(
            jvmDoWhileDuring.doWhileDuring(condition, wrapCallback(underlyingSessionToDuration(duration)), arg2),
            wrap
          );
        }
      }
    } else if (arg2 === undefined) {
      // doWhileDuring(condition, duration)
      if (typeof condition === "function") {
        const wrappedCondition = wrapCallback(underlyingSessionToBoolean(condition));
        if (isDuration(duration)) {
          wrapOn(jvmDoWhileDuring.doWhileDuring(wrappedCondition, toJvmDuration(duration)), wrap);
        } else if (typeof duration === "function") {
          wrapOn(
            jvmDoWhileDuring.doWhileDuring(wrappedCondition, wrapCallback(underlyingSessionToDuration(duration))),
            wrap
          );
        }
      } else {
        if (isDuration(duration)) {
          wrapOn(jvmDoWhileDuring.doWhileDuring(condition, toJvmDuration(duration)), wrap);
        } else if (typeof duration === "function") {
          wrapOn(jvmDoWhileDuring.doWhileDuring(condition, wrapCallback(underlyingSessionToDuration(duration))), wrap);
        }
      }
    }

    throw Error(`doWhileDuring() called with invalid arguments ${condition}, ${duration}, ${arg2}, ${arg3}`);
  };
