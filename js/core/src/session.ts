import "@gatling.io/jvm-types";

import { Wrapper } from "./common";
import { Duration, toJvmDuration } from "./utils/duration";
import JvmSession = io.gatling.javaapi.core.Session;

export interface Session extends Wrapper<JvmSession> {
  get<T>(key: string): T;
  set(key: string, value: any): Session;
}

export const wrapSession = (_underlying: JvmSession): Session => ({
  _underlying,
  get: <T>(key: string): T => _underlying.get(key),
  set: (key: string, value: any): Session => wrapSession(_underlying.set(key, value))
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

export const underlyingSessionToDuration =
  (f: SessionTo<Duration>): ((jvmSession: JvmSession) => java.time.Duration) =>
  (jvmSession: JvmSession) =>
    toJvmDuration(f(wrapSession(jvmSession)));
