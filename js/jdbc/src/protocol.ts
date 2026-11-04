import { Duration, ProtocolBuilder, toJvmDuration } from "@gatling.io/core";

import JvmJdbcProtocolBuilder = io.gatling.javaapi.jdbc.JdbcProtocolBuilder;

/**
 * DSL for building JDBC protocol configurations
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface JdbcProtocolBuilder extends ProtocolBuilder {
  /**
   * Define the credentials used to open connections: with a url, passed to the driver along with
   * the properties, with a DataSource, passed to getConnection(username, password)
   *
   * @param username - the username
   * @param password - the password
   * @returns a new JdbcProtocolBuilder instance
   */
  credentials(username: string, password: string): JdbcProtocolBuilder;

  /**
   * Define a property passed to the JDBC driver when opening connections, see your driver's
   * documentation. Only with a url: with a DataSource, configure the DataSource itself.
   *
   * @param key - the property key
   * @param value - the property value
   * @returns a new JdbcProtocolBuilder instance
   */
  property(key: string, value: string): JdbcProtocolBuilder;

  /**
   * Define the size of the connection pool, which is also the maximum number of statements running
   * concurrently. Virtual users wait for a connection to be available, and this wait is part of the
   * response time. Defaults to 10.
   *
   * @param maxConnections - the size of the connection pool
   * @returns a new JdbcProtocolBuilder instance
   */
  maxConnections(maxConnections: number): JdbcProtocolBuilder;

  /**
   * Define how long opening a connection may take: with a url, it's set JVM wide with
   * DriverManager.setLoginTimeout, with a DataSource, it's set on the DataSource. It's up to the
   * driver to honor it. Rounded up to the next second.
   *
   * @param timeout - the timeout
   * @returns a new JdbcProtocolBuilder instance
   */
  loginTimeout(timeout: Duration): JdbcProtocolBuilder;

  /**
   * Define how long a statement may run, see Statement.setQueryTimeout. Rounded up to the next
   * second.
   *
   * @param timeout - the timeout
   * @returns a new JdbcProtocolBuilder instance
   */
  queryTimeout(timeout: Duration): JdbcProtocolBuilder;

  /**
   * Define how many rows the driver fetches per round trip, see Statement.setFetchSize
   *
   * @param fetchSize - the fetch size
   * @returns a new JdbcProtocolBuilder instance
   */
  fetchSize(fetchSize: number): JdbcProtocolBuilder;
}

export const wrapJdbcProtocolBuilder = (_underlying: JvmJdbcProtocolBuilder): JdbcProtocolBuilder => ({
  _underlying,
  credentials: (username: string, password: string) =>
    wrapJdbcProtocolBuilder(_underlying.credentials(username, password)),
  property: (key: string, value: string) => wrapJdbcProtocolBuilder(_underlying.property(key, value)),
  maxConnections: (maxConnections: number) => wrapJdbcProtocolBuilder(_underlying.maxConnections(maxConnections)),
  loginTimeout: (timeout: Duration) => wrapJdbcProtocolBuilder(_underlying.loginTimeout(toJvmDuration(timeout))),
  queryTimeout: (timeout: Duration) => wrapJdbcProtocolBuilder(_underlying.queryTimeout(toJvmDuration(timeout))),
  fetchSize: (fetchSize: number) => wrapJdbcProtocolBuilder(_underlying.fetchSize(fetchSize))
});
