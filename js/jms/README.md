# Gatling JS - JMS module

Gatling JS is a JavaScript/TypeScript interface for the [Gatling load testing tool](https://gatling.io/).

This package contains the Gatling JS DSL for [the JMS protocol](https://docs.gatling.io/reference/script/jms/).

To get started with Gatling JS, see our [introduction to JavaScript scripting](https://docs.gatling.io/tutorials/scripting-intro-js);
or simply have a look at our demo project:

- https://github.com/gatling/gatling-js-demo

## Add the JMS client of your broker

Gatling doesn't ship any JMS client: declare the one of your broker in the `gatling` section of your `package.json`,
with its Maven coordinates, and Gatling downloads it when running or packaging your simulations:

```json
{
  "gatling": {
    "jvmDependencies": {
      "artifacts": ["org.apache.artemis:artemis-jakarta-client:2.57.0"]
    }
  }
}
```

The client must implement the Jakarta Messaging API (`jakarta.jms`), not the legacy `javax.jms` one.

See the [JDBC module README](https://www.npmjs.com/package/@gatling.io/jdbc) for the other `jvmDependencies` options
(repositories, credentials, `jvm_libs` folder).

## Connect to your broker

Gatling looks up the `ConnectionFactory` of your broker with JNDI: set the JNDI name of the `ConnectionFactory`, the url
of the broker, and the `InitialContextFactory` class of your JMS client. For example, with ActiveMQ Artemis:

```javascript
import { jms, jmsJndiConnectionFactory } from "@gatling.io/jms";

const jmsProtocol = jms
  .connectionFactory(
    jmsJndiConnectionFactory
      .connectionFactoryName("ConnectionFactory")
      .url("tcp://localhost:61616")
      .contextFactory("org.apache.activemq.artemis.jndi.ActiveMQInitialContextFactory")
  )
  .credentials("artemis", "artemis");
```

Use `property(key, value)` to pass other settings of your JMS client to the JNDI `InitialContext`.

## Questions, help?

Read the [documentation](https://docs.gatling.io).

Join the [Gatling Community Forum](https://community.gatling.io).

Found a real bug? Raise an [issue](https://github.com/gatling/gatling/issues).
