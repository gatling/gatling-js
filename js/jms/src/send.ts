import { ActionBuilder, Expression, Session, underlyingSessionTo } from "@gatling.io/core";

import {
  JmsAttributesBuilder,
  JmsMessageBodyBuilder,
  jmsAttributesBuilderImpl,
  jmsMessageBodyBuilderImpl
} from "./common";
import { JmsDestination } from "./destination";

import JvmJmsSendActionBuilder = io.gatling.javaapi.jms.JmsSendActionBuilder;
import JvmJmsSendActionBuilderMessage = io.gatling.javaapi.jms.JmsSendActionBuilder$Message;
import JvmJmsSendActionBuilderQueue = io.gatling.javaapi.jms.JmsSendActionBuilder$Queue;

export namespace JmsSendActionBuilder {
  /**
   * The step that defines the destination of the message
   */
  export interface Queue {
    /**
     * Send the message to a queue
     *
     * @param name - the name of the queue, expressed as a Gatling Expression Language String
     * @returns the next DSL step
     */
    queue(name: string): Message;

    /**
     * Send the message to a queue
     *
     * @param name - the name of the queue, expressed as a function
     * @returns the next DSL step
     */
    queue(name: (session: Session) => string): Message;

    /**
     * Send the message to a destination
     *
     * @param destination - the destination, see {@link queue} and {@link topic}
     * @returns the next DSL step
     */
    destination(destination: JmsDestination): Message;
  }

  export const wrapQueue = (_underlying: JvmJmsSendActionBuilderQueue): Queue => ({
    queue: (name: Expression<string>) =>
      wrapMessage(typeof name === "function" ? _underlying.queue(underlyingSessionTo(name)) : _underlying.queue(name)),
    destination: (destination: JmsDestination) => wrapMessage(_underlying.destination(destination._underlying))
  });

  /**
   * The step that defines the message
   */
  export interface Message extends JmsMessageBodyBuilder<JmsSendActionBuilder> {}

  const wrapMessage = (_underlying: JvmJmsSendActionBuilderMessage): Message =>
    jmsMessageBodyBuilderImpl(_underlying, wrapJmsSendActionBuilder);
}

/**
 * DSL for actions that send a message, without waiting for any reply
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface JmsSendActionBuilder extends ActionBuilder, JmsAttributesBuilder<JmsSendActionBuilder> {}

const wrapJmsSendActionBuilder = (_underlying: JvmJmsSendActionBuilder): JmsSendActionBuilder => ({
  _underlying,
  ...jmsAttributesBuilderImpl(_underlying, wrapJmsSendActionBuilder)
});
