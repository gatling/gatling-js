import { CheckBuilder, wrapCheckBuilder } from "./builder";

import JvmCheckBuilderFinal = io.gatling.javaapi.core.CheckBuilder$Final;

/**
 * Last step of the Check DSL Immutable, so all methods return a new occurrence and leave the
 * original unmodified.
 */
export interface CheckBuilderFinal extends CheckBuilder {
  /**
   * Provide a custom name for the check, to be used in case of a failure
   *
   * @param n - the name
   * @returns a new CheckBuilderFinal
   */
  name(n: string): CheckBuilderFinal;

  /**
   * Save the extracted value in the virtual user's Session
   *
   * @param key - the key to store the extracted value in the Session
   * @returns a new CheckBuilderFinal
   */
  saveAs(key: string): CheckBuilderFinal;
}

export const wrapCheckBuilderFinal = (_underlying: JvmCheckBuilderFinal): CheckBuilderFinal => ({
  ...wrapCheckBuilder(_underlying),
  name: (n: string) => wrapCheckBuilderFinal(_underlying.name(n)),
  saveAs: (key: string) => wrapCheckBuilderFinal(_underlying.saveAs(key))
});
