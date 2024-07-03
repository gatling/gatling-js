import { CoreDsl as JvmCoreDsl } from "@gatling.io/jvm-types";

import { Wrapper } from "./common";
import { asByteArrayFunction } from "./gatlingJvm/byteArrays";
import { Expression, Session, underlyingSessionTo } from "./session";

import JvmBody = io.gatling.javaapi.core.Body;
import JvmBodyWithBytes = io.gatling.javaapi.core.Body$WithBytes;
import JvmBodyWithString = io.gatling.javaapi.core.Body$WithString;

export interface Body extends Wrapper<JvmBody> {}

export namespace Body {
  export interface WithBytes extends Body {
    (session: Session): number[];
  }
  export interface WithString extends Body {
    (session: Session): string;
  }
}

const wrapBodyWithBytes = (_underlying: JvmBodyWithBytes): Body.WithBytes =>
  Object.assign((session: Session): number[] => _underlying.apply(session._underlying), { _underlying });

const wrapBodyWithString = (_underlying: JvmBodyWithString): Body.WithString =>
  Object.assign((session: Session): string => _underlying.apply(session._underlying), { _underlying });

// TODO gzipBody

export interface StringBodyFunction {
  /**
   * Create a body from a String.
   *
   * <p>Can also be used as a Function<Session, String> to define the expected value in a check.
   *
   * @param string - the body expressed as a gatling Expression Language String
   * @returns a body
   */
  (string: string): Body.WithString;

  /**
   * Create a body from a String.
   *
   * <p>Can also be used as a Function<Session, String> to define the expected value in a check.
   *
   * @param f - the body expressed as a function
   * @returns a body
   */
  (f: (session: Session) => string): Body.WithString;
}

export const StringBody: StringBodyFunction = (string: Expression<string>): Body.WithString =>
  wrapBodyWithString(
    typeof string === "function" ? JvmCoreDsl.StringBody(underlyingSessionTo(string)) : JvmCoreDsl.StringBody(string)
  );

export interface RawFileBodyFunction {
  /**
   * Create a body from a file. Bytes will be sent without any transformation.
   *
   * <p>Can also be used as a Function<Session, byte[]> to define the expected value in a check.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns a body
   */
  (filePath: string): Body.WithBytes;

  /**
   * Create a body from a file. Bytes will be sent without any transformation.
   *
   * <p>Can also be used as a Function<Session, byte[]> to define the expected value in a check.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns a body
   */
  (filePath: (session: Session) => string): Body.WithBytes;
}

export const RawFileBody: RawFileBodyFunction = (filePath: Expression<string>): Body.WithBytes =>
  wrapBodyWithBytes(
    typeof filePath === "function"
      ? JvmCoreDsl.RawFileBody(underlyingSessionTo(filePath))
      : JvmCoreDsl.RawFileBody(filePath)
  );

export interface ElFileBodyFunction {
  /**
   * Create a body from a file. File text content will be processed as a Gatling Expression Language
   * String.
   *
   * <p>Can also be used as a Function<Session, String> to define the expected value in a check.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns a body
   */
  (filePath: string): Body.WithString;

  /**
   * Create a body from a file. File text content will be processed as a Gatling Expression Language
   * String.
   *
   * <p>Can also be used as a Function<Session, String> to define the expected value in a check.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns a body
   */
  (filePath: (session: Session) => string): Body.WithString;
}

export const ElFileBody: ElFileBodyFunction = (filePath: Expression<string>): Body.WithString =>
  wrapBodyWithString(
    typeof filePath === "function"
      ? JvmCoreDsl.ElFileBody(underlyingSessionTo(filePath))
      : JvmCoreDsl.ElFileBody(filePath)
  );

export interface PebbleStringBodyFunction {
  /**
   * Create a body from String processed as a <a href="https://pebbletemplates.io/">Pebble
   * template</a>.
   *
   * <p>Can also be used as a Function<Session, String> to define the expected value in a check.
   *
   * @param string - the Pebble string
   * @returns a body
   */
  (string: string): Body.WithString;
}

export const PebbleStringBody: PebbleStringBodyFunction = (string: string): Body.WithString =>
  wrapBodyWithString(JvmCoreDsl.PebbleStringBody(string));

export interface PebbleFileBodyFunction {
  /**
   * Create a body from a file. File text content will be processed as a <a
   * href="https://pebbletemplates.io/">Pebble template</a>.
   *
   * <p>Can also be used as a Function<Session, String> to define the expected value in a check.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns a body
   */
  (filePath: string): Body.WithString;

  /**
   * Create a body from a file. File text content will be processed as a <a
   * href="https://pebbletemplates.io/">Pebble template</a>.
   *
   * <p>Can also be used as a Function<Session, String> to define the expected value in a check.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns a body
   */
  (filePath: (session: Session) => string): Body.WithString;
}

export const PebbleFileBody: PebbleFileBodyFunction = (filePath: Expression<string>): Body.WithString =>
  wrapBodyWithString(
    typeof filePath === "function"
      ? JvmCoreDsl.PebbleFileBody(underlyingSessionTo(filePath))
      : JvmCoreDsl.PebbleFileBody(filePath)
  );

export interface ByteArrayBodyFunction {
  /**
   * Create a body from a byte array. Bytes will be sent as is.
   *
   * <p>Can also be used as a Function<Session, byte[]> to define the expected value in a check.
   *
   * @param bytes - the bytes, expressed as a Gatling Expression Language String
   * @returns a body
   */
  (bytes: string): Body.WithBytes;

  /**
   * Create a body from a byte array. Bytes will be sent as is.
   *
   * <p>Can also be used as a Function<Session, byte[]> to define the expected value in a check.
   *
   * @param bytes - the bytes
   * @returns a body
   */
  (bytes: number[]): Body.WithBytes;

  /**
   * Create a body from a byte array. Bytes will be sent as is.
   *
   * <p>Can also be used as a Function<Session, byte[]> to define the expected value in a check.
   *
   * @param bytes - the bytes, expressed as a function
   * @returns a body
   */
  (bytes: (session: Session) => number[]): Body.WithBytes;
}

export const ByteArrayBody: ByteArrayBodyFunction = (bytes: string | Expression<number[]>): Body.WithBytes =>
  wrapBodyWithBytes(
    typeof bytes === "function"
      ? JvmCoreDsl.ByteArrayBody(asByteArrayFunction(underlyingSessionTo(bytes)))
      : typeof bytes === "string"
        ? JvmCoreDsl.ByteArrayBody(bytes)
        : JvmCoreDsl.ByteArrayBody(bytes)
  );

// TODO registerPebbleExtensions
