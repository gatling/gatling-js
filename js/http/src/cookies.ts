import { ActionBuilder, Expression, Session, underlyingSessionTo, wrapActionBuilder, Wrapper } from "@gatling.io/core";
import { HttpDsl as JvmHttpDsl } from "@gatling.io/jvm-types";

import JvmAddCookie = io.gatling.javaapi.http.AddCookie;
import JvmGetCookie = io.gatling.javaapi.http.GetCookie;

/**
 * DSL for adding a <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">cookie</a>
 * in the virtual user's CookieJar instead of having the server send a Set-Cookie header.
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface AddCookie extends Wrapper<JvmAddCookie> {
  /**
   * Define the domain of the cookie. If undefined, will try to use the domain of {@link
   * HttpProtocolBuilder#baseUrl(String)}
   *
   * @param domain - the cookie domain
   * @returns a new AddCookie
   */
  withDomain(domain: string): AddCookie;

  /**
   * Define the path of the cookie.
   *
   * @param path - the cookie path
   * @returns a new AddCookie
   */
  withPath(path: string): AddCookie;

  /**
   * Define the maxAge attribute of the cookie.
   *
   * @param maxAge - the cookie maxAge
   * @returns a new AddCookie
   */
  withMaxAge(maxAge: number): AddCookie;

  /**
   * Define the secure attribute of the cookie.
   *
   * @param secure - if the cookie must only be sent with HTTPS requests
   * @returns a new AddCookie
   */
  withSecure(secure: boolean): AddCookie;
}

const wrapAddCookie = (_underlying: JvmAddCookie): AddCookie => ({
  _underlying,
  withDomain: (domain: string): AddCookie => wrapAddCookie(_underlying.withDomain(domain)),
  withPath: (path: string): AddCookie => wrapAddCookie(_underlying.withPath(path)),
  withMaxAge: (maxAge: number): AddCookie => wrapAddCookie(_underlying.withMaxAge(maxAge)),
  withSecure: (secure: boolean): AddCookie => wrapAddCookie(_underlying.withSecure(secure))
});

/**
 * DSL for fetching the value of a <a
 * href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">cookie</a> from the virtual
 * user's CookieJar into its {@link Session}.
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface GetCookie extends Wrapper<JvmGetCookie> {
  /**
   * Define the domain of the cookie. If undefined, will try to use the domain of {@link
   * HttpProtocolBuilder#baseUrl(String)}
   *
   * @param domain - the cookie domain, expressed as a Gatling Expression Language String
   * @returns a new GetCookie
   */
  withDomain(domain: string): GetCookie;

  /**
   * Define the domain of the cookie. If undefined, will try to use the domain of {@link
   * HttpProtocolBuilder#baseUrl(String)}
   *
   * @param domain - the cookie domain, expressed as a function
   * @returns a new GetCookie
   */
  withDomain(domain: (session: Session) => string): GetCookie;

  /**
   * Define the path of the cookie.
   *
   * @param path - the cookie path
   * @returns a new GetCookie
   */
  withPath(path: string): GetCookie;

  /**
   * Define the secure attribute of the cookie.
   *
   * @param secure - the cookie secure attribute
   * @returns a new GetCookie
   */
  withSecure(secure: boolean): GetCookie;

  /**
   * Define the {@link Session} key to save the cookie value. If undefined, will use the cookie name
   *
   * @param saveAs - the key
   * @returns a new GetCookie
   */
  saveAs(saveAs: string): GetCookie;
}

const wrapGetCookie = (_underlying: JvmGetCookie): GetCookie => ({
  _underlying,
  withDomain: (domain: Expression<string>): GetCookie =>
    wrapGetCookie(
      typeof domain === "function" ? _underlying.withDomain(underlyingSessionTo(domain)) : _underlying.withPath(domain)
    ),
  withPath: (path: string): GetCookie => wrapGetCookie(_underlying.withPath(path)),
  withSecure: (secure: boolean): GetCookie => wrapGetCookie(_underlying.withSecure(secure)),
  saveAs: (saveAs: string): GetCookie => wrapGetCookie(_underlying.saveAs(saveAs))
});

/**
 * Create an action to add a Cookie
 *
 * @param cookie - the DSL for adding a cookie
 * @returns an ActionBuilder
 */
export const addCookie = (cookie: AddCookie): ActionBuilder =>
  wrapActionBuilder(JvmHttpDsl.addCookie(cookie._underlying));

/**
 * Create an action to get a Cookie value into the Session
 *
 * @param cookie - the DSL for getting a cookie
 * @returns an ActionBuilder
 */
export const getCookieValue = (cookie: GetCookie): ActionBuilder =>
  wrapActionBuilder(JvmHttpDsl.getCookieValue(cookie._underlying));

/**
 * Create an action to flush the Session (non-persistent) Cookies of the user
 *
 * @returns an ActionBuilder
 */
export const flushSessionCookies = (): ActionBuilder => wrapActionBuilder(JvmHttpDsl.flushSessionCookies());

/**
 * Create an action to flush all the Cookies of the user
 *
 * @returns an ActionBuilder
 */
export const flushCookieJar = (): ActionBuilder => wrapActionBuilder(JvmHttpDsl.flushCookieJar());

/**
 * Create an action to flush the HTTP cache of the user
 *
 * @returns an ActionBuilder
 */
export const flushHttpCache = (): ActionBuilder => wrapActionBuilder(JvmHttpDsl.flushHttpCache());

export interface CookieApply {
  /**
   * Bootstrap the DSL for defining a Cookie to add
   *
   * @param name - the name of the cookie, expressed as a Gatling Expression Language String
   * @param value - the value of the cookie, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string, value: string): AddCookie;

  /**
   * Bootstrap the DSL for defining a Cookie to add
   *
   * @param name - the name of the cookie, expressed as a function
   * @param value - the value of the cookie, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string, value: (session: Session) => string): AddCookie;

  /**
   * Bootstrap the DSL for defining a Cookie to add
   *
   * @param name - the name of the cookie, expressed as a Gatling Expression Language String
   * @param value - the value of the cookie, expressed as a function
   * @returns the next DSL step
   */
  (name: (session: Session) => string, value: string): AddCookie;

  /**
   * Bootstrap the DSL for defining a Cookie to add
   *
   * @param name - the name of the cookie, expressed as a function
   * @param value - the value of the cookie, expressed as a function
   * @returns the next DSL step
   */
  (name: (session: Session) => string, value: (session: Session) => string): AddCookie;
}

export const Cookie: CookieApply = (name: Expression<string>, value: Expression<string>): AddCookie =>
  wrapAddCookie(
    typeof name === "function"
      ? typeof value === "function"
        ? JvmHttpDsl.Cookie(underlyingSessionTo(name), underlyingSessionTo(value))
        : JvmHttpDsl.Cookie(underlyingSessionTo(name), value)
      : typeof value === "function"
        ? JvmHttpDsl.Cookie(name, underlyingSessionTo(value))
        : JvmHttpDsl.Cookie(name, value)
  );

export interface CookieKeyApply {
  /**
   * Bootstrap the DSL for defining a Cookie to get
   *
   * @param name - the name of the cookie, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  (name: string): GetCookie;

  /**
   * Bootstrap the DSL for defining a Cookie to get
   *
   * @param name - the name of the cookie, expressed as a function
   * @returns the next DSL step
   */
  (name: (session: Session) => string): GetCookie;
}

export const CookieKey: CookieKeyApply = (name: Expression<string>): GetCookie =>
  wrapGetCookie(
    typeof name === "function" ? JvmHttpDsl.CookieKey(underlyingSessionTo(name)) : JvmHttpDsl.CookieKey(name)
  );
