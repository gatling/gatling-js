import { Executable } from "./execs";

import JvmUniformRandomSwitch = io.gatling.javaapi.core.condition.UniformRandomSwitch;
import JvmOn = io.gatling.javaapi.core.condition.UniformRandomSwitch$On;

export interface On<T> {
  on(executable: Executable<any>, ...executables: Executable<any>[]): T;
}

const wrapOn = <J, T>(jvmOn: JvmOn<J>, wrap: (underlying: J) => T): On<T> => ({
  on: (executable: Executable<any>, ...executables: Executable<any>[]): T =>
    wrap(jvmOn.on(executable._underlying, ...executables.map((e) => e._underlying)))
});

export interface UniformRandomSwitchFunction<T extends UniformRandomSwitch<T>> {
  /**
   * Execute one of the "choices" in a random fashion, with each having even weights.
   *
   * @returns a DSL component for defining the "choices"
   */
  (): On<T>;
}

export interface UniformRandomSwitch<T extends UniformRandomSwitch<T>> {
  uniformRandomSwitch: UniformRandomSwitchFunction<T>;
}

export const uniformRandomSwitchImpl =
  <J2, J1 extends JvmUniformRandomSwitch<J2, any>, T extends UniformRandomSwitch<T>>(
    jvmUniformRandomSwitch: J1,
    wrap: (wrapped: J2) => T
  ): UniformRandomSwitchFunction<T> =>
  () =>
    wrapOn(jvmUniformRandomSwitch.uniformRandomSwitch(), wrap);
