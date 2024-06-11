import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";
import JvmFeederBuilder = io.gatling.javaapi.core.FeederBuilder;
import JvmFeederBuilderFileBased = io.gatling.javaapi.core.FeederBuilder$FileBased;
import JvmFeederBuilderBatchable = io.gatling.javaapi.core.FeederBuilder$Batchable;

import { Wrapper } from "./common";

export interface FeederBuilder<T> extends Wrapper<JvmFeederBuilder<T>> {
  /**
   * Set a queue strategy. Records will be provided in the same order as defined in the underlying
   * source. A given record will only be provided once. The run will be immediately stopped if the
   * feeder runs out of records.
   *
   * @returns a new FeederBuilder
   */
  queue(): FeederBuilder<T>;

  /**
   * Set a random strategy. Records will be provided in a random order, unrelated to the order in
   * the underlying source. A given record can be provided multiple times. Such feeder will never
   * run out of records.
   *
   * @returns a new FeederBuilder
   */
  random(): FeederBuilder<T>;

  /**
   * Set a shuffle strategy. Records will be provided in a random order, unrelated to the order in
   * the underlying source. A given record will only be provided once. The run will be immediately
   * stopped if the feeder runs out of records.
   *
   * @returns a new FeederBuilder
   */
  shuffle(): FeederBuilder<T>;

  /**
   * Set a circular strategy. Records will be provided in the same order as defined in the
   * underlying source. Once the last record of the underlying source is reached, the feeder will go
   * back to the first record. A given record can be provided multiple times. Such feeder will never
   * run out of records.
   *
   * @returns a new FeederBuilder
   */
  circular(): FeederBuilder<T>;

  /**
   * Provide a function to transform records as defined in the underlying source
   *
   * @param f - the transformation function
   * @returns a new FeederBuilder
   */
  transform(f: (name: string, value: T) => unknown): FeederBuilder<unknown>;

  // TODO
  // /**
  //  * Read all the records of the underlying source.
  //  *
  //  * @return the whole data
  //  */
  // @NonNull
  // List<Map<String, Object>> readRecords();

  /**
   * Return the number of records more efficiantly than readRecords().size().
   *
   * @returns the number of recordss
   */
  recordsCount(): number;

  /**
   * Distribute data evenly amongst all the injectors of a Gatling Enterprise cluster. Only
   * effective when the test is running with Gatling Enterprise, noop otherwise.
   *
   * @returns a new FeederBuilder
   */
  shard(): FeederBuilder<T>;
}

const wrapFeederBuilder = <T>(_underlying: JvmFeederBuilder<T>): FeederBuilder<T> => ({
  _underlying,
  queue: () => wrapFeederBuilder(_underlying.queue()),
  random: () => wrapFeederBuilder(_underlying.random()),
  shuffle: () => wrapFeederBuilder(_underlying.shuffle()),
  circular: () => wrapFeederBuilder(_underlying.circular()),
  transform: (f: (name: string, value: T) => unknown) => wrapFeederBuilder(_underlying.transform(f)),
  recordsCount: () => _underlying.recordsCount(),
  shard: () => wrapFeederBuilder(_underlying.shard())
});

export interface FileBasedFeederBuilder<T> extends FeederBuilder<T> {
  /**
   * Advice to unzip the underlying source because it's a zip or tar file
   *
   * @returns a new FileBased
   */
  unzip(): FileBasedFeederBuilder<T>;
}

export const wrapFileBasedFeederBuilder = <T>(
  _underlying: JvmFeederBuilderFileBased<T>
): FileBasedFeederBuilder<T> => ({
  _underlying,
  queue: () => wrapFileBasedFeederBuilder(_underlying.queue()),
  random: () => wrapFileBasedFeederBuilder(_underlying.random()),
  shuffle: () => wrapFileBasedFeederBuilder(_underlying.shuffle()),
  circular: () => wrapFileBasedFeederBuilder(_underlying.circular()),
  transform: (f: (name: string, value: T) => unknown) => wrapFeederBuilder(_underlying.transform(f)),
  recordsCount: () => _underlying.recordsCount(),
  shard: () => wrapFileBasedFeederBuilder(_underlying.shard()),
  unzip: () => wrapFileBasedFeederBuilder(_underlying.unzip())
});

export interface BatchableFeederBuilder<T> extends FileBasedFeederBuilder<T> {
  /**
   * Force loading the whole data in memory from the underlying source at once. Faster runtime but
   * slower boot time and higher heap usage.
   *
   * @returns a new Batchable
   */
  eager(): BatchableFeederBuilder<T>;

  /**
   * Force loading small chunks of data from the underlying source one by one. Slower runtime but
   * faster boot time and lower memory consumption.
   *
   * @returns a new Batchable
   */
  batch(): BatchableFeederBuilder<T>;

  /**
   * Force loading small chunks of data from the underlying source one by one Slower runtime but
   * faster boot time and lower memory consumption.
   *
   * @param lines - the number of buffered lines
   * @returns a new Batchable
   */
  batch(lines: number): BatchableFeederBuilder<T>;
}

const wrapBatchableFeederBuilder = <T>(_underlying: JvmFeederBuilderBatchable<T>): BatchableFeederBuilder<T> => ({
  _underlying,
  queue: () => wrapBatchableFeederBuilder(_underlying.queue()),
  random: () => wrapBatchableFeederBuilder(_underlying.random()),
  shuffle: () => wrapBatchableFeederBuilder(_underlying.shuffle()),
  circular: () => wrapBatchableFeederBuilder(_underlying.circular()),
  transform: (f: (name: string, value: T) => unknown) => wrapFeederBuilder(_underlying.transform(f)),
  recordsCount: () => _underlying.recordsCount(),
  shard: () => wrapBatchableFeederBuilder(_underlying.shard()),
  unzip: () => wrapBatchableFeederBuilder(_underlying.unzip()),
  eager: () => wrapBatchableFeederBuilder(_underlying.eager()),
  batch: (lines?: number) =>
    wrapBatchableFeederBuilder(lines !== undefined ? _underlying.batch(lines) : _underlying.batch())
});

export interface CsvFunction {
  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @returns a new feeder
   */
  (filePath: string): BatchableFeederBuilder<string>;

  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @param quoteChar - the quote char to wrap values containing special characters
   * @returns a new feeder
   */
  (filePath: string, quoteChar: string): BatchableFeederBuilder<string>;
}

export const csv: CsvFunction = (filePath: string, quoteChar?: string): BatchableFeederBuilder<string> =>
  wrapBatchableFeederBuilder(quoteChar !== undefined ? JvmCoreDsl.csv(filePath, quoteChar) : JvmCoreDsl.csv(filePath));

export interface SsvFunction {
  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a semi-colon
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @returns a new feeder
   */
  (filePath: string): BatchableFeederBuilder<string>;

  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a semi-colon
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @param quoteChar - the quote char to wrap values containing special characters (must be a single character)
   * @returns a new feeder
   */
  (filePath: string, quoteChar: string): BatchableFeederBuilder<string>;
}

export const ssv: SsvFunction = (filePath: string, quoteChar?: string) =>
  wrapBatchableFeederBuilder(quoteChar !== undefined ? JvmCoreDsl.ssv(filePath, quoteChar) : JvmCoreDsl.ssv(filePath));

export interface TsvFunction {
  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a tab
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @returns a new feeder
   */
  (filePath: string): BatchableFeederBuilder<string>;

  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a tab
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @param quoteChar - the quote char to wrap values containing special characters (must be a single character)
   * @returns a new feeder
   */
  (filePath: string, quoteChar: string): BatchableFeederBuilder<string>;
}

export const tsv: TsvFunction = (filePath: string, quoteChar?: string) =>
  wrapBatchableFeederBuilder(quoteChar !== undefined ? JvmCoreDsl.tsv(filePath, quoteChar) : JvmCoreDsl.tsv(filePath));

export interface SeparatedValuesFunction {
  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a tab
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @param separator - the provided separator char (must be a single character)
   * @returns a new feeder
   */
  (filePath: string, separator: string): BatchableFeederBuilder<string>;

  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a tab
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @param separator - the provided separator char (must be a single character)
   * @param quoteChar - the quote char to wrap values containing special characters (must be a single character)
   * @returns a new feeder
   */
  (filePath: string, separator: string, quoteChar: string): BatchableFeederBuilder<string>;
}

export const separatedValues: SeparatedValuesFunction = (filePath: string, separator: string, quoteChar?: string) =>
  wrapBatchableFeederBuilder(
    quoteChar !== undefined
      ? JvmCoreDsl.separatedValues(filePath, separator, quoteChar)
      : JvmCoreDsl.separatedValues(filePath, separator)
  );

/**
 * Bootstrap a new JSON file based feeder
 *
 * @param filePath - the path of the file, relative to the root of the resources folder
 * @returns a new feeder
 */
export const jsonFile = (filePath: string): FileBasedFeederBuilder<any> =>
  wrapFileBasedFeederBuilder(JvmCoreDsl.jsonFile(filePath));

/**
 * Bootstrap a new JSON API based feeder
 *
 * @param url - the url of the API
 * @returns a new feeder
 */
export const jsonUrl = (url: string): FeederBuilder<any> => wrapFeederBuilder(JvmCoreDsl.jsonUrl(url));

/**
 * Bootstrap a new in-memory array of Maps based feeder
 *
 * @param data - the in-memory data
 * @returns a new feeder
 */
export const arrayFeeder = (data: Array<Record<string, unknown>>): FeederBuilder<unknown> =>
  wrapFeederBuilder(JvmCoreDsl.arrayFeeder(data));
