import {
  ByteArrayBody,
  ElFileBody,
  PebbleStringBody,
  RawFileBody,
  Simulation,
  StringBody,
  atOnceUsers,
  bodyBytes,
  bodyLength,
  bodyString,
  jmesPath,
  jsonPath,
  regex,
  scenario,
  substring
} from "@gatling.io/core";

import {
  avro,
  avroSubject,
  jsonSchema,
  jsonSchemaSubject,
  kafka,
  kafkaHeader,
  kafkaKey,
  protobuf,
  protobufSubject
} from "./index";

const runSimulationMock = (_: Simulation): void => {};

const kafkaProtocol = kafka
  .bootstrapServers("localhost:9092", "localhost:9093")
  .property("security.protocol", "SASL_SSL")
  .properties({ "sasl.mechanism": "SCRAM-SHA-512" })
  .producerProperty("acks", "all")
  .producerProperties({ "linger.ms": "5" })
  .consumerProperty("fetch.min.bytes", "1")
  .consumerProperties({ "max.poll.records": "1000" })
  .matchByKey()
  .matchByHeader("correlationId")
  .matchByValue(jsonPath("$.correlationId"))
  .matchByValue(regex("id=(\\w+)"))
  .replyTimeout({ amount: 10, unit: "seconds" })
  .replyTimeout(10)
  .consumeBuffer(50000, { amount: 2, unit: "minutes" })
  .consumeBuffer(50000, 120)
  .schemaRegistry("https://registry:8081")
  .schemaRegistryBasicAuth("user", "password")
  .schemaRegistryProperty("auto.register.schemas", "false")
  .schemaRegistryProperties({ "use.latest.version": "true" });

const AVRO_SCHEMA = '{"type": "record", "name": "Order", "fields": [{"name": "id", "type": "string"}]}';

const securedProtocols = [
  kafka.bootstrapServers("localhost:9092").saslPlain("user", "password"),
  kafka.bootstrapServers("localhost:9092").saslScramSha256("user", "password").useTls(),
  kafka.bootstrapServers("localhost:9092").saslScramSha512("user", "password").trustStore("truststore.p12", "changeit"),
  kafka.bootstrapServers("localhost:9092").saslOauthBearer("https://idp/token", "client", "secret"),
  kafka.bootstrapServers("localhost:9092").saslOauthBearer("https://idp/token", "client", "secret", "kafka"),
  kafka.bootstrapServers("localhost:9092").saslAwsMskIam(),
  kafka.bootstrapServers("localhost:9092").saslAwsMskIamProfile("msk"),
  kafka.bootstrapServers("localhost:9092").saslAwsMskIamRole("arn:aws:iam::123456789012:role/msk"),
  kafka.bootstrapServers("localhost:9092").saslAwsMskIamRole("arn:aws:iam::123456789012:role/msk", "gatling"),
  kafka
    .bootstrapServers("localhost:9092")
    .saslAwsMskIamRole("arn:aws:iam::123456789012:role/msk", "gatling", "external-id"),
  kafka
    .bootstrapServers("localhost:9092")
    .saslAwsMskIamRole("arn:aws:iam::123456789012:role/msk", "gatling", "external-id", "eu-west-1"),
  kafka.bootstrapServers("localhost:9092").saslGssapi("kafka", "/etc/client.keytab", "client@EXAMPLE.COM"),
  kafka
    .bootstrapServers("localhost:9092")
    .trustStore("truststore.pem", "", "PEM")
    .keyStore("keystore.p12", "changeit", "PKCS12"),
  kafka.bootstrapServers("localhost:9092").keyStore("keystore.jks", "changeit")
];

const scn = scenario("scenario").exec(
  kafka("send string").send("topic").value(StringBody("#{value}")),
  kafka("send with key").send("#{topic}").value(StringBody('{"id": "#{id}"}')).key("#{id}"),
  kafka("send with function key")
    .send("topic")
    .value(StringBody("value"))
    .key((session) => session.get<string>("id")),
  kafka("send with bytes key").send("topic").value(ByteArrayBody("#{bytes}")).key(ByteArrayBody("#{keyBytes}")),
  kafka("send file").send("topic").value(RawFileBody("file.bin")),
  kafka("send template").send("topic").value(ElFileBody("template.json")),
  kafka("send pebble").send("topic").value(PebbleStringBody("{{ value }}")),
  kafka("send with headers")
    .send("topic")
    .value(StringBody("value"))
    .header("correlationId", "#{correlationId}")
    .header("type", (session) => "order"),
  kafka("send to partition").send("topic").value(StringBody("value")).partition(1),
  kafka("send to partition expression").send("topic").value(StringBody("value")).partition("#{partition}"),
  kafka("send to partition function")
    .send("topic")
    .value(StringBody("value"))
    .partition((session) => session.get<number>("partition")),
  kafka((session) => session.get<string>("name"))
    .send((session) => session.get<string>("topic"))
    .value(StringBody("value")),
  kafka("request reply")
    .requestReply("requests", "replies")
    .value(StringBody('{"id": "#{id}"}'))
    .key("#{id}")
    .header("type", "order")
    .partition(1)
    .check(
      bodyString().is("ok"),
      bodyBytes().exists(),
      bodyLength().gt(0),
      substring("ok"),
      regex("o(k)").saveAs("k"),
      jsonPath("$.status").is("ACCEPTED"),
      jmesPath("status").saveAs("status"),
      kafkaHeader("type").is("ack"),
      kafkaKey().is("#{id}")
    ),
  kafka("send avro")
    .send("topic")
    .value(avro(AVRO_SCHEMA, StringBody('{"id": "#{id}"}'))),
  kafka("send avro subject")
    .send("topic")
    .value(avroSubject("orders-value", ElFileBody("order.json"))),
  kafka("send protobuf")
    .send("topic")
    .value(protobuf('syntax = "proto3"; message Order { string id = 1; }', StringBody("{}"))),
  kafka("send protobuf subject")
    .send("topic")
    .value(protobufSubject("orders-value", PebbleStringBody("{}"))),
  kafka("send json schema")
    .send("topic")
    .value(jsonSchema('{"type": "object"}', StringBody("{}"))),
  kafka("send json schema subject")
    .send("topic")
    .value(jsonSchemaSubject("orders-value", StringBody("{}"))),
  kafka("send avro key")
    .send("topic")
    .value(StringBody("value"))
    .key(avro('{"type": "string"}', StringBody('"#{id}"'))),
  kafka("request reply avro")
    .requestReply("requests", "replies")
    .value(avro(AVRO_SCHEMA, StringBody('{"id": "#{id}"}')))
    .key(avroSubject("orders-key", StringBody('"#{id}"')))
    .decodeAvroReply()
    .check(jsonPath("$.id").is("#{id}"), bodyBytes().exists()),
  kafka("request reply protobuf")
    .requestReply("requests", "replies")
    .value(protobufSubject("orders-value", StringBody("{}")))
    .decodeProtobufReply(),
  kafka("request reply json schema")
    .requestReply("requests", "replies")
    .value(jsonSchemaSubject("orders-value", StringBody("{}")))
    .decodeJsonSchemaReply(),
  kafka("request reply functions")
    .requestReply(
      (session) => session.get<string>("requestTopic"),
      (session) => session.get<string>("replyTopic")
    )
    .value(ByteArrayBody("#{bytes}"))
    .check(bodyString().exists())
    .replyTimeout({ amount: 5, unit: "seconds" })
    .replyTimeout(5),
  kafka("pipeline latency")
    .consume("enriched-orders")
    .correlationId("#{orderId}")
    .check(jsonPath("$.status").is("ENRICHED"), kafkaKey().is("#{orderId}"))
    .timeout({ amount: 30, unit: "seconds" })
    .timeout(30)
    .startTimestampFrom("sentAt"),
  kafka("consume functions")
    .consume((session) => session.get<string>("topic"))
    .correlationId((session) => session.get<string>("orderId"))
    .check(bodyString().exists()),
  kafka("subscription")
    .subscribe("enriched-orders")
    .correlationId("#{orderId}")
    .check(jsonPath("$.status").is("ENRICHED"), kafkaKey().is("#{orderId}"))
    .timeout({ amount: 30, unit: "seconds" })
    .timeout(30)
    .startTimestampFrom("sentAt"),
  kafka("subscription functions")
    .subscribe((session) => session.get<string>("topic"))
    .correlationId((session) => session.get<string>("orderId")),
  kafka("send with subscriptions")
    .send("orders")
    .value(StringBody('{"id": "#{orderId}"}'))
    .key("#{orderId}")
    .subscribe("order enriched", "enriched-orders", "#{orderId}")
    .subscribe(
      kafka("order shipped").subscribe("shipped-orders").correlationId("#{orderId}").check(bodyString().exists())
    ),
  kafka("request reply with subscriptions")
    .requestReply("requests", "replies")
    .value(StringBody('{"id": "#{orderId}"}'))
    .subscribe("order enriched", "enriched-orders", "#{orderId}")
    .subscribe(kafka("order shipped").subscribe("shipped-orders").correlationId("#{orderId}"))
    .check(bodyString().exists()),
  kafka.poll()
);

runSimulationMock((setUp) => {
  setUp(scn.injectOpen(atOnceUsers(1))).protocols(kafkaProtocol, ...securedProtocols);
});
