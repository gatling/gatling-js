import { Session, SessionTo, isSessionTo, underlyingSessionTo, underlyingXWithSessionTo } from "../session";
import { CheckBuilderFinal, wrapCheckBuilderFinal } from "./final";

import JvmCheckBuilderValidate = io.gatling.javaapi.core.CheckBuilder$Validate;

/**
 * Step 2 of the Check DSL where we define how to validate the extracted value. Immutable, so all
 * methods return a new occurrence and leave the original unmodified.
 *
 * @typeParam X - the type of the extracted value
 */
export interface CheckBuilderValidate<X> extends CheckBuilderFinal {
  /**
   * Transform the extracted value
   *
   * @param f - the transformation function
   * @typeParam X2 - the transformed value
   * @returns a new CheckBuilderValidate
   */
  transform<X2>(f: (x: X) => X2): CheckBuilderValidate<X2>;

  /**
   * Transform the extracted value, whith access to the current Session
   *
   * @param f - the transformation function
   * @typeParam X2 - the transformed value
   * @returns a new CheckBuilderValidate
   */
  transformWithSession<X2>(f: (x: X, session: Session) => X2): CheckBuilderValidate<X2>;

  /**
   * Provide a default value if the check wasn't able to extract anything
   *
   * @param value - the default value or a function returning the default value
   * @returns a new Validate
   */
  withDefault(value: X | ((session: Session) => X)): CheckBuilderValidate<X>;

  /**
   * Provide a default Gatling Expression Language value if the check wasn't able to extract
   * anything
   *
   * @param value - the default value as a Gatling Expression Language String
   * @returns a new Validate
   */
  withDefaultEL(value: string): CheckBuilderValidate<X>;

  /**
   * Provide a custom validation strategy
   *
   * @param name - the name of the validation, in case of a failure
   * @param f - the custom validation function, must throw to trigger a failure
   * @returns a new CheckBuilderFinal
   */
  validate(name: string, f: (x: X, session: Session) => X): CheckBuilderFinal;

  /**
   * Validate the extracted value is equal to an expected value
   *
   * @param expected - the expected value or a function returning the expected value
   * @returns a new CheckBuilderFinal
   */
  is(expected: X | ((session: Session) => X)): CheckBuilderFinal;

  /**
   * Validate the extracted value is equal to an expected value, passed as a Gatling Expression
   * Language String
   *
   * @param expected - the expected value as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  isEL(expected: string): CheckBuilderFinal;

  /**
   * Validate the extracted value is null
   *
   * @returns a new CheckBuilderFinal
   */
  isNull(): CheckBuilderFinal;

  /**
   * Validate the extracted value is not an expected value
   *
   * @param expected - the unexpected value or a function returning the unexpected value
   * @returns a new CheckBuilderFinal
   */
  not(expected: X | ((session: Session) => X)): CheckBuilderFinal;

  /**
   * Validate the extracted value is not an expected value, passed as a Gatling Expression
   * Language String
   *
   * @param expected - the unexpected value as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  notEL(expected: string): CheckBuilderFinal;

  /**
   * Validate the extracted value is not null
   *
   * @returns a new CheckBuilderFinal
   */
  notNull(): CheckBuilderFinal;

  /**
   * Validate the extracted value belongs to an expected set
   *
   * @param expectedOrFunction - either a single expected value or a function returning an array of expected values
   * @param additionalValues - additional expected values (ignored if expectedOrFunction is a function)
   * @returns a new Final
   */
  in(expectedOrFunction: X | SessionTo<X[]>, ...additionalValues: X[]): CheckBuilderFinal;

  /**
   * Validate the extracted value belongs to an expected set, passed as a Gatling Expression
   * Language String
   *
   * @param expected - the set of possible values, as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  inEL(expected: string): CheckBuilderFinal;

  /**
   * Validate the check was able to extract any value
   *
   * @returns a new CheckBuilderFinal
   */
  exists(): CheckBuilderFinal;

  /**
   * Validate the check was not able to extract any value
   *
   * @returns a new CheckBuilderFinal
   */
  notExists(): CheckBuilderFinal;

  /**
   * Make the check is successful whenever it was able to extract something or not
   *
   * @returns a new CheckBuilderFinal
   */
  optional(): CheckBuilderFinal;

  /**
   * Validate the extracted value is less than a given value
   *
   * @param value - the value or a function returning the value
   * @returns a new CheckBuilderFinal
   */
  lt(value: X | ((session: Session) => X)): CheckBuilderFinal;

  /**
   * Validate the extracted value is less than a given value, passed as a Gatling Expression
   * Language String
   *
   * @param value - the value, as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  ltEL(value: string): CheckBuilderFinal;

  /**
   * Validate the extracted value is less than or equal to a given value
   *
   * @param value - the value or a function returning the value
   * @returns a new CheckBuilderFinal
   */
  lte(value: X | ((session: Session) => X)): CheckBuilderFinal;

  /**
   * Validate the extracted value is less than or equal to a given value, passed as a Gatling
   * Expression Language String
   *
   * @param value - the value, as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  lteEL(value: string): CheckBuilderFinal;

  /**
   * Validate the extracted value is greater than a given value
   *
   * @param value - the value or a function returning the value
   * @returns a new CheckBuilderFinal
   */
  gt(value: X | ((session: Session) => X)): CheckBuilderFinal;

  /**
   * Validate the extracted value is greater than a given value, passed as a Gatling Expression
   * Language String
   *
   * @param value - the value, as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  gtEL(value: string): CheckBuilderFinal;

  /**
   * Validate the extracted value is greater than or equal to a given value
   *
   * @param value - the value or a function returning the value
   * @returns a new CheckBuilderFinal
   */
  gte(value: X | ((session: Session) => X)): CheckBuilderFinal;

  /**
   * Validate the extracted value is greater than or equal to a given value, passed as a Gatling
   * Expression Language String
   *
   * @param value - the value, as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  gteEL(value: string): CheckBuilderFinal;
}

export const wrapCheckBuilderValidate = <X>(_underlying: JvmCheckBuilderValidate<X>): CheckBuilderValidate<X> => ({
  ...wrapCheckBuilderFinal(_underlying),
  transform: (f) => wrapCheckBuilderValidate(_underlying.transform(f)),
  transformWithSession: (f) => wrapCheckBuilderValidate(_underlying.transformWithSession(underlyingXWithSessionTo(f))),
  withDefault: (value) =>
    wrapCheckBuilderValidate(
      isSessionTo(value) ? _underlying.withDefault(underlyingSessionTo(value)) : _underlying.withDefault(value)
    ),
  withDefaultEL: (value) => wrapCheckBuilderValidate(_underlying.withDefaultEl(value)),
  validate: (name, f) => wrapCheckBuilderFinal(_underlying.validate(name, underlyingXWithSessionTo(f))),
  is: (expected) =>
    wrapCheckBuilderFinal(
      isSessionTo(expected) ? _underlying.is(underlyingSessionTo(expected)) : _underlying.is(expected)
    ),
  isEL: (expected) => wrapCheckBuilderFinal(_underlying.isEL(expected)),
  isNull: () => wrapCheckBuilderFinal(_underlying.isNull()),
  not: (expected) =>
    wrapCheckBuilderFinal(
      isSessionTo(expected) ? _underlying.not(underlyingSessionTo(expected)) : _underlying.not(expected)
    ),
  notEL: (expected) => wrapCheckBuilderFinal(_underlying.notEL(expected)),
  notNull: () => wrapCheckBuilderFinal(_underlying.notNull()),
  in: (expectedOrFunction, ...additionalValues) =>
    wrapCheckBuilderFinal(
      typeof expectedOrFunction === "function"
        ? _underlying.in(underlyingSessionTo(expectedOrFunction as SessionTo<X[]>))
        : _underlying.in([expectedOrFunction, ...additionalValues])
    ),
  inEL: (expected) => wrapCheckBuilderFinal(_underlying.inEL(expected)),
  exists: () => wrapCheckBuilderFinal(_underlying.exists()),
  notExists: () => wrapCheckBuilderFinal(_underlying.notExists()),
  optional: () => wrapCheckBuilderFinal(_underlying.optional()),
  lt: (value) =>
    wrapCheckBuilderFinal(isSessionTo(value) ? _underlying.lt(underlyingSessionTo(value)) : _underlying.lt(value)),
  ltEL: (value) => wrapCheckBuilderFinal(_underlying.ltEL(value)),
  lte: (value) =>
    wrapCheckBuilderFinal(isSessionTo(value) ? _underlying.lte(underlyingSessionTo(value)) : _underlying.lte(value)),
  lteEL: (value) => wrapCheckBuilderFinal(_underlying.lteEL(value)),
  gt: (value) =>
    wrapCheckBuilderFinal(isSessionTo(value) ? _underlying.gt(underlyingSessionTo(value)) : _underlying.gt(value)),
  gtEL: (value) => wrapCheckBuilderFinal(_underlying.gtEL(value)),
  gte: (value) =>
    wrapCheckBuilderFinal(isSessionTo(value) ? _underlying.gte(underlyingSessionTo(value)) : _underlying.gte(value)),
  gteEL: (value) => wrapCheckBuilderFinal(_underlying.gteEL(value))
});
