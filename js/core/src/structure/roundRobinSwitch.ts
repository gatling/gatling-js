import { Executable } from "./execs";

import JvmRoundRobinSwitch = io.gatling.javaapi.core.condition.RoundRobinSwitch;
import JvmOn = io.gatling.javaapi.core.condition.RoundRobinSwitch$On;

export interface On<T> {
  on(executable: Executable<any>, ...executables: Executable<any>[]): T;
}

const wrapOn = <J, T>(jvmOn: JvmOn<J>, wrap: (underlying: J) => T): On<T> => ({
  on: (executable: Executable<any>, ...executables: Executable<any>[]): T =>
    wrap(jvmOn.on(executable._underlying, ...executables.map((e) => e._underlying)))
});

export interface RoundRobinSwitchFunction<T extends RoundRobinSwitch<T>> {
  /**
   * Execute one of the "choices" in a round-robin fashion. Round-robin is global, not per virtual user.
   *
   * @returns a new StructureBuilder
   */
  (): On<T>;
}

export interface RoundRobinSwitch<T extends RoundRobinSwitch<T>> {
  roundRobinSwitch: RoundRobinSwitchFunction<T>;
}

export const roundRobinSwitchImpl =
  <J2, J1 extends JvmRoundRobinSwitch<J2, any>, T extends RoundRobinSwitch<T>>(
    jvmRoundRobinSwitch: J1,
    wrap: (wrapped: J2) => T
  ): RoundRobinSwitchFunction<T> =>
  () =>
    wrapOn(jvmRoundRobinSwitch.roundRobinSwitch(), wrap);
