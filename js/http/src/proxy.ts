import { Wrapper } from "@gatling.io/core";
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
   * Define some Basic Auth credentials for this proxy
   *
   * @param username - the username
   * @param password - the password
   * @returns a new Proxy instance
   */
  credentials(username: string, password: string): Proxy;
}

const wrapProxy = (_underlying: JvmProxy): Proxy => ({
  _underlying,
  http: (): Proxy => wrapProxy(_underlying.http()),
  https: (): Proxy => wrapProxy(_underlying.https()),
  socks4: (): Proxy => wrapProxy(_underlying.socks4()),
  socks5: (): Proxy => wrapProxy(_underlying.socks5()),
  credentials: (username: string, password: string): Proxy => wrapProxy(_underlying.credentials(username, password))
});

/**
 * Bootstrap the DSL for defining a Proxy
 *
 * @param host - the proxy host
 * @param port - the proxy prot
 * @returns the next DSL step
 */
export const Proxy = (host: string, port: number) => wrapProxy(JvmHttpDsl.Proxy(host, port));
