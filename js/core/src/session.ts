import "@gatling.io/jvm-types";

import { Wrapper } from "./common";
import { Duration, toJvmDuration } from "./utils/duration";
import JvmSession = io.gatling.javaapi.core.Session;

export interface Session extends Wrapper<JvmSession> {
  get<T>(key: string): T;
  set(key: string, value: any): Session;
}
const wrapSession = (_underlying: JvmSession): Session => ({
  _underlying,
  get: <T>(key: string): T => _underlying.get(key),
  set: (key: string, value: any): Session => wrapSession(_underlying.set(key, value))
});

export type SessionTransform = (session: Session) => Session;
export const underlyingSessionTransform =
  (f: SessionTransform): ((jvmSession: JvmSession) => JvmSession) =>
  (jvmSession: JvmSession) =>
    f(wrapSession(jvmSession))._underlying;

export type SessionToString = (session: Session) => string;
export const underlyingSessionToString =
  (f: SessionToString): ((jvmSession: JvmSession) => string) =>
  (jvmSession: JvmSession) =>
    f(wrapSession(jvmSession));

export type SessionToNumber = (session: Session) => number;
export const underlyingSessionToNumber =
  (f: SessionToNumber): ((jvmSession: JvmSession) => number) =>
  (jvmSession: JvmSession) =>
    f(wrapSession(jvmSession));

export type SessionToBoolean = (session: Session) => boolean;
export const underlyingSessionToBoolean =
  (f: SessionToBoolean): ((jvmSession: JvmSession) => boolean) =>
  (jvmSession: JvmSession) =>
    f(wrapSession(jvmSession));

export type SessionToDuration = (session: Session) => Duration;
export const underlyingSessionToDuration =
  (f: SessionToDuration): ((jvmSession: JvmSession) => java.time.Duration) =>
  (jvmSession: JvmSession) =>
    toJvmDuration(f(wrapSession(jvmSession)));

export type SessionToUnknown = (session: Session) => unknown;
export const underlyingSessionToUnknown =
  (f: SessionToUnknown): ((jvmSession: JvmSession) => unknown) =>
  (jvmSession: JvmSession) =>
    f(wrapSession(jvmSession));

export type SessionToArray<T> = (session: Session) => T[];
export const underlyingSessionToArray =
  <T>(f: SessionToArray<T>): ((jvmSession: JvmSession) => T[]) =>
  (jvmSession: JvmSession) =>
    f(wrapSession(jvmSession));
