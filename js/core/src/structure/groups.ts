import JvmGroups = io.gatling.javaapi.core.group.Groups;

import { SessionTo, underlyingSessionTo } from "../session";
import { On, wrapOn } from "./on";

export interface GroupFunction<T extends Groups<T>> {
  /**
   * Define a group
   *
   * @param name - the name of the group, expressed as a Gatling Expression Language String or a function
   * @returns a DSL component for defining the wrapped block
   */
  (name: string | SessionTo<string>): On<T>;
}

export interface Groups<T extends Groups<T>> {
  group: GroupFunction<T>;
}

export const groupImpl =
  <J2, J1 extends JvmGroups<J2, any>, T extends Groups<T>>(jvmGroups: J1, wrap: (wrapped: J2) => T): GroupFunction<T> =>
  (group: string | SessionTo<string>) =>
    wrapOn(typeof group === "function" ? jvmGroups.group(underlyingSessionTo(group)) : jvmGroups.group(group), wrap);
