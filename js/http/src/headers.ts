import { Wrapper } from "@gatling.io/core";

import JvmHttpHeaders = io.netty.handler.codec.http.HttpHeaders;

/**
 * Provides the constants for the standard HTTP header names and values and
 * commonly used utility methods that accesses an {@link HttpMessage}.
 * <p>
 * Concrete instances of this class are most easily obtained from its default factory:
 * {@link DefaultHttpHeadersFactory#headersFactory()}.
 */
export interface HttpHeaders extends Wrapper<JvmHttpHeaders> {
  /**
   * Adds a new header with the specified name and value.
   *
   * If the specified value is not a {@link String}, it is converted
   * into a {@link String} by {@link Object#toString()}, except in the cases
   * of {@link Date} and {@link Calendar}, which are formatted to the date
   * format defined in <a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1">RFC2616</a>.
   *
   * @param name - The name of the header being added
   * @param value - The value of the header being added
   *
   * @returns {@code this}
   */
  add(name: string, value: any): HttpHeaders;
}

export const wrapHttpHeaders = (_underlying: JvmHttpHeaders): HttpHeaders => ({
  _underlying,
  add: (name: string, value: any): HttpHeaders => wrapHttpHeaders(_underlying.add(name, value))
});
