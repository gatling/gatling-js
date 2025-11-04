import { Session, Wrapper } from "@gatling.io/core";

import { GrpcDslAddons, ChannelCredentials, toJvmCredentials, underlyingSessionToCredentials } from "./grpc";
import { GrpcHeaders, wrapGrpcHeaders } from "./headers";

import JvmGrpcServerConfigurationBuilder = io.gatling.javaapi.grpc.GrpcServerConfigurationBuilder;

export interface GrpcServerConfigurationBuilder
  extends GrpcHeaders<GrpcServerConfigurationBuilder>,
    Wrapper<JvmGrpcServerConfigurationBuilder> {
  //public GrpcServerConfigurationBuilder callCredentials(@NonNull Function<Session, CallCredentials> credentials) {
  //public GrpcServerConfigurationBuilder callCredentials(@NonNull String credentials) {
  //public GrpcServerConfigurationBuilder callCredentials(@NonNull CallCredentials credentials) {

  channelCredentials(credentials: ChannelCredentials): GrpcServerConfigurationBuilder;
  channelCredentials(credentials: string): GrpcServerConfigurationBuilder;
  channelCredentials(credentials: (session: Session) => ChannelCredentials): GrpcServerConfigurationBuilder;
  forAddress(host: string, port: number): GrpcServerConfigurationBuilder;
  forTarget(target: string): GrpcServerConfigurationBuilder;
  overrideAuthority(authority: string): GrpcServerConfigurationBuilder;
  shareChannel(): GrpcServerConfigurationBuilder;
  shareSslContext(): GrpcServerConfigurationBuilder;
  useChannelPool(poolSize: number): GrpcServerConfigurationBuilder;
  usePlaintext(): GrpcServerConfigurationBuilder;
  useInsecureTrustManager(): GrpcServerConfigurationBuilder;
  useStandardTrustManager(): GrpcServerConfigurationBuilder;
  useCustomCertificateTrustManager(certificatePath: string): GrpcServerConfigurationBuilder;
  useCustomLoadBalancingPolicy(policy: string): GrpcServerConfigurationBuilder;
  useCustomLoadBalancingPolicy(policy: string, jsonPolicyConfig: string): GrpcServerConfigurationBuilder;
  usePickFirstLoadBalancingPolicy(): GrpcServerConfigurationBuilder;
  usePickRandomLoadBalancingPolicy(): GrpcServerConfigurationBuilder;
  useRoundRobinLoadBalancingPolicy(): GrpcServerConfigurationBuilder;
  unmatchedInboundMessageBufferSize(max: number): GrpcServerConfigurationBuilder;
}

export const wrapGrpcServerConfigurationBuilder = (
  _underlying: JvmGrpcServerConfigurationBuilder
): GrpcServerConfigurationBuilder => ({
  _underlying,
  ...wrapGrpcHeaders(_underlying, wrapGrpcServerConfigurationBuilder),

  //public GrpcProtocolBuilder callCredentials(@NonNull Function<Session, CallCredentials> credentials) {
  //public GrpcProtocolBuilder callCredentials(@NonNull String credentials) {
  //public GrpcProtocolBuilder callCredentials(@NonNull CallCredentials credentials) {

  channelCredentials: (credentials) =>
    wrapGrpcServerConfigurationBuilder(
      typeof credentials === "string"
        ? GrpcDslAddons.channelCredentialsEL(_underlying, credentials)
        : typeof credentials === "function"
          ? _underlying.channelCredentials(underlyingSessionToCredentials(credentials))
          : _underlying.channelCredentials(toJvmCredentials(credentials))
    ),
  forAddress: (host, port) => wrapGrpcServerConfigurationBuilder(_underlying.forAddress(host, port)),
  forTarget: (target) => wrapGrpcServerConfigurationBuilder(_underlying.forTarget(target)),
  overrideAuthority: (authority) => wrapGrpcServerConfigurationBuilder(_underlying.overrideAuthority(authority)),
  shareChannel: () => wrapGrpcServerConfigurationBuilder(_underlying.shareChannel()),
  shareSslContext: () => wrapGrpcServerConfigurationBuilder(_underlying.shareSslContext()),
  useChannelPool: (poolSize) => wrapGrpcServerConfigurationBuilder(_underlying.useChannelPool(poolSize)),
  usePlaintext: () => wrapGrpcServerConfigurationBuilder(_underlying.usePlaintext()),
  useInsecureTrustManager: () => wrapGrpcServerConfigurationBuilder(_underlying.useInsecureTrustManager()),
  useStandardTrustManager: () => wrapGrpcServerConfigurationBuilder(_underlying.useStandardTrustManager()),
  useCustomCertificateTrustManager: (certificatePath) =>
    wrapGrpcServerConfigurationBuilder(_underlying.useCustomCertificateTrustManager(certificatePath)),
  useCustomLoadBalancingPolicy: (policy, jsonPolicyConfig?: string) =>
    wrapGrpcServerConfigurationBuilder(
      typeof jsonPolicyConfig === "undefined"
        ? _underlying.useCustomLoadBalancingPolicy(policy)
        : _underlying.useCustomLoadBalancingPolicy(policy, jsonPolicyConfig)
    ),
  usePickFirstLoadBalancingPolicy: () =>
    wrapGrpcServerConfigurationBuilder(_underlying.usePickFirstLoadBalancingPolicy()),
  usePickRandomLoadBalancingPolicy: () =>
    wrapGrpcServerConfigurationBuilder(_underlying.usePickRandomLoadBalancingPolicy()),
  useRoundRobinLoadBalancingPolicy: () =>
    wrapGrpcServerConfigurationBuilder(_underlying.useRoundRobinLoadBalancingPolicy()),
  unmatchedInboundMessageBufferSize: (max) =>
    wrapGrpcServerConfigurationBuilder(_underlying.unmatchedInboundMessageBufferSize(max))
});
