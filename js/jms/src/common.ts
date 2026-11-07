import {
  Duration,
  Expression,
  Session,
  SessionTo,
  Wrapper,
  asByteArray,
  asByteArrayFunction,
  asJava,
  toJvmDuration,
  underlyingSessionTo,
  underlyingSessionToDuration,
  underlyingSessionToJava
} from "@gatling.io/core";

/**
 * Methods shared by the steps that define the message to send
 *
 * @typeParam T - the type of the next DSL step
 */
export interface JmsMessageBodyBuilder<T> {
  /**
   * Send a text message
   *
   * @param message - the text, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  textMessage(message: string): T;

  /**
   * Send a text message
   *
   * @param message - the text, expressed as a function, or a body such as ElFileBody
   * @returns the next DSL step
   */
  textMessage(message: (session: Session) => string): T;

  /**
   * Send a bytes message
   *
   * @param message - the bytes
   * @returns the next DSL step
   */
  bytesMessage(message: number[]): T;

  /**
   * Send a bytes message
   *
   * @param message - the bytes, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  bytesMessage(message: string): T;

  /**
   * Send a bytes message
   *
   * @param message - the bytes, expressed as a function, or a body such as RawFileBody
   * @returns the next DSL step
   */
  bytesMessage(message: (session: Session) => number[]): T;

  // the function overloads come first: a function is also a Record<string, any>, which would capture it before its
  // parameters get typed

  /**
   * Send a map message. Values must be strings, numbers or booleans: integral numbers are sent as
   * ints (longs beyond the int range), other numbers as doubles.
   *
   * @param message - the entries of the map, expressed as a function
   * @returns the next DSL step
   */
  mapMessage(message: (session: Session) => Record<string, any>): T;

  /**
   * Send a map message. Values must be strings, numbers or booleans: integral numbers are sent as
   * ints (longs beyond the int range), other numbers as doubles.
   *
   * @param message - the entries of the map
   * @returns the next DSL step
   */
  mapMessage(message: Record<string, any>): T;

  /**
   * Send a map message
   *
   * @param message - the entries of the map, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  mapMessage(message: string): T;

  /**
   * Send an object message, whose body is a serialized Java object: strings, numbers and booleans,
   * arrays as java.util.ArrayList, objects as java.util.HashMap
   *
   * @param message - the object, expressed as a function
   * @returns the next DSL step
   */
  objectMessage(message: (session: Session) => unknown): T;

  /**
   * Send an object message, whose body is a serialized Java object: numbers and booleans, arrays as
   * java.util.ArrayList, objects as java.util.HashMap. Strings take the Gatling Expression Language
   * overload.
   *
   * @param message - the object
   * @returns the next DSL step
   */
  objectMessage(message: number | boolean | unknown[] | Record<string, any>): T;

  /**
   * Send an object message, whose body is a serialized Java object. The string is a Gatling
   * Expression Language String: a lone "#{attribute}" sends the value of the Session attribute as
   * is, which must be serializable, any other string is sent as a java.lang.String once resolved. To
   * always send a string, use the function overload.
   *
   * @param message - the object, expressed as a Gatling Expression Language String
   * @returns the next DSL step
   */
  objectMessage(message: string): T;
}

interface JvmJmsMessageBodyBuilder<J> {
  textMessage(message: any): J;
  bytesMessage(message: any): J;
  mapMessage(message: any): J;
  objectMessage(message: any): J;
}

// Bodies are functions too, so look for a wrapped JVM object first
const isWrapper = (value: unknown): value is Wrapper<unknown> =>
  (typeof value === "object" || typeof value === "function") && value !== null && "_underlying" in value;

export const jmsMessageBodyBuilderImpl = <J, T>(
  _underlying: JvmJmsMessageBodyBuilder<J>,
  wrap: (underlying: J) => T
): JmsMessageBodyBuilder<T> => ({
  textMessage: (message: Expression<string>): T =>
    wrap(
      typeof message === "string"
        ? _underlying.textMessage(message)
        : isWrapper(message)
          ? _underlying.textMessage(message._underlying)
          : _underlying.textMessage(underlyingSessionTo(message))
    ),
  bytesMessage: (message: string | Expression<number[]>): T =>
    wrap(
      typeof message === "string"
        ? _underlying.bytesMessage(message)
        : isWrapper(message)
          ? _underlying.bytesMessage(message._underlying)
          : typeof message === "function"
            ? _underlying.bytesMessage(asByteArrayFunction(underlyingSessionTo(message)))
            : _underlying.bytesMessage(asByteArray(message))
    ),
  // a function is also an object, applicable to both mapMessage(Map) and mapMessage(Function), so select the overload
  // explicitly
  mapMessage: (message: string | Expression<Record<string, any>>): T =>
    wrap(
      typeof message === "string"
        ? _underlying.mapMessage(message)
        : typeof message === "function"
          ? (_underlying as any)["mapMessage(java.util.function.Function)"](
              underlyingSessionToJava(message as SessionTo<Record<string, any>>)
            )
          : _underlying.mapMessage(asJava(message))
    ),
  // a String is also a Serializable, and so is a function as an interface without methods, so select the overload
  // explicitly
  objectMessage: (message: string | number | boolean | unknown[] | Record<string, any> | SessionTo<unknown>): T =>
    wrap(
      typeof message === "string"
        ? (_underlying as any)["objectMessage(java.lang.String)"](message)
        : typeof message === "function"
          ? (_underlying as any)["objectMessage(java.util.function.Function)"](
              underlyingSessionToJava(message as SessionTo<unknown>)
            )
          : (_underlying as any)["objectMessage(java.io.Serializable)"](asJava(message))
    )
});

/**
 * Methods shared by the DSLs for building actions that send a message
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 *
 * @typeParam T - the type of the builder
 */
export interface JmsAttributesBuilder<T> {
  /**
   * Set a property of the message
   *
   * @param key - the property key, expressed as a Gatling Expression Language String
   * @param value - the property value, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  property(key: string, value: string): T;

  /**
   * Set a property of the message
   *
   * @param key - the property key, expressed as a function
   * @param value - the property value, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  property(key: (session: Session) => string, value: string): T;

  /**
   * Set a property of the message. Integral numbers are sent as ints (longs beyond the int range),
   * other numbers as doubles: send a string if the receiver must always read a double.
   *
   * @param key - the property key, expressed as a Gatling Expression Language String
   * @param value - the property value, a string, a number or a boolean, expressed as a function
   * @returns a new ActionBuilder instance
   */
  property(key: string, value: (session: Session) => string | number | boolean): T;

  /**
   * Set a property of the message. Integral numbers are sent as ints (longs beyond the int range),
   * other numbers as doubles: send a string if the receiver must always read a double.
   *
   * @param key - the property key, expressed as a function
   * @param value - the property value, a string, a number or a boolean, expressed as a function
   * @returns a new ActionBuilder instance
   */
  property(key: (session: Session) => string, value: (session: Session) => string | number | boolean): T;

  /**
   * Set the JMSType of the message
   *
   * @param jmsType - the JMS type, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  jmsType(jmsType: string): T;

  /**
   * Set the JMSType of the message
   *
   * @param jmsType - the JMS type, expressed as a function
   * @returns a new ActionBuilder instance
   */
  jmsType(jmsType: (session: Session) => string): T;

  /**
   * Set the JMSCorrelationID of the message. When the protocol matches replies by correlation id,
   * it's used instead of a random one, so it must be unique among the requests waiting for their
   * reply.
   *
   * @param correlationId - the correlation id, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  correlationId(correlationId: string): T;

  /**
   * Set the JMSCorrelationID of the message. When the protocol matches replies by correlation id,
   * it's used instead of a random one, so it must be unique among the requests waiting for their
   * reply.
   *
   * @param correlationId - the correlation id, expressed as a function
   * @returns a new ActionBuilder instance
   */
  correlationId(correlationId: (session: Session) => string): T;

  /**
   * Set the JMS priority of the message
   *
   * @param priority - the priority, from 0 (lowest) to 9 (highest)
   * @returns a new ActionBuilder instance
   */
  priority(priority: number): T;

  /**
   * Set the JMS priority of the message
   *
   * @param priority - the priority, from 0 (lowest) to 9 (highest), expressed as a Gatling
   *     Expression Language String
   * @returns a new ActionBuilder instance
   */
  priority(priority: string): T;

  /**
   * Set the JMS priority of the message
   *
   * @param priority - the priority, from 0 (lowest) to 9 (highest), expressed as a function
   * @returns a new ActionBuilder instance
   */
  priority(priority: (session: Session) => number): T;

  /**
   * Set the time to live of the message, after which the JMS provider expires it
   *
   * @param timeToLive - the time to live
   * @returns a new ActionBuilder instance
   */
  timeToLive(timeToLive: Duration): T;

  /**
   * Set the time to live of the message, after which the JMS provider expires it
   *
   * @param timeToLive - the time to live, expressed as a Gatling Expression Language String
   * @returns a new ActionBuilder instance
   */
  timeToLive(timeToLive: string): T;

  /**
   * Set the time to live of the message, after which the JMS provider expires it
   *
   * @param timeToLive - the time to live, expressed as a function
   * @returns a new ActionBuilder instance
   */
  timeToLive(timeToLive: (session: Session) => Duration): T;
}

interface JvmJmsAttributesBuilder<J> {
  property(key: any, value: any): J;
  jmsType(jmsType: any): J;
  correlationId(correlationId: any): J;
  priority(priority: any): J;
  timeToLive(timeToLive: any): J;
}

export const jmsAttributesBuilderImpl = <J, T>(
  _underlying: JvmJmsAttributesBuilder<J>,
  wrap: (underlying: J) => T
): JmsAttributesBuilder<T> => ({
  property: (key: Expression<string>, value: string | SessionTo<string | number | boolean>): T =>
    wrap(
      _underlying.property(
        typeof key === "function" ? underlyingSessionTo(key) : key,
        typeof value === "function" ? underlyingSessionTo(value) : value
      )
    ),
  jmsType: (jmsType: Expression<string>): T =>
    wrap(_underlying.jmsType(typeof jmsType === "function" ? underlyingSessionTo(jmsType) : jmsType)),
  correlationId: (correlationId: Expression<string>): T =>
    wrap(
      _underlying.correlationId(
        typeof correlationId === "function" ? underlyingSessionTo(correlationId) : correlationId
      )
    ),
  priority: (priority: Expression<number> | string): T =>
    wrap(_underlying.priority(typeof priority === "function" ? underlyingSessionTo(priority) : priority)),
  timeToLive: (timeToLive: Expression<Duration> | string): T =>
    wrap(
      _underlying.timeToLive(
        typeof timeToLive === "function"
          ? underlyingSessionToDuration(timeToLive)
          : typeof timeToLive === "string"
            ? timeToLive
            : toJvmDuration(timeToLive)
      )
    )
});
