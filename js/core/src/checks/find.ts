import { CheckBuilderValidate, wrapCheckBuilderValidate } from "./validate";

import JvmCheckBuilderFind = io.gatling.javaapi.core.CheckBuilder$Find;

/**
 * Step 1 of the Check DSL when the check can only return one single value Immutable, so all
 * methods return a new occurrence and leave the original unmodified.
 *
 * @typeParam X - the type of Java values the check can extract
 */
export interface CheckBuilderFind<X> extends CheckBuilderValidate<X> {
  /**
   * Target a single/first value
   *
   * @returns the next Check DSL step
   */
  find(): CheckBuilderValidate<X>;
}

export const wrapCheckBuilderFind = <X>(_underlying: JvmCheckBuilderFind<X>): CheckBuilderFind<X> => ({
  ...wrapCheckBuilderValidate<X>(_underlying),
  find: () => wrapCheckBuilderValidate(_underlying.find())
});
