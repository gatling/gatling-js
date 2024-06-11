import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";
import JvmPauses = io.gatling.javaapi.core.pause.Pauses;
import JvmPauseType = io.gatling.javaapi.core.PauseType;

import { Duration, isDuration, toJvmDuration } from "../utils/duration";
import { SessionTo, underlyingSessionTo, underlyingSessionToDuration } from "../session";

export type PauseType =
  | "Disabled"
  | "Constant"
  | "Exponential"
  | { type: "NormalWithPercentageDuration"; stdDev: number }
  | { type: "NormalWithStdDevDuration"; stdDev: Duration }
  | { type: "Custom"; f: SessionTo<number> }
  | { type: "UniformPercentage"; plusOrMinus: number }
  | { type: "UniformDuration"; plusOrMinus: Duration };

const isPauseType = (x: unknown): x is PauseType =>
  x === "Disabled" || x === "Constant" || x === "Exponential" || typeof (x as any).type === "string";

export const toJvmPauseType = (pauseType: PauseType): JvmPauseType => {
  if (pauseType === "Disabled") {
    // FIXME find better solution for generating static field definitions in java2typescript (without conflicting
    //  with methods of the same name, e.g. 'JvmHttpDsl.http' vs. 'JvmHttpDsl.http(String)')
    return (JvmCoreDsl as any).disabledPauses;
  } else if (pauseType === "Constant") {
    return (JvmCoreDsl as any).constantPauses;
  } else if (pauseType === "Exponential") {
    return (JvmCoreDsl as any).exponentialPauses;
  } else if (pauseType.type === "NormalWithPercentageDuration") {
    return JvmCoreDsl.normalPausesWithPercentageDuration(pauseType.stdDev);
  } else if (pauseType.type === "NormalWithStdDevDuration") {
    return JvmCoreDsl.normalPausesWithStdDevDuration(toJvmDuration(pauseType.stdDev));
  } else if (pauseType.type === "Custom") {
    return JvmCoreDsl.customPauses(underlyingSessionTo(pauseType.f));
  } else if (pauseType.type === "UniformPercentage") {
    return JvmCoreDsl.uniformPausesPlusOrMinusPercentage(pauseType.plusOrMinus);
  } else if (pauseType.type === "UniformDuration") {
    return JvmCoreDsl.uniformPausesPlusOrMinusDuration(toJvmDuration(pauseType.plusOrMinus));
  }
  throw Error(`Unhandled pause type ${pauseType}`);
};

export interface PauseFunction<T extends Pauses<T>> {
  /**
   * Attach a pause
   *
   * @param duration - the pause duration, in seconds or with an explicit time unit
   * @returns a new StructureBuilder
   */
  (duration: Duration): T;

  /**
   * Attach a pause as a Gatling Expression Language string. This expression must resolve to either a number, then the
   * unit will be seconds, or an object with an explicit time unit.
   *
   * @param duration - the pause duration as a Gatling Expression Language string
   * @returns a new StructureBuilder
   */
  (duration: string): T;

  /**
   * Attach a pause
   *
   * @param duration - the pause duration as a function
   * @returns a new StructureBuilder
   */
  (duration: SessionTo<Duration>): T;

  /**
   * Attach a pause
   *
   * @param duration - the pause duration, in seconds or with an explicit time unit
   * @param pauseType - the type of pause
   * @returns a new StructureBuilder
   */
  (duration: Duration, pauseType: PauseType): T;

  /**
   * Attach a pause as a Gatling Expression Language string. This expression must resolve to either a number, then the
   * unit will be seconds, or an object with an explicit time unit.
   *
   * @param duration - the pause duration as a Gatling Expression Language string
   * @param pauseType - the type of pause
   * @returns a new StructureBuilder
   */
  (duration: string, pauseType: PauseType): T;

  /**
   * Attach a pause
   *
   * @param duration - the pause duration as a function
   * @param pauseType - the type of pause
   * @returns a new StructureBuilder
   */
  (duration: SessionTo<Duration>, pauseType: PauseType): T;

  /**
   * Attach a pause computed randomly between 2 values
   *
   * @param min the pause minimum, in seconds or with an explicit time unit
   * @param max the pause maximum, in seconds or with an explicit time unit
   * @return a new StructureBuilder
   */
  (min: Duration, max: Duration): T;
  /**
   * Attach a pause computed randomly between 2 values as a Gatling Expression Language string. These expressions must
   * resolve to either a number, then the unit will be seconds, or an object with an explicit time unit.
   *
   * @param min the pause minimum as a Gatling Expression Language string
   * @param max the pause maximum as a Gatling Expression Language string
   * @return a new StructureBuilder
   */
  (min: string, max: string): T;

  /**
   * Attach a pause computed randomly between 2 values
   *
   * @param min the pause minimum as a function
   * @param max the pause maximum as a function
   * @return a new StructureBuilder
   */
  (min: SessionTo<Duration>, max: SessionTo<Duration>): T;

  /**
   * Attach a pause computed randomly between 2 values
   *
   * @param min the pause minimum, in seconds or with an explicit time unit
   * @param max the pause maximum, in seconds or with an explicit time unit
   * @param pauseType - the type of pause
   * @return a new StructureBuilder
   */
  (min: Duration, max: Duration, pauseType: PauseType): T;

  /**
   * Attach a pause computed randomly between 2 values as a Gatling Expression Language string. These expressions must
   * resolve to either a number, then the unit will be seconds, or an object with an explicit time unit.
   *
   * @param min the pause minimum as a Gatling Expression Language string
   * @param max the pause maximum as a Gatling Expression Language string
   * @param pauseType - the type of pause
   * @return a new StructureBuilder
   */
  (min: string, max: string, pauseType: PauseType): T;

  /**
   * Attach a pause computed randomly between 2 values
   *
   * @param min the pause minimum as a function
   * @param max the pause maximum as a function
   * @param pauseType - the type of pause
   * @return a new StructureBuilder
   */
  (min: SessionTo<Duration>, max: SessionTo<Duration>, pauseType: PauseType): T;
}

export interface Pauses<T extends Pauses<T>> {
  pause: PauseFunction<T>;
}

export const pauseImpl =
  <J2, J1 extends JvmPauses<J2, any>, T extends Pauses<T>>(jvmGroups: J1, wrap: (wrapped: J2) => T): PauseFunction<T> =>
  (
    arg0: Duration | SessionTo<Duration> | string,
    arg1?: Duration | SessionTo<Duration> | string | PauseType,
    arg2?: PauseType
  ) => {
    if (arg2 !== undefined) {
      // pause(min, max, pauseType)
      if (typeof arg0 === "string" && typeof arg1 === "string") {
        return wrap(jvmGroups.pause(arg0, arg1, toJvmPauseType(arg2)));
      } else if (typeof arg0 === "function" && typeof arg1 === "function") {
        return wrap(
          jvmGroups.pause(underlyingSessionToDuration(arg0), underlyingSessionToDuration(arg1), toJvmPauseType(arg2))
        );
      } else if (isDuration(arg0) && isDuration(arg1)) {
        return wrap(jvmGroups.pause(toJvmDuration(arg0), toJvmDuration(arg1), toJvmPauseType(arg2)));
      }
    } else if (arg1 !== undefined) {
      if (isPauseType(arg1)) {
        // pause(duration, pauseType)
        if (typeof arg0 === "string") {
          return wrap(jvmGroups.pause(arg0, toJvmPauseType(arg1)));
        } else if (typeof arg0 === "function") {
          return wrap(jvmGroups.pause(underlyingSessionToDuration(arg0), toJvmPauseType(arg1)));
        } else if (isDuration(arg0)) {
          return wrap(jvmGroups.pause(toJvmDuration(arg0), toJvmPauseType(arg1)));
        }
      } else {
        // pause(min, max)
        if (typeof arg0 === "string" && typeof arg1 === "string") {
          return wrap(jvmGroups.pause(arg0, arg1));
        } else if (typeof arg0 === "function" && typeof arg1 === "function") {
          return wrap(jvmGroups.pause(underlyingSessionToDuration(arg0), underlyingSessionToDuration(arg1)));
        } else if (isDuration(arg0) && isDuration(arg1)) {
          return wrap(jvmGroups.pause(toJvmDuration(arg0), toJvmDuration(arg1)));
        }
      }
    } else {
      // pause(duration)
      if (typeof arg0 === "string") {
        return wrap(jvmGroups.pause(arg0));
      } else if (typeof arg0 === "function") {
        return wrap(jvmGroups.pause(underlyingSessionToDuration(arg0)));
      } else if (isDuration(arg0)) {
        return wrap(jvmGroups.pause(toJvmDuration(arg0)));
      }
    }

    throw Error(`pause() called with invalid arguments ${arg0}, ${arg1}, ${arg2}`);
  };
