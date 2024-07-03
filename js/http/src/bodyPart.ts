import { Expression, Session, Wrapper, underlyingSessionTo, asByteArray, asByteArrayFunction } from "@gatling.io/core";
import { HttpDsl as JvmHttpDsl } from "@gatling.io/jvm-types";

import JvmSession = io.gatling.javaapi.core.Session;
import JvmBodyPart = io.gatling.javaapi.http.BodyPart;

export interface BodyPart extends Wrapper<JvmBodyPart> {
  /**
   * Define the contentType attribute
   *
   * @param contentType - the contentType attribute, expressed as a Gatling Expression Language String
   * @returns a new BodyPart instance
   */
  contentType(contentType: string): BodyPart;

  /**
   * Define the contentType attribute
   *
   * @param contentType - the contentType attribute, expressed as a function
   * @returns a new BodyPart instance
   */
  contentType(contentType: (session: Session) => string): BodyPart;

  /**
   * Define the charset attribute
   *
   * @param charset - the static charset attribute
   * @returns a new BodyPart instance
   */
  charset(charset: string): BodyPart;

  /**
   * Define the dispositionType attribute
   *
   * @param dispositionType - the dispositionType attribute, expressed as a Gatling Expression
   *     Language String
   * @returns a new BodyPart instance
   */
  dispositionType(dispositionType: string): BodyPart;

  /**
   * Define the dispositionType attribute
   *
   * @param dispositionType - the dispositionType attribute, expressed as a function
   * @returns a new BodyPart instance
   */
  dispositionType(dispositionType: (session: Session) => string): BodyPart;

  /**
   * Define the fileName attribute
   *
   * @param fileName - the fileName attribute, expressed as a Gatling Expression Language String
   * @returns a new BodyPart instance
   */
  fileName(fileName: string): BodyPart;

  /**
   * Define the fileName attribute
   *
   * @param fileName - the fileName attribute, expressed as a function
   * @returns a new BodyPart instance
   */
  fileName(fileName: (session: Session) => string): BodyPart;

  /**
   * Define the contentId attribute
   *
   * @param contentId - the contentId attribute, expressed as a Gatling Expression Language String
   * @returns a new BodyPart instance
   */
  contentId(contentId: string): BodyPart;

  /**
   * Define the contentId attribute
   *
   * @param contentId - the contentId attribute, expressed as a function
   * @returns a new BodyPart instance
   */
  contentId(contentId: (session: Session) => string): BodyPart;

  /**
   * Define the transferEncoding attribute
   *
   * @param transferEncoding - the static transferEncoding attribute
   * @returns a new BodyPart instance
   */
  transferEncoding(transferEncoding: string): BodyPart;

  /**
   * Define a header
   *
   * @param name - the header name, expressed as a Gatling Expression Language String
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new BodyPart instance
   */
  header(name: string, value: string): BodyPart;

  /**
   * Define a header
   *
   * @param name - the header name, expressed as a Gatling Expression Language String
   * @param value - the header value, expressed as a function
   * @returns a new BodyPart instance
   */
  header(name: string, value: (session: Session) => string): BodyPart;

  /**
   * Define a header
   *
   * @param name - the header name, expressed as a function
   * @param value - the header value, expressed as a Gatling Expression Language String
   * @returns a new BodyPart instance
   */
  header(name: (session: Session) => string, value: string): BodyPart;

  /**
   * Define a header
   *
   * @param name - the header name, expressed as a function
   * @param value - the header value, expressed as a function
   * @returns a new BodyPart instance
   */
  header(name: (session: Session) => string, value: (session: Session) => string): BodyPart;
}

export const wrapBodyPart = (_underlying: JvmBodyPart): BodyPart => ({
  _underlying,
  contentType: (contentType: Expression<string>): BodyPart =>
    wrapBodyPart(
      typeof contentType === "function"
        ? _underlying.contentType(underlyingSessionTo(contentType))
        : _underlying.contentType(contentType)
    ),
  charset: (charset: string): BodyPart => wrapBodyPart(_underlying.charset(charset)),
  dispositionType: (dispositionType: Expression<string>): BodyPart =>
    wrapBodyPart(
      typeof dispositionType === "function"
        ? _underlying.dispositionType(underlyingSessionTo(dispositionType))
        : _underlying.dispositionType(dispositionType)
    ),
  fileName: (fileName: Expression<string>): BodyPart =>
    wrapBodyPart(
      typeof fileName === "function"
        ? _underlying.fileName(underlyingSessionTo(fileName))
        : _underlying.fileName(fileName)
    ),
  contentId: (contentId: Expression<string>): BodyPart =>
    wrapBodyPart(
      typeof contentId == "function"
        ? _underlying.contentId(underlyingSessionTo(contentId))
        : _underlying.contentId(contentId)
    ),
  transferEncoding: (transferEncoding: string): BodyPart =>
    wrapBodyPart(_underlying.transferEncoding(transferEncoding)),
  header: (name: Expression<string>, value: Expression<string>): BodyPart =>
    wrapBodyPart(
      typeof name === "function"
        ? typeof value === "function"
          ? _underlying.header(underlyingSessionTo(name), underlyingSessionTo(value))
          : _underlying.header(underlyingSessionTo(name), value)
        : typeof value === "function"
          ? _underlying.header(name, underlyingSessionTo(value))
          : _underlying.header(name, value)
    )
});

interface JvmBodyPartFunction {
  (arg0: string): JvmBodyPart;
  (arg0: (jvmSession: JvmSession) => string): JvmBodyPart;
  (arg0: string, arg1: string): JvmBodyPart;
  (arg0: string, arg1: (jvmSession: JvmSession) => string): JvmBodyPart;
  (arg0: (jvmSession: JvmSession) => string, arg1: string): JvmBodyPart;
  (arg0: (jvmSession: JvmSession) => string, arg1: (jvmSession: JvmSession) => string): JvmBodyPart;
}

const bodyPartImpl =
  (jvmBodyPart: JvmBodyPartFunction) =>
  (arg0: Expression<string>, arg1?: Expression<string>): BodyPart => {
    if (arg1 === undefined) {
      if (typeof arg0 === "function") {
        return wrapBodyPart(jvmBodyPart(underlyingSessionTo(arg0)));
      } else {
        return wrapBodyPart(jvmBodyPart(arg0));
      }
    } else {
      if (typeof arg0 === "function") {
        if (typeof arg1 === "function") {
          return wrapBodyPart(jvmBodyPart(underlyingSessionTo(arg0), underlyingSessionTo(arg1)));
        } else {
          return wrapBodyPart(jvmBodyPart(underlyingSessionTo(arg0), arg1));
        }
      } else {
        if (typeof arg1 === "function") {
          return wrapBodyPart(jvmBodyPart(arg0, underlyingSessionTo(arg1)));
        } else {
          return wrapBodyPart(jvmBodyPart(arg0, arg1));
        }
      }
    }
  };

export interface ElFileBodyPartFunction {
  /**
   * Bootstrap a {@link BodyPart} backed by a file whose text context will be interpreted as a
   * Gatling Expression Language String. The name of the part is equal to the file name.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (filePath: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file whose text context will be interpreted as a
   * Gatling Expression Language String The name of the part is equal to the file name.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns the next DSL step
   */
  (filePath: (session: Session) => string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file whose text context will be interpreted as a
   * Gatling Expression Language String.
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string, filePath: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file whose text context will be interpreted as a
   * Gatling Expression Language String.
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns the next DSL step
   */
  (name: string, filePath: (session: Session) => string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file whose text context will be interpreted as a
   * Gatling Expression Language String.
   *
   * @param name - the name of the part, expressed as a function
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: (session: Session) => string, filePath: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file whose text context will be interpreted as a
   * Gatling Expression Language String.
   *
   * @param name - the name of the part, expressed as a function
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns the next DSL step
   */
  (name: (session: Session) => string, filePath: (session: Session) => string): BodyPart;
}

export const ElFileBodyPart: ElFileBodyPartFunction = (arg0: Expression<string>, arg1?: Expression<string>) =>
  bodyPartImpl(JvmHttpDsl.ElFileBodyPart)(arg0, arg1);

export interface StringBodyPartFunction {
  /**
   * Bootstrap a {@link BodyPart} backed by a String
   *
   * @param string - the string, interpreted as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (string: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a String
   *
   * @param string - the string, expressed as a function
   * @returns the next DSL step
   */
  (string: (session: Session) => string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a String
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param string - the string, interpreted as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string, string: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a String
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param string - the string, interpreted as a function
   * @returns the next DSL step
   */
  (name: string, string: (session: Session) => string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a String
   *
   * @param name - the name of the part, expressed as a function
   * @param string - the string, interpreted as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: (session: Session) => string, string: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a String
   *
   * @param name - the name of the part, expressed as a function
   * @param string - the string, interpreted as a function
   * @returns the next DSL step
   */
  (name: (session: Session) => string, string: (session: Session) => string): BodyPart;
}

export const StringBodyPart: StringBodyPartFunction = (arg0: Expression<string>, arg1?: Expression<string>) =>
  bodyPartImpl(JvmHttpDsl.StringBodyPart)(arg0, arg1);

export interface RawFileBodyPartFunction {
  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose bytes will be sent as is. The name of the
   * part is equal to the name of the file.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (filePath: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose bytes will be sent as is. The name of the
   * part is equal to the name of the file.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns the next DSL step
   */
  (filePath: (session: Session) => string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose bytes will be sent as is.
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string, filePath: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose bytes will be sent as is.
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns the next DSL step
   */
  (name: string, filePath: (session: Session) => string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose bytes will be sent as is.
   *
   * @param name - the name of the part, expressed as a function
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: (session: Session) => string, filePath: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose bytes will be sent as is.
   *
   * @param name - the name of the part, expressed as a function
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns the next DSL step
   */
  (name: (session: Session) => string, filePath: (session: Session) => string): BodyPart;
}

export const RawFileBodyPart: RawFileBodyPartFunction = (arg0: Expression<string>, arg1?: Expression<string>) =>
  bodyPartImpl(JvmHttpDsl.RawFileBodyPart)(arg0, arg1);

export interface PebbleFileBodyPartFunction {
  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose content is interpreted as a <a
   * href="https://pebbletemplates.io/">Pebble</a> template. The name of the part is equal to the
   * name of the file.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (filePath: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose content is interpreted as a <a
   * href="https://pebbletemplates.io/">Pebble</a> template. The name of the part is equal to the
   * name of the file.
   *
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns the next DSL step
   */
  (filePath: (session: Session) => string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose content is interpreted as a <a
   * href="https://pebbletemplates.io/">Pebble</a> template.
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string, filePath: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose content is interpreted as a <a
   * href="https://pebbletemplates.io/">Pebble</a> template.
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns the next DSL step
   */
  (name: string, filePath: (session: Session) => string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose content is interpreted as a <a
   * href="https://pebbletemplates.io/">Pebble</a> template.
   *
   * @param name - the name of the part, expressed as a function
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: (session: Session) => string, filePath: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a file, whose content is interpreted as a <a
   * href="https://pebbletemplates.io/">Pebble</a> template.
   *
   * @param name - the name of the part, expressed as a function
   * @param filePath - the path of the file, either relative to the root of the classpath, or
   *     absolute, expressed as a function
   * @returns the next DSL step
   */
  (name: (session: Session) => string, filePath: (session: Session) => string): BodyPart;
}

export const PebbleFileBodyPart: PebbleFileBodyPartFunction = (arg0: Expression<string>, arg1?: Expression<string>) =>
  bodyPartImpl(JvmHttpDsl.PebbleFileBodyPart)(arg0, arg1);

export interface PebbleStringBodyPartFunction {
  /**
   * Bootstrap a {@link BodyPart} backed by a String, whose content is interpreted as a <a
   * href="https://pebbletemplates.io/">Pebble</a> template.
   *
   * @param string - the Pebble String template
   * @returns the next DSL step
   */
  (string: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a String, whose content is interpreted as a <a
   * href="https://pebbletemplates.io/">Pebble</a> template.
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param string - the Pebble String template
   * @returns the next DSL step
   */
  (name: string, string: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a String, whose content is interpreted as a <a
   * href="https://pebbletemplates.io/">Pebble</a> template.
   *
   * @param name - the name of the part, expressed as a function
   * @param string - the Pebble String template
   * @returns the next DSL step
   */
  (name: (session: Session) => string, string: string): BodyPart;
}

export const PebbleStringBodyPart: PebbleStringBodyPartFunction = (arg0: Expression<string>, arg1?: string) => {
  if (arg1 === undefined) {
    if (typeof arg0 === "function") {
      throw Error(`PebbleStringBodyPart() called with invalid arguments ${arg0}, ${arg1}`);
    } else {
      return wrapBodyPart(JvmHttpDsl.PebbleStringBodyPart(arg0));
    }
  } else {
    if (typeof arg0 === "function") {
      return wrapBodyPart(JvmHttpDsl.PebbleStringBodyPart(underlyingSessionTo(arg0), arg1));
    } else {
      return wrapBodyPart(JvmHttpDsl.PebbleStringBodyPart(arg0, arg1));
    }
  }
};

export interface ByteArrayBodyPartFunction {
  /**
   * Bootstrap a {@link BodyPart} backed by a byte array. Bytes are sent as is.
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param bytes - the static bytes
   * @returns the next DSL step
   */
  (name: string, bytes: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a byte array. Bytes are sent as is.
   *
   * @param name - the name of the part, expressed as a function
   * @param bytes - the static bytes
   * @returns the next DSL step
   */
  (name: (session: Session) => string, bytes: string): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a byte array. Bytes are sent as is.
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param bytes - the bytes, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string, bytes: number[]): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a byte array. Bytes are sent as is.
   *
   * @param name - the name of the part, expressed as a function
   * @param bytes - the bytes, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: (session: Session) => string, bytes: number[]): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a byte array. Bytes are sent as is.
   *
   * @param name - the name of the part, expressed as a Gatling Expression Language String
   * @param bytes - the bytes, expressed as a function
   * @returns the next DSL step
   */
  (name: string, bytes: (session: Session) => number[]): BodyPart;

  /**
   * Bootstrap a {@link BodyPart} backed by a byte array. Bytes are sent as is.
   *
   * @param name - the name of the part, expressed as a function
   * @param bytes - the bytes, expressed as a function
   * @returns the next DSL step
   */
  (name: (session: Session) => string, bytes: (session: Session) => number[]): BodyPart;
}

export const ByteArrayBodyPart: ByteArrayBodyPartFunction = (
  arg0: Expression<string>,
  arg1: string | Expression<number[]>
): BodyPart => {
  if (typeof arg0 === "function") {
    if (typeof arg1 === "function") {
      return wrapBodyPart(
        JvmHttpDsl.ByteArrayBodyPart(underlyingSessionTo(arg0), asByteArrayFunction(underlyingSessionTo(arg1)))
      );
    } else if (typeof arg1 === "string") {
      return wrapBodyPart(JvmHttpDsl.ByteArrayBodyPart(underlyingSessionTo(arg0), arg1));
    } else {
      return wrapBodyPart(JvmHttpDsl.ByteArrayBodyPart(underlyingSessionTo(arg0), asByteArray(arg1)));
    }
  } else {
    if (typeof arg1 === "function") {
      return wrapBodyPart(JvmHttpDsl.ByteArrayBodyPart(arg0, asByteArrayFunction(underlyingSessionTo(arg1))));
    } else if (typeof arg1 === "string") {
      return wrapBodyPart(JvmHttpDsl.ByteArrayBodyPart(arg0, arg1));
    } else {
      return wrapBodyPart(JvmHttpDsl.ByteArrayBodyPart(arg0, asByteArray(arg1)));
    }
  }
};
