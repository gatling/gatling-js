import { Session, Wrapper, asJava, underlyingSessionToJava } from "@gatling.io/core";

import { JdbcDsl as JvmJdbcDsl } from "@gatling.io/jvm-types";

import JvmJdbcParam = io.gatling.javaapi.jdbc.JdbcParam;

/**
 * The name of a java.sql.JDBCType
 */
export type JdbcType =
  | "BIT"
  | "TINYINT"
  | "SMALLINT"
  | "INTEGER"
  | "BIGINT"
  | "FLOAT"
  | "REAL"
  | "DOUBLE"
  | "NUMERIC"
  | "DECIMAL"
  | "CHAR"
  | "VARCHAR"
  | "LONGVARCHAR"
  | "DATE"
  | "TIME"
  | "TIMESTAMP"
  | "BINARY"
  | "VARBINARY"
  | "LONGVARBINARY"
  | "NULL"
  | "OTHER"
  | "JAVA_OBJECT"
  | "DISTINCT"
  | "STRUCT"
  | "ARRAY"
  | "BLOB"
  | "CLOB"
  | "REF"
  | "DATALINK"
  | "BOOLEAN"
  | "ROWID"
  | "NCHAR"
  | "NVARCHAR"
  | "LONGNVARCHAR"
  | "NCLOB"
  | "SQLXML"
  | "REF_CURSOR"
  | "TIME_WITH_TIMEZONE"
  | "TIMESTAMP_WITH_TIMEZONE";

const JvmJdbcType = Java.type<any>("java.sql.JDBCType");

const toJvmJdbcType = (type: JdbcType): unknown => JvmJdbcType.valueOf(type);

// a JS function, and null, are applicable to both the Object and the Function overloads, so select them explicitly
const jvmJdbcDsl = JvmJdbcDsl as any;
const jvmTypedParam = (value: JdbcValueExpression, type: JdbcType, method: "param" | "inOutParam"): JvmJdbcParam =>
  typeof value === "function"
    ? jvmJdbcDsl[`${method}(java.util.function.Function,java.sql.JDBCType)`](
        underlyingSessionToJava(value as (session: Session) => unknown),
        toJvmJdbcType(type)
      )
    : jvmJdbcDsl[`${method}(java.lang.Object,java.sql.JDBCType)`](asJava(value), toJvmJdbcType(type));

/**
 * A plain value bound to a statement parameter
 */
export type JdbcValue = string | number | boolean | bigint | null;

/**
 * A plain value bound to a statement parameter, or a function computing it from the Session
 */
export type JdbcValueExpression = JdbcValue | ((session: Session) => unknown);

/**
 * A statement parameter that needs more than its value: a type, or being an OUT or INOUT parameter
 */
export interface JdbcParam extends Wrapper<JvmJdbcParam> {}

const wrapJdbcParam = (_underlying: JvmJdbcParam): JdbcParam => ({ _underlying });

const isJdbcParam = (value: unknown): value is JdbcParam =>
  typeof value === "object" && value !== null && "_underlying" in value;

/**
 * Define a statement parameter of the given type, to be passed to params(...), like JMeter's typed
 * parameters. String values are converted to the Java type the JDBC type maps to, for example a
 * BigDecimal for DECIMAL, then bound with the matching setter, null values are bound with setNull
 * and the given type.
 *
 * @param value - the value: Strings are interpreted as Gatling Expression Language, functions
 *     compute the value from the Session, other values, including null, are bound as is
 * @param type - the SQL type of the parameter
 * @returns a parameter
 */
export const param = (value: JdbcValueExpression, type: JdbcType): JdbcParam =>
  wrapJdbcParam(jvmTypedParam(value, type, "param"));

/**
 * Define an OUT parameter, to be passed to the params(...) of a callable statement, registered
 * with CallableStatement.registerOutParameter. Its value can then be checked with outValue(index).
 *
 * @param type - the SQL type of the OUT parameter
 * @returns a parameter
 */
export const outParam = (type: JdbcType): JdbcParam => wrapJdbcParam(jvmJdbcDsl.outParam(toJvmJdbcType(type)));

/**
 * Define an INOUT parameter, to be passed to the params(...) of a callable statement: bound like
 * param(value, type), then registered like outParam(type). Its value can then be checked with
 * outValue(index).
 *
 * @param value - the value sent to the database: Strings are interpreted as Gatling Expression
 *     Language, functions compute the value from the Session, other values, including null, are
 *     bound as is
 * @param type - the SQL type of the parameter
 * @returns a parameter
 */
export const inOutParam = (value: JdbcValueExpression, type: JdbcType): JdbcParam =>
  wrapJdbcParam(jvmTypedParam(value, type, "inOutParam"));

/**
 * Converts params(...) values for the Java DSL: Strings stay Gatling Expression Language, functions
 * compute the value from the Session, parameters are unwrapped, and other values are bound as is.
 */
export const toJvmParams = (values: (JdbcValueExpression | JdbcParam)[]): unknown[] =>
  values.map((value) => {
    if (typeof value === "function") {
      return jvmJdbcDsl["param(java.util.function.Function)"](
        underlyingSessionToJava(value as (session: Session) => unknown)
      );
    } else if (isJdbcParam(value)) {
      return value._underlying;
    } else {
      return asJava(value);
    }
  });
