import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { Expression, Session, SessionTo, underlyingSessionTo } from "../session";
import { CheckBuilderCaptureGroup, wrapCheckBuilderCaptureGroup } from "./captureGroup";
import { asByteArray, asByteArrayFunction } from "../gatlingJvm/byteArrays";
import { wrapCheckBuilderFinal } from "./final";
import { CheckBuilderFind, wrapCheckBuilderFind } from "./find";
import { CheckBuilderJsonOfTypeFind, wrapCheckBuilderJsonOfTypeFind } from "./jsonOfTypeFind";
import { CheckBuilderJsonOfTypeMultipleFind, wrapCheckBuilderJsonOfTypeMultipleFind } from "./jsonOfTypeMultipleFind";
import { CheckBuilderMultipleFind, wrapCheckBuilderMultipleFind } from "./multipleFind";

import JvmCheckBuilderFind = io.gatling.javaapi.core.CheckBuilder$Find;
import JvmCheckBuilderMultipleFind = io.gatling.javaapi.core.CheckBuilder$MultipleFind;

export * from "./builder";
export * from "./captureGroup";
export * from "./condition";
export * from "./final";
export * from "./find";
export * from "./jsonOfTypeFind";
export * from "./jsonOfTypeMultipleFind";
export * from "./multipleFind";
export * from "./validate";

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

/**
 * Bootstrap a new bodyBytes check that extracts the full response message body as a byte array.
 *
 * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
 * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
 * error.
 *
 * @returns the next DSL step
 */
export const bodyBytes = (): CheckBuilderFind<number[]> => ({
  ...wrapCheckBuilderFind(JvmCoreDsl.bodyBytes()),
  is: (expected: number[] | SessionTo<number[]>) =>
    wrapCheckBuilderFinal(
      typeof expected === "function"
        ? JvmCoreDsl.bodyBytes().is(asByteArrayFunction(underlyingSessionTo(expected)))
        : JvmCoreDsl.bodyBytes().is(asByteArray(expected))
    ),
  not: (expected: number[] | SessionTo<number[]>) =>
    wrapCheckBuilderFinal(
      typeof expected === "function"
        ? JvmCoreDsl.bodyBytes().not(asByteArrayFunction(underlyingSessionTo(expected)))
        : JvmCoreDsl.bodyBytes().not(asByteArray(expected))
    )
});

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
      ? JvmCoreDsl.substring(underlyingSessionTo(pattern))
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
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.xpath(underlyingSessionTo(path), namespaces)); // TODO change type of java.util.Map in java2typescript
    } else {
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.xpath(underlyingSessionTo(path)));
    }
  } else {
    if (namespaces !== undefined) {
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.xpath(path, namespaces)); // TODO change type of java.util.Map in java2typescript
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
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.css(underlyingSessionTo(selector), nodeAttribute));
    } else {
      return wrapCheckBuilderMultipleFind(JvmCoreDsl.css(underlyingSessionTo(selector)));
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
      ? JvmCoreDsl.form(underlyingSessionTo(selector))
      : JvmCoreDsl.form(selector)) as JvmCheckBuilderMultipleFind<any> // TODO change type of java.util.Map in java2typescript
  );

export interface JsonPathFunction {
  /**
   * Bootstrap a new jsonPath check that extracts nodes with a <a
   * href="https://goessner.net/articles/JsonPath/">JsonPath</a> path from response's body JSON
   * tree.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * {@link IllegalArgumentException}
   *
   * @param path - the searched path, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (path: string): CheckBuilderJsonOfTypeMultipleFind;

  /**
   * Bootstrap a new jsonPath check that extracts nodes with a <a
   * href="https://goessner.net/articles/JsonPath/">JsonPath</a> path from response's body JSON
   * tree.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * {@link IllegalArgumentException}
   *
   * @param path - the searched path, expressed as a function
   * @returns the next DSL step
   */
  (path: (session: Session) => string): CheckBuilderJsonOfTypeMultipleFind;
}

export const jsonPath: JsonPathFunction = (path: Expression<string>): CheckBuilderJsonOfTypeMultipleFind =>
  wrapCheckBuilderJsonOfTypeMultipleFind(
    typeof path === "function" ? JvmCoreDsl.jsonPath(underlyingSessionTo(path)) : JvmCoreDsl.jsonPath(path)
  );

export interface JmesPathFunction {
  /**
   * Bootstrap a new jmesPath check that extracts nodes with a <a
   * href="https://jmespath.org/">JMESPath</a> path from response's body JSON tree.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * {@link IllegalArgumentException}
   *
   * @param path - the searched path, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (path: string): CheckBuilderJsonOfTypeFind;

  /**
   * Bootstrap a new jmesPath check that extracts nodes with a <a
   * href="https://jmespath.org/">JMESPath</a> path from response's body JSON tree.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * {@link IllegalArgumentException}
   *
   * @param path - the searched path, expressed as a function
   * @returns the next DSL step
   */
  (path: (session: Session) => string): CheckBuilderJsonOfTypeFind;
}

export const jmesPath: JmesPathFunction = (path: Expression<string>): CheckBuilderJsonOfTypeFind =>
  wrapCheckBuilderJsonOfTypeFind(
    typeof path === "function" ? JvmCoreDsl.jmesPath(underlyingSessionTo(path)) : JvmCoreDsl.jmesPath(path)
  );

export interface JsonpJsonPathFunction {
  /**
   * Bootstrap a new jsonpJsonPath check that extracts nodes with a <a
   * href="https://goessner.net/articles/JsonPath/">JsonPath</a> path from response's body <a
   * href="https://en.wikipedia.org/wiki/JSONP">JSONP</a> payload.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * {@link IllegalArgumentException}
   *
   * @param path - the searched path, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (path: string): CheckBuilderJsonOfTypeMultipleFind;

  /**
   * Bootstrap a new jsonpJsonPath check that extracts nodes with a <a
   * href="https://goessner.net/articles/JsonPath/">JsonPath</a> path from response's body <a
   * href="https://en.wikipedia.org/wiki/JSONP">JSONP</a> payload.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * {@link IllegalArgumentException}
   *
   * @param path - the searched path, expressed as a function
   * @returns the next DSL step
   */
  (path: (session: Session) => string): CheckBuilderJsonOfTypeMultipleFind;
}

export const jsonpJsonPath: JsonpJsonPathFunction = (path: Expression<string>): CheckBuilderJsonOfTypeMultipleFind =>
  wrapCheckBuilderJsonOfTypeMultipleFind(
    typeof path === "function" ? JvmCoreDsl.jsonpJsonPath(underlyingSessionTo(path)) : JvmCoreDsl.jsonpJsonPath(path)
  );

export interface JsonpJmesPathFunction {
  /**
   * Bootstrap a new jsonpJmesPath check that extracts nodes with a <a
   * href="https://jmespath.org/">JMESPath</a> path from response's body JSON <a
   * href="https://en.wikipedia.org/wiki/JSONP">JSONP</a> payload.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * {@link IllegalArgumentException}
   *
   * @param path - the searched path, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (path: string): CheckBuilderJsonOfTypeFind;

  /**
   * Bootstrap a new jsonpJmesPath check that extracts nodes with a <a
   * href="https://jmespath.org/">JMESPath</a> path from response's body JSON <a
   * href="https://en.wikipedia.org/wiki/JSONP">JSONP</a> payload.
   *
   * <p>Note: On contrary to the Scala DSL, the compiler can't check the availability of this check
   * type for your protocol. If the protocol you're using doesn't support it, you'll get a runtime
   * {@link IllegalArgumentException}
   *
   * @param path - the searched path, expressed as a function
   * @returns the next DSL step
   */
  (path: (session: Session) => string): CheckBuilderJsonOfTypeFind;
}

export const jsonpJmesPath: JsonpJmesPathFunction = (path: Expression<string>): CheckBuilderJsonOfTypeFind =>
  wrapCheckBuilderJsonOfTypeFind(
    typeof path === "function" ? JvmCoreDsl.jsonpJmesPath(underlyingSessionTo(path)) : JvmCoreDsl.jsonpJmesPath(path)
  );

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
    typeof pattern === "function" ? JvmCoreDsl.regex(underlyingSessionTo(pattern)) : JvmCoreDsl.regex(pattern)
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
