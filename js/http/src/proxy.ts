import { Expression, Session, Wrapper, underlyingSessionTo, asJava } from "@gatling.io/core";
import { HttpDsl as JvmHttpDsl } from "@gatling.io/jvm-types";

import JvmProxy = io.gatling.javaapi.http.Proxy;

export interface Proxy extends Wrapper<JvmProxy> {
  /**
   * Define this proxy is an HTTP one (default)
   *
   * @returns a new Proxy instance
   */
  http(): Proxy;

  /**
   * Define this proxy is an HTTPS one
   *
   * @returns a new Proxy instance
   */
  https(): Proxy;

  /**
   * Define this proxy is an SOCKS4 once
   *
   * @returns a new Proxy instance
   */
  socks4(): Proxy;

  /**
   * Define this proxy is an SOCKS5 once
   *
   * @returns a new Proxy instance
   */
  socks5(): Proxy;

  /**
   * Define some username-password credentials for this proxy
   *
   * @param username the username, expressed as a Gatling Expression Language String
   * @param password the password, expressed as a Gatling Expression Language String
   * @return a new Proxy instance
   */
  credentials(username: string, password: string): Proxy;

  /**
   * Define some username-password credentials for this proxy
   *
   * @param username the username, expressed as a Gatling Expression Language String
   * @param password the password, expressed as a function
   * @return a new Proxy instance
   */
  credentials(username: string, password: (session: Session) => string): Proxy;

  /**
   * Define some username-password credentials for this proxy
   *
   * @param username the username, expressed as a function
   * @param password the password, expressed as a Gatling Expression Language String
   * @return a new Proxy instance
   */
  credentials(username: (session: Session) => string, password: string): Proxy;

  /**
   * Define some username-password credentials for this proxy
   *
   * @param username the username, expressed as a function
   * @param password the password, expressed as a function
   * @return a new Proxy instance
   */
  credentials(username: (session: Session) => string, password: (session: Session) => string): Proxy;

  /**
   * Set a header for the CONNECT request (HTTP(S) proxies only)
   *
   * @param name the static header name
   * @param value the header value, expressed as a Gatling Expression Language String
   * @return a new Proxy instance
   */
  connectHeader(name: string, value: string): Proxy;

  /**
   * Set a header for the CONNECT request (HTTP(S) proxies only)
   *
   * @param name the static header name
   * @param value the header value, expressed as a function
   * @return a new Proxy instance
   */
  connectHeader(name: string, value: (session: Session) => string): Proxy;

  /**
   * Set a header for the CONNECT request (HTTP(S) proxies only)
   *
   * @param headers the headers, names are static but values are expressed as a Gatling Expression
   *     Language String
   * @return a new Proxy instance
   */
  connectHeaders(headers: Record<string, string>): Proxy;
}

const wrapProxy = (_underlying: JvmProxy): Proxy => ({
  _underlying,
  http: (): Proxy => wrapProxy(_underlying.http()),
  https: (): Proxy => wrapProxy(_underlying.https()),
  socks4: (): Proxy => wrapProxy(_underlying.socks4()),
  socks5: (): Proxy => wrapProxy(_underlying.socks5()),
  credentials: (username: Expression<string>, password: Expression<string>): Proxy =>
    wrapProxy(
      typeof username === "function"
        ? typeof password === "function"
          ? _underlying.credentials(underlyingSessionTo(username), underlyingSessionTo(password))
          : _underlying.credentials(underlyingSessionTo(username), password)
        : typeof password === "function"
          ? _underlying.credentials(username, underlyingSessionTo(password))
          : _underlying.credentials(username, password)
    ),
  connectHeader: (name: string, value: Expression<string>): Proxy =>
    wrapProxy(
      typeof value === "function"
        ? _underlying.connectHeader(name, underlyingSessionTo(value))
        : _underlying.connectHeader(name, value)
    ),
  connectHeaders: (headers: Record<string, string>): Proxy =>
    wrapProxy(_underlying.connectHeaders(asJava(headers) as any))
});

/**
 * Bootstrap the DSL for defining a Proxy
 *
 * @param host - the proxy host
 * @param port - the proxy prot
 * @returns the next DSL step
 */
export const Proxy = (host: string, port: number) => wrapProxy(JvmHttpDsl.Proxy(host, port));
