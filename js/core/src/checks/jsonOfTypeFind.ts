import { CheckBuilderFind, wrapCheckBuilderFind } from "./find";

import JvmCheckBuilderFind = io.gatling.javaapi.core.CheckBuilder$Find;
import JvmCheckBuilderJsonOfTypeFind = io.gatling.javaapi.core.CheckBuilder$JsonOfTypeFind;

/**
 * A special {@link CheckBuilderFind<string>} that works on JSON
 */
export interface CheckBuilderJsonOfTypeFind extends CheckBuilderFind<string> {
  /**
   * Define that the extracted value is a String
   *
   * @returns a new CheckBuilderFind
   */
  ofString(): CheckBuilderFind<string>;

  /**
   * Define that the extracted value is a Boolean
   *
   * @returns a new CheckBuilderFind
   */
  ofBoolean(): CheckBuilderFind<boolean>;

  /**
   * Define that the extracted value is an Integer
   *
   * @returns a new CheckBuilderFind
   */
  ofInt(): CheckBuilderFind<number>;

  /**
   * Define that the extracted value is a Long
   *
   * @returns a new CheckBuilderFind
   */
  ofLong(): CheckBuilderFind<number>;

  /**
   * Define that the extracted value is a Double
   *
   * @returns a new CheckBuilderFind
   */
  ofDouble(): CheckBuilderFind<number>;

  /**
   * Define that the extracted value is a List (a JSON array)
   *
   * @returns a new CheckBuilderFind
   */
  ofList(): CheckBuilderFind<unknown[]>;

  /**
   * Define that the extracted value is a Map (a JSON object)
   *
   * @returns a new CheckBuilderFind
   */
  ofMap(): CheckBuilderFind<Record<string, unknown>>;

  /**
   * Define that the extracted value is an untyped object
   *
   * @returns a new CheckBuilderFind
   */
  ofObject(): CheckBuilderFind<unknown>;
}

export const wrapCheckBuilderJsonOfTypeFind = (
  _underlying: JvmCheckBuilderJsonOfTypeFind
): CheckBuilderJsonOfTypeFind => ({
  ...wrapCheckBuilderFind<string>(_underlying),
  ofString: (): CheckBuilderFind<string> => wrapCheckBuilderFind(_underlying.ofString()),
  ofBoolean: (): CheckBuilderFind<boolean> =>
    wrapCheckBuilderFind(_underlying.ofBoolean() as JvmCheckBuilderFind<boolean>),
  ofInt: (): CheckBuilderFind<number> => wrapCheckBuilderFind(_underlying.ofInt() as JvmCheckBuilderFind<number>),
  ofLong: (): CheckBuilderFind<number> => wrapCheckBuilderFind(_underlying.ofLong() as JvmCheckBuilderFind<number>),
  ofDouble: (): CheckBuilderFind<number> => wrapCheckBuilderFind(_underlying.ofDouble() as JvmCheckBuilderFind<number>),
  ofList: (): CheckBuilderFind<unknown[]> => wrapCheckBuilderFind(_underlying.ofList()),
  ofMap: (): CheckBuilderFind<Record<string, unknown>> =>
    wrapCheckBuilderFind(_underlying.ofMap() as JvmCheckBuilderFind<any>),
  ofObject: (): CheckBuilderFind<unknown> => wrapCheckBuilderFind(_underlying.ofObject())
});
