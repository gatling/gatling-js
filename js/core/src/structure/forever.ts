import JvmForever = io.gatling.javaapi.core.loop.Forever;

import { On, wrapOn } from "./on";

export interface ForeverFunction<T extends Forever<T>> {
  /**
   * Define a loop that will iterate forever.
   *
   * @param counterName - the name of the loop counter, as stored in the Session
   * @returns a DSL component for defining the loop content
   */
  (counterName?: string): On<T>;
}

export interface Forever<T extends Forever<T>> {
  forever: ForeverFunction<T>;
}

export const foreverImpl =
  <J2, J1 extends JvmForever<J2, any>, T extends Forever<T>>(
    jvmForever: J1,
    wrap: (wrapped: J2) => T
  ): ForeverFunction<T> =>
  (counterName?: string) =>
    wrapOn(counterName !== undefined ? jvmForever.forever(counterName) : jvmForever.forever(), wrap);
