import { SessionTo, underlyingSessionTo } from "../session";
import { On, wrapOn } from "./on";

import JvmRepeat = io.gatling.javaapi.core.loop.Repeat;

export interface RepeatFunction<T extends Repeat<T>> {
  /**
   * Define a loop that will iterate for a given number of times.
   *
   * @param times - the number of iterations
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (times: number, counterName?: string): On<T>;

  /**
   * Define a loop that will iterate for a given number of times.
   *
   * @param times - the number of iterations, expressed as a Gatling Expression Language String that must evaluate to an integer
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (times: string, counterName?: string): On<T>;

  /**
   * Define a loop that will iterate for a given number of times.
   *
   * @param times - the number of iterations, expressed as a function
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (times: SessionTo<number>, counterName?: string): On<T>;
}

export interface Repeat<T extends Repeat<T>> {
  repeat: RepeatFunction<T>;
}

export const repeatImpl =
  <J2, J1 extends JvmRepeat<J2, any>, T extends Repeat<T>>(
    jvmRepeat: J1,
    wrap: (wrapped: J2) => T
  ): RepeatFunction<T> =>
  (times: number | string | SessionTo<number>, counterName?: string) => {
    if (counterName !== undefined) {
      // repeat(times, counterName
      if (typeof times === "number") {
        return wrapOn(jvmRepeat.repeat(times, counterName), wrap);
      } else if (typeof times === "string") {
        return wrapOn(jvmRepeat.repeat(times, counterName), wrap);
      } else {
        return wrapOn(jvmRepeat.repeat(underlyingSessionTo(times), counterName), wrap);
      }
    } else {
      // repeat(times)
      if (typeof times === "number") {
        return wrapOn(jvmRepeat.repeat(times), wrap);
      } else if (typeof times === "string") {
        return wrapOn(jvmRepeat.repeat(times), wrap);
      } else {
        return wrapOn(jvmRepeat.repeat(underlyingSessionTo(times)), wrap);
      }
    }
  };
