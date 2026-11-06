import {
  ActionBuilder,
  CheckBuilder,
  Condition,
  Expression,
  Session,
  underlyingSessionTo,
  underlyingSessionToJava,
  wrapCondition
} from "@gatling.io/core";

import { JdbcParam, JdbcValueExpression, toJvmParams } from "./params";

import JvmJdbc = io.gatling.javaapi.jdbc.Jdbc;
import JvmJdbcBeginActionBuilder = io.gatling.javaapi.jdbc.JdbcBeginActionBuilder;
import JvmJdbcCallableStatementActionBuilder = io.gatling.javaapi.jdbc.JdbcCallableStatementActionBuilder;
import JvmJdbcPreparedStatementActionBuilder = io.gatling.javaapi.jdbc.JdbcPreparedStatementActionBuilder;
import JvmJdbcStatementActionBuilder = io.gatling.javaapi.jdbc.JdbcStatementActionBuilder;
import JvmJdbcTransactionActionBuilder = io.gatling.javaapi.jdbc.JdbcTransactionActionBuilder;

interface JvmJdbcRequestActionBuilder<J> {
  check(...checks: io.gatling.javaapi.core.CheckBuilder[]): J;
  checkIf(condition: any): any;
}

/**
 * Methods shared by the DSLs for building JDBC requests
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 *
 * @typeParam T - the type of the builder
 */
export interface JdbcRequestActionBuilder<T> extends ActionBuilder {
  /**
   * Define some checks, applied in order once the statement succeeded
   *
   * @param checks - the checks
   * @returns a new instance
   */
  check(...checks: CheckBuilder[]): T;

  /**
   * Define some checks to be applied only if some condition holds true
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  checkIf(condition: string): Condition<T>;

  /**
   * Define some checks to be applied only if some condition holds true
   *
   * @param condition - the condition, expressed as a function
   * @returns the next DSL step
   */
  checkIf(condition: (session: Session) => boolean): Condition<T>;
}

const jdbcRequestActionBuilderImpl = <J extends JvmJdbcRequestActionBuilder<J>, T>(
  _underlying: J,
  wrap: (underlying: J) => T
): JdbcRequestActionBuilder<T> => ({
  _underlying: _underlying as any,
  check: (...checks: CheckBuilder[]): T => wrap(_underlying.check(...checks.map((check) => check._underlying))),
  checkIf: (condition: string | ((session: Session) => boolean)): Condition<T> =>
    wrapCondition(
      typeof condition === "function"
        ? _underlying.checkIf(underlyingSessionTo(condition))
        : _underlying.checkIf(condition),
      wrap
    )
});

const returnGeneratedKeys = <J>(_underlying: { returnGeneratedKeys(...columns: string[]): J }, columns: string[]): J =>
  columns.length === 0
    ? _underlying.returnGeneratedKeys()
    : _underlying.returnGeneratedKeys(columns[0], ...columns.slice(1));

/**
 * DSL for building java.sql.Statement requests
 */
export interface JdbcStatementActionBuilder extends JdbcRequestActionBuilder<JdbcStatementActionBuilder> {
  /**
   * Ask the database for the keys it generated, typically for identity columns, so that they can be
   * checked with generatedKey(). Without columns, the driver decides which columns to return, for
   * example Oracle's returns the ROWID: pass the names of the columns to get their values.
   *
   * @param columns - the generated columns to return
   * @returns a new JdbcStatementActionBuilder instance
   */
  returnGeneratedKeys(...columns: string[]): JdbcStatementActionBuilder;
}

const wrapJdbcStatementActionBuilder = (_underlying: JvmJdbcStatementActionBuilder): JdbcStatementActionBuilder => ({
  ...jdbcRequestActionBuilderImpl(_underlying, wrapJdbcStatementActionBuilder),
  returnGeneratedKeys: (...columns: string[]) =>
    wrapJdbcStatementActionBuilder(returnGeneratedKeys(_underlying, columns))
});

/**
 * DSL for building java.sql.PreparedStatement requests
 */
export interface JdbcPreparedStatementActionBuilder extends JdbcRequestActionBuilder<JdbcPreparedStatementActionBuilder> {
  /**
   * Define the values bound to the ? placeholders, in order. Calling it again replaces the previous
   * values. Can't be combined with batch(...).
   *
   * @param values - the values: Strings are interpreted as Gatling Expression Language, functions
   *     compute the value from the Session, param(...) defines a typed value, and other values are
   *     bound as is
   * @returns a new JdbcPreparedStatementActionBuilder instance
   */
  params(...values: (JdbcValueExpression | JdbcParam)[]): JdbcPreparedStatementActionBuilder;

  /**
   * Run the statement once per row, as a batch. Can't be combined with params(...).
   *
   * @param rows - the rows, expressed as a Gatling Expression Language String, typically "#{rows}",
   *     resolving to a List of rows, each one being a List of values
   * @returns a new JdbcPreparedStatementActionBuilder instance
   */
  batch(rows: string): JdbcPreparedStatementActionBuilder;

  /**
   * Run the statement once per row, as a batch. Can't be combined with params(...).
   *
   * @param rows - the rows, each one being an array of values, expressed as a function
   * @returns a new JdbcPreparedStatementActionBuilder instance
   */
  batch(rows: (session: Session) => unknown[][]): JdbcPreparedStatementActionBuilder;

  /**
   * Ask the database for the keys it generated, typically for identity columns, so that they can be
   * checked with generatedKey(). Without columns, the driver decides which columns to return, for
   * example Oracle's returns the ROWID: pass the names of the columns to get their values.
   *
   * @param columns - the generated columns to return
   * @returns a new JdbcPreparedStatementActionBuilder instance
   */
  returnGeneratedKeys(...columns: string[]): JdbcPreparedStatementActionBuilder;
}

const wrapJdbcPreparedStatementActionBuilder = (
  _underlying: JvmJdbcPreparedStatementActionBuilder
): JdbcPreparedStatementActionBuilder => ({
  ...jdbcRequestActionBuilderImpl(_underlying, wrapJdbcPreparedStatementActionBuilder),
  params: (...values: (JdbcValueExpression | JdbcParam)[]) =>
    wrapJdbcPreparedStatementActionBuilder(_underlying.params(...toJvmParams(values))),
  batch: (rows: string | ((session: Session) => unknown[][])) =>
    wrapJdbcPreparedStatementActionBuilder(
      typeof rows === "function"
        ? // a JS function is applicable to both batch(String) and batch(Function), so select the overload explicitly
          (_underlying as any)["batch(java.util.function.Function)"](underlyingSessionToJava(rows))
        : _underlying.batch(rows)
    ),
  returnGeneratedKeys: (...columns: string[]) =>
    wrapJdbcPreparedStatementActionBuilder(returnGeneratedKeys(_underlying, columns))
});

/**
 * DSL for building java.sql.CallableStatement requests
 */
export interface JdbcCallableStatementActionBuilder extends JdbcRequestActionBuilder<JdbcCallableStatementActionBuilder> {
  /**
   * Define the values bound to the ? placeholders, in order. Calling it again replaces the previous
   * values.
   *
   * @param values - the values: like for prepared statements, plus outParam(...) for OUT parameters
   *     and inOutParam(...) for INOUT parameters
   * @returns a new JdbcCallableStatementActionBuilder instance
   */
  params(...values: (JdbcValueExpression | JdbcParam)[]): JdbcCallableStatementActionBuilder;
}

const wrapJdbcCallableStatementActionBuilder = (
  _underlying: JvmJdbcCallableStatementActionBuilder
): JdbcCallableStatementActionBuilder => ({
  ...jdbcRequestActionBuilderImpl(_underlying, wrapJdbcCallableStatementActionBuilder),
  params: (...values: (JdbcValueExpression | JdbcParam)[]) =>
    wrapJdbcCallableStatementActionBuilder(_underlying.params(...toJvmParams(values)))
});

/**
 * The name of a transaction isolation level, see java.sql.Connection.setTransactionIsolation
 */
export type JdbcTransactionIsolation = "READ_UNCOMMITTED" | "READ_COMMITTED" | "REPEATABLE_READ" | "SERIALIZABLE";

const JvmConnection = Java.type<any>("java.sql.Connection");

/**
 * DSL for building requests that begin a transaction
 */
export interface JdbcBeginActionBuilder extends ActionBuilder {
  /**
   * Define the isolation level of the transaction, see Connection.setTransactionIsolation. The
   * connection's own is restored once the transaction is over.
   *
   * @param level - the isolation level
   * @returns a new JdbcBeginActionBuilder instance
   */
  transactionIsolation(level: JdbcTransactionIsolation): JdbcBeginActionBuilder;

  /**
   * Make the transaction read-only, see Connection.setReadOnly: a hint drivers and databases may use
   * to optimize it, or to reject writes. The connection's own setting is restored once the
   * transaction is over.
   *
   * @returns a new JdbcBeginActionBuilder instance
   */
  readOnly(): JdbcBeginActionBuilder;
}

const wrapJdbcBeginActionBuilder = (_underlying: JvmJdbcBeginActionBuilder): JdbcBeginActionBuilder => ({
  _underlying,
  transactionIsolation: (level: JdbcTransactionIsolation) =>
    wrapJdbcBeginActionBuilder(_underlying.transactionIsolation(JvmConnection[`TRANSACTION_${level}`])),
  readOnly: () => wrapJdbcBeginActionBuilder(_underlying.readOnly())
});

/**
 * DSL for building requests that commit or roll back a transaction
 */
export interface JdbcTransactionActionBuilder extends ActionBuilder {}

const wrapJdbcTransactionActionBuilder = (
  _underlying: JvmJdbcTransactionActionBuilder
): JdbcTransactionActionBuilder => ({
  _underlying
});

/**
 * DSL for bootstrapping JDBC requests. In the SQL, Gatling Expression Language placeholders like
 * #{table} are replaced with their value in the SQL text itself: use a prepared statement with ?
 * placeholders for bound parameters.
 */
export interface Jdbc {
  /**
   * Run a java.sql.Statement
   *
   * @param sql - the SQL, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  statement(sql: string): JdbcStatementActionBuilder;

  /**
   * Run a java.sql.Statement
   *
   * @param sql - the SQL, expressed as a function
   * @returns the next DSL step
   */
  statement(sql: (session: Session) => string): JdbcStatementActionBuilder;

  /**
   * Run a java.sql.PreparedStatement, whose ? placeholders are bound with params(...)
   *
   * @param sql - the SQL, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  preparedStatement(sql: string): JdbcPreparedStatementActionBuilder;

  /**
   * Run a java.sql.PreparedStatement, whose ? placeholders are bound with params(...)
   *
   * @param sql - the SQL, expressed as a function
   * @returns the next DSL step
   */
  preparedStatement(sql: (session: Session) => string): JdbcPreparedStatementActionBuilder;

  /**
   * Run a java.sql.CallableStatement, typically a stored procedure, whose ? placeholders are bound
   * with params(...), including OUT and INOUT parameters
   *
   * @param sql - the SQL, expressed as a Gatling Expression Language String, for example
   *     "{call procedure(?, ?)}"
   * @returns the next DSL step
   */
  callableStatement(sql: string): JdbcCallableStatementActionBuilder;

  /**
   * Run a java.sql.CallableStatement, typically a stored procedure, whose ? placeholders are bound
   * with params(...), including OUT and INOUT parameters
   *
   * @param sql - the SQL, expressed as a function
   * @returns the next DSL step
   */
  callableStatement(sql: (session: Session) => string): JdbcCallableStatementActionBuilder;

  /**
   * Begin a transaction: borrow a connection and turn auto-commit off. The virtual user keeps this
   * connection, and runs all its statements on it, until commit() or rollback(). If the virtual user
   * exits before, the transaction is rolled back.
   *
   * @returns the next DSL step
   */
  begin(): JdbcBeginActionBuilder;

  /**
   * Commit the transaction opened with begin(), then give its connection back, even if the commit
   * failed
   *
   * @returns the next DSL step
   */
  commit(): JdbcTransactionActionBuilder;

  /**
   * Roll back the transaction opened with begin(), then give its connection back, even if the
   * rollback failed
   *
   * @returns the next DSL step
   */
  rollback(): JdbcTransactionActionBuilder;
}

const sqlExpression = <J>(
  sql: Expression<string>,
  ofString: (sql: string) => J,
  ofFunction: (sql: (session: any) => string) => J
): J => (typeof sql === "function" ? ofFunction(underlyingSessionTo(sql)) : ofString(sql));

export const wrapJdbc = (_underlying: JvmJdbc): Jdbc => ({
  statement: (sql: Expression<string>) =>
    wrapJdbcStatementActionBuilder(
      sqlExpression(
        sql,
        (s) => _underlying.statement(s),
        (f) => _underlying.statement(f)
      )
    ),
  preparedStatement: (sql: Expression<string>) =>
    wrapJdbcPreparedStatementActionBuilder(
      sqlExpression(
        sql,
        (s) => _underlying.preparedStatement(s),
        (f) => _underlying.preparedStatement(f)
      )
    ),
  callableStatement: (sql: Expression<string>) =>
    wrapJdbcCallableStatementActionBuilder(
      sqlExpression(
        sql,
        (s) => _underlying.callableStatement(s),
        (f) => _underlying.callableStatement(f)
      )
    ),
  begin: () => wrapJdbcBeginActionBuilder(_underlying.begin()),
  commit: () => wrapJdbcTransactionActionBuilder(_underlying.commit()),
  rollback: () => wrapJdbcTransactionActionBuilder(_underlying.rollback())
});
