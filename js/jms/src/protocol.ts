import { Duration, ProtocolBuilder, toJvmDuration } from "@gatling.io/core";

import { JmsJndiConnectionFactoryBuilder } from "./jndi";
import { JmsMessageMatcher, toJvmJmsMessageMatcher } from "./message";

import JvmJmsProtocolBuilder = io.gatling.javaapi.jms.JmsProtocolBuilder;
import JvmJmsProtocolBuilderBase = io.gatling.javaapi.jms.JmsProtocolBuilder$Base;

export interface JmsProtocolBuilderBase {
  /**
   * Connect to the broker with a ConnectionFactory looked up with JNDI. The JMS client of your
   * broker must be declared in the "gatling.jvmDependencies" section of package.json.
   *
   * @param connectionFactory - the ConnectionFactory, see {@link jmsJndiConnectionFactory}
   * @returns a new JmsProtocolBuilder instance
   */
  connectionFactory(connectionFactory: JmsJndiConnectionFactoryBuilder): JmsProtocolBuilder;
}

export const wrapJmsProtocolBuilderBase = (_underlying: JvmJmsProtocolBuilderBase): JmsProtocolBuilderBase => ({
  connectionFactory: (connectionFactory: JmsJndiConnectionFactoryBuilder) =>
    wrapJmsProtocolBuilder(_underlying.connectionFactory(connectionFactory._underlying))
});

/**
 * DSL for building JMS protocol configurations
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface JmsProtocolBuilder extends ProtocolBuilder {
  /**
   * Define the credentials used to open the connections to the broker
   *
   * @param user - the user
   * @param password - the password
   * @returns a new JmsProtocolBuilder instance
   */
  credentials(user: string, password: string): JmsProtocolBuilder;

  /**
   * Send messages with the persistent delivery mode
   *
   * @returns a new JmsProtocolBuilder instance
   */
  usePersistentDeliveryMode(): JmsProtocolBuilder;

  /**
   * Send messages with the non-persistent delivery mode, the default
   *
   * @returns a new JmsProtocolBuilder instance
   */
  useNonPersistentDeliveryMode(): JmsProtocolBuilder;

  /**
   * Match replies with requests when the JMSCorrelationID of the reply is the JMSMessageID of the
   * request, the default
   *
   * @returns a new JmsProtocolBuilder instance
   */
  matchByMessageId(): JmsProtocolBuilder;

  /**
   * Match replies with requests when they have the same JMSCorrelationID. Requests get a random one
   * unless the action sets it with correlationId().
   *
   * @returns a new JmsProtocolBuilder instance
   */
  matchByCorrelationId(): JmsProtocolBuilder;

  /**
   * Match replies with requests with a custom strategy
   *
   * @param matcher - the strategy
   * @returns a new JmsProtocolBuilder instance
   */
  messageMatcher(matcher: JmsMessageMatcher): JmsProtocolBuilder;

  /**
   * Define how long request-reply actions wait for their reply before failing, forever by default
   *
   * @param timeout - the timeout
   * @returns a new JmsProtocolBuilder instance
   */
  replyTimeout(timeout: Duration): JmsProtocolBuilder;

  /**
   * Define the number of threads listening for replies, 1 by default
   *
   * @param threadCount - the number of threads
   * @returns a new JmsProtocolBuilder instance
   */
  listenerThreadCount(threadCount: number): JmsProtocolBuilder;
}

export const wrapJmsProtocolBuilder = (_underlying: JvmJmsProtocolBuilder): JmsProtocolBuilder => ({
  _underlying,
  credentials: (user: string, password: string) => wrapJmsProtocolBuilder(_underlying.credentials(user, password)),
  usePersistentDeliveryMode: () => wrapJmsProtocolBuilder(_underlying.usePersistentDeliveryMode()),
  useNonPersistentDeliveryMode: () => wrapJmsProtocolBuilder(_underlying.useNonPersistentDeliveryMode()),
  matchByMessageId: () => wrapJmsProtocolBuilder(_underlying.matchByMessageId()),
  matchByCorrelationId: () => wrapJmsProtocolBuilder(_underlying.matchByCorrelationId()),
  messageMatcher: (matcher: JmsMessageMatcher) =>
    wrapJmsProtocolBuilder(_underlying.messageMatcher(toJvmJmsMessageMatcher(matcher))),
  replyTimeout: (timeout: Duration) => wrapJmsProtocolBuilder(_underlying.replyTimeout(toJvmDuration(timeout))),
  listenerThreadCount: (threadCount: number) => wrapJmsProtocolBuilder(_underlying.listenerThreadCount(threadCount))
});
