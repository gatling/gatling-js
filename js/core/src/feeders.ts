import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";
import JvmFeederBuilder = io.gatling.javaapi.core.FeederBuilder;
import JvmFeederBuilderFileBased = io.gatling.javaapi.core.FeederBuilder$FileBased;
import JvmFeederBuilderSeparatedValues = io.gatling.javaapi.core.FeederBuilder$SeparatedValues;

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
  queue(): FileBasedFeederBuilder<T>;
  random(): FileBasedFeederBuilder<T>;
  shuffle(): FileBasedFeederBuilder<T>;
  circular(): FileBasedFeederBuilder<T>;
  shard(): FileBasedFeederBuilder<T>;
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

export interface SeparatedValuesFeederBuilder<T> extends FileBasedFeederBuilder<T> {
  queue(): SeparatedValuesFeederBuilder<T>;
  random(): SeparatedValuesFeederBuilder<T>;
  shuffle(): SeparatedValuesFeederBuilder<T>;
  circular(): SeparatedValuesFeederBuilder<T>;
  shard(): SeparatedValuesFeederBuilder<T>;
  unzip(): SeparatedValuesFeederBuilder<T>;

  /**
   * Provide the column names of a file that doesn't have a header line. The first line of the
   * file is then a record like all the other ones.
   *
   * @param firstHeader - the first column name
   * @param otherHeaders - the other column names
   * @returns a new SeparatedValuesFeederBuilder
   */
  headers(firstHeader: string, ...otherHeaders: string[]): SeparatedValuesFeederBuilder<T>;
}

export const wrapSeparatedValuesFeederBuilder = <T>(
  _underlying: JvmFeederBuilderSeparatedValues<T>
): SeparatedValuesFeederBuilder<T> => ({
  _underlying,
  queue: () => wrapSeparatedValuesFeederBuilder(_underlying.queue()),
  random: () => wrapSeparatedValuesFeederBuilder(_underlying.random()),
  shuffle: () => wrapSeparatedValuesFeederBuilder(_underlying.shuffle()),
  circular: () => wrapSeparatedValuesFeederBuilder(_underlying.circular()),
  transform: (f: (name: string, value: T) => unknown) => wrapFeederBuilder(_underlying.transform(f)),
  recordsCount: () => _underlying.recordsCount(),
  shard: () => wrapSeparatedValuesFeederBuilder(_underlying.shard()),
  unzip: () => wrapSeparatedValuesFeederBuilder(_underlying.unzip()),
  headers: (firstHeader, ...otherHeaders) =>
    wrapSeparatedValuesFeederBuilder(_underlying.headers(firstHeader, ...otherHeaders))
});

export interface CsvFunction {
  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @returns a new feeder
   */
  (filePath: string): SeparatedValuesFeederBuilder<string>;

  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @param quoteChar - the quote char to wrap values containing special characters
   * @returns a new feeder
   */
  (filePath: string, quoteChar: string): SeparatedValuesFeederBuilder<string>;
}

export const csv: CsvFunction = (filePath, quoteChar?: string) =>
  wrapSeparatedValuesFeederBuilder(
    quoteChar !== undefined ? JvmCoreDsl.csv(filePath, quoteChar) : JvmCoreDsl.csv(filePath)
  );

export interface SsvFunction {
  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a semi-colon
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @returns a new feeder
   */
  (filePath: string): SeparatedValuesFeederBuilder<string>;

  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a semi-colon
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @param quoteChar - the quote char to wrap values containing special characters (must be a single character)
   * @returns a new feeder
   */
  (filePath: string, quoteChar: string): SeparatedValuesFeederBuilder<string>;
}

export const ssv: SsvFunction = (filePath, quoteChar?: string) =>
  wrapSeparatedValuesFeederBuilder(
    quoteChar !== undefined ? JvmCoreDsl.ssv(filePath, quoteChar) : JvmCoreDsl.ssv(filePath)
  );

export interface TsvFunction {
  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a tab
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @returns a new feeder
   */
  (filePath: string): SeparatedValuesFeederBuilder<string>;

  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a tab
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @param quoteChar - the quote char to wrap values containing special characters (must be a single character)
   * @returns a new feeder
   */
  (filePath: string, quoteChar: string): SeparatedValuesFeederBuilder<string>;
}

export const tsv: TsvFunction = (filePath, quoteChar?: string) =>
  wrapSeparatedValuesFeederBuilder(
    quoteChar !== undefined ? JvmCoreDsl.tsv(filePath, quoteChar) : JvmCoreDsl.tsv(filePath)
  );

export interface SeparatedValuesFunction {
  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a tab
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @param separator - the provided separator char (must be a single character)
   * @returns a new feeder
   */
  (filePath: string, separator: string): SeparatedValuesFeederBuilder<string>;

  /**
   * Bootstrap a new {@link https://datatracker.ietf.org/doc/html/rfc4180 | CSV file} based feeder, where the separator
   * is a tab
   *
   * @param filePath - the path of the file, relative to the root of the resources folder
   * @param separator - the provided separator char (must be a single character)
   * @param quoteChar - the quote char to wrap values containing special characters (must be a single character)
   * @returns a new feeder
   */
  (filePath: string, separator: string, quoteChar: string): SeparatedValuesFeederBuilder<string>;
}

export const separatedValues: SeparatedValuesFunction = (filePath, separator, quoteChar?: string) =>
  wrapSeparatedValuesFeederBuilder(
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
