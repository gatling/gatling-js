import { ProtocolBuilder, Session } from "@gatling.io/core";

import { GrpcHeaders, wrapGrpcHeaders } from "./headers";
import { GrpcDslAddons, ChannelCredentials, toJvmCredentials, underlyingSessionToCredentials } from "./grpc";
import { GrpcServerConfigurationBuilder, wrapGrpcServerConfigurationBuilder } from "./serverConfiguration";

import JvmGrpcProtocolBuilder = io.gatling.javaapi.grpc.GrpcProtocolBuilder;

export interface GrpcProtocolBuilder extends GrpcHeaders<GrpcProtocolBuilder>, ProtocolBuilder {
  // Deprecated DSL

  //public GrpcProtocolBuilder callCredentials(@NonNull Function<Session, CallCredentials> credentials) {
  //public GrpcProtocolBuilder callCredentials(@NonNull String credentials) {
  //public GrpcProtocolBuilder callCredentials(@NonNull CallCredentials credentials) {

  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  channelCredentials(credentials: ChannelCredentials): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  channelCredentials(credentials: string): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  channelCredentials(credentials: (session: Session) => ChannelCredentials): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  forAddress(host: string, port: number): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  forTarget(target: string): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  overrideAuthority(authority: string): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  shareChannel(): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  shareSslContext(): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  useChannelPool(poolSize: number): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  usePlaintext(): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  useInsecureTrustManager(): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  useStandardTrustManager(): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  useCustomCertificateTrustManager(certificatePath: string): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  useCustomLoadBalancingPolicy(policy: string): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  useCustomLoadBalancingPolicy(policy: string, jsonPolicyConfig: string): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  usePickFirstLoadBalancingPolicy(): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  usePickRandomLoadBalancingPolicy(): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  useRoundRobinLoadBalancingPolicy(): GrpcProtocolBuilder;
  /**
   * @deprecated since 3.14.900, use the server configuration DSL instead (see https://docs.gatling.io/reference/script/grpc/protocol/#server-configurations).
   */
  unmatchedInboundMessageBufferSize(max: number): GrpcProtocolBuilder;

  // Server configurations

  serverConfiguration(serverConfigurationName: string): GrpcServerConfigurationBuilder;
  serverConfigurations(...serverConfigurations: GrpcServerConfigurationBuilder[]): GrpcProtocolBuilder;
}

export const wrapGrpcProtocolBuilder = (_underlying: JvmGrpcProtocolBuilder): GrpcProtocolBuilder => ({
  _underlying,
  ...wrapGrpcHeaders(_underlying, wrapGrpcProtocolBuilder),

  // Deprecated DSL

  //public GrpcProtocolBuilder callCredentials(@NonNull Function<Session, CallCredentials> credentials) {
  //public GrpcProtocolBuilder callCredentials(@NonNull String credentials) {
  //public GrpcProtocolBuilder callCredentials(@NonNull CallCredentials credentials) {

  channelCredentials: (credentials) =>
    wrapGrpcProtocolBuilder(
      typeof credentials === "string"
        ? GrpcDslAddons.channelCredentialsEL(_underlying, credentials)
        : typeof credentials === "function"
          ? _underlying.channelCredentials(underlyingSessionToCredentials(credentials))
          : _underlying.channelCredentials(toJvmCredentials(credentials))
    ),
  forAddress: (host, port) => wrapGrpcProtocolBuilder(_underlying.forAddress(host, port)),
  forTarget: (target) => wrapGrpcProtocolBuilder(_underlying.forTarget(target)),
  overrideAuthority: (authority) => wrapGrpcProtocolBuilder(_underlying.overrideAuthority(authority)),
  shareChannel: () => wrapGrpcProtocolBuilder(_underlying.shareChannel()),
  shareSslContext: () => wrapGrpcProtocolBuilder(_underlying.shareSslContext()),
  useChannelPool: (poolSize) => wrapGrpcProtocolBuilder(_underlying.useChannelPool(poolSize)),
  usePlaintext: () => wrapGrpcProtocolBuilder(_underlying.usePlaintext()),
  useInsecureTrustManager: () => wrapGrpcProtocolBuilder(_underlying.useInsecureTrustManager()),
  useStandardTrustManager: () => wrapGrpcProtocolBuilder(_underlying.useStandardTrustManager()),
  useCustomCertificateTrustManager: (certificatePath) =>
    wrapGrpcProtocolBuilder(_underlying.useCustomCertificateTrustManager(certificatePath)),
  useCustomLoadBalancingPolicy: (policy, jsonPolicyConfig?: string) =>
    wrapGrpcProtocolBuilder(
      typeof jsonPolicyConfig === "undefined"
        ? _underlying.useCustomLoadBalancingPolicy(policy)
        : _underlying.useCustomLoadBalancingPolicy(policy, jsonPolicyConfig)
    ),
  usePickFirstLoadBalancingPolicy: () => wrapGrpcProtocolBuilder(_underlying.usePickFirstLoadBalancingPolicy()),
  usePickRandomLoadBalancingPolicy: () => wrapGrpcProtocolBuilder(_underlying.usePickRandomLoadBalancingPolicy()),
  useRoundRobinLoadBalancingPolicy: () => wrapGrpcProtocolBuilder(_underlying.useRoundRobinLoadBalancingPolicy()),
  unmatchedInboundMessageBufferSize: (max) =>
    wrapGrpcProtocolBuilder(_underlying.unmatchedInboundMessageBufferSize(max)),

  // Server configurations

  serverConfiguration: (serverConfigurationName) =>
    wrapGrpcServerConfigurationBuilder(_underlying.serverConfiguration(serverConfigurationName)),
  serverConfigurations: (...serverConfigurations) =>
    wrapGrpcProtocolBuilder(_underlying.serverConfigurations(serverConfigurations.map((config) => config._underlying)))
});

export const grpcProtocolBuilder = wrapGrpcProtocolBuilder(
  // GrpcDsl.grpc doesn't get properly generated by java2ts because of conflicts with methods of the same name
  Java.type<any>("io.gatling.javaapi.grpc.GrpcDsl").grpc
);
