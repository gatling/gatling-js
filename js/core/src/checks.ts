import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";
import JvmCheckBuilder = io.gatling.javaapi.core.CheckBuilder;
import JvmCheckBuilderCaptureGroup = io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder;
import JvmCheckBuilderFinal = io.gatling.javaapi.core.CheckBuilder$Final;
import JvmCheckBuilderFind = io.gatling.javaapi.core.CheckBuilder$Find;
import JvmCheckBuilderMultipleFind = io.gatling.javaapi.core.CheckBuilder$MultipleFind;
import JvmCheckBuilderValidate = io.gatling.javaapi.core.CheckBuilder$Validate;

import { wrapCallback, wrapBiCallback } from "./gatlingJvm/callbacks";
import { Wrapper } from "./common";
import { Expression, Session, SessionTo, underlyingSessionTo, underlyingXWithSessionTo } from "./session";

export interface CheckBuilder extends Wrapper<JvmCheckBuilder> {}

const wrapCheckBuilder = (_underlying: JvmCheckBuilder): CheckBuilder => ({
  _underlying
});

export interface CheckBuilderFinal extends CheckBuilder {
  /**
   * Provide a custom name for the check, to be used in case of a failure
   *
   * @param n - the name
   * @returns a new CheckBuilderFinal
   */
  name(n: string): CheckBuilderFinal;

  /**
   * Save the extracted value in the virtual user's Session
   *
   * @param key - the key to store the extracted value in the Session
   * @returns a new CheckBuilderFinal
   */
  saveAs(key: string): CheckBuilderFinal;
}

const wrapCheckBuilderFinal = (_underlying: JvmCheckBuilderFinal): CheckBuilderFinal => ({
  ...wrapCheckBuilder(_underlying),
  name: (n: string) => wrapCheckBuilderFinal(_underlying.name(n)),
  saveAs: (key: string) => wrapCheckBuilderFinal(_underlying.saveAs(key))
});

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
   * @param value - the default value
   * @returns a new Validate
   */
  withDefault(value: X): CheckBuilderValidate<X>;

  /**
   * Provide a default Gatling Expression Language value if the check wasn't able to extract
   * anything
   *
   * @param value - the default value as a Gatling Expression Language String
   * @returns a new Validate
   */
  withDefaultEL(value: string): CheckBuilderValidate<X>;

  /**
   * Provide a default value if the check wasn't able to extract anything
   *
   * @param value - the default value as a function
   * @returns a new Validate
   */
  withDefault(value: SessionTo<X>): CheckBuilderValidate<X>;

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
   * @param expected - the expected value
   * @returns a new CheckBuilderFinal
   */
  is(expected: X): CheckBuilderFinal;

  /**
   * Validate the extracted value is equal to an expected value, passed as a Gatling Expression
   * Language String
   *
   * @param expected - the expected value as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  isEL(expected: string): CheckBuilderFinal;

  /**
   * Validate the extracted value is equal to an expected value, passed as a function
   *
   * @param expected - the expected value as a function
   * @returns a new CheckBuilderFinal
   */
  is(expected: SessionTo<X>): CheckBuilderFinal;

  /**
   * Validate the extracted value is null
   *
   * @returns a new CheckBuilderFinal
   */
  isNull(): CheckBuilderFinal;

  /**
   * Validate the extracted value is not an expected value
   *
   * @param expected - the unexpected value
   * @returns a new CheckBuilderFinal
   */
  not(expected: X): CheckBuilderFinal;

  /**
   * Validate the extracted value is not an expected value, passed as a Gatling Expression
   * Language String
   *
   * @param expected - the unexpected value as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  notEL(expected: string): CheckBuilderFinal;

  /**
   * Validate the extracted value is not an expected value, passed as a function
   *
   * @param expected - the unexpected value as a function
   * @returns a new CheckBuilderFinal
   */
  not(expected: SessionTo<X>): CheckBuilderFinal;

  /**
   * Validate the extracted value is not null
   *
   * @returns a new CheckBuilderFinal
   */
  notNull(): CheckBuilderFinal;

  /**
   * Validate the extracted value belongs to an expected set
   *
   * @param expected - the set of possible values
   * @returns a new CheckBuilderFinal
   */
  in(expected: X[]): CheckBuilderFinal;

  /**
   * Validate the extracted value belongs to an expected set, passed as a Gatling Expression
   * Language String
   *
   * @param expected - the set of possible values, as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  inEL(expected: string): CheckBuilderFinal;

  /**
   * Validate the extracted value belongs to an expected set, passed as a function
   *
   * @param expected - the set of possible values, as a function
   * @returns a new CheckBuilderFinal
   */
  in(expected: SessionTo<X[]>): CheckBuilderFinal;

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
   * @param value - the value
   * @returns a new CheckBuilderFinal
   */
  lt(value: X): CheckBuilderFinal;

  /**
   * Validate the extracted value is less than a given value, passed as a Gatling Expression
   * Language String
   *
   * @param value - the value, as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  ltEL(value: string): CheckBuilderFinal;

  /**
   * Validate the extracted value is less than a given value, passed as a function
   *
   * @param value - the value, as a function
   * @returns a new CheckBuilderFinal
   */
  lt(value: SessionTo<X>): CheckBuilderFinal;

  /**
   * Validate the extracted value is less than or equal to a given value
   *
   * @param value - the value
   * @returns a new CheckBuilderFinal
   */
  lte(value: X): CheckBuilderFinal;

  /**
   * Validate the extracted value is less than or equal to a given value, passed as a Gatling
   * Expression Language String
   *
   * @param value - the value, as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  lteEL(value: string): CheckBuilderFinal;

  /**
   * Validate the extracted value is less than or equal to a given value, passed as a function
   *
   * @param value - the value, as a function
   * @returns a new CheckBuilderFinal
   */
  lte(value: SessionTo<X>): CheckBuilderFinal;

  /**
   * Validate the extracted value is greater than a given value
   *
   * @param value - the value
   * @returns a new CheckBuilderFinal
   */
  gt(value: X): CheckBuilderFinal;

  /**
   * Validate the extracted value is greater than a given value, passed as a Gatling Expression
   * Language String
   *
   * @param value - the value, as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  gtEL(value: string): CheckBuilderFinal;

  /**
   * Validate the extracted value is greater than a given value, passed as a function
   *
   * @param value - the value, as a function
   * @returns a new CheckBuilderFinal
   */
  gt(value: SessionTo<X>): CheckBuilderFinal;

  /**
   * Validate the extracted value is greater than or equal to a given value
   *
   * @param value - the value
   * @returns a new CheckBuilderFinal
   */
  gte(value: X): CheckBuilderFinal;

  /**
   * Validate the extracted value is greater than or equal to a given value, passed as a Gatling
   * Expression Language String
   *
   * @param value - the value, as a Gatling Expression Language String
   * @returns a new CheckBuilderFinal
   */
  gteEL(value: string): CheckBuilderFinal;

  /**
   * Validate the extracted value is greater than or equal to a given value, passed as a function
   *
   * @param value - the value, as a function
   * @returns a new CheckBuilderFinal
   */
  gte(value: SessionTo<X>): CheckBuilderFinal;
}

const wrapCheckBuilderValidate = <X>(_underlying: JvmCheckBuilderValidate<X>): CheckBuilderValidate<X> => ({
  ...wrapCheckBuilderFinal(_underlying),
  transform: <X2>(f: (x: X) => X2) => wrapCheckBuilderValidate(_underlying.transform(wrapCallback(f))),
  transformWithSession: <X2>(f: (x: X, session: Session) => X2) =>
    wrapCheckBuilderValidate(_underlying.transformWithSession(wrapBiCallback(underlyingXWithSessionTo(f)))),
  withDefault: (value: X | SessionTo<X>) =>
    wrapCheckBuilderValidate(
      typeof value === "function"
        ? _underlying.withDefault(wrapCallback(underlyingSessionTo(value as SessionTo<X>)))
        : _underlying.withDefault(value)
    ),
  withDefaultEL: (value: string) => wrapCheckBuilderValidate(_underlying.withDefaultEl(value)),
  validate: (name: string, f: (x: X, session: Session) => X) =>
    wrapCheckBuilderFinal(_underlying.validate(name, wrapBiCallback(underlyingXWithSessionTo(f)))),
  is: (expected: X | SessionTo<X>) =>
    wrapCheckBuilderFinal(
      typeof expected === "function"
        ? _underlying.is(wrapCallback(underlyingSessionTo(expected as SessionTo<X>)))
        : _underlying.is(expected)
    ),
  isEL: (expected: string) => wrapCheckBuilderFinal(_underlying.isEL(expected)),
  isNull: (): CheckBuilderFinal => wrapCheckBuilderFinal(_underlying.isNull()),
  not: (expected: X | SessionTo<X>) =>
    wrapCheckBuilderFinal(
      typeof expected === "function"
        ? _underlying.not(wrapCallback(underlyingSessionTo(expected as SessionTo<X>)))
        : _underlying.not(expected)
    ),
  notEL: (expected: string) => wrapCheckBuilderFinal(_underlying.notEL(expected)),
  notNull: (): CheckBuilderFinal => wrapCheckBuilderFinal(_underlying.notNull()),
  in: (expected: X[] | SessionTo<X[]>) =>
    wrapCheckBuilderFinal(
      typeof expected === "function"
        ? _underlying.in(wrapCallback(underlyingSessionTo(expected)))
        : _underlying.in(expected)
    ),
  inEL: (expected: string) => wrapCheckBuilderFinal(_underlying.inEL(expected)),
  exists: () => wrapCheckBuilderFinal(_underlying.exists()),
  notExists: () => wrapCheckBuilderFinal(_underlying.notExists()),
  optional: () => wrapCheckBuilderFinal(_underlying.optional()),
  lt: (value: X | SessionTo<X>) =>
    wrapCheckBuilderFinal(
      typeof value === "function"
        ? _underlying.lt(wrapCallback(underlyingSessionTo(value as SessionTo<X>)))
        : _underlying.lt(value)
    ),
  ltEL: (value: string) => wrapCheckBuilderFinal(_underlying.ltEL(value)),
  lte: (value: X | SessionTo<X>) =>
    wrapCheckBuilderFinal(
      typeof value === "function"
        ? _underlying.lte(wrapCallback(underlyingSessionTo(value as SessionTo<X>)))
        : _underlying.lte(value)
    ),
  lteEL: (value: string) => wrapCheckBuilderFinal(_underlying.lteEL(value)),
  gt: (value: X | SessionTo<X>) =>
    wrapCheckBuilderFinal(
      typeof value === "function"
        ? _underlying.gt(wrapCallback(underlyingSessionTo(value as SessionTo<X>)))
        : _underlying.gt(value)
    ),
  gtEL: (value: string) => wrapCheckBuilderFinal(_underlying.gtEL(value)),
  gte: (value: X | SessionTo<X>) =>
    wrapCheckBuilderFinal(
      typeof value === "function"
        ? _underlying.gte(wrapCallback(underlyingSessionTo(value as SessionTo<X>)))
        : _underlying.gte(value)
    ),
  gteEL: (value: string) => wrapCheckBuilderFinal(_underlying.gteEL(value))
});

export interface CheckBuilderFind<X> extends CheckBuilderValidate<X> {
  /**
   * Target a single/first value
   *
   * @returns the next Check DSL step
   */
  find(): CheckBuilderValidate<X>;
}

export const wrapCheckBuilderFind = <X>(_underlying: JvmCheckBuilderFind<X>): CheckBuilderFind<X> => ({
  ...wrapCheckBuilderValidate<X>(_underlying),
  find: () => wrapCheckBuilderValidate(_underlying.find())
});

export interface CheckBuilderMultipleFind<X> extends CheckBuilderValidate<X> {
  /**
   * Target a single/first value
   *
   * @returns the next Check DSL step
   */
  find(): CheckBuilderValidate<X>;

  /**
   * Target the occurrence-th occurrence in the extracted values
   *
   * @param occurrence - the rank of the target value in the extracted values list
   * @returns the next Check DSL step
   */
  find(occurrence: number): CheckBuilderValidate<X>;

  /**
   * Target all the occurrences of the extracted values
   *
   * @returns the next Check DSL step
   */
  findAll(): CheckBuilderValidate<X[]>;

  /**
   * Target a random occurrence in the extracted values
   *
   * @returns the next Check DSL step
   */
  findRandom(): CheckBuilderValidate<X>;

  /**
   * Target multiple random occurrences in the extracted values
   *
   * @param num - the number of occurrences to collect
   * @returns the next Check DSL step
   */
  findRandom(num: number): CheckBuilderValidate<X[]>;

  /**
   * Target multiple random occurrences in the extracted values
   *
   * @param num - the number of occurrences to collect
   * @param failIfLess - fail if num is greater than the number of extracted values
   * @returns the next Check DSL step
   */
  findRandom(num: number, failIfLess: boolean): CheckBuilderValidate<X[]>;

  /**
   * Target the count of extracted values
   *
   * @returns the next Check DSL step
   */
  count(): CheckBuilderValidate<number>;
}

export const wrapCheckBuilderMultipleFind = <X>(_underlying: JvmCheckBuilderMultipleFind<X>): CheckBuilderMultipleFind<X> => ({
  ...wrapCheckBuilderValidate<X>(_underlying),
  find: (occurrence?: number) =>
    wrapCheckBuilderValidate(occurrence !== undefined ? _underlying.find(occurrence) : _underlying.find()),
  findAll: () => wrapCheckBuilderValidate(_underlying.findAll()),
  findRandom: (num?: number, failIfLess?: boolean): any => {
    if (num !== undefined) {
      if (failIfLess !== undefined) {
        return wrapCheckBuilderValidate(_underlying.findRandom(num, failIfLess));
      } else {
        return wrapCheckBuilderValidate(_underlying.findRandom(num));
      }
    } else {
      return wrapCheckBuilderValidate(_underlying.findRandom());
    }
  },
  count: function (): CheckBuilderValidate<number> {
    throw new Error("Function not implemented.");
  }
});

/**
 * A special {@link MultipleFind<String>} that can define regex capture groups
 */
export interface CheckBuilderCaptureGroup extends CheckBuilderMultipleFind<string> {
  /**
   * Define that the check extracts an expected number of values from capture groups
   *
   * @param count - the number of capture groups in the regular expression pattern
   * @returns a new MultipleFind
   */
  captureGroups(count: number): CheckBuilderMultipleFind<string[]>;
}

export const wrapCheckBuilderCaptureGroup = (_underlying: JvmCheckBuilderCaptureGroup): CheckBuilderCaptureGroup => ({
  ...wrapCheckBuilderMultipleFind<string>(_underlying),
  captureGroups: (count: number): CheckBuilderMultipleFind<string[]> =>
    wrapCheckBuilderMultipleFind(_underlying.captureGroups(count))
});

/**
 * Bootstrap a new bodyString check that extracts the full response message body as a String.
 * Encoding is either the one provided in the message (eg Content-Type charset attribute in HTTP),
 * or the one defined in gatling.conf.
 *
 * Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
 * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
 * error.
 *
 * @returns the next DSL step
 */
export const bodyString = (): CheckBuilderFind<string> => wrapCheckBuilderFind(JvmCoreDsl.bodyString());

// TODO bodyBytes - we should probably use Int8Array like for HTTP Request/Response
// /**
//  * Bootstrap a new bodyBytes check that extracts the full response message body as a byte array.
//  *
//  * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
//  * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
//  * error.
//  *
//  * @returns the next DSL step
//  */
// export const bodyBytes = (): CheckBuilderFind<Int8Array> => wrapCheckBuilderFind(JvmCoreDsl.bodyBytes())

/**
 * Bootstrap a new bodyLength check that extracts the full response message body's binary length.
 *
 * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
 * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
 * error.
 *
 * @returns the next DSL step
 */
export const bodyLength = (): CheckBuilderFind<number> =>
  wrapCheckBuilderFind(JvmCoreDsl.bodyLength() as JvmCheckBuilderFind<number>);

// TODO see if we do something for bodyStream - likely too complex for v1
// /**
//  * Bootstrap a new bodyStream check that extracts the full response message body as an {@link
//  * InputStream}.
//  *
//  * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
//  * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
//  * error
//  *
//  * @returns the next DSL step
//  */
// @NonNull
// public static CheckBuilder.Find<InputStream> bodyStream() {
//   return new CheckBuilder.Find.Default<>(
//     io.gatling.core.Predef.bodyStream(), CoreCheckType.BodyStream, InputStream.class, null);
// }

export interface SubstringFunction {
  /**
   * Bootstrap a new substring check that extracts the indexes of the occurrences of a pattern in
   * the response's body String. Encoding is either the one provided in the message (eg Content-Type
   * charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param pattern - the searched pattern, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (pattern: string): CheckBuilderMultipleFind<number>;

  /**
   * Bootstrap a new substring check that extracts the indexes of the occurrences of a pattern in
   * the response's body String. Encoding is either the one provided in the message (eg Content-Type
   * charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param pattern - the searched pattern, expressed as a function
   * @returns the next DSL step
   */
  (pattern: SessionTo<string>): CheckBuilderMultipleFind<number>;
}

export const substring: SubstringFunction = (pattern: string | SessionTo<string>): CheckBuilderMultipleFind<number> =>
  wrapCheckBuilderMultipleFind(
    (typeof pattern === "function"
      ? JvmCoreDsl.substring(wrapCallback(underlyingSessionTo(pattern)))
      : JvmCoreDsl.substring(pattern)) as JvmCheckBuilderMultipleFind<number>
  );

export interface XpathFunction {
  /**
   * Bootstrap a new xpath check that extracts nodes with a <a
   * href="https://en.wikipedia.org/wiki/XPath">XPath</a> from response's body <a
   * href="https://en.wikipedia.org/wiki/XML">XML</a> document. Encoding is either the one provided
   * in the message (eg Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param path - the searched path, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (path: string): CheckBuilderMultipleFind<string>;

  /**
   * Bootstrap a new xpath check that extracts nodes with a <a
   * href="https://en.wikipedia.org/wiki/XPath">XPath</a> from response's body <a
   * href="https://en.wikipedia.org/wiki/XML">XML</a> document. Encoding is either the one provided
   * in the message (eg Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param path - the searched path, expressed as a function
   * @returns the next DSL step
   */
  (path: SessionTo<string>): CheckBuilderMultipleFind<string>;

  /**
   * Bootstrap a new xpath check that extracts nodes with a <a
   * href="https://en.wikipedia.org/wiki/XPath">XPath</a> from response's body <a
   * href="https://en.wikipedia.org/wiki/XML">XML</a> document. Encoding is either the one provided
   * in the message (eg Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param path - the searched path, expressed as a Gatling Expression Language String
   * @param namespaces - the XML <a href="https://en.wikipedia.org/wiki/XML_namespace">namespaces</a>
   *     used in the document
   * @returns the next DSL step
   */
  (path: string, namespaces: Record<string, string>): CheckBuilderMultipleFind<string>;

  /**
   * Bootstrap a new xpath check that extracts nodes with a <a
   * href="https://en.wikipedia.org/wiki/XPath">XPath</a> from response's body <a
   * href="https://en.wikipedia.org/wiki/XML">XML</a> document. Encoding is either the one provided
   * in the message (eg Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param path - the searched path, expressed as a function
   * @param namespaces - the XML <a href="https://en.wikipedia.org/wiki/XML_namespace">namespaces</a>
   *     used in the document
   * @returns the next DSL step
   */
  (path: SessionTo<string>, namespaces: Record<string, string>): CheckBuilderMultipleFind<string>;
}

export const xpath: XpathFunction = (path: string | SessionTo<string>, namespaces?: Record<string, string>) => {
  if (typeof path === "function") {
    if (namespaces !== undefined) {
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.xpath(wrapCallback(underlyingSessionTo(path)), namespaces as any)); // TODO change type of java.util.Map in java2typescript
    } else {
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.xpath(wrapCallback(underlyingSessionTo(path))));
    }
  } else {
    if (namespaces !== undefined) {
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.xpath(path, namespaces as any)); // TODO change type of java.util.Map in java2typescript
    } else {
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.xpath(path));
    }
  }
};

export interface CssFunction {
  /**
   * Bootstrap a new css check that extracts nodes with a <a
   * href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors">CSS Selector</a> from
   * response's body HTML document. Encoding is either the one provided in the message (eg
   * Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param selector - the searched selector, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (selector: string): CheckBuilderMultipleFind<string>;

  /**
   * Bootstrap a new css check that extracts nodes with a <a
   * href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors">CSS Selector</a> from
   * response's body HTML document. Encoding is either the one provided in the message (eg
   * Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param selector - the searched selector, expressed as a function
   * @returns the next DSL step
   */
  (selector: SessionTo<string>): CheckBuilderMultipleFind<string>;

  /**
   * Bootstrap a new css check that extracts nodes with a <a
   * href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors">CSS Selector</a> from
   * response's body HTML document. Encoding is either the one provided in the message (eg
   * Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param selector - the searched selector, expressed as a Gatling Expression Language String
   * @param nodeAttribute - the attribute of the selected nodes to capture, if not the node itself
   * @returns the next DSL step
   */
  (selector: string, nodeAttribute: string): CheckBuilderMultipleFind<string>;

  /**
   * Bootstrap a new css check that extracts nodes with a <a
   * href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors">CSS Selector</a> from
   * response's body HTML document. Encoding is either the one provided in the message (eg
   * Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param selector - the searched selector, expressed as a function
   * @param nodeAttribute - the attribute of the selected nodes to capture, if not the node itself
   * @returns the next DSL step
   */
  (selector: SessionTo<string>, nodeAttribute: string): CheckBuilderMultipleFind<string>;
}

export const css: CssFunction = (selector: string | SessionTo<string>, nodeAttribute?: string) => {
  if (typeof selector === "function") {
    if (nodeAttribute !== undefined) {
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.css(wrapCallback(underlyingSessionTo(selector)), nodeAttribute));
    } else {
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.css(wrapCallback(underlyingSessionTo(selector))));
    }
  } else {
    if (nodeAttribute !== undefined) {
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.css(selector, nodeAttribute));
    } else {
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.css(selector));
    }
  }
};

export interface FormFunction {
  /**
   * Bootstrap a new form check that extracts an HTML form's input nodes with a <a
   * href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors">CSS Selector</a> from
   * response's body HTML document. Encoding is either the one provided in the message (eg
   * Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param selector - the searched selector, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (selector: string): CheckBuilderMultipleFind<Record<string, unknown>>;

  /**
   * Bootstrap a new form check that extracts an HTML form's input nodes with a <a
   * href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors">CSS Selector</a> from
   * response's body HTML document. Encoding is either the one provided in the message (eg
   * Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * error
   *
   * @param selector - the searched selector, expressed as a function
   * @returns the next DSL step
   */
  (selector: SessionTo<string>): CheckBuilderMultipleFind<Record<string, unknown>>;
}

// TODO check what type the values in the Map actually have, and if they are usable in Javascript
export const form: FormFunction = (selector: string | SessionTo<string>) =>
  wrapCheckBuilderMultipleFind(
    (typeof selector === "function"
      ? JvmCoreDsl.form(wrapCallback(underlyingSessionTo(selector)))
      : JvmCoreDsl.form(selector)) as JvmCheckBuilderMultipleFind<any> // TODO change type of java.util.Map in java2typescript
  );

// TODO jsonPath, jmesPath, jsonpJsonPath, jsonpJmesPath

export interface RegexFunction {
  /**
   * Bootstrap a new regex check that extracts capture groups with a <a
   * href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java Regular
   * Expression</a> from response's body String. Encoding is either the one provided in the message
   * (eg Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * {@link IllegalArgumentException}
   *
   * @param pattern the searched pattern, expressed as a Gatling Expression Language String
   * @return the next DSL step
   */
  (pattern: string): CheckBuilderCaptureGroup;

  /**
   * Bootstrap a new regex check that extracts capture groups with a <a
   * href="https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html">Java Regular
   * Expression</a> from response's body String. Encoding is either the one provided in the message
   * (eg Content-Type charset attribute in HTTP), or the one defined in gatling.conf.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * {@link IllegalArgumentException}
   *
   * @param pattern the searched pattern, expressed as a function
   * @return the next DSL step
   */
  (pattern: (session: Session) => string): CheckBuilderCaptureGroup;
}

export const regex: RegexFunction = (pattern: Expression<string>): CheckBuilderCaptureGroup =>
  wrapCheckBuilderCaptureGroup(
    typeof pattern === "function"
      ? JvmCoreDsl.regex(wrapCallback(underlyingSessionTo(pattern)))
      : JvmCoreDsl.regex(pattern)
  );

/**
 * Bootstrap a new md5 check that extracts the <a href="https://en.wikipedia.org/wiki/MD5">MD5</a>
 * checksum of the response's body.
 *
 * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
 * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
 * error
 *
 * @returns the next DSL step
 */
export const md5 = (): CheckBuilderFind<string> => wrapCheckBuilderFind(JvmCoreDsl.md5());

/**
 * Bootstrap a new sha1 check that extracts the <a
 * href="https://en.wikipedia.org/wiki/SHA-1">SHA-1</a> checksum of the response's body.
 *
 * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
 * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
 * error
 *
 * @returns the next DSL step
 */
export const sha1 = (): CheckBuilderFind<string> => wrapCheckBuilderFind(JvmCoreDsl.sha1());

/**
 * Bootstrap a new responseTimeInMillis check that extracts the response time of the request.
 *
 * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
 * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
 * error
 *
 * @returns the next DSL step
 */
export const responseTimeInMillis = (): CheckBuilderFind<number> =>
  wrapCheckBuilderFind(JvmCoreDsl.responseTimeInMillis() as JvmCheckBuilderFind<number>);
