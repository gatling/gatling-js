import {
  CheckBuilder,
  Duration,
  Expression,
  ProtocolBuilder,
  Session,
  isDuration,
  toJvmDuration,
  underlyingSessionTo
} from "@gatling.io/core";

import { LastWillBuilder } from "./lastWill";

import JvmMqttProtocolBuilder = io.gatling.javaapi.mqtt.MqttProtocolBuilder;

export interface MqttProtocolBuilder extends ProtocolBuilder {
  /**
   * Use MQTT 3.1
   *
   * @returns a new MqttProtocolBuilder instance
   */
  mqttVersion_3_1(): MqttProtocolBuilder;

  /**
   * Use MQTT 3.1.1 (default)
   *
   * @returns a new MqttProtocolBuilder instance
   */
  mqttVersion_3_1_1(): MqttProtocolBuilder;

  /**
   * Use MQTT 5
   *
   * @returns a new MqttProtocolBuilder instance
   */
  mqttVersion_5(): MqttProtocolBuilder;

  /**
   * Define the MQTT broker address
   *
   * @param hostname - the hostname
   * @param port - the port
   * @returns a new MqttProtocolBuilder instance
   */
  broker(hostname: string, port: number): MqttProtocolBuilder;

  /**
   * Use TLS
   *
   * @param useTls - true to enable TLS
   * @returns a new MqttProtocolBuilder instance
   */
  useTls(useTls: boolean): MqttProtocolBuilder;

  /*
   * Provide a function to set a {@link KeyManagerFactory} per virtual user
   *
   * @param f - the function to feed a {@link KeyManagerFactory} per virtual user. Input is the
   *     virtual user's unique id.
   * @returns a new MqttProtocolBuilder instance
   */
  // FIXME perUserKeyManagerFactory(f: (number) => KeyManagerFactory): MqttProtocolBuilder;

  /**
   * Assign a KeyManagerFactory per virtual user, out of a single PKCS#12 keyStore that
   * contains one key entry per virtual user. Entries are assigned in the keyStore aliases' natural
   * order, the virtual user with the userId 1 getting the first one.
   *
   * <p>When running on Gatling Enterprise with multiple load generators, the aliases are sharded so
   * that each load generator gets its own disjoint slice, hence a given key entry is never used by
   * 2 different load generators.
   *
   * <p>The run is stopped once all the key entries have been assigned, so 2 virtual users never
   * share the same one. The keyStore must hence contain at least as many key entries as the number
   * of virtual users of the run.
   *
   * @param keyStorePath - the location of the PKCS#12 keyStore, either on the classpath or as an
   * absolute path on the filesystem
   * @param keyStorePassword - the keyStore password, also used to recover the key entries; omit if
   * the keyStore is not password protected
   * @returns a new MqttProtocolBuilder instance
   */
  perUserKeyManagerFactory(keyStorePath: string, keyStorePassword?: string): MqttProtocolBuilder;

  /**
   * Define the clientId
   *
   * @param clientId - the clientId, expressed as a Gatling Expression Language String
   * @returns a new MqttProtocolBuilder instance
   */
  clientId(clientId: string): MqttProtocolBuilder;

  /**
   * Define the clientId
   *
   * @param clientId - the clientId, expressed as a function
   * @returns a new MqttProtocolBuilder instance
   */
  clientId(clientId: (session: Session) => string): MqttProtocolBuilder;

  /**
   * Clean the MQTT session when closing the MQTT connection
   *
   * @param cleanSession - true to clean the session
   * @returns a new MqttProtocolBuilder instance
   */
  cleanSession(cleanSession: boolean): MqttProtocolBuilder;

  /**
   * Define the connect timeout
   *
   * @param timeout - the timeout
   * @returns a new MqttProtocolBuilder instance
   */
  connectTimeout(timeout: Duration): MqttProtocolBuilder;

  /**
   * Define the keepAlive timeout
   *
   * @param timeout - the keepAlive timeout
   * @returns a new MqttProtocolBuilder instance
   */
  keepAlive(timeout: Duration): MqttProtocolBuilder;

  /**
   * Use an at-most-once QoS
   *
   * @returns a new MqttProtocolBuilder instance
   */
  qosAtMostOnce(): MqttProtocolBuilder;

  /**
   * Use an at-least-once QoS
   *
   * @returns a new MqttProtocolBuilder instance
   */
  qosAtLeastOnce(): MqttProtocolBuilder;

  /**
   * Use an exactly-once QoS
   *
   * @returns a new MqttProtocolBuilder instance
   */
  qosExactlyOnce(): MqttProtocolBuilder;

  /**
   * Instruct the server to retain the message
   *
   * @param retain - true to retain
   * @returns a new MqttProtocolBuilder instance
   */
  retain(retain: boolean): MqttProtocolBuilder;

  /**
   * Define the credentials
   *
   * @param username - the username, expressed as a Gatling Expression Language String
   * @param password - the password, expressed as a Gatling Expression Language String
   * @returns a new MqttProtocolBuilder instance
   */
  credentials(username: string, password: string): MqttProtocolBuilder;

  /**
   * Define the credentials
   *
   * @param username - the username, expressed as a Gatling Expression Language String
   * @param password - the password, expressed as a function
   * @returns a new MqttProtocolBuilder instance
   */
  credentials(username: string, password: (session: Session) => string): MqttProtocolBuilder;

  /**
   * Define the credentials
   *
   * @param username - the username, expressed as a function
   * @param password - the password, expressed as a Gatling Expression Language String
   * @returns a new MqttProtocolBuilder instance
   */
  credentials(username: (session: Session) => string, password: string): MqttProtocolBuilder;

  /**
   * Define the credentials
   *
   * @param username - the username, expressed as a function
   * @param password - the password, expressed as a function
   * @returns a new MqttProtocolBuilder instance
   */
  credentials(username: (session: Session) => string, password: (session: Session) => string): MqttProtocolBuilder;

  /**
   * Send a LastWill message when closing the connetion
   *
   * @param lw - the last will message
   * @returns a new MqttProtocolBuilder instance
   */
  lastWill(lw: LastWillBuilder): MqttProtocolBuilder;

  /**
   * Define the maximum number of reconnections
   *
   * @param reconnectAttemptsMax - the maximum number of reconnections
   * @returns a new MqttProtocolBuilder instance
   */
  reconnectAttemptsMax(reconnectAttemptsMax: number): MqttProtocolBuilder;

  /**
   * Define the reconnect delay exponential backoff multiplier
   *
   * @param multiplier - the multiplier
   * @returns a new MqttProtocolBuilder instance
   */
  // FIXME float?
  reconnectBackoffMultiplier(multiplier: number): MqttProtocolBuilder;

  /**
   * Define the delay before reconnecting a crashed connection
   *
   * @param delay - the delay
   * @returns a new MqttProtocolBuilder instance
   */
  reconnectDelay(delay: Duration): MqttProtocolBuilder;

  /**
   * Define the resend delay exponential backoff multiplier
   *
   * @param multiplier - the multiplier
   * @returns a new MqttProtocolBuilder instance
   */
  // FIXME float?
  resendBackoffMultiplier(multiplier: number): MqttProtocolBuilder;

  /**
   * Define the delay before resending a message
   *
   * @param delay - the delay
   * @returns a new MqttProtocolBuilder instance
   */
  resendDelay(delay: Duration): MqttProtocolBuilder;

  /**
   * Define a check to extract the correlationId when applying check that have to match outbound
   * and inbound messages
   *
   * @param correlator - the check to extract the correlationId
   * @returns a new MqttProtocolBuilder instance
   */
  correlateBy(correlator: CheckBuilder): MqttProtocolBuilder;

  /**
   * Define the interval to check for checks timeout
   *
   * @param interval - the interval
   * @returns a new MqttProtocolBuilder instance
   */
  timeoutCheckInterval(interval: Duration): MqttProtocolBuilder;

  /**
   * Set the max size of the buffer for unmatched/unchecked inbound WebSocket messages. 0 by
   * default, meaning such messages are not buffered.
   *
   * @param max - the max size
   * @returns a new MqttProtocolBuilder instance
   */
  unmatchedInboundMessageBufferSize(max: number): MqttProtocolBuilder;
}

const wrapMqttProtocolBuilder = (_underlying: JvmMqttProtocolBuilder): MqttProtocolBuilder => ({
  _underlying,

  mqttVersion_3_1: () => wrapMqttProtocolBuilder(_underlying.mqttVersion_3_1()),
  mqttVersion_3_1_1: () => wrapMqttProtocolBuilder(_underlying.mqttVersion_3_1_1()),
  mqttVersion_5: () => wrapMqttProtocolBuilder(_underlying.mqttVersion_5()),

  broker: (hostname, port): MqttProtocolBuilder => wrapMqttProtocolBuilder(_underlying.broker(hostname, port)),

  useTls: (useTls): MqttProtocolBuilder => wrapMqttProtocolBuilder(_underlying.useTls(useTls)),

  perUserKeyManagerFactory: (keyStorePath, keyStorePassword) =>
    wrapMqttProtocolBuilder(
      keyStorePassword === undefined
        ? _underlying.perUserKeyManagerFactory(keyStorePath)
        : _underlying.perUserKeyManagerFactory(keyStorePath, keyStorePassword)
    ),

  clientId: (clientId: Expression<string>) =>
    wrapMqttProtocolBuilder(
      typeof clientId === "function"
        ? _underlying.clientId(underlyingSessionTo(clientId))
        : _underlying.clientId(clientId)
    ),

  cleanSession: (cleanSession) => wrapMqttProtocolBuilder(_underlying.cleanSession(cleanSession)),

  connectTimeout: (timeout) => {
    if (isDuration(timeout)) {
      return wrapMqttProtocolBuilder(_underlying.connectTimeout(toJvmDuration(timeout)));
    }

    throw Error(`connectTimeout() called with invalid argument ${timeout}`);
  },

  keepAlive: (timeout) => {
    if (isDuration(timeout)) {
      return wrapMqttProtocolBuilder(_underlying.connectTimeout(toJvmDuration(timeout)));
    }

    throw Error(`keepAlive() called with invalid argument ${timeout}`);
  },

  qosAtMostOnce: () => wrapMqttProtocolBuilder(_underlying.qosAtMostOnce()),
  qosAtLeastOnce: () => wrapMqttProtocolBuilder(_underlying.qosAtLeastOnce()),
  qosExactlyOnce: () => wrapMqttProtocolBuilder(_underlying.qosExactlyOnce()),

  retain: (retain) => wrapMqttProtocolBuilder(_underlying.retain(retain)),

  credentials: (username: Expression<string>, password: Expression<string>) =>
    wrapMqttProtocolBuilder(
      typeof username === "function"
        ? typeof password === "function"
          ? _underlying.credentials(underlyingSessionTo(username), underlyingSessionTo(password))
          : _underlying.credentials(underlyingSessionTo(username), password)
        : typeof password === "function"
          ? _underlying.credentials(username, underlyingSessionTo(password))
          : _underlying.credentials(username, password)
    ),

  lastWill: (lw): MqttProtocolBuilder => wrapMqttProtocolBuilder(_underlying.lastWill(lw._underlying)),

  reconnectAttemptsMax: (reconnectAttemptsMax) =>
    wrapMqttProtocolBuilder(_underlying.reconnectAttemptsMax(reconnectAttemptsMax)),
  reconnectBackoffMultiplier: (multiplier) =>
    wrapMqttProtocolBuilder(_underlying.reconnectBackoffMultiplier(multiplier)),
  reconnectDelay: (delay) => {
    if (isDuration(delay)) {
      return wrapMqttProtocolBuilder(_underlying.reconnectDelay(toJvmDuration(delay)));
    }

    throw Error(`reconnectDelay() called with invalid argument ${delay}`);
  },

  resendBackoffMultiplier: (multiplier) => wrapMqttProtocolBuilder(_underlying.resendBackoffMultiplier(multiplier)),
  resendDelay: (delay) => {
    if (isDuration(delay)) {
      return wrapMqttProtocolBuilder(_underlying.resendDelay(toJvmDuration(delay)));
    }

    throw Error(`resendDelay() called with invalid argument ${delay}`);
  },

  correlateBy: (correlator) => wrapMqttProtocolBuilder(_underlying.correlateBy(correlator._underlying)),

  timeoutCheckInterval: (interval) => {
    if (isDuration(interval)) {
      return wrapMqttProtocolBuilder(_underlying.timeoutCheckInterval(toJvmDuration(interval)));
    }

    throw Error(`timeoutCheckInterval() called with invalid argument ${interval}`);
  },

  unmatchedInboundMessageBufferSize: (max) =>
    wrapMqttProtocolBuilder(_underlying.unmatchedInboundMessageBufferSize(max))
});

export const mqttProtocolBuilder = wrapMqttProtocolBuilder(
  // MqttDsl.mqtt doesn't get properly generated by java2ts because of conflicts with methods of the same name
  Java.type<any>("io.gatling.javaapi.mqtt.MqttDsl").mqtt
);
