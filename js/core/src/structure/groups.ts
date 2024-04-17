import "@gatling.io/jvm-types";
import JvmGroups = io.gatling.javaapi.core.group.Groups;

import { SessionToString, underlyingSessionToString } from "../session";
import { wrapCallback } from "../gatlingJvm/callbacks";

import { On, wrapOn } from "./on";

export interface GroupFunction<T extends Groups<T>> {
  /**
   * Define a group
   *
   * @param name - the name of the group, expressed as a Gatling Expression Language String or a function
   * @returns a DSL component for defining the wrapped block
   */
  (name: string | SessionToString): On<T>;
}

export interface Groups<T extends Groups<T>> {
  group: GroupFunction<T>;
}

export const groupImpl =
  <J2, J1 extends JvmGroups<J2, any>, T extends Groups<T>>(jvmGroups: J1, wrap: (wrapped: J2) => T) =>
  (group: string | SessionToString): On<T> =>
    wrapOn(
      typeof group === "function"
        ? jvmGroups.group(wrapCallback(underlyingSessionToString(group)))
        : jvmGroups.group(group),
      wrap
    );
