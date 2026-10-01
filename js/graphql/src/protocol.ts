import { Expression, ProtocolBuilder, Session, Wrapper, underlyingSessionTo } from "@gatling.io/core";

import JvmGraphQlDocument = io.gatling.javaapi.graphql.GraphQlDocument;
import JvmGraphQlProtocolBuilder = io.gatling.javaapi.graphql.GraphQlProtocolBuilder;

export type GraphQlOperationType = "QUERY" | "MUTATION" | "SUBSCRIPTION";

/**
 * A parsed GraphQL document, as passed to custom operation naming strategies
 */
export interface GraphQlDocument extends Wrapper<JvmGraphQlDocument> {
  /**
   * @returns the raw document
   */
  raw(): string;

  /**
   * @returns the type of the operation
   */
  operationType(): GraphQlOperationType;

  /**
   * @returns the name of the operation, null if it's anonymous
   */
  operationName(): string | null;

  /**
   * @returns the names of the root fields of the operation
   */
  rootFields(): string[];

  /**
   * @returns the path of the file the document was loaded from, null if it wasn't loaded from a file
   */
  sourcePath(): string | null;

  /**
   * @returns the SHA-256 hash of the document
   */
  sha256(): string;
}

export const wrapGraphQlDocument = (_underlying: JvmGraphQlDocument): GraphQlDocument => ({
  _underlying,
  raw: () => _underlying.raw(),
  operationType: () => _underlying.operationType().name() as GraphQlOperationType,
  operationName: () => _underlying.operationName(),
  rootFields: () => {
    const jvmRootFields = _underlying.rootFields();
    const rootFields: string[] = [];
    for (let i = 0; i < jvmRootFields.length; i++) {
      rootFields.push(jvmRootFields[i]);
    }
    return rootFields;
  },
  sourcePath: () => _underlying.sourcePath(),
  sha256: () => _underlying.sha256()
});

/**
 * DSL for building GraphQL protocol configurations
 *
 * <p>Immutable, so all methods return a new occurrence and leave the original unmodified.
 */
export interface GraphQlProtocolBuilder extends ProtocolBuilder {
  /**
   * Define the path of the endpoint for queries and mutations, relative to the HTTP protocol
   * baseUrl. Defaults to "/graphql".
   *
   * @param endpoint - the endpoint, expressed as a Gatling Expression Language String
   * @returns a new GraphQlProtocolBuilder instance
   */
  endpoint(endpoint: string): GraphQlProtocolBuilder;

  /**
   * Define the path of the endpoint for queries and mutations, relative to the HTTP protocol
   * baseUrl. Defaults to "/graphql".
   *
   * @param endpoint - the endpoint, expressed as a function
   * @returns a new GraphQlProtocolBuilder instance
   */
  endpoint(endpoint: (session: Session) => string): GraphQlProtocolBuilder;

  /**
   * Define the path of the endpoint for subscriptions, relative to the HTTP protocol wsBaseUrl.
   * Defaults to "/graphql".
   *
   * @param endpoint - the endpoint, expressed as a Gatling Expression Language String
   * @returns a new GraphQlProtocolBuilder instance
   */
  wsEndpoint(endpoint: string): GraphQlProtocolBuilder;

  /**
   * Define the path of the endpoint for subscriptions, relative to the HTTP protocol wsBaseUrl.
   * Defaults to "/graphql".
   *
   * @param endpoint - the endpoint, expressed as a function
   * @returns a new GraphQlProtocolBuilder instance
   */
  wsEndpoint(endpoint: (session: Session) => string): GraphQlProtocolBuilder;

  /**
   * Fail requests whose response contains errors (default)
   *
   * @returns a new GraphQlProtocolBuilder instance
   */
  failOnErrors(): GraphQlProtocolBuilder;

  /**
   * Only fail requests whose response contains errors and no data
   *
   * @returns a new GraphQlProtocolBuilder instance
   */
  failOnDataNull(): GraphQlProtocolBuilder;

  /**
   * Don't fail requests whose response contains errors
   *
   * @returns a new GraphQlProtocolBuilder instance
   */
  ignoreErrors(): GraphQlProtocolBuilder;

  /**
   * Reject anonymous operations
   *
   * @returns a new GraphQlProtocolBuilder instance
   */
  requireNamedOperations(): GraphQlProtocolBuilder;

  /**
   * Send queries with GET requests, variables being passed as query parameters, typically so they
   * can be cached by a CDN
   *
   * @returns a new GraphQlProtocolBuilder instance
   */
  queriesOverGet(): GraphQlProtocolBuilder;

  /**
   * Use Automatic Persisted Queries: send the document hash and only send the full document when
   * the server doesn't know it yet
   *
   * @returns a new GraphQlProtocolBuilder instance
   */
  automaticPersistedQueries(): GraphQlProtocolBuilder;

  /**
   * Use Automatic Persisted Queries over GET requests, typically so they can be cached by a CDN
   *
   * @returns a new GraphQlProtocolBuilder instance
   */
  automaticPersistedQueriesOverGet(): GraphQlProtocolBuilder;

  /**
   * Share the knowledge of which documents have been persisted on the server across virtual users
   *
   * @returns a new GraphQlProtocolBuilder instance
   */
  sharePersistedQueries(): GraphQlProtocolBuilder;

  /**
   * Name anonymous operations after the name of the file they were loaded from
   *
   * @returns a new GraphQlProtocolBuilder instance
   */
  inferOperationNameFromFileName(): GraphQlProtocolBuilder;

  /**
   * Name anonymous operations after their root fields
   *
   * @returns a new GraphQlProtocolBuilder instance
   */
  inferOperationNameFromRootFields(): GraphQlProtocolBuilder;

  /**
   * Name anonymous operations after the SHA-256 hash of their document
   *
   * @returns a new GraphQlProtocolBuilder instance
   */
  inferOperationNameFromHash(): GraphQlProtocolBuilder;

  /**
   * Name anonymous operations with a custom function
   *
   * @param naming - the function computing the name of an operation from its document, null or
   *     undefined if it can't be named
   * @returns a new GraphQlProtocolBuilder instance
   */
  inferOperationName(naming: (document: GraphQlDocument) => string | null | undefined): GraphQlProtocolBuilder;
}

export const wrapGraphQlProtocolBuilder = (_underlying: JvmGraphQlProtocolBuilder): GraphQlProtocolBuilder => ({
  _underlying,
  endpoint: (endpoint: Expression<string>) =>
    wrapGraphQlProtocolBuilder(
      typeof endpoint === "function"
        ? _underlying.endpoint(underlyingSessionTo(endpoint))
        : _underlying.endpoint(endpoint)
    ),
  wsEndpoint: (endpoint: Expression<string>) =>
    wrapGraphQlProtocolBuilder(
      typeof endpoint === "function"
        ? _underlying.wsEndpoint(underlyingSessionTo(endpoint))
        : _underlying.wsEndpoint(endpoint)
    ),
  failOnErrors: () => wrapGraphQlProtocolBuilder(_underlying.failOnErrors()),
  failOnDataNull: () => wrapGraphQlProtocolBuilder(_underlying.failOnDataNull()),
  ignoreErrors: () => wrapGraphQlProtocolBuilder(_underlying.ignoreErrors()),
  requireNamedOperations: () => wrapGraphQlProtocolBuilder(_underlying.requireNamedOperations()),
  queriesOverGet: () => wrapGraphQlProtocolBuilder(_underlying.queriesOverGet()),
  automaticPersistedQueries: () => wrapGraphQlProtocolBuilder(_underlying.automaticPersistedQueries()),
  automaticPersistedQueriesOverGet: () => wrapGraphQlProtocolBuilder(_underlying.automaticPersistedQueriesOverGet()),
  sharePersistedQueries: () => wrapGraphQlProtocolBuilder(_underlying.sharePersistedQueries()),
  inferOperationNameFromFileName: () => wrapGraphQlProtocolBuilder(_underlying.inferOperationNameFromFileName()),
  inferOperationNameFromRootFields: () => wrapGraphQlProtocolBuilder(_underlying.inferOperationNameFromRootFields()),
  inferOperationNameFromHash: () => wrapGraphQlProtocolBuilder(_underlying.inferOperationNameFromHash()),
  inferOperationName: (naming: (document: GraphQlDocument) => string | null | undefined) =>
    wrapGraphQlProtocolBuilder(
      _underlying.inferOperationName(
        (document: JvmGraphQlDocument) =>
          // @Nullable isn't reflected in the generated types
          (naming(wrapGraphQlDocument(document)) ?? null) as string
      )
    )
});
