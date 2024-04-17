import "@gatling.io/jvm-types";
import JvmRandomSwitch = io.gatling.javaapi.core.condition.RandomSwitch;
import JvmOn = io.gatling.javaapi.core.condition.RandomSwitch$On;

import { ChoiceWithWeight } from "./choices";

export interface On<T> {
  on(...choices: ChoiceWithWeight[]): T;
}

const wrapOn = <J, T>(jvmOn: JvmOn<J>, wrap: (underlying: J) => T): On<T> => ({
  on: (...choices: ChoiceWithWeight[]): T => wrap(jvmOn.on(choices.map((c) => c._underlying)))
});

export interface RandomSwitchFunction<T extends RandomSwitch<T>> {
  /**
   * Execute one of the "choices" randomly based on their respective weight. Weights are expressed
   * in percents so their sum must be <= 100%.
   *
   * @returns a DSL component for defining the "choices"
   */
  (): On<T>;
}

export interface RandomSwitch<T extends RandomSwitch<T>> {
  randomSwitch: RandomSwitchFunction<T>;
}

export const randomSwitchImpl =
  <J2, J1 extends JvmRandomSwitch<J2, any>, T extends RandomSwitch<T>>(jvmRandomSwitch: J1, wrap: (wrapped: J2) => T) =>
  (): On<T> =>
    wrapOn(jvmRandomSwitch.randomSwitch(), wrap);
