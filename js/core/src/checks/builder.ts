import { Wrapper } from "../common";

import JvmCheckBuilder = io.gatling.javaapi.core.CheckBuilder;

/**
 * Java wrapper of a Scala CheckBuilder. Builder of an Action in a Gatling scenario.
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface CheckBuilder extends Wrapper<JvmCheckBuilder> {}

export const wrapCheckBuilder = (_underlying: JvmCheckBuilder): CheckBuilder => ({
  _underlying
});
