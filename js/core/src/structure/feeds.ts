import { FeederBuilder } from "../feeders";
import { SessionTo, underlyingSessionTo } from "../session";

import JvmFeeds = io.gatling.javaapi.core.feed.Feeds;

export interface FeedFunction<T extends Feeds<T>> {
  // TODO (maybe?): Supplier<Iterator<Map<String, Object>>>, Iterator<Map<String, Object>>

  /**
   * Attach a feed action.
   *
   * @param feederBuilder - a source of records
   * @returns a new StructureBuilder
   */
  (feederBuilder: FeederBuilder<unknown>): T;

  /**
   * Attach a feed action.
   *
   * @param feederBuilder - a source of records
   * @param numberOfRecords - the number of records to poll from the feeder at once
   * @returns a new StructureBuilder
   */
  (feederBuilder: FeederBuilder<unknown>, numberOfRecords: number): T;

  /**
   * Attach a feed action.
   *
   * @param feederBuilder - a source of records
   * @param numberOfRecords - the number of records to poll from the feeder at once, expressed as a Gatling Expression
   * Language String
   * @returns a new StructureBuilder
   */
  (feederBuilder: FeederBuilder<unknown>, numberOfRecords: string): T;

  /**
   * Attach a feed action.
   *
   * @param feederBuilder - a source of records
   * @param numberOfRecords - the number of records to poll from the feeder at once, as a function
   * @returns a new StructureBuilder
   */
  (feederBuilder: FeederBuilder<unknown>, numberOfRecords: SessionTo<number>): T;
}

export interface Feeds<T extends Feeds<T>> {
  feed: FeedFunction<T>;
}

export const feedImpl =
  <J2, J1 extends JvmFeeds<J2, any>, T extends Feeds<T>>(jvmFeeds: J1, wrap: (wrapped: J2) => T): FeedFunction<T> =>
  (feederBuilder: FeederBuilder<unknown>, numberOfRecords?: number | string | SessionTo<number>) => {
    if (typeof numberOfRecords === "number") {
      return wrap(jvmFeeds.feed(feederBuilder._underlying, numberOfRecords));
    } else if (typeof numberOfRecords === "string") {
      return wrap(jvmFeeds.feed(feederBuilder._underlying, numberOfRecords));
    } else if (typeof numberOfRecords === "function") {
      return wrap(jvmFeeds.feed(feederBuilder._underlying, underlyingSessionTo(numberOfRecords)));
    } else {
      return wrap(jvmFeeds.feed(feederBuilder._underlying));
    }
  };
