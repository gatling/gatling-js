import { SessionTo, underlyingSessionTo } from "../session";
import { On, wrapOn } from "./on";

import JvmForEach = io.gatling.javaapi.core.loop.ForEach;

export interface ForEachFunction<T extends ForEach<T>> {
  /**
   * Define a loop that will iterate over a list of values.
   *
   * @param seq - the static list of values to iterate over
   * @param attributeName - the key to store the current element in the Session
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component to define the loop content
   */
  (seq: unknown[], attributeName: string, counterName?: string): On<T>;

  /**
   * Define a loop that will iterate over a list of values.
   *
   * @param seq - the list of values to iterate over, expressed as a Gatling Expression Language String, must evaluate
   * to an array
   * @param attributeName - the key to store the current element in the Session
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component to define the loop content
   */
  (seq: string, attributeName: string, counterName?: string): On<T>;

  /**
   * Define a loop that will iterate over a list of values.
   *
   * @param seq - the list of values to iterate over, expressed as a function
   * @param attributeName - the key to store the current element in the Session
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component to define the loop content
   */
  (seq: SessionTo<Array<unknown>>, attributeName: string, counterName?: string): On<T>;
}

export interface ForEach<T extends ForEach<T>> {
  foreach: ForEachFunction<T>;
}

export const foreachImpl =
  <J2, J1 extends JvmForEach<J2, any>, T extends ForEach<T>>(
    jvmForEach: J1,
    wrap: (wrapped: J2) => T
  ): ForEachFunction<T> =>
  (seq: unknown[] | string | SessionTo<Array<unknown>>, attributeName: string, counterName?: string) => {
    if (typeof seq === "function") {
      if (counterName !== undefined) {
        return wrapOn(jvmForEach.foreach(underlyingSessionTo(seq), attributeName, counterName), wrap);
      } else {
        return wrapOn(jvmForEach.foreach(underlyingSessionTo(seq), attributeName), wrap);
      }
    } else if (typeof seq === "string") {
      if (counterName !== undefined) {
        return wrapOn(jvmForEach.foreach(seq, attributeName, counterName), wrap);
      } else {
        return wrapOn(jvmForEach.foreach(seq, attributeName), wrap);
      }
    } else {
      if (counterName !== undefined) {
        return wrapOn(jvmForEach.foreach(seq, attributeName, counterName), wrap);
      } else {
        return wrapOn(jvmForEach.foreach(seq, attributeName), wrap);
      }
    }
  };
