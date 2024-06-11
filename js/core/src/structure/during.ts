import { Duration, isDuration, toJvmDuration } from "../utils/duration";
import { SessionTo, underlyingSessionToDuration } from "../session";
import { On, wrapOn } from "./on";

import JvmDuring = io.gatling.javaapi.core.loop.During;

export interface DuringFunction<T extends During<T>> {
  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration, in seconds or with an explicit time unit
   * @returns a DSL component for defining the loop content
   */
  (duration: Duration): On<T>;

  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration, in seconds or with an explicit time unit
   * @param exitASAP - if the loop must be interrupted if the max duration is reached inside the loop
   * @returns a DSL component for defining the loop content
   */
  (duration: Duration, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration, in seconds or with an explicit time unit
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (duration: Duration, counterName: string): On<T>;

  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration, in seconds or with an explicit time unit
   * @param counterName - the name of the loop counter, as stored in the Session
   * @param exitASAP - if the loop must be interrupted if the max duration is reached inside the loop
   * @returns a DSL component for defining the loop content
   */
  (duration: Duration, counterName: string, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration as a Gatling Expression Language string. This expression must resolve to
   * either a number, then the unit will be seconds, or an object with an explicit time unit.
   * @returns a DSL component for defining the loop content
   */
  (duration: string): On<T>;

  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration as a Gatling Expression Language string. This expression must resolve to
   * either a number, then the unit will be seconds, or an object with an explicit time unit.
   * @param exitASAP - if the loop must be interrupted if the max duration is reached inside the loop
   * @returns a DSL component for defining the loop content
   */
  (duration: string, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration as a Gatling Expression Language string. This expression must resolve to
   * either a number, then the unit will be seconds, or an object with an explicit time unit.
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (duration: string, counterName: string): On<T>;

  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration as a Gatling Expression Language string. This expression must resolve to
   * either a number, then the unit will be seconds, or an object with an explicit time unit.
   * @param counterName - the name of the loop counter, as stored in the Session
   * @param exitASAP - if the loop must be interrupted if the max duration is reached inside the loop
   * @returns a DSL component for defining the loop content
   */
  (duration: string, counterName: string, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration as a function
   * @returns a DSL component for defining the loop content
   */
  (duration: SessionTo<Duration>): On<T>;

  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration as a function
   * @param exitASAP - if the loop must be interrupted if the max duration is reached inside the loop
   * @returns a DSL component for defining the loop content
   */
  (duration: SessionTo<Duration>, exitASAP: boolean): On<T>;

  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (duration: SessionTo<Duration>, counterName: string): On<T>;

  /**
   * Define a loop that will iterate for a given duration. The condition is evaluated at the end of
   * the loop.
   *
   * @param duration - the maximum duration as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @param exitASAP - if the loop must be interrupted if the max duration is reached inside the loop
   * @returns a DSL component for defining the loop content
   */
  (duration: SessionTo<Duration>, counterName: string, exitASAP: boolean): On<T>;
}

export interface During<T extends During<T>> {
  during: DuringFunction<T>;
}

export const duringImpl =
  <J2, J1 extends JvmDuring<J2, any>, T extends During<T>>(
    jvmDuring: J1,
    wrap: (wrapped: J2) => T
  ): DuringFunction<T> =>
  (duration: Duration | SessionTo<Duration> | string, arg1?: boolean | string, arg2?: boolean) => {
    if (arg2 !== undefined && typeof arg1 === "string") {
      // during(duration, counterName, exitASAP)
      if (isDuration(duration)) {
        return wrapOn(jvmDuring.during(toJvmDuration(duration), arg1, arg2), wrap);
      } else if (typeof duration === "function") {
        return wrapOn(jvmDuring.during(underlyingSessionToDuration(duration), arg1, arg2), wrap);
      } else {
        return wrapOn(jvmDuring.during(duration, arg1, arg2), wrap);
      }
    } else if (typeof arg1 === "string") {
      // during(duration, counterName)
      if (isDuration(duration)) {
        return wrapOn(jvmDuring.during(toJvmDuration(duration), arg1), wrap);
      } else if (typeof duration === "function") {
        return wrapOn(jvmDuring.during(underlyingSessionToDuration(duration), arg1), wrap);
      } else {
        return wrapOn(jvmDuring.during(duration, arg1), wrap);
      }
    } else if (typeof arg1 === "boolean") {
      // during(duration, exitASAP)
      if (isDuration(duration)) {
        return wrapOn(jvmDuring.during(toJvmDuration(duration), arg1), wrap);
      } else if (typeof duration === "function") {
        return wrapOn(jvmDuring.during(underlyingSessionToDuration(duration), arg1), wrap);
      } else {
        return wrapOn(jvmDuring.during(duration, arg1), wrap);
      }
    } else if (arg1 === undefined) {
      // during(duration)
      if (isDuration(duration)) {
        return wrapOn(jvmDuring.during(toJvmDuration(duration)), wrap);
      } else if (typeof duration === "function") {
        return wrapOn(jvmDuring.during(underlyingSessionToDuration(duration)), wrap);
      } else {
        return wrapOn(jvmDuring.during(duration), wrap);
      }
    }

    throw Error(`during() called with invalid arguments ${duration}, ${arg1}, ${arg2}`);
  };
