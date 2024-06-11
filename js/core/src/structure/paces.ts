import { Duration, isDuration, toJvmDuration } from "../utils/duration";
import { SessionTo, underlyingSessionToDuration } from "../session";

import JvmPaces = io.gatling.javaapi.core.pause.Paces;

export interface PaceFunction<T extends Paces<T>> {
  /**
   * Attach a pace action
   *
   * @param duration - the duration of the pace, in seconds or with an explicit time unit
   * @returns a new StructureBuilder
   */
  (duration: Duration): T;

  /**
   * Attach a pace action where the duration is defined as a Gatling Expression Language string. This expression must
   * resolve to either a number, then the unit will be seconds, or an object with an explicit time unit.
   *
   * @param duration - the duration of the pace
   * @returns a new StructureBuilder
   */
  (duration: string): T;

  /**
   * Attach a pace action
   *
   * @param duration - the duration of the pace as a function
   * @returns a new StructureBuilder
   */
  (duration: SessionTo<Duration>): T;

  /**
   * Attach a pace action
   *
   * @param duration - the duration of the pace, in seconds or with an explicit time unit
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a new StructureBuilder
   */
  (duration: Duration, counterName: string): T;

  /**
   * Attach a pace action where the duration is defined as a Gatling Expression Language string. This expression must
   * resolve to either a number, then the unit will be seconds, or an object with an explicit time unit.
   *
   * @param duration - the duration of the pace
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a new StructureBuilder
   */
  (duration: string, counterName: string): T;

  /**
   * Attach a pace action
   *
   * @param duration - the duration of the pace as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a new StructureBuilder
   */
  (duration: SessionTo<Duration>, counterName: string): T;

  /**
   * Attach a pace action where the duration is random between 2 bounds
   *
   * @param min - the duration of the pace, in seconds or with an explicit time unit
   * @param max - the duration of the pace, in seconds or with an explicit time unit
   * @returns a new StructureBuilder
   */
  (min: Duration, max: Duration): T;

  /**
   * Attach a pace action where the duration is random between 2 bounds
   *
   * @param min - the duration of the pace as a function
   * @param max - the duration of the pace as a function
   * @returns a new StructureBuilder
   */
  (min: SessionTo<Duration>, max: SessionTo<Duration>): T;

  /**
   * Attach a pace action where the duration is random between 2 bounds
   *
   * @param min - the duration of the pace, in seconds or with an explicit time unit
   * @param max - the duration of the pace, in seconds or with an explicit time unit
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a new StructureBuilder
   */
  (min: Duration, max: Duration, counterName: string): T;

  /**
   * Attach a pace action where the duration is random between 2 bounds as Gatling Expression Language strings. These
   * expressions must resolve to either a number, then the unit will be seconds, or an object with an explicit time unit.
   *
   * @param min - the duration of the pace
   * @param max - the duration of the pace
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a new StructureBuilder
   */
  (min: string, max: string, counterName: string): T;

  /**
   * Attach a pace action where the duration is random between 2 bounds
   *
   * @param min - the duration of the pace as a function
   * @param max - the duration of the pace as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a new StructureBuilder
   */
  (min: SessionTo<Duration>, max: SessionTo<Duration>, counterName: string): T;
}

export interface Paces<T extends Paces<T>> {
  pace: PaceFunction<T>;
}

export const paceImpl =
  <J2, J1 extends JvmPaces<J2, any>, T extends Paces<T>>(jvmGroups: J1, wrap: (wrapped: J2) => T): PaceFunction<T> =>
  (arg0: Duration | SessionTo<Duration> | string, arg1?: Duration | SessionTo<Duration> | string, arg2?: string) => {
    if (arg2 !== undefined) {
      // pace(min, max, counterName)
      if (typeof arg0 === "string" && typeof arg1 === "string") {
        return wrap(jvmGroups.pace(arg0, arg1, arg2));
      } else if (typeof arg0 === "function" && typeof arg1 === "function") {
        return wrap(jvmGroups.pace(underlyingSessionToDuration(arg0), underlyingSessionToDuration(arg1), arg2));
      } else if (isDuration(arg0) && isDuration(arg1)) {
        return wrap(jvmGroups.pace(toJvmDuration(arg0), toJvmDuration(arg1), arg2));
      }
    } else if (arg1 !== undefined) {
      if (typeof arg1 === "string") {
        // pace(duration, counterName)
        if (typeof arg0 === "string") {
          return wrap(jvmGroups.pace(arg0, arg1));
        } else if (typeof arg0 === "function") {
          return wrap(jvmGroups.pace(underlyingSessionToDuration(arg0), arg1));
        } else if (isDuration(arg0)) {
          return wrap(jvmGroups.pace(toJvmDuration(arg0), arg1));
        }
      } else {
        // pace(min, max)
        if (typeof arg0 === "function" && typeof arg1 === "function") {
          return wrap(jvmGroups.pace(underlyingSessionToDuration(arg0), underlyingSessionToDuration(arg1)));
        } else if (isDuration(arg0) && isDuration(arg1)) {
          return wrap(jvmGroups.pace(toJvmDuration(arg0), toJvmDuration(arg1)));
        }
      }
    } else {
      // pace(duration)
      if (typeof arg0 === "string") {
        return wrap(jvmGroups.pace(arg0));
      } else if (typeof arg0 === "function") {
        return wrap(jvmGroups.pace(underlyingSessionToDuration(arg0)));
      } else if (isDuration(arg0)) {
        return wrap(jvmGroups.pace(toJvmDuration(arg0)));
      }
    }

    throw Error(`pace() called with invalid arguments ${arg0}, ${arg1}, ${arg2}`);
  };
