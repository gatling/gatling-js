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
  .perUserKeyManagerFactory("keys/multi-alias.p12", "password")
  .perUserKeyManagerFactory("keys/multi-alias.p12")
  .clientId("#{clientId}")
  .cleanSession(true)
  .credentials("#{userName}", "#{password}")
  .keepAlive(30)
  .subscribeTimeout(5)
  .subscribeTimeout({ amount: 5, unit: "seconds" })
  // default QoS
  .qosAtMostOnce()
  .qosAtLeastOnce()
  .qosExactlyOnce()
  // default retain
  .retain(true)
  .lastWill(LastWill("#{willTopic}", StringBody("#{willMessage}")).qosAtLeastOnce().retain(true))
  .lastWill(LastWill("#{willTopic}", ByteArrayBody([0])))
  .lastWill(LastWill("#{willTopic}", RawFileBody("file")))
  .lastWill(
    LastWill("#{willTopic}", StringBody("#{willMessage}"))
      .userProperty("#{propName}", "#{propValue}")
      .userProperty((session) => session.get<string>("propName"), "#{propValue}")
      .userProperty("#{propName}", (session) => session.get<string>("propValue"))
      .userProperty(
        (session) => session.get<string>("propName"),
        (session) => session.get<string>("propValue")
      )
      .contentType("application/json")
      .contentType((session) => session.get<string>("contentType"))
      .responseTopic("#{responseTopic}")
      .responseTopic((session) => session.get<string>("responseTopic"))
      .correlationData("#{correlationData}")
      .correlationData((session) => session.get<string>("correlationData"))
      .correlationDataBytes([1, 2, 3])
      .correlationDataBytes((session) => [1, 2, 3])
      .messageExpiryInterval(60)
      .messageExpiryInterval({ amount: 1, unit: "minutes" })
      .payloadFormatUtf8()
      .delayInterval(5)
      .delayInterval({ amount: 5, unit: "seconds" })
  )
  .mqttVersion_3_1()
  .mqttVersion_3_1_1()
  .mqttVersion_5()
  .reconnectAttemptsMax(1)
  .reconnectBackoffMultiplier(1.2) // FIXME float
  .reconnectDelay(1)
  .resendBackoffMultiplier(2.0) // FIXME float
  .resendDelay(1)
  .resendAttemptsMax(5)
  .timeoutCheckInterval({ amount: 1, unit: "seconds" })
  .correlateBy(jsonPath("$.correlationId"))
  .correlateBy(jsonPath("$.correlationId").find())
  .correlateBy(regex("{correlationId=(.*)}.*"))
  .correlateBy(regex("{correlationId=(.*)}.*").find())
  .correlateBy(bodyString().transform((text) => text.substring(3)))
  .correlateBy(bodyBytes().transform((bytes) => bytes)) // FIXME new String(bytes, 0, 3, UTF_8)))
  .unmatchedInboundMessageBufferSize(10)
  .sessionExpiryInterval(60)
  .sessionExpiryInterval({ amount: 1, unit: "hours" })
  .connectUserProperty("#{propName}", "#{propValue}")
  .connectUserProperty((session) => session.get<string>("propName"), "#{propValue}")
  .connectUserProperty("#{propName}", (session) => session.get<string>("propValue"))
  .connectUserProperty(
    (session) => session.get<string>("propName"),
    (session) => session.get<string>("propValue")
  )
  .publishUserProperty("#{propName}", "#{propValue}")
  .publishUserProperty((session) => session.get<string>("propName"), "#{propValue}")
  .publishUserProperty("#{propName}", (session) => session.get<string>("propValue"))
  .publishUserProperty(
    (session) => session.get<string>("propName"),
    (session) => session.get<string>("propValue")
  )
  .correlateByCorrelationData();

const scn = scenario("scenario");

scenario("MQTT Test").exec(
  mqtt("Connecting").connect(),
  mqtt("Subscribing").subscribe("#{myTopic}").qosAtMostOnce().qosAtLeastOnce().qosExactlyOnce(),
  mqtt("Subscribing").subscribe("#{myTopic2}").await({ amount: 100, unit: "milliseconds" }),
  mqtt("Subscribing").subscribe("#{myTopic2}").await(1).check(jsonPath("$.error").notExists()),
  mqtt("Subscribing").subscribe("#{myTopic2}").await({ amount: 100, unit: "milliseconds" }),
  mqtt("Subscribing").subscribe("#{myTopic2}").expect(1).check(jsonPath("$.error").notExists()),
  mqtt("Subscribing")
    .subscribe("$share/group/#{myTopic}")
    .noLocal()
    .retainAsPublished()
    .retainHandlingSendAtSubscribe()
    .retainHandlingSendAtNewSubscribe()
    .retainHandlingDontSend(),
  mqtt("Subscribing").subscribe("#{myTopic}").subscriptionIdentifier(1),
  mqtt("Subscribing").subscribe("#{myTopic}").subscriptionIdentifier("#{subscriptionId}"),
  mqtt("Subscribing")
    .subscribe("#{myTopic}")
    .subscriptionIdentifier((session) => session.get<number>("subscriptionId"))
    .expect(1),
  mqtt("Unsubscribing").unsubscribe("#{myTopic2}"),
  mqtt("Unsubscribing").unsubscribe((session) => session.get<string>("myTopic2")),
  mqtt("Publishing")
    .publish("#{myTopic}")
    .message(StringBody("#{myTextPayload}"))
    .qosAtMostOnce()
    .qosAtLeastOnce()
    .qosExactlyOnce()
    .retain(true),
  mqtt("Publishing")
    .publish("#{myTopic}")
    .message(StringBody("#{myTextPayload}"))
    .userProperty("#{propName}", "#{propValue}")
    .userProperty((session) => session.get<string>("propName"), "#{propValue}")
    .userProperty("#{propName}", (session) => session.get<string>("propValue"))
    .userProperty(
      (session) => session.get<string>("propName"),
      (session) => session.get<string>("propValue")
    )
    .contentType("application/json")
    .contentType((session) => session.get<string>("contentType"))
    .responseTopic("#{responseTopic}")
    .responseTopic((session) => session.get<string>("responseTopic"))
    .correlationData("#{correlationData}")
    .correlationData((session) => session.get<string>("correlationData"))
    .correlationDataBytes([1, 2, 3])
    .correlationDataBytes((session) => [1, 2, 3])
    .messageExpiryInterval(60)
    .messageExpiryInterval({ amount: 1, unit: "minutes" })
    .payloadFormatUtf8()
    .await(1, "#{responseTopic}"),
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
  ),
  mqtt.processUnmatchedMessages("topic", (messages, session: Session) =>
    session.set(
      "subscriptionIds",
      messages.flatMap((message) => message.subscriptionIdentifiers())
    )
  )
);

runSimulationMock((setUp) => {
  setUp(scn.injectOpen(atOnceUsers(1)).protocols(mqttProtocol)).protocols(mqttProtocol);
});
