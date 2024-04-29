import "@gatling.io/jvm-types";

import { Wrapper } from "./common";
import { Duration, toJvmDuration } from "./utils/duration";
import JvmSession = io.gatling.javaapi.core.Session;

export interface Session extends Wrapper<JvmSession> {
  get<T>(key: string): T;
  set(key: string, value: any): Session;
  setAll(newAttributes: Record<string, any>): Session;
  remove(key: string): Session;
  reset(): Session;
  removeAll(...keys: string[]): Session;
  contains(key: string): boolean;
  isFailed(): boolean;
  markAsSucceeded(): Session;
  markAsFailed(): Session;
  scenario(): string;
  groups(): string[];
  userId(): number;
}

export const wrapSession = (_underlying: JvmSession): Session => ({
  _underlying,
  get: <T>(key: string): T => _underlying.get(key),
  set: (key: string, value: any): Session => wrapSession(_underlying.set(key, value)),
  setAll: (newAttributes: Record<string, any>): Session => wrapSession(_underlying.setAll(newAttributes as any)),
  remove: (key: string): Session => wrapSession(_underlying.remove(key)),
  reset: (): Session => wrapSession(_underlying.reset()),
  removeAll: (...keys: string[]): Session => wrapSession(_underlying.removeAll(...keys)),
  contains: (key: string): boolean => _underlying.contains(key),
  isFailed: (): boolean => _underlying.isFailed(),
  markAsSucceeded: (): Session => wrapSession(_underlying.markAsSucceeded()),
  markAsFailed: (): Session => wrapSession(_underlying.markAsFailed()),
  scenario: (): string => _underlying.scenario(),
  groups: (): string[] => _underlying.groups(),
  userId: (): number => _underlying.userId()
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

export const underlyingXWithSessionTo =
  <X, X2>(f: (x: X, session: Session) => X2): ((x: X, jvmSession: JvmSession) => X2) =>
  (x: X, jvmSession: JvmSession) =>
    f(x, wrapSession(jvmSession));
