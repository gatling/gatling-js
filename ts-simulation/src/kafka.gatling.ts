import { StringBody, atOnceUsers, global, jsonPath, scenario, simulation } from "@gatling.io/core";
import { kafka, kafkaKey } from "@gatling.io/kafka";
import * as uuid from "uuid";

export default simulation((setUp) => {
  // Runs against a Kafka broker on localhost:9092 that creates topics on first use, for example:
  // docker run -d -p 9092:9092 apache/kafka
  const kafkaProtocol = kafka
    .bootstrapServers("localhost:9092")
    .producerProperty("acks", "all")
    // records are matched to the virtual user waiting for them by their key
    .matchByKey()
    .replyTimeout(10);

  const topic = "gatling-kafka-demo";

  const scn = scenario("Orders")
    .exec((session) => session.set("orderId", uuid.v4()).set("sentAt", Date.now()))
    .exec(
      // timed until the broker acknowledges the record
      kafka("Send order")
        .send(topic)
        .value(StringBody('{"orderId":"#{orderId}","amount":42}'))
        .key("#{orderId}")
        .header("source", "gatling"),
      // timed from sentAt until the record is read back: the end-to-end latency through the broker
      kafka("Read order")
        .consume(topic)
        .correlationId("#{orderId}")
        .startTimestampFrom("sentAt")
        .check(kafkaKey().isEL("#{orderId}"), jsonPath("$.amount").ofInt().is(42))
    );

  setUp(scn.injectOpen(atOnceUsers(5)))
    .assertions(global().failedRequests().count().is(0))
    .protocols(kafkaProtocol);
});
