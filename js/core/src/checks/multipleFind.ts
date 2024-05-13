import { CheckBuilderValidate, wrapCheckBuilderValidate } from "./validate";

import JvmCheckBuilderMultipleFind = io.gatling.javaapi.core.CheckBuilder$MultipleFind;

/**
 * Step 1 of the Check DSL when the check can return multiple values Immutable, so all methods
 * return a new occurrence and leave the original unmodified.
 *
 * @typeParam X - the type of Java values the check can extract
 */
export interface CheckBuilderMultipleFind<X> extends CheckBuilderValidate<X> {
  /**
   * Target a single/first value
   *
   * @returns the next Check DSL step
   */
  find(): CheckBuilderValidate<X>;

  /**
   * Target the occurrence-th occurrence in the extracted values
   *
   * @param occurrence - the rank of the target value in the extracted values list
   * @returns the next Check DSL step
   */
  find(occurrence: number): CheckBuilderValidate<X>;

  /**
   * Target all the occurrences of the extracted values
   *
   * @returns the next Check DSL step
   */
  findAll(): CheckBuilderValidate<X[]>;

  /**
   * Target a random occurrence in the extracted values
   *
   * @returns the next Check DSL step
   */
  findRandom(): CheckBuilderValidate<X>;

  /**
   * Target multiple random occurrences in the extracted values
   *
   * @param num - the number of occurrences to collect
   * @returns the next Check DSL step
   */
  findRandom(num: number): CheckBuilderValidate<X[]>;

  /**
   * Target multiple random occurrences in the extracted values
   *
   * @param num - the number of occurrences to collect
   * @param failIfLess - fail if num is greater than the number of extracted values
   * @returns the next Check DSL step
   */
  findRandom(num: number, failIfLess: boolean): CheckBuilderValidate<X[]>;

  /**
   * Target the count of extracted values
   *
   * @returns the next Check DSL step
   */
  count(): CheckBuilderValidate<number>;
}

export const wrapCheckBuilderMultipleFind = <X>(
  _underlying: JvmCheckBuilderMultipleFind<X>
): CheckBuilderMultipleFind<X> => ({
  ...wrapCheckBuilderValidate<X>(_underlying),
  find: (occurrence?: number) =>
    wrapCheckBuilderValidate(occurrence !== undefined ? _underlying.find(occurrence) : _underlying.find()),
  findAll: () => wrapCheckBuilderValidate(_underlying.findAll()),
  findRandom: (num?: number, failIfLess?: boolean): any => {
    if (num !== undefined) {
      if (failIfLess !== undefined) {
        return wrapCheckBuilderValidate(_underlying.findRandom(num, failIfLess));
      } else {
        return wrapCheckBuilderValidate(_underlying.findRandom(num));
      }
    } else {
      return wrapCheckBuilderValidate(_underlying.findRandom());
    }
  },
  count: function (): CheckBuilderValidate<number> {
    throw new Error("Function not implemented.");
  }
});
