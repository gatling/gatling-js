import { atOnceUsers, bodyLength, bodyString, global, jsonPath, scenario, simulation } from "@gatling.io/core";
import { jms, jmsJndiConnectionFactory, jmsProperty } from "@gatling.io/jms";
import * as uuid from "uuid";

export default simulation((setUp) => {
  // Runs against an ActiveMQ Artemis broker on localhost:61616 that creates queues on first use, for example:
  // docker run -d -p 61616:61616 apache/activemq-artemis
  // Its JMS client is declared in the "gatling.jvmDependencies" section of package.json
  const jmsProtocol = jms
    .connectionFactory(
      jmsJndiConnectionFactory
        .connectionFactoryName("ConnectionFactory")
        .url("tcp://localhost:61616")
        .contextFactory("org.apache.activemq.artemis.jndi.ActiveMQInitialContextFactory")
    )
    .credentials("artemis", "artemis")
    // replies are matched to the request waiting for them by their JMSCorrelationID
    .matchByCorrelationId()
    .replyTimeout(10);

  const scn = scenario("Orders")
    .exec((session) => session.set("orderId", uuid.v4()))
    .exec(
      // fire and forget: reported as OK, with a 0 ms response time, when handed to the JMS client
      jms("Send order")
        .send()
        .queue("gatling-jms-demo-orders")
        .textMessage('{"orderId":"#{orderId}","amount":42}')
        .property("source", "gatling"),
      // the request is sent to the queue it waits for its reply on, so it's its own reply:
      // timed until it's read back, the round trip through the broker
      jms("Echo order")
        .requestReply()
        .queue("gatling-jms-demo-echo")
        .replyQueue("gatling-jms-demo-echo")
        .textMessage('{"orderId":"#{orderId}","amount":42}')
        .property("source", "gatling")
        .correlationId("#{orderId}")
        .check(jsonPath("$.orderId").isEL("#{orderId}"), jmsProperty("source").is("gatling")),
      // the same with a bytes message, here the ASCII bytes of the order id, that the body checks read as a string
      jms("Echo order id bytes")
        .requestReply()
        .queue("gatling-jms-demo-echo")
        .replyQueue("gatling-jms-demo-echo")
        .bytesMessage((session) => Array.from(session.get<string>("orderId"), (char) => char.charCodeAt(0)))
        .correlationId("#{orderId}")
        .check(bodyString().isEL("#{orderId}"), bodyLength().is(36))
    );

  setUp(scn.injectOpen(atOnceUsers(5)))
    .assertions(global().failedRequests().count().is(0))
    .protocols(jmsProtocol);
});
