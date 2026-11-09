import {
  ActionBuilder,
  CheckBuilder,
  Condition,
  Expression,
  Session,
  SessionTransform,
  underlyingSessionTo,
  underlyingSessionTransform,
  wrapCondition,
  wrapSession
} from "@gatling.io/core";

import {
  JmsAttributesBuilder,
  JmsMessageBodyBuilder,
  jmsAttributesBuilderImpl,
  jmsMessageBodyBuilderImpl
} from "./common";
import { JmsDestination } from "./destination";
import { JmsMessage, wrapJmsMessage } from "./message";

import JvmJmsRequestReplyActionBuilder = io.gatling.javaapi.jms.JmsRequestReplyActionBuilder;
import JvmJmsRequestReplyActionBuilderMessage = io.gatling.javaapi.jms.JmsRequestReplyActionBuilder$Message;
import JvmJmsRequestReplyActionBuilderQueue = io.gatling.javaapi.jms.JmsRequestReplyActionBuilder$Queue;

export namespace JmsRequestReplyActionBuilder {
  /**
   * The step that defines the destination of the request
   */
  export interface Queue {
    /**
     * Send the request to a queue
     *
     * @param name - the name of the queue, expressed as a Gatling Expression Language String
     * @returns the next DSL step
     */
    queue(name: string): Message;

    /**
     * Send the request to a queue
     *
     * @param name - the name of the queue, expressed as a function
     * @returns the next DSL step
     */
    queue(name: (session: Session) => string): Message;

    /**
     * Send the request to a destination
     *
     * @param destination - the destination, see {@link queue} and {@link topic}
     * @returns the next DSL step
     */
    destination(destination: JmsDestination): Message;
  }

  export const wrapQueue = (_underlying: JvmJmsRequestReplyActionBuilderQueue): Queue => ({
    queue: (name: Expression<string>) =>
      wrapMessage(typeof name === "function" ? _underlying.queue(underlyingSessionTo(name)) : _underlying.queue(name)),
    destination: (destination: JmsDestination) => wrapMessage(_underlying.destination(destination._underlying))
  });

  /**
   * The step that defines where to wait for the reply, and the request
   */
  export interface Message extends JmsMessageBodyBuilder<JmsRequestReplyActionBuilder> {
    /**
     * Define the queue the reply is sent to, set as the JMSReplyTo of the request. Defaults to a
     * temporary queue.
     *
     * @param name - the name of the queue, expressed as a Gatling Expression Language String
     * @returns a new Message instance
     */
    replyQueue(name: string): Message;

    /**
     * Define the queue the reply is sent to, set as the JMSReplyTo of the request. Defaults to a
     * temporary queue.
     *
     * @param name - the name of the queue, expressed as a function
     * @returns a new Message instance
     */
    replyQueue(name: (session: Session) => string): Message;

    /**
     * Define the destination the reply is sent to, set as the JMSReplyTo of the request. Defaults
     * to a temporary queue.
     *
     * @param destination - the destination, see {@link queue} and {@link topic}
     * @returns a new Message instance
     */
    replyDestination(destination: JmsDestination): Message;

    /**
     * Don't set the JMSReplyTo of the request, when the system under test knows where to reply
     *
     * @returns a new Message instance
     */
    noJmsReplyTo(): Message;

    /**
     * Wait for the reply on a queue that's different from the one set as the JMSReplyTo of the
     * request
     *
     * @param name - the name of the queue, expressed as a Gatling Expression Language String
     * @returns a new Message instance
     */
    trackerQueue(name: string): Message;

    /**
     * Wait for the reply on a queue that's different from the one set as the JMSReplyTo of the
     * request
     *
     * @param name - the name of the queue, expressed as a function
     * @returns a new Message instance
     */
    trackerQueue(name: (session: Session) => string): Message;

    /**
     * Wait for the reply on a destination that's different from the one set as the JMSReplyTo of
     * the request
     *
     * @param destination - the destination, see {@link queue} and {@link topic}
     * @returns a new Message instance
     */
    trackerDestination(destination: JmsDestination): Message;

    /**
     * Only consider the messages matching a JMS message selector when waiting for the reply
     *
     * @param selector - the selector, expressed as a Gatling Expression Language String
     * @returns a new Message instance
     */
    selector(selector: string): Message;

    /**
     * Only consider the messages matching a JMS message selector when waiting for the reply
     *
     * @param selector - the selector, expressed as a function
     * @returns a new Message instance
     */
    selector(selector: (session: Session) => string): Message;
  }

  const wrapMessage = (_underlying: JvmJmsRequestReplyActionBuilderMessage): Message => ({
    ...jmsMessageBodyBuilderImpl(_underlying, wrapJmsRequestReplyActionBuilder),
    replyQueue: (name: Expression<string>) =>
      wrapMessage(
        typeof name === "function" ? _underlying.replyQueue(underlyingSessionTo(name)) : _underlying.replyQueue(name)
      ),
    replyDestination: (destination: JmsDestination) =>
      wrapMessage(_underlying.replyDestination(destination._underlying)),
    noJmsReplyTo: () => wrapMessage(_underlying.noJmsReplyTo()),
    trackerQueue: (name: Expression<string>) =>
      wrapMessage(
        typeof name === "function"
          ? _underlying.trackerQueue(underlyingSessionTo(name))
          : _underlying.trackerQueue(name)
      ),
    trackerDestination: (destination: JmsDestination) =>
      wrapMessage(_underlying.trackerDestination(destination._underlying)),
    selector: (selector: Expression<string>) =>
      wrapMessage(
        typeof selector === "function"
          ? _underlying.selector(underlyingSessionTo(selector))
          : _underlying.selector(selector)
      )
  });
}

/**
 * DSL for actions that send a request and wait for its reply, timed until the reply is received
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface JmsRequestReplyActionBuilder
  extends ActionBuilder, JmsAttributesBuilder<JmsRequestReplyActionBuilder> {
  /**
   * Apply checks on the reply
   *
   * @param checks - the checks
   * @returns a new ActionBuilder instance
   */
  check(...checks: CheckBuilder[]): JmsRequestReplyActionBuilder;

  /**
   * Apply checks on the reply only if some condition holds true
   *
   * @param condition - the condition, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  checkIf(condition: string): Condition<JmsRequestReplyActionBuilder>;

  /**
   * Apply checks on the reply only if some condition holds true
   *
   * @param condition - the condition, expressed as a function that's aware of the Session and,
   *     optionally, of the reply: `(session) => …` or `(session, message) => …`
   * @returns the next DSL step
   */
  checkIf(condition: (session: Session, message: JmsMessage) => boolean): Condition<JmsRequestReplyActionBuilder>;

  /**
   * Apply a function on the Session resulting from the checks, after they've been applied. Throw an
   * Error to make the check fail with its message.
   *
   * @param postCheck - the function
   * @returns a new ActionBuilder instance
   */
  postCheck(postCheck: SessionTransform): JmsRequestReplyActionBuilder;
}

const wrapJmsRequestReplyActionBuilder = (
  _underlying: JvmJmsRequestReplyActionBuilder
): JmsRequestReplyActionBuilder => ({
  _underlying,
  ...jmsAttributesBuilderImpl(_underlying, wrapJmsRequestReplyActionBuilder),
  check: (...checks: CheckBuilder[]) =>
    wrapJmsRequestReplyActionBuilder(_underlying.check(...checks.map((check) => check._underlying))),
  checkIf: (
    condition: string | ((session: Session, message: JmsMessage) => boolean)
  ): Condition<JmsRequestReplyActionBuilder> =>
    wrapCondition<JvmJmsRequestReplyActionBuilder, JmsRequestReplyActionBuilder>(
      typeof condition === "string"
        ? _underlying.checkIf(condition)
        : // always the reply-aware variant, so a Session-only function simply ignores the reply
          // a JS function converts to both Function and BiFunction, and GraalJS picks Function: select the overload explicitly
          (_underlying as any)["checkIf(java.util.function.BiFunction)"](
            (message: any, session: io.gatling.javaapi.core.Session) =>
              condition(wrapSession(session), wrapJmsMessage(message))
          ),
      wrapJmsRequestReplyActionBuilder
    ),
  postCheck: (postCheck: SessionTransform) =>
    wrapJmsRequestReplyActionBuilder(_underlying.postCheck(underlyingSessionTransform(postCheck)))
});
