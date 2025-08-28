import {
  ByteArrayBody,
  ElFileBody,
  PebbleFileBody,
  RawFileBody,
  Session,
  Simulation,
  StringBody,
  atOnceUsers,
  bodyBytes,
  bodyString,
  jmesPath,
  jsonPath,
  regex,
  scenario
} from "@gatling.io/core";

import { LastWill, mqtt } from "./index";

const runSimulationMock = (_: Simulation): void => {};

const mqttProtocol = mqtt
  .broker("localhost", 1883)
  .useTls(false)
  //.perUserKeyManagerFactory(
  //  session -> {
  //    try {
  //      return KeyManagerFactory.getInstance("TLS");
  //    } catch (NoSuchAlgorithmException e) {
  //      throw new RuntimeException(e);
  //    }
  //  })
  .clientId("#{clientId}")
  .cleanSession(true)
  .credentials("#{userName}", "#{password}")
  .keepAlive(30)
  // default QoS
  .qosAtMostOnce()
  .qosAtLeastOnce()
  .qosExactlyOnce()
  // default retain
  .retain(true)
  .lastWill(LastWill("#{willTopic}", StringBody("#{willMessage}")).qosAtLeastOnce().retain(true))
  .lastWill(LastWill("#{willTopic}", ByteArrayBody([0])))
  .lastWill(LastWill("#{willTopic}", RawFileBody("file")))
  .mqttVersion_3_1()
  .mqttVersion_3_1_1()
  .mqttVersion_5()
  .reconnectAttemptsMax(1)
  .reconnectBackoffMultiplier(1.2) // FIXME float
  .reconnectDelay(1)
  .resendBackoffMultiplier(2.0) // FIXME float
  .resendDelay(1)
  .timeoutCheckInterval({ amount: 1, unit: "seconds" })
  .correlateBy(jsonPath("$.correlationId"))
  .correlateBy(jsonPath("$.correlationId").find())
  .correlateBy(regex("{correlationId=(.*)}.*"))
  .correlateBy(regex("{correlationId=(.*)}.*").find())
  .correlateBy(bodyString().transform((text) => text.substring(3)))
  .correlateBy(bodyBytes().transform((bytes) => bytes)) // FIXME new String(bytes, 0, 3, UTF_8)))
  .unmatchedInboundMessageBufferSize(10);

const scn = scenario("scenario");

scenario("MQTT Test").exec(
  mqtt("Connecting").connect(),
  mqtt("Subscribing").subscribe("#{myTopic}").qosAtMostOnce().qosAtLeastOnce().qosExactlyOnce(),
  mqtt("Subscribing").subscribe("#{myTopic2}").await({ amount: 100, unit: "milliseconds" }),
  mqtt("Subscribing").subscribe("#{myTopic2}").await(1).check(jsonPath("$.error").notExists()),
  mqtt("Subscribing").subscribe("#{myTopic2}").await({ amount: 100, unit: "milliseconds" }),
  mqtt("Subscribing").subscribe("#{myTopic2}").expect(1).check(jsonPath("$.error").notExists()),
  mqtt("Publishing")
    .publish("#{myTopic}")
    .message(StringBody("#{myTextPayload}"))
    .qosAtMostOnce()
    .qosAtLeastOnce()
    .qosExactlyOnce(),
  mqtt("Publishing").publish("#{myTopic}").message(ElFileBody("file")),
  mqtt("Publishing").publish("#{myTopic}").message(PebbleFileBody("file")),
  mqtt("Publishing").publish("#{myTopic}").message(ByteArrayBody("#{myBinaryPayload}")),
  mqtt("Publishing").publish("#{myTopic}").message(RawFileBody("file")),
  mqtt("Publishing")
    .publish("#{myTopic}")
    .message(StringBody("#{myPayload}"))
    .await({ amount: 100, unit: "milliseconds" }),
  mqtt("Publishing")
    .publish("#{myTopic}")
    .message(StringBody("#{myPayload}"))
    .await({ amount: 100, unit: "milliseconds" })
    .check(jsonPath("$.error").notExists()),
  mqtt("Publishing")
    .publish("#{myTopic}")
    .message(StringBody("#{myPayload}"))
    .await({ amount: 100, unit: "milliseconds" }),
  mqtt("Publishing")
    .publish("#{myTopic}")
    .message(StringBody("#{myPayload}"))
    .expect({ amount: 100, unit: "milliseconds" }, "repub/#{myTopic}"),
  mqtt("Publishing")
    .publish("#{myTopic}")
    .message(StringBody("#{myPayload}"))
    .await({ amount: 100, unit: "milliseconds" })
    .check(
      jsonPath("$.error").notExists(),
      jmesPath("error").notExists(),
      bodyString().is(""),
      bodyBytes().is([102, 111, 111]) // FIXME "foo".getBytes(UTF_8)
    ),
  //bodyStream()
  //  .transform(
  //    is -> {
  //      try {
  //        return is.readAllBytes();
  //      } catch (IOException e) {
  //        throw new RuntimeException(e);
  //      }
  //    })),
  mqtt.waitForMessages().timeout({ amount: 100, unit: "milliseconds" }),
  mqtt.processUnmatchedMessages("topic", (messages, session: Session) =>
    messages.length > 0 ? session.set("lastMessage", messages[messages.length - 1].payloadUtf8String()) : session
  )
);

runSimulationMock((setUp) => {
  setUp(scn.injectOpen(atOnceUsers(1)).protocols(mqttProtocol)).protocols(mqttProtocol);
});
