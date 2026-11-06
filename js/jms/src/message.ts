/**
 * The JMS delivery mode of a message
 */
export type JmsDeliveryMode = "PERSISTENT" | "NON_PERSISTENT";

/**
 * A read-only view of a JMS message
 */
export interface JmsMessage {
  /**
   * @returns the JMSMessageID header, assigned by the JMS provider when sending
   */
  messageId(): string | null;

  /**
   * @returns the JMSCorrelationID header
   */
  correlationId(): string | null;

  /**
   * @returns the JMSType header
   */
  type(): string | null;

  /**
   * @returns the JMSPriority header, from 0 (lowest) to 9 (highest)
   */
  priority(): number;

  /**
   * @returns the JMSTimestamp header, when the message was handed off to the JMS provider, in
   *     milliseconds since the epoch
   */
  timestamp(): number;

  /**
   * @returns the JMSExpiration header, in milliseconds since the epoch, 0 if the message never
   *     expires
   */
  expiration(): number;

  /**
   * @returns the JMSDeliveryMode header
   */
  deliveryMode(): JmsDeliveryMode;

  /**
   * @returns the JMSRedelivered header
   */
  redelivered(): boolean;

  /**
   * @param name - the name of the property
   * @returns the value of the property, null if the message doesn't have it
   */
  property(name: string): string | number | boolean | null;

  /**
   * @returns the names of the properties of the message
   */
  propertyNames(): string[];

  /**
   * @returns the body of a text message, null for other kinds of messages
   */
  text(): string | null;
}

interface JvmEnumeration {
  hasMoreElements(): boolean;
  nextElement(): string;
}

interface JvmMessage {
  getJMSMessageID(): string | null;
  getJMSCorrelationID(): string | null;
  getJMSType(): string | null;
  getJMSPriority(): number;
  getJMSTimestamp(): number;
  getJMSExpiration(): number;
  getJMSDeliveryMode(): number;
  getJMSRedelivered(): boolean;
  getObjectProperty(name: string): string | number | boolean | null;
  getPropertyNames(): JvmEnumeration;
  getText(): string | null;
}

// jakarta.jms.DeliveryMode.PERSISTENT
const PERSISTENT = 2;

const JvmTextMessage = Java.type<any>("jakarta.jms.TextMessage");

export const wrapJmsMessage = (_underlying: JvmMessage): JmsMessage => ({
  messageId: () => _underlying.getJMSMessageID(),
  correlationId: () => _underlying.getJMSCorrelationID(),
  type: () => _underlying.getJMSType(),
  priority: () => _underlying.getJMSPriority(),
  timestamp: () => _underlying.getJMSTimestamp(),
  expiration: () => _underlying.getJMSExpiration(),
  deliveryMode: () => (_underlying.getJMSDeliveryMode() === PERSISTENT ? "PERSISTENT" : "NON_PERSISTENT"),
  redelivered: () => _underlying.getJMSRedelivered(),
  property: (name: string) => _underlying.getObjectProperty(name),
  propertyNames: () => {
    const names: string[] = [];
    const enumeration = _underlying.getPropertyNames();
    while (enumeration.hasMoreElements()) {
      names.push(enumeration.nextElement());
    }
    return names;
  },
  text: () => (_underlying instanceof JvmTextMessage ? _underlying.getText() : null)
});

/**
 * A custom strategy for matching the replies of request-reply actions with their requests: a reply
 * matches the request whose match id is equal to its own. A matcher can't modify the requests: set
 * what it reads with the action's correlationId() or property().
 */
export interface JmsMessageMatcher {
  /**
   * Compute the match id of a request. Called before sending it, when its JMSMessageID isn't set
   * yet: return null to be called again once it's sent.
   *
   * @param message - the request
   * @returns the match id, or null
   */
  requestMatchId(message: JmsMessage): string | null;

  /**
   * Compute the match id of a reply
   *
   * @param message - the reply
   * @returns the match id, or null if the message doesn't match any request
   */
  responseMatchId(message: JmsMessage): string | null;
}

export const toJvmJmsMessageMatcher = (matcher: JmsMessageMatcher): io.gatling.javaapi.jms.JmsMessageMatcher => ({
  // set the correlation id or properties of requests with the action's correlationId() and property()
  prepareRequest: (_: JvmMessage) => {},
  // Gatling handles null match ids, like those of its own matchByMessageId
  requestMatchId: (message: JvmMessage) => matcher.requestMatchId(wrapJmsMessage(message)) as string,
  responseMatchId: (message: JvmMessage) => matcher.responseMatchId(wrapJmsMessage(message)) as string
});
