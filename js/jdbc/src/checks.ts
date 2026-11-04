import {
  CheckBuilderFind,
  CheckBuilderMultipleFind,
  Expression,
  underlyingSessionTo,
  wrapCheckBuilderFind,
  wrapCheckBuilderMultipleFind
} from "@gatling.io/core";

import { JdbcDsl as JvmJdbcDsl } from "@gatling.io/jvm-types";

/**
 * Bootstrap a check on the update counts the statement produced, for example the number of rows an
 * INSERT, UPDATE or DELETE affected, the first one with find(), one per row for a batch
 *
 * @returns the next DSL step
 */
export const updateCount = (): CheckBuilderMultipleFind<number> =>
  wrapCheckBuilderMultipleFind(JvmJdbcDsl.updateCount() as any);

/**
 * Bootstrap a check on the number of rows in the first result set the statement produced
 *
 * @returns the next DSL step
 */
export const rowCount = (): CheckBuilderFind<number> => wrapCheckBuilderFind(JvmJdbcDsl.rowCount() as any);

/**
 * Bootstrap a check on the values of a column of the first result set the statement produced, one
 * per row. Names are matched exactly first, then ignoring case. SQL NULLs are extracted as null.
 *
 * @param column - the name of the column, expressed as a Gatling Expression Language String or a
 *     function, or its index, starting at 1 like in JDBC
 * @returns the next DSL step
 */
export const column = (column: Expression<string> | number): CheckBuilderMultipleFind<unknown> =>
  wrapCheckBuilderMultipleFind(
    (typeof column === "function"
      ? JvmJdbcDsl.column(underlyingSessionTo(column))
      : JvmJdbcDsl.column(column as any)) as any
  );

/**
 * Bootstrap a check on all the rows of the first result set the statement produced, each one being
 * a Map of the column labels to the values, typically to save them and iterate over them with
 * foreach
 *
 * @returns the next DSL step
 */
export const rows = (): CheckBuilderFind<unknown> => wrapCheckBuilderFind(JvmJdbcDsl.rows() as any);

/**
 * Bootstrap a check on the values of a column of the keys the database generated, one per inserted
 * row. Requires the statement to run with returnGeneratedKeys().
 *
 * @param column - the name of the column, expressed as a Gatling Expression Language String or a
 *     function, or its index, starting at 1 like in JDBC, the first column if omitted
 * @returns the next DSL step
 */
export const generatedKey = (column?: Expression<string> | number): CheckBuilderMultipleFind<unknown> =>
  wrapCheckBuilderMultipleFind(
    (column === undefined
      ? JvmJdbcDsl.generatedKey()
      : typeof column === "function"
        ? JvmJdbcDsl.generatedKey(underlyingSessionTo(column))
        : JvmJdbcDsl.generatedKey(column as any)) as any
  );

/**
 * Bootstrap a check on the value of an OUT or INOUT parameter of a callable statement
 *
 * @param index - the index of the parameter, starting at 1 like in JDBC
 * @returns the next DSL step
 */
export const outValue = (index: number): CheckBuilderFind<unknown> =>
  wrapCheckBuilderFind(JvmJdbcDsl.outValue(index) as any);
