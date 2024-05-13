import { ChoiceWithWeight } from "./choices";
import { Executable } from "./execs";

import JvmRandomSwitchOrElse = io.gatling.javaapi.core.condition.RandomSwitchOrElse;
import JvmOn = io.gatling.javaapi.core.condition.RandomSwitchOrElse$On;
import JvmOrElse = io.gatling.javaapi.core.condition.RandomSwitchOrElse$OrElse;

export interface On<T> {
  on(...choices: ChoiceWithWeight[]): OrElse<T>;
}

const wrapOn = <J, T>(jvmOn: JvmOn<J>, wrap: (underlying: J) => T): On<T> => ({
  on: (...choices: ChoiceWithWeight[]): OrElse<T> => wrapOrElse(jvmOn.on(choices.map((c) => c._underlying)), wrap)
});

export interface OrElse<T> {
  orElse(executable: Executable<any>, ...executables: Executable<any>[]): T;
}

const wrapOrElse = <J, T>(jvmOrElse: JvmOrElse<J>, wrap: (underlying: J) => T): OrElse<T> => ({
  orElse: (executable: Executable<any>, ...executables: Executable<any>[]): T =>
    wrap(jvmOrElse.orElse(executable._underlying, ...executables.map((e) => e._underlying)))
});

export interface RandomSwitchOrElseFunction<T extends RandomSwitchOrElse<T>> {
  /**
   * Execute one of the "choices" randomly based on their respective weight. Weights are expressed
   * in percents so their sum must be <= 100%.
   *
   * @returns the DSL component for defining the "else" block
   */
  (): On<T>;
}

export interface RandomSwitchOrElse<T extends RandomSwitchOrElse<T>> {
  randomSwitchOrElse: RandomSwitchOrElseFunction<T>;
}

export const randomSwitchOrElseImpl =
  <J2, J1 extends JvmRandomSwitchOrElse<J2, any>, T extends RandomSwitchOrElse<T>>(
    jvmRandomSwitch: J1,
    wrap: (wrapped: J2) => T
  ): RandomSwitchOrElseFunction<T> =>
  () =>
    wrapOn(jvmRandomSwitch.randomSwitchOrElse(), wrap);
