import { atOnceUsers, jmesPath, pause, scenario, simulation, StringBody } from "@gatling.io/core";
import { mqtt } from "@gatling.io/mqtt";
import * as uuid from "uuid";

export default simulation((setUp) => {
  // Example using HiveMQ's free public MQTT broker: https://www.hivemq.com/mqtt/public-mqtt-broker/
  const baseMqttProtocol = mqtt
    .broker("broker.hivemq.com", 8883)
    .correlateBy(jmesPath("id"))
    .unmatchedInboundMessageBufferSize(6)
    .useTls(true);

  const topic = "gatling-mqtt-demo/" + uuid.v4();

  const scn = scenario("Publisher")
    .exec((session) => session.set("id", uuid.v4()))
    .exec(
      mqtt("Connecting").connect(),
      mqtt("Subscribing").subscribe(topic),
      mqtt("Publishing")
        .publish(topic)
        .message(StringBody('{"id":"#{id}","message":"Hello from #{id}"}'))
        .await({ amount: 1, unit: "seconds" })
        .check(jmesPath("message").isEL("Hello from #{id}"))
    );

  setUp(scn.injectOpen(atOnceUsers(5))).protocols(baseMqttProtocol);
});
