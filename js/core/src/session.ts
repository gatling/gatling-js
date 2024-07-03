import { asByteArray } from "./gatlingJvm/byteArrays";
import { asJava } from "./gatlingJvm/collections";
import { Duration, toJvmDuration } from "./utils/duration";
import { Wrapper } from "./common";

import JvmSession = io.gatling.javaapi.core.Session;

/**
 * The state of a given virtual user.
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface Session extends Wrapper<JvmSession> {
  /**
   * Get a stored value by its key
   *
   * @param key - the storage key
   * @typeParam T - the type of the desired value
   * @returns the value if it exists, null otherwise
   */
  get<T>(key: string): T;

  /**
   * Create a new instance updated with a given attribute, possibly overriding an existing one
   *
   * @param key - the attribute key
   * @param value - the attribute value
   * @returns a new instance with the new stored attribute
   */
  set(key: string, value: any): Session;

  /**
   * Create a new instance updated with a given byte array (number[]), possibly overriding an existing one
   *
   * @param key - the attribute key
   * @param value - the attribute value
   * @returns a new instance with the new stored attribute
   */
  setByteArray(key: string, value: number[]): Session;

  /**
   * Create a new instance updated with multiple attributes, possibly overriding existing ones
   *
   * @param newAttributes - the new attributes
   * @returns a new instance with the new stored attributes
   */
  setAll(newAttributes: Record<string, any>): Session;

  /**
   * Create a new instance updated with an attribute removed
   *
   * @param key - the key of the attribute to remove
   * @returns a new instance with the attribute removed
   */
  remove(key: string): Session;

  /**
   * Create a new instance updated with all attributes removed except Gatling internal ones
   *
   * @returns a new instance with a reset user state
   */
  reset(): Session;

  /**
   * Create a new instance updated with multiple attributes removed
   *
   * @param keys - the keys of the attributes to remove
   * @returns a new instance with the attributes removed
   */
  removeAll(...keys: string[]): Session;

  /**
   * Check if the Session contains a given attribute key
   *
   * @param key - the attribute key
   * @returns true is the key is defined
   */
  contains(key: string): boolean;

  /**
   * @returns if the Session's status is failure
   */
  isFailed(): boolean;

  /**
   * Create a new instance with the status forced to "succeeded"
   *
   * @returns a new instance with the new status
   */
  markAsSucceeded(): Session;

  /**
   * Create a new instance with the status forced to "failed"
   *
   * @returns a new instance with the new status
   */
  markAsFailed(): Session;

  /**
   * Provide the name of the scenario of the virtual user
   *
   * @returns the virtual user's scenario name
   */
  scenario(): string;

  /**
   * Provide the list of groups at the current position for the virtual user
   *
   * @returns the list of groups, from shallowest to deepest
   */
  groups(): string[];

  /**
   * Provide the unique (for this injector) id of the virtual user
   *
   * @returns the virtual user's id
   */
  userId(): number;

  /**
   * Provide a representation of the Session content
   *
   * @returns the Session content as a pretty printed string
   */
  toString(): string;
}

export const wrapSession = (_underlying: JvmSession): Session => ({
  _underlying,
  get: <T>(key: string): T => _underlying.get(key),
  set: (key: string, value: any): Session => {
    return wrapSession(_underlying.set(key, asJava(value)));
  },
  setByteArray: (key: string, value: number[]): Session => wrapSession(_underlying.set(key, asByteArray(value))),
  setAll: (newAttributes: Record<string, any>): Session => {
    let session = _underlying;
    for (const key in newAttributes) {
      session = session.set(key, asJava(newAttributes[key]));
    }
    return wrapSession(session);
  },
  remove: (key: string): Session => wrapSession(_underlying.remove(key)),
  reset: (): Session => wrapSession(_underlying.reset()),
  removeAll: (...keys: string[]): Session => wrapSession(_underlying.removeAll(...keys)),
  contains: (key: string): boolean => _underlying.contains(key),
  isFailed: (): boolean => _underlying.isFailed(),
  markAsSucceeded: (): Session => wrapSession(_underlying.markAsSucceeded()),
  markAsFailed: (): Session => wrapSession(_underlying.markAsFailed()),
  scenario: (): string => _underlying.scenario(),
  groups: (): string[] => _underlying.groups(),
  userId: (): number => _underlying.userId(),
  toString: (): string => _underlying.toString()
});

export type Expression<T> = T | ((session: Session) => T);

export type SessionTransform = (session: Session) => Session;
export const underlyingSessionTransform =
  (f: SessionTransform): ((jvmSession: JvmSession) => JvmSession) =>
  (jvmSession: JvmSession) =>
    f(wrapSession(jvmSession))._underlying;

export type SessionTo<T> = (session: Session) => T;
export const underlyingSessionTo =
  <T>(f: SessionTo<T>): ((jvmSession: JvmSession) => T) =>
  (jvmSession: JvmSession) =>
    f(wrapSession(jvmSession));

export const underlyingSessionToJava =
  <T>(f: SessionTo<T>): ((jvmSession: JvmSession) => unknown) =>
  (jvmSession: JvmSession) =>
    asJava(f(wrapSession(jvmSession)));

export const underlyingSessionToDuration =
  (f: SessionTo<Duration>): ((jvmSession: JvmSession) => java.time.Duration) =>
  (jvmSession: JvmSession) =>
    toJvmDuration(f(wrapSession(jvmSession)));

export const underlyingXWithSessionTo =
  <X, X2>(f: (x: X, session: Session) => X2): ((x: X, jvmSession: JvmSession) => X2) =>
  (x: X, jvmSession: JvmSession) =>
    f(x, wrapSession(jvmSession));
