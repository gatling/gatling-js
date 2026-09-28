import { CheckBuilderMultipleFind, wrapCheckBuilderMultipleFind } from "./multipleFind";

import JvmCheckBuilderCaptureGroup = io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder;

/**
 * A special {@link CheckBuilderMultipleFind<string>} that can define regex capture groups
 */
export interface CheckBuilderCaptureGroup extends CheckBuilderMultipleFind<string> {
  /**
   * Define that the check extracts all capture groups
   *
   * @returns a new MultipleFind
   */
  allCaptureGroups(): CheckBuilderMultipleFind<string[]>;

  /**
   * Define that the check extracts an expected number of capture groups
   *
   * @param count - the number of capture groups in the regular expression pattern
   * @returns a new MultipleFind
   *
   * @deprecated Use {@link allCaptureGroups} instead.
   */
  captureGroups(count: number): CheckBuilderMultipleFind<string[]>;
}

export const wrapCheckBuilderCaptureGroup = (_underlying: JvmCheckBuilderCaptureGroup): CheckBuilderCaptureGroup => ({
  ...wrapCheckBuilderMultipleFind<string>(_underlying),
  allCaptureGroups: () => wrapCheckBuilderMultipleFind(_underlying.allCaptureGroups()),
  captureGroups: (count) => wrapCheckBuilderMultipleFind(_underlying.captureGroups(count))
});
