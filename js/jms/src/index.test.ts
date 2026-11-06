import {
  ByteArrayBody,
  ElFileBody,
  RawFileBody,
  Session,
  Simulation,
  StringBody,
  atOnceUsers,
  bodyBytes,
  bodyLength,
  bodyString,
  jmesPath,
  jsonPath,
  scenario,
  substring,
  xpath
} from "@gatling.io/core";

import {
  JmsMessage,
  JmsMessageMatcher,
  jms,
  jmsJndiConnectionFactory,
  jmsProperty,
  queue,
  simpleCheck,
  temporaryQueue,
  temporaryTopic,
  topic
} from "./index";

const runSimulationMock = (_: Simulation): void => {};

const headerMatcher: JmsMessageMatcher = {
  requestMatchId: (message) => message.property("header") as string,
  responseMatchId: (message) => message.property("header") as string
};

const messageIdMatcher: JmsMessageMatcher = {
  requestMatchId: (message) => message.messageId(),
  responseMatchId: (message) => message.correlationId()
};

const jmsProtocol = jms
  .connectionFactory(
    jmsJndiConnectionFactory
      .connectionFactoryName("ConnectionFactory")
      .url("tcp://localhost:10002")
      .credentials("user", "secret")
      .property("foo", "bar")
      .contextFactory("org.apache.activemq.artemis.jndi.ActiveMQInitialContextFactory")
  )
  .credentials("user", "secret")
  .usePersistentDeliveryMode()
  .useNonPersistentDeliveryMode()
  .replyTimeout(1)
  .replyTimeout({ amount: 500, unit: "milliseconds" })
  .listenerThreadCount(2)
  .messageMatcher(headerMatcher)
  .messageMatcher(messageIdMatcher)
  .matchByCorrelationId()
  .matchByMessageId();

const scn = scenario("scn")
  // requestReply
  // textMessage
  .exec(jms("req").requestReply().queue("queue").textMessage("hello"))
  .exec(
    jms((session) => "req")
      .requestReply()
      .queue((session) => "queue")
      .textMessage((session) => "hello")
  )
  // textMessage with ElFileBody
  .exec(jms("req").requestReply().queue("queue").textMessage(ElFileBody("file")))
  .exec(jms("req").requestReply().queue("queue").textMessage(StringBody("#{foo}")))
  // bytesMessage
  .exec(jms("req").requestReply().queue("queue").bytesMessage([1]))
  .exec(jms("req").requestReply().queue("queue").bytesMessage("#{bytes}"))
  .exec(
    jms("req")
      .requestReply()
      .queue("queue")
      .bytesMessage((session) => [1])
  )
  // bytesMessage with RawFileBody
  .exec(jms("req").requestReply().queue("queue").bytesMessage(RawFileBody("file")))
  .exec(
    jms("req")
      .requestReply()
      .queue("queue")
      .bytesMessage(ByteArrayBody([1]))
  )
  // mapMessage
  .exec(jms("req").requestReply().queue("queue").mapMessage({ key: "value" }))
  .exec(jms("req").requestReply().queue("queue").mapMessage("#{map}"))
  .exec(
    jms("req")
      .requestReply()
      .queue("queue")
      .mapMessage((session) => ({ key: "value" }))
  )
  // objectMessage
  .exec(jms("req").requestReply().queue("queue").objectMessage("hello"))
  .exec(jms("req").requestReply().queue("queue").objectMessage(42))
  .exec(
    jms("req")
      .requestReply()
      .queue("queue")
      .objectMessage({ key: [1, 2] })
  )
  .exec(
    jms("req")
      .requestReply()
      .queue("queue")
      .objectMessage((session) => ({ key: "value" }))
  )
  // destination
  .exec(
    jms("req")
      .requestReply()
      .destination(topic("topic"))
      .noJmsReplyTo()
      .replyDestination(queue("queue"))
      .replyDestination(temporaryQueue)
      .replyDestination(temporaryTopic)
      .replyQueue("queue")
      .replyQueue((session) => "queue")
      .trackerQueue("queue")
      .trackerQueue((session) => "queue")
      .trackerDestination(topic((session) => "topic"))
      .selector("selector")
      .selector((session) => "selector")
      .textMessage("hello")
  )
  // check
  .exec(
    jms("req")
      .requestReply()
      .queue("queue")
      .textMessage("hello")
      .check(simpleCheck((message) => message.text() === "hello"))
      .check(xpath("//TEST").saveAs("name"))
      .check(jsonPath("$.foo"))
      .check(jmesPath("[].foo"))
      .check(substring("foo"))
      .check(bodyLength().lte(50))
      .check(
        bodyBytes()
          .transform((bytes) => bytes.length)
          .lte(50)
      )
      .check(bodyString())
      .check(bodyString().is("hello"), substring("he").count().is(1))
      .check(jmsProperty("header").is("foo"))
      .check(jmsProperty("header").ofString().is("foo"))
      .check(jmsProperty("header").ofInt().is(1))
      .check(jmsProperty("header").ofLong().gt(1))
      .check(jmsProperty("header").ofDouble().lt(1.5))
      .check(jmsProperty("header").ofBoolean().is(true))
      .check(jmsProperty("header").ofObject().exists())
      .checkIf("#{bool}")
      .then(jsonPath("$..foo"))
      .checkIf((session) => session.contains("bool"))
      .then(jsonPath("$..foo"))
      .checkIf(
        (message: JmsMessage, session: Session) =>
          message.messageId() !== null &&
          message.correlationId() !== null &&
          message.type() !== null &&
          message.priority() > 0 &&
          message.timestamp() > 0 &&
          message.expiration() >= 0 &&
          message.deliveryMode() === "PERSISTENT" &&
          !message.redelivered() &&
          message.propertyNames().includes("header") &&
          message.property("header") === "foo"
      )
      .then(jsonPath("$").is("hello"))
      .postCheck((session) => {
        if (!session.contains("foo")) {
          throw Error("foo is missing");
        }
        return session.set("bar", 1);
      })
  )
  // extra
  .exec(
    jms("req")
      .requestReply()
      .queue("queue")
      .textMessage("hello")
      .property("header", "value")
      .property("header", "#{value}")
      .property("header", (session) => "value")
      .property("header", (session) => 1)
      .property((session) => "header", "value")
      .property(
        (session) => "header",
        (session) => true
      )
      .jmsType("foo")
      .jmsType((session) => "foo")
      .correlationId("#{correlationId}")
      .correlationId((session) => "bar")
      .priority(9)
      .priority("#{priority}")
      .priority((session) => 9)
      .timeToLive(10)
      .timeToLive({ amount: 10, unit: "seconds" })
      .timeToLive("#{ttl}")
      .timeToLive((session) => ({ amount: 10, unit: "seconds" }))
  )

  // send
  // textMessage
  .exec(jms("req").send().queue("queue").textMessage("hello"))
  .exec(
    jms("req")
      .send()
      .queue((session) => "queue")
      .textMessage(ElFileBody("file"))
  )
  // bytesMessage
  .exec(jms("req").send().queue("queue").bytesMessage([1]))
  .exec(jms("req").send().queue("queue").bytesMessage(RawFileBody("file")))
  // objectMessage
  .exec(jms("req").send().queue("queue").objectMessage("hello"))
  .exec(jms("req").send().queue("queue").objectMessage(true))
  .exec(jms("req").send().destination(temporaryQueue).textMessage("hello"))
  .exec(
    jms("req")
      .send()
      .queue("queue")
      .objectMessage((session) => 1)
  )
  // mapMessage
  .exec(jms("req").send().queue("queue").mapMessage({ key: "value" }))
  // destination: topic
  .exec(jms("req").send().destination(topic("topic")).textMessage("hello"))
  // destination: queue
  .exec(jms("req").send().destination(queue("queue")).textMessage("hello"))
  // extra
  .exec(
    jms("req")
      .send()
      .queue("queue")
      .textMessage("hello")
      .property("header", "value")
      .property("header", "#{value}")
      .property("header", (session) => "value")
      .jmsType("foo")
      .correlationId("#{correlationId}")
      .correlationId((session) => "bar")
      .priority(9)
      .priority("#{priority}")
      .priority((session) => 9)
      .timeToLive(10)
      .timeToLive({ amount: 10, unit: "seconds" })
      .timeToLive("#{ttl}")
      .timeToLive((session) => 10)
  );

runSimulationMock((setUp) => {
  setUp(scn.injectOpen(atOnceUsers(1))).protocols(jmsProtocol);
});
