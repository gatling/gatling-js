import { CheckBuilderMultipleFind, wrapCheckBuilderMultipleFind } from "./multipleFind";

import JvmCheckBuilderJsonOfTypeMultipleFind = io.gatling.javaapi.core.CheckBuilder$JsonOfTypeMultipleFind;
import JvmCheckBuilderMultipleFind = io.gatling.javaapi.core.CheckBuilder$MultipleFind;

/**
 * A special {@link CheckBuilderFind<string>} that works on JSON
 */
export interface CheckBuilderJsonOfTypeMultipleFind extends CheckBuilderMultipleFind<string> {
  /**
   * Define that the extracted value is a String
   *
   * @returns a new MultipleFind
   */
  ofString(): CheckBuilderMultipleFind<string>;

  /**
   * Define that the extracted value is a Boolean
   *
   * @returns a new MultipleFind
   */
  ofBoolean(): CheckBuilderMultipleFind<boolean>;

  /**
   * Define that the extracted value is an Integer
   *
   * @returns a new MultipleFind
   */
  ofInt(): CheckBuilderMultipleFind<number>;

  /**
   * Define that the extracted value is a Long
   *
   * @returns a new MultipleFind
   */
  ofLong(): CheckBuilderMultipleFind<number>;

  /**
   * Define that the extracted value is a Double
   *
   * @returns a new MultipleFind
   */
  ofDouble(): CheckBuilderMultipleFind<number>;

  /**
   * Define that the extracted value is a List (a JSON array)
   *
   * @returns a new MultipleFind
   */
  ofList(): CheckBuilderMultipleFind<unknown[]>;

  /**
   * Define that the extracted value is a Map (a JSON object)
   *
   * @returns a new MultipleFind
   */
  ofMap(): CheckBuilderMultipleFind<Record<string, unknown>>;

  /**
   * Define that the extracted value is an untyped object
   *
   * @returns a new MultipleFind
   */
  ofObject(): CheckBuilderMultipleFind<unknown>;
}

export const wrapCheckBuilderJsonOfTypeMultipleFind = (
  _underlying: JvmCheckBuilderJsonOfTypeMultipleFind
): CheckBuilderJsonOfTypeMultipleFind => ({
  ...wrapCheckBuilderMultipleFind<string>(_underlying),
  ofString: (): CheckBuilderMultipleFind<string> => wrapCheckBuilderMultipleFind(_underlying.ofString()),
  ofBoolean: (): CheckBuilderMultipleFind<boolean> =>
    wrapCheckBuilderMultipleFind(_underlying.ofBoolean() as JvmCheckBuilderMultipleFind<boolean>),
  ofInt: (): CheckBuilderMultipleFind<number> =>
    wrapCheckBuilderMultipleFind(_underlying.ofInt() as JvmCheckBuilderMultipleFind<number>),
  ofLong: (): CheckBuilderMultipleFind<number> =>
    wrapCheckBuilderMultipleFind(_underlying.ofLong() as JvmCheckBuilderMultipleFind<number>),
  ofDouble: (): CheckBuilderMultipleFind<number> =>
    wrapCheckBuilderMultipleFind(_underlying.ofDouble() as JvmCheckBuilderMultipleFind<number>),
  ofList: (): CheckBuilderMultipleFind<unknown[]> => wrapCheckBuilderMultipleFind(_underlying.ofList()),
  ofMap: (): CheckBuilderMultipleFind<Record<string, unknown>> =>
    wrapCheckBuilderMultipleFind(_underlying.ofMap() as JvmCheckBuilderMultipleFind<any>),
  ofObject: (): CheckBuilderMultipleFind<unknown> => wrapCheckBuilderMultipleFind(_underlying.ofObject())
});
