import { CheckBuilder, Duration, ProtocolBuilder, asJava, toJvmDuration } from "@gatling.io/core";

import JvmKafkaProtocolBuilder = io.gatling.javaapi.kafka.KafkaProtocolBuilder;

/**
 * DSL for building Kafka protocol configurations
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface KafkaProtocolBuilder extends ProtocolBuilder {
  /**
   * Define the brokers to bootstrap from
   *
   * @param servers - the servers, as host:port
   * @returns a new KafkaProtocolBuilder instance
   */
  bootstrapServers(...servers: string[]): KafkaProtocolBuilder;

  /**
   * Define a Kafka client property shared by producers and consumers
   *
   * @param key - the property key
   * @param value - the property value
   * @returns a new KafkaProtocolBuilder instance
   */
  property(key: string, value: string): KafkaProtocolBuilder;

  /**
   * Define Kafka client properties shared by producers and consumers
   *
   * @param properties - the properties
   * @returns a new KafkaProtocolBuilder instance
   */
  properties(properties: Record<string, string>): KafkaProtocolBuilder;

  /**
   * Define a Kafka producer property, overriding a shared one
   *
   * @param key - the property key
   * @param value - the property value
   * @returns a new KafkaProtocolBuilder instance
   */
  producerProperty(key: string, value: string): KafkaProtocolBuilder;

  /**
   * Define Kafka producer properties, overriding shared ones
   *
   * @param properties - the properties
   * @returns a new KafkaProtocolBuilder instance
   */
  producerProperties(properties: Record<string, string>): KafkaProtocolBuilder;

  /**
   * Define a Kafka consumer property for the replies, overriding a shared one
   *
   * @param key - the property key
   * @param value - the property value
   * @returns a new KafkaProtocolBuilder instance
   */
  consumerProperty(key: string, value: string): KafkaProtocolBuilder;

  /**
   * Define Kafka consumer properties for the replies, overriding shared ones
   *
   * @param properties - the properties
   * @returns a new KafkaProtocolBuilder instance
   */
  consumerProperties(properties: Record<string, string>): KafkaProtocolBuilder;

  /**
   * Match a reply to its request by their key (default)
   *
   * @returns a new KafkaProtocolBuilder instance
   */
  matchByKey(): KafkaProtocolBuilder;

  /**
   * Match a reply to its request by the value of a header; a request without this header gets a
   * random UUID
   *
   * @param name - the header name
   * @returns a new KafkaProtocolBuilder instance
   */
  matchByHeader(name: string): KafkaProtocolBuilder;

  /**
   * Match a reply to its request by a correlation id that a check extracts from both, typically
   * from their value, e.g. `matchByValue(jsonPath("$.correlationId"))`; the extracted values are
   * compared as text. The check is resolved against an empty session, so it must not depend on the
   * virtual user's attributes. A request it extracts nothing from fails, a reply it extracts
   * nothing from is ignored.
   *
   * @param check - the check extracting the correlation id
   * @returns a new KafkaProtocolBuilder instance
   */
  matchByValue(check: CheckBuilder): KafkaProtocolBuilder;

  /**
   * Define how long a request waits for its reply, and a consume or subscription for its record
   * (default 60 seconds)
   *
   * @param timeout - the timeout
   * @returns a new KafkaProtocolBuilder instance
   */
  replyTimeout(timeout: Duration): KafkaProtocolBuilder;

  /**
   * Keep the records read on a consumed topic that no consume or subscription waits for yet, for
   * one that starts after its record arrived: at most maxRecords, for at most retention (default
   * 10,000 records, 60 seconds). On a busy topic, a consume starting later than the time maxRecords
   * records cover misses its record: raise maxRecords, as memory allows.
   *
   * @param maxRecords - the records kept, the oldest dropped first
   * @param retention - how long a record is kept
   * @returns a new KafkaProtocolBuilder instance
   */
  consumeBuffer(maxRecords: number, retention: Duration): KafkaProtocolBuilder;

  /**
   * Authenticate with SASL PLAIN. Gatling sets security.protocol to SASL_SSL with TLS,
   * SASL_PLAINTEXT without. The Kafka clients are shared by every virtual user, so the credentials
   * are plain values, not Gatling expressions.
   *
   * @param username - the username
   * @param password - the password
   * @returns a new KafkaProtocolBuilder instance
   */
  saslPlain(username: string, password: string): KafkaProtocolBuilder;

  /**
   * Authenticate with SASL SCRAM-SHA-256. Gatling sets security.protocol to SASL_SSL with TLS,
   * SASL_PLAINTEXT without. The Kafka clients are shared by every virtual user, so the credentials
   * are plain values, not Gatling expressions.
   *
   * @param username - the username
   * @param password - the password
   * @returns a new KafkaProtocolBuilder instance
   */
  saslScramSha256(username: string, password: string): KafkaProtocolBuilder;

  /**
   * Authenticate with SASL SCRAM-SHA-512. Gatling sets security.protocol to SASL_SSL with TLS,
   * SASL_PLAINTEXT without. The Kafka clients are shared by every virtual user, so the credentials
   * are plain values, not Gatling expressions.
   *
   * @param username - the username
   * @param password - the password
   * @returns a new KafkaProtocolBuilder instance
   */
  saslScramSha512(username: string, password: string): KafkaProtocolBuilder;

  /**
   * Authenticate with SASL OAUTHBEARER, getting tokens from an OAuth token endpoint with the client
   * credentials grant, through Kafka's own login callback handler. Gatling adds the endpoint to the
   * JVM system property org.apache.kafka.sasl.oauthbearer.allowed.urls, without which Kafka refuses
   * to call it.
   *
   * @param tokenEndpointUrl - the token endpoint
   * @param clientId - the OAuth client id
   * @param clientSecret - the OAuth client secret
   * @param scope - the scope to request, if any
   * @returns a new KafkaProtocolBuilder instance
   */
  saslOauthBearer(
    tokenEndpointUrl: string,
    clientId: string,
    clientSecret: string,
    scope?: string
  ): KafkaProtocolBuilder;

  /**
   * Authenticate to Amazon MSK with IAM, with the AWS default credentials provider chain. Needs the
   * software.amazon.msk:aws-msk-iam-auth library, which Gatling doesn't bring: declare it in the
   * "gatling.jvmDependencies" section of package.json, or the protocol fails to build. MSK only
   * serves IAM over TLS, so Gatling sets security.protocol to SASL_SSL, with the JVM's default trust
   * store unless one is configured.
   *
   * @returns a new KafkaProtocolBuilder instance
   */
  saslAwsMskIam(): KafkaProtocolBuilder;

  /**
   * Authenticate to Amazon MSK with IAM, with the credentials of a named profile of the AWS
   * credentials files. Needs the software.amazon.msk:aws-msk-iam-auth library, as saslAwsMskIam
   * does.
   *
   * @param profileName - the profile
   * @returns a new KafkaProtocolBuilder instance
   */
  saslAwsMskIamProfile(profileName: string): KafkaProtocolBuilder;

  /**
   * Authenticate to Amazon MSK with IAM, assuming a role through STS with the AWS default
   * credentials provider chain, as when the cluster is in another account. Needs the
   * software.amazon.msk:aws-msk-iam-auth library, as saslAwsMskIam does.
   *
   * @param roleArn - the role's ARN
   * @param sessionName - the role session's name, if any
   * @param externalId - the external id the role's trust policy requires, if any, which needs a
   *     sessionName
   * @param stsRegion - the region of the STS endpoint, if any, which needs an externalId
   * @returns a new KafkaProtocolBuilder instance
   */
  saslAwsMskIamRole(
    roleArn: string,
    sessionName?: string,
    externalId?: string,
    stsRegion?: string
  ): KafkaProtocolBuilder;

  /**
   * Authenticate with SASL GSSAPI (Kerberos), logging in from a keytab. Gatling sets
   * security.protocol to SASL_SSL with TLS, SASL_PLAINTEXT without.
   *
   * @param serviceName - the Kerberos principal name the brokers run as
   * @param keyTabPath - the path of the client's keytab
   * @param principal - the client's Kerberos principal
   * @returns a new KafkaProtocolBuilder instance
   */
  saslGssapi(serviceName: string, keyTabPath: string, principal: string): KafkaProtocolBuilder;

  /**
   * Connect to the brokers over TLS, trusting the JVM's default trust store unless trustStore is
   * configured. Gatling sets security.protocol to SSL, or SASL_SSL with SASL.
   *
   * @returns a new KafkaProtocolBuilder instance
   */
  useTls(): KafkaProtocolBuilder;

  /**
   * Trust the brokers' certificates in this store, over TLS (implies useTls)
   *
   * @param path - the store's location
   * @param password - the store's password, empty for a store without one (PEM)
   * @param storeType - the store's type: JKS, PKCS12 or PEM, Kafka's default if omitted
   * @returns a new KafkaProtocolBuilder instance
   */
  trustStore(path: string, password: string, storeType?: string): KafkaProtocolBuilder;

  /**
   * Authenticate to the brokers with the certificate and key in this store, over mutual TLS
   * (implies useTls)
   *
   * @param path - the store's location
   * @param password - the store's password, also the key's, empty for a store without one (PEM)
   * @param storeType - the store's type: JKS, PKCS12 or PEM, Kafka's default if omitted
   * @returns a new KafkaProtocolBuilder instance
   */
  keyStore(path: string, password: string, storeType?: string): KafkaProtocolBuilder;

  /**
   * Define the schema registry of the Avro, Protobuf and JSON Schema keys and values. Gatling
   * serializes them with Confluent's serializers, which it doesn't bring: declare the one of each
   * format you use in the "gatling.jvmDependencies" section of package.json, see the README.
   *
   * @param url - the registry's URL, several ones comma-separated; mock://scope is the JVM's mock
   *     registry of that scope
   * @returns a new KafkaProtocolBuilder instance
   */
  schemaRegistry(url: string): KafkaProtocolBuilder;

  /**
   * Define the credentials of the schema registry's basic authentication
   *
   * @param username - the username
   * @param password - the password
   * @returns a new KafkaProtocolBuilder instance
   */
  schemaRegistryBasicAuth(username: string, password: string): KafkaProtocolBuilder;

  /**
   * Define a property of Confluent's serializers and deserializers, such as auto.register.schemas
   * or value.subject.name.strategy
   *
   * @param key - the property key
   * @param value - the property value
   * @returns a new KafkaProtocolBuilder instance
   */
  schemaRegistryProperty(key: string, value: string): KafkaProtocolBuilder;

  /**
   * Define properties of Confluent's serializers and deserializers
   *
   * @param properties - the properties
   * @returns a new KafkaProtocolBuilder instance
   */
  schemaRegistryProperties(properties: Record<string, string>): KafkaProtocolBuilder;
}

const toJvmMap = (properties: Record<string, string>): java.util.Map<string, string> => asJava(properties) as any;

export const wrapKafkaProtocolBuilder = (_underlying: JvmKafkaProtocolBuilder): KafkaProtocolBuilder => ({
  _underlying,
  bootstrapServers: (...servers: string[]) => wrapKafkaProtocolBuilder(_underlying.bootstrapServers(...servers)),
  property: (key: string, value: string) => wrapKafkaProtocolBuilder(_underlying.property(key, value)),
  properties: (properties: Record<string, string>) =>
    wrapKafkaProtocolBuilder(_underlying.properties(toJvmMap(properties))),
  producerProperty: (key: string, value: string) => wrapKafkaProtocolBuilder(_underlying.producerProperty(key, value)),
  producerProperties: (properties: Record<string, string>) =>
    wrapKafkaProtocolBuilder(_underlying.producerProperties(toJvmMap(properties))),
  consumerProperty: (key: string, value: string) => wrapKafkaProtocolBuilder(_underlying.consumerProperty(key, value)),
  consumerProperties: (properties: Record<string, string>) =>
    wrapKafkaProtocolBuilder(_underlying.consumerProperties(toJvmMap(properties))),
  matchByKey: () => wrapKafkaProtocolBuilder(_underlying.matchByKey()),
  matchByHeader: (name: string) => wrapKafkaProtocolBuilder(_underlying.matchByHeader(name)),
  matchByValue: (check: CheckBuilder) => wrapKafkaProtocolBuilder(_underlying.matchByValue(check._underlying)),
  replyTimeout: (timeout: Duration) => wrapKafkaProtocolBuilder(_underlying.replyTimeout(toJvmDuration(timeout))),
  consumeBuffer: (maxRecords: number, retention: Duration) =>
    wrapKafkaProtocolBuilder(_underlying.consumeBuffer(maxRecords, toJvmDuration(retention))),
  saslPlain: (username: string, password: string) =>
    wrapKafkaProtocolBuilder(_underlying.saslPlain(username, password)),
  saslScramSha256: (username: string, password: string) =>
    wrapKafkaProtocolBuilder(_underlying.saslScramSha256(username, password)),
  saslScramSha512: (username: string, password: string) =>
    wrapKafkaProtocolBuilder(_underlying.saslScramSha512(username, password)),
  saslOauthBearer: (tokenEndpointUrl: string, clientId: string, clientSecret: string, scope?: string) =>
    wrapKafkaProtocolBuilder(
      scope === undefined
        ? _underlying.saslOauthBearer(tokenEndpointUrl, clientId, clientSecret)
        : _underlying.saslOauthBearer(tokenEndpointUrl, clientId, clientSecret, scope)
    ),
  saslAwsMskIam: () => wrapKafkaProtocolBuilder(_underlying.saslAwsMskIam()),
  saslAwsMskIamProfile: (profileName: string) =>
    wrapKafkaProtocolBuilder(_underlying.saslAwsMskIamProfile(profileName)),
  saslAwsMskIamRole: (roleArn: string, sessionName?: string, externalId?: string, stsRegion?: string) =>
    wrapKafkaProtocolBuilder(
      sessionName === undefined
        ? _underlying.saslAwsMskIamRole(roleArn)
        : externalId === undefined
          ? _underlying.saslAwsMskIamRole(roleArn, sessionName)
          : stsRegion === undefined
            ? _underlying.saslAwsMskIamRole(roleArn, sessionName, externalId)
            : _underlying.saslAwsMskIamRole(roleArn, sessionName, externalId, stsRegion)
    ),
  saslGssapi: (serviceName: string, keyTabPath: string, principal: string) =>
    wrapKafkaProtocolBuilder(_underlying.saslGssapi(serviceName, keyTabPath, principal)),
  useTls: () => wrapKafkaProtocolBuilder(_underlying.useTls()),
  trustStore: (path: string, password: string, storeType?: string) =>
    wrapKafkaProtocolBuilder(
      storeType === undefined
        ? _underlying.trustStore(path, password)
        : _underlying.trustStore(path, password, storeType)
    ),
  keyStore: (path: string, password: string, storeType?: string) =>
    wrapKafkaProtocolBuilder(
      storeType === undefined ? _underlying.keyStore(path, password) : _underlying.keyStore(path, password, storeType)
    ),
  schemaRegistry: (url: string) => wrapKafkaProtocolBuilder(_underlying.schemaRegistry(url)),
  schemaRegistryBasicAuth: (username: string, password: string) =>
    wrapKafkaProtocolBuilder(_underlying.schemaRegistryBasicAuth(username, password)),
  schemaRegistryProperty: (key: string, value: string) =>
    wrapKafkaProtocolBuilder(_underlying.schemaRegistryProperty(key, value)),
  schemaRegistryProperties: (properties: Record<string, string>) =>
    wrapKafkaProtocolBuilder(_underlying.schemaRegistryProperties(toJvmMap(properties)))
});
