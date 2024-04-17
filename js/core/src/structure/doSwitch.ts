import "@gatling.io/jvm-types";
import JvmDoSwitch = io.gatling.javaapi.core.condition.DoSwitch;
import JvmOn = io.gatling.javaapi.core.condition.DoSwitch$On;

import { SessionTo, underlyingSessionTo } from "../session";
import { wrapCallback } from "../gatlingJvm/callbacks";

import { ChoiceWithKey } from "./choices";

export interface On<T> {
  on(...choices: ChoiceWithKey[]): T;
}

const wrapOn = <J, T>(jvmOn: JvmOn<J>, wrap: (underlying: J) => T): On<T> => ({
  on: (...choices: ChoiceWithKey[]): T => wrap(jvmOn.on(choices.map((c) => c._underlying)))
});

export interface DoSwitchFunction<T extends DoSwitch<T>> {
  /**
   * Execute one of the "choices" when the actual value is equal to the possibility's one.
   *
   * @param actual - the actual value expressed as a Gatling Expression Language String
   * @returns a DSL component for defining the "choices"
   */
  (actual: string): On<T>;

  /**
   * Execute one of the "choices" when the actual value is equal to the possibility's one.
   *
   * @param actual - the actual value expressed as a function
   * @returns a DSL component for defining the "choices"
   */
  (actual: SessionTo<unknown>): On<T>;
}

export interface DoSwitch<T extends DoSwitch<T>> {
  doSwitch: DoSwitchFunction<T>;
}

export const doSwitchImpl =
  <J2, J1 extends JvmDoSwitch<J2, any>, T extends DoSwitch<T>>(jvmDoSwitch: J1, wrap: (wrapped: J2) => T) =>
  (actual: string | SessionTo<unknown>): On<T> =>
    wrapOn(
      typeof actual === "function"
        ? jvmDoSwitch.doSwitch(wrapCallback(underlyingSessionTo(actual)))
        : jvmDoSwitch.doSwitch(actual),
      wrap
    );
