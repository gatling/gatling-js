# Gatling JS - Kafka module

Gatling JS is a JavaScript/TypeScript interface for the [Gatling load testing tool](https://gatling.io/).

This package contains the Gatling JS DSL for [Apache Kafka](https://kafka.apache.org/): sending records, request-reply,
and waiting for records another part of the system produces, blocking with `consume` or not with `subscribe` and
`kafka.poll()`.

To get started with Gatling JS, see our [introduction to JavaScript scripting](https://docs.gatling.io/tutorials/scripting-intro-js);
or simply have a look at our demo project:

- https://github.com/gatling/gatling-js-demo

## Schema registry formats and AWS MSK IAM

Gatling doesn't ship the libraries for the following features: declare the ones you use in the `gatling` section of your
`package.json`, with their Maven coordinates, and Gatling downloads them when running or packaging your simulations.

- Avro keys and values (`avro`, `avroSubject`, `decodeAvroReply`): `io.confluent:kafka-avro-serializer`
- Protobuf keys and values (`protobuf`, `protobufSubject`, `decodeProtobufReply`): `io.confluent:kafka-protobuf-serializer`,
  which brings jars under the Confluent Community License
- JSON Schema keys and values (`jsonSchema`, `jsonSchemaSubject`, `decodeJsonSchemaReply`):
  `io.confluent:kafka-json-schema-serializer`, which brings jars under the Confluent Community License
- Amazon MSK IAM authentication (`saslAwsMskIam`, `saslAwsMskIamProfile`, `saslAwsMskIamRole`):
  `software.amazon.msk:aws-msk-iam-auth`

Confluent's serializers are only published on Confluent's own Maven repository, declare it in `repositories`:

```json
{
  "gatling": {
    "jvmDependencies": {
      "artifacts": ["io.confluent:kafka-avro-serializer:8.4.0"],
      "repositories": ["https://packages.confluent.io/maven/"]
    }
  }
}
```

## Questions, help?

Read the [documentation](https://docs.gatling.io).

Join the [Gatling Community Forum](https://community.gatling.io).

Found a real bug? Raise an [issue](https://github.com/gatling/gatling/issues).
