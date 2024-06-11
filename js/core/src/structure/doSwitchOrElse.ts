import { SessionTo, underlyingSessionTo } from "../session";
import { ChoiceWithKey } from "./choices";
import { Executable } from "./execs";

import JvmDoSwitchOrElse = io.gatling.javaapi.core.condition.DoSwitchOrElse;
import JvmOn = io.gatling.javaapi.core.condition.DoSwitchOrElse$On;
import JvmOrElse = io.gatling.javaapi.core.condition.DoSwitchOrElse$OrElse;

export interface On<T> {
  on(...choices: ChoiceWithKey[]): OrElse<T>;
}

const wrapOn = <J, T>(jvmOn: JvmOn<J>, wrap: (underlying: J) => T): On<T> => ({
  on: (...choices: ChoiceWithKey[]): OrElse<T> => wrapOrElse(jvmOn.on(choices.map((c) => c._underlying)), wrap)
});

interface OrElse<T> {
  orElse(executable: Executable<any>, ...executables: Executable<any>[]): T;
}

const wrapOrElse = <J, T>(jvmOrElse: JvmOrElse<J>, wrap: (underlying: J) => T): OrElse<T> => ({
  orElse: (executable: Executable<any>, ...executables: Executable<any>[]): T =>
    wrap(jvmOrElse.orElse(executable._underlying, ...executables.map((e) => e._underlying)))
});

export interface DoSwitchOrElseFunction<T extends DoSwitchOrElse<T>> {
  /**
   * Execute one of the "choices" when the actual value is equal to the possibility's one, otherwise execute the "else"
   * block.
   *
   * @param actual - the actual value expressed as a Gatling Expression Language String
   * @returns a DSL component for defining the "choices"
   */
  (actual: string): On<T>;

  /**
   * Execute one of the "choices" when the actual value is equal to the possibility's one, otherwise execute the "else"
   * block.
   *
   * @param actual - the actual value expressed as a function
   * @returns a DSL component for defining the "choices"
   */
  (actual: SessionTo<unknown>): On<T>;
}

export interface DoSwitchOrElse<T extends DoSwitchOrElse<T>> {
  doSwitchOrElse: DoSwitchOrElseFunction<T>;
}

export const doSwitchOrElseImpl =
  <J2, J1 extends JvmDoSwitchOrElse<J2, any>, T extends DoSwitchOrElse<T>>(
    jvmDoSwitchOrElse: J1,
    wrap: (wrapped: J2) => T
  ): DoSwitchOrElseFunction<T> =>
  (actual: string | SessionTo<unknown>) =>
    wrapOn(
      typeof actual === "function"
        ? jvmDoSwitchOrElse.doSwitchOrElse(underlyingSessionTo(actual))
        : jvmDoSwitchOrElse.doSwitchOrElse(actual),
      wrap
    );
