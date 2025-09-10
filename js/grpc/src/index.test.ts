import { Simulation, atOnceUsers, scenario } from "@gatling.io/core";

import { grpc } from "./index";
import { asciiHeader, asciiTrailer, binaryHeader, binaryTrailer, statusCode, statusDescription } from "./checks";

const runSimulationMock = (_: Simulation): void => {};

const grpcProtocol = grpc
  .forAddress("host", 1234)
  .forTarget("dns:///host:1234")
  .asciiHeader("key")
  .value("value")
  .asciiHeader("key")
  .valueEl("#{value}")
  .asciiHeader("key")
  .value((session) => session.get<string>("value"))
  .asciiHeaders({ key: "value" })
  .binaryHeader("key")
  .value([118, 97, 108, 117, 101]) // FIXME "value".getBytes(UTF_8))
  .binaryHeader("key")
  .valueEl("#{value}")
  .binaryHeader("key")
  .value((session) => session.get<number[]>("value"))
  .binaryHeaders({ key: [118, 97, 108, 117, 101] }) // FIXME "value".getBytes(UTF_8)))
  /*.callCredentials(
    session ->
      new CallCredentials() {
    @Override
    public void applyRequestMetadata(
        RequestInfo requestInfo,
        Executor appExecutor,
        MetadataApplier applier) {}
    })*/
  //.channelCredentials(TlsChannelCredentials.create())
  //.channelCredentials(session -> TlsChannelCredentials.create())
  //.header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  //.value("value")
  //.header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  //.valueEl("#{value}")
  //.header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  //.value(session -> session.getString("value"))
  .overrideAuthority("io.gatling")
  .shareChannel()
  .shareSslContext()
  .usePlaintext()
  .useInsecureTrustManager()
  .useStandardTrustManager()
  .useCustomCertificateTrustManager("certificatePath")
  .useCustomLoadBalancingPolicy("pick_first")
  .useCustomLoadBalancingPolicy("pick_first", "{}") // FIXME
  .usePickFirstLoadBalancingPolicy()
  .usePickRandomLoadBalancingPolicy()
  .useRoundRobinLoadBalancingPolicy()
  .useChannelPool(4);

const sample = {
  param: "param"
};

// FIXME GrpcUnaryActionBuilder<SampleRequest, SampleResponse>
const statusCodeChecks = grpc("requestName")
  .unary("getSampleUnaryMethod") // FIXME
  .send({ sample })
  .check(
    statusCode().saveAs("statusCode").name("statusCode"),
    statusCode().find().saveAs("statusCode").name("statusCode"),
    statusCode().isEL("#{statusCode}"),
    statusCode().is("OK"),
    statusCode().is((session) => "OK"),
    statusCode().notEL("#{statusCode}"),
    statusCode().not("OK"),
    statusCode().not((session) => "OK"),
    statusCode().in("OK", "CANCELLED", "DEADLINE_EXCEEDED"),
    statusCode().in((session) => ["OK", "CANCELLED", "DEADLINE_EXCEEDED"])
  );

const unary = scenario("name")
  .exec(
    grpc("requestName")
      .unary("getSampleUnaryMethod") // FIXME
      .send({ sample })
      .deadlineAfter(1)
      .deadlineAfter({ amount: 1, unit: "seconds" })
      .check(statusCode().is("OK"))
      .check(statusDescription().is("OK"))
      // FIXME .check(statusCause().notExists())
      .check(asciiHeader("key").is("value"))
      .check(binaryHeader("key").is([118, 97, 108, 117, 101])) // FIXME "value".getBytes(UTF_8)))
      /*.check(
          header(
            Metadata.Key.of(
              "key",
              Metadata
                .ASCII_STRING_MARSHALLER))
            .is("value"))
        .check(response(SampleResponse::getResult).saveAs("result"))*/
      .check(asciiTrailer("key").is("value"))
      .check(binaryTrailer("key").is([118, 97, 108, 117, 101])) // FIXME "value".getBytes(UTF_8)))
      /*.check(
          trailer(
            Metadata.Key.of(
              "key",
              Metadata
                .ASCII_STRING_MARSHALLER))
            .is("value"))*/
      .check(
        statusCode().is("OK"),
        statusDescription().is("OK"),
        // FIXME statusCause().notExists(),
        asciiHeader("key").is("value"),
        binaryHeader("key").is([118, 97, 108, 117, 101]), // FIXME "value".getBytes(UTF_8)),
        /*header(
          Metadata.Key.of(
            "key",
            Metadata
              .ASCII_STRING_MARSHALLER))
          .is("value"),*/
        //response(SampleResponse::getResult).saveAs("result"),
        asciiTrailer("key").is("value"),
        binaryTrailer("key").is([118, 97, 108, 117, 101]) // FIXME "value".getBytes(UTF_8)),
        /*trailer(
          Metadata.Key.of(
            "key",
            Metadata
              .ASCII_STRING_MARSHALLER))
          .is("value")*/
      )
      .asciiHeader("key")
      .value("value")
      .asciiHeader("key")
      .valueEl("#{value}")
      .asciiHeader("key")
      .value((session) => session.get<string>("value"))
      .asciiHeaders({ key: "value" })
      .binaryHeader("key")
      .value([118, 97, 108, 117, 101]) // FIXME "value".getBytes(UTF_8))
      .binaryHeader("key")
      .valueEl("#{value}")
      .binaryHeader("key")
      .value((session) => session.get<number[]>("value"))
    /*.binaryHeaders(Map.of("key", "value".getBytes(UTF_8)))
          .header(
            Metadata.Key.of(
              "key", Metadata.ASCII_STRING_MARSHALLER))
          .value("value")
          .header(
            Metadata.Key.of(
              "key", Metadata.ASCII_STRING_MARSHALLER))
          .valueEl("#{value}")
          .header(
            Metadata.Key.of(
              "key", Metadata.ASCII_STRING_MARSHALLER))
          .value(session -> session.getString("value"))*/
  )
  .exec(
    grpc((session) => "requestName")
      .unary("getSampleUnaryMethod") // FIXME SampleServiceGrpc.getSampleUnaryMethod())
      .send((session) => ({ sample }))
  );

/*
GrpcServerStreamingServiceBuilder<SampleServerStreamingRequest, SampleServerStreamingResponse>
serverStream =
  grpc("streamRequestName")
    .serverStream(SampleServiceGrpc.getSampleServerStreamingMethod())
    .streamName("streamName")
    .deadlineAfter(1)
    .deadlineAfter(Duration.ofSeconds(1))
    .check(statusCode().is(Status.Code.OK))
    .check(statusDescription().is("OK"))
    .check(statusCause().notExists())
    .check(asciiHeader("key").is("value"))
    .check(binaryHeader("key").is("value".getBytes(UTF_8)))
    .check(
      header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
        .is("value"))
    .check(
      response(SampleServerStreamingResponse::getResult)
        .saveAs("result"))
    .check(asciiTrailer("key").is("value"))
    .check(binaryTrailer("key").is("value".getBytes(UTF_8)))
    .check(
      trailer(
        Metadata.Key.of(
          "key",
          Metadata.ASCII_STRING_MARSHALLER))
        .is("value"))
    .check(
      statusCode().is(Status.Code.OK),
      statusDescription().is("OK"),
      statusCause().notExists(),
      asciiHeader("key").is("value"),
      binaryHeader("key").is("value".getBytes(UTF_8)),
      header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
        .is("value"),
      response(SampleServerStreamingResponse::getResult)
        .saveAs("result"),
      asciiTrailer("key").is("value"),
      binaryTrailer("key").is("value".getBytes(UTF_8)),
      trailer(
        Metadata.Key.of(
          "key",
          Metadata.ASCII_STRING_MARSHALLER))
        .is("value"))
    .asciiHeader("key")
    .value("value")
    .asciiHeader("key")
    .valueEl("#{value}")
    .asciiHeader("key")
    .value(session -> session.getString("value"))
    .asciiHeaders(Map.of("key", "value"))
    .binaryHeader("key")
    .value("value".getBytes(UTF_8))
    .binaryHeader("key")
    .valueEl("#{value}")
    .binaryHeader("key")
    .value(session -> session.<byte[]>get("value"))
.binaryHeaders(Map.of("key", "value".getBytes(UTF_8)))
  .header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  .value("value")
  .header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  .valueEl("#{value}")
  .header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  .value(session -> session.getString("value"))
  .messageRequestName("#{messageRequestName}")
  .messageRequestName(session -> session.getString("messageRequestName"))
  .messageResponseTimePolicy(
    MessageResponseTimePolicy.FromLastMessageSent);

GrpcServerStreamingServiceBuilder<SampleServerStreamingRequest, SampleServerStreamingResponse>
_serverStreamWithStreamName =
  grpc("requestName")
    .serverStream(
      SampleServiceGrpc.getSampleServerStreamingMethod(),
      "streamName");

GrpcServerStreamingServiceBuilder<SampleServerStreamingRequest, SampleServerStreamingResponse>
_serverStreamCopyWithStreamName = serverStream.streamName("streamName");

ScenarioBuilder serverStreaming =
  scenario("name")
    .exec(
      serverStream.send(
        SampleServerStreamingRequest.newBuilder()
          .setSample(sample)
          .build()))
    .exec(
      serverStream.send(
        session ->
          SampleServerStreamingRequest.newBuilder()
            .setSample(sample)
            .build()))
    .exec(serverStream.awaitStreamEnd())
    .exec(serverStream.awaitStreamEnd((main, forked) -> forked))
    .exec(serverStream.cancel());

GrpcClientStreamingServiceBuilder<SampleClientStreamingRequest, SampleClientStreamingResponse>
clientStream =
  grpc("streamRequestName")
    .clientStream(SampleServiceGrpc.getSampleClientStreamingMethod())
    .streamName("streamName")
    .deadlineAfter(1)
    .deadlineAfter(Duration.ofSeconds(1))
    .check(statusCode().is(Status.Code.OK))
    .check(statusDescription().is("OK"))
    .check(statusCause().notExists())
    .check(asciiHeader("key").is("value"))
    .check(binaryHeader("key").is("value".getBytes(UTF_8)))
    .check(
      header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
        .is("value"))
    .check(
      response(SampleClientStreamingResponse::getResult)
        .saveAs("result"))
    .check(asciiTrailer("key").is("value"))
    .check(binaryTrailer("key").is("value".getBytes(UTF_8)))
    .check(
      trailer(
        Metadata.Key.of(
          "key",
          Metadata.ASCII_STRING_MARSHALLER))
        .is("value"))
    .check(
      statusCode().is(Status.Code.OK),
      statusDescription().is("OK"),
      statusCause().notExists(),
      asciiHeader("key").is("value"),
      binaryHeader("key").is("value".getBytes(UTF_8)),
      header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
        .is("value"),
      response(SampleClientStreamingResponse::getResult)
        .saveAs("result"),
      asciiTrailer("key").is("value"),
      binaryTrailer("key").is("value".getBytes(UTF_8)),
      trailer(
        Metadata.Key.of(
          "key",
          Metadata.ASCII_STRING_MARSHALLER))
        .is("value"))
    .asciiHeader("key")
    .value("value")
    .asciiHeader("key")
    .valueEl("#{value}")
    .asciiHeader("key")
    .value(session -> session.getString("value"))
    .asciiHeaders(Map.of("key", "value"))
    .binaryHeader("key")
    .value("value".getBytes(UTF_8))
    .binaryHeader("key")
    .valueEl("#{value}")
    .binaryHeader("key")
    .value(session -> session.<byte[]>get("value"))
.binaryHeaders(Map.of("key", "value".getBytes(UTF_8)))
  .header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  .value("value")
  .header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  .valueEl("#{value}")
  .header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  .value(session -> session.getString("value"))
  .messageRequestName("#{messageRequestName}")
  .messageRequestName(session -> session.getString("messageRequestName"))
  .messageResponseTimePolicy(
    MessageResponseTimePolicy.FromLastMessageSent);

ScenarioBuilder clientStreaming =
  scenario("name")
    .exec(
      clientStream.send(
        SampleClientStreamingRequest.newBuilder()
          .setSample(sample)
          .build()))
    .exec(
      clientStream.send(
        (session) ->
          SampleClientStreamingRequest.newBuilder()
            .setSample(sample)
            .build()))
    .exec(clientStream.cancel())
    .exec(clientStream.halfClose())
    .exec(clientStream.awaitStreamEnd())
    .exec(clientStream.awaitStreamEnd((main, forked) -> forked));

GrpcBidirectionalStreamingServiceBuilder<
  SampleBidirectionalStreamingRequest, SampleBidirectionalStreamingResponse>
bidiStream =
  grpc("streamRequestName")
    .bidiStream(SampleServiceGrpc.getSampleBidirectionalStreamingMethod())
    .streamName("streamName")
    .deadlineAfter(1)
    .deadlineAfter(Duration.ofSeconds(1))
    .check(statusCode().is(Status.Code.OK))
    .check(statusDescription().is("OK"))
    .check(statusCause().notExists())
    .check(asciiHeader("key").is("value"))
    .check(binaryHeader("key").is("value".getBytes(UTF_8)))
    .check(
      header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
        .is("value"))
    .check(
      response(SampleBidirectionalStreamingResponse::getResult)
        .saveAs("result"))
    .check(asciiTrailer("key").is("value"))
    .check(binaryTrailer("key").is("value".getBytes(UTF_8)))
    .check(
      trailer(
        Metadata.Key.of(
          "key",
          Metadata.ASCII_STRING_MARSHALLER))
        .is("value"))
    .check(
      statusCode().is(Status.Code.OK),
      statusDescription().is("OK"),
      statusCause().notExists(),
      asciiHeader("key").is("value"),
      binaryHeader("key").is("value".getBytes(UTF_8)),
      header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
        .is("value"),
      response(SampleBidirectionalStreamingResponse::getResult)
        .saveAs("result"),
      asciiTrailer("key").is("value"),
      binaryTrailer("key").is("value".getBytes(UTF_8)),
      trailer(
        Metadata.Key.of(
          "key",
          Metadata.ASCII_STRING_MARSHALLER))
        .is("value"))
    .asciiHeader("key")
    .value("value")
    .asciiHeader("key")
    .valueEl("#{value}")
    .asciiHeader("key")
    .value(session -> session.getString("value"))
    .asciiHeaders(Map.of("key", "value"))
    .binaryHeader("key")
    .value("value".getBytes(UTF_8))
    .binaryHeader("key")
    .valueEl("#{value}")
    .binaryHeader("key")
    .value(session -> session.<byte[]>get("value"))
.binaryHeaders(Map.of("key", "value".getBytes(UTF_8)))
  .header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  .value("value")
  .header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  .valueEl("#{value}")
  .header(Metadata.Key.of("key", Metadata.ASCII_STRING_MARSHALLER))
  .value(session -> session.getString("value"))
  .messageRequestName("#{messageRequestName}")
  .messageRequestName(session -> session.getString("messageRequestName"))
  .messageResponseTimePolicy(
    MessageResponseTimePolicy.FromLastMessageSent);

GrpcBidirectionalStreamingServiceBuilder<
  SampleBidirectionalStreamingRequest, SampleBidirectionalStreamingResponse>
_bidiStreamWithStreamName =
  grpc("requestName")
    .bidiStream(
      SampleServiceGrpc.getSampleBidirectionalStreamingMethod(),
      "streamName");

GrpcBidirectionalStreamingServiceBuilder<
  SampleBidirectionalStreamingRequest, SampleBidirectionalStreamingResponse>
_bidiStreamCopyWithStreamName = bidiStream.streamName("streamName");

ScenarioBuilder bidiStreaming =
  scenario("name")
    .exec(
      bidiStream.send(
        SampleBidirectionalStreamingRequest.newBuilder()
          .setSample(sample)
          .build()))
    .exec(
      bidiStream.send(
        (session) ->
          SampleBidirectionalStreamingRequest.newBuilder()
            .setSample(sample)
            .build()))
    .exec(bidiStream.cancel())
    .exec(bidiStream.halfClose())
    .exec(bidiStream.awaitStreamEnd())
    .exec(bidiStream.awaitStreamEnd((main, forked) -> forked));

private GrpcDynamic.FileDescriptorWrapper greetingFile1 =
  grpcDynamic.loadBinaryDescriptorFile(Paths.get("greeting.protoc"), "greeting.proto");
private GrpcDynamic.FileDescriptorWrapper greetingFile2 =
  grpcDynamic.loadBinaryDescriptorResource("greeting.protoc", "greeting.proto");
private GrpcDynamic.ServiceDescriptorWrapper greetingService =
  greetingFile2.service("GreetingService");
private GrpcDynamic.MethodDescriptorWrapper greetMethod = greetingService.method("Greet");
ScenarioBuilder dynamic =
  scenario("name")
    .exec(
      grpc("dynamic request")
        .unary(greetMethod.descriptor())
        .send(
          session -> {
            final var inputBuilder =
              greetMethod.newInputBuilder();
            final var greetingField =
              greetMethod
                .inputDescriptor()
                .findFieldByName("greeting");
            inputBuilder
              .getFieldBuilder(greetingField)
              .setField(
                greetingField
                  .getMessageType()
                  .findFieldByName(
                    "first_name"),
                "John")
              .setField(
                greetingField
                  .getMessageType()
                  .findFieldByName(
                    "last_name"),
                "Doe");
            return inputBuilder.build();
          })
        .check(
          response(
            (DynamicMessage response) ->
(String)
response.getField(
  greetMethod
    .outputDescriptor()
    .findFieldByName(
      "result")))
.saveAs("result")));
*/

runSimulationMock((setUp) => {
  setUp(
    unary.injectOpen(atOnceUsers(1)).protocols(grpcProtocol)
    //serverStreaming.injectOpen(atOnceUsers(1)).protocols(grpcProtocol),
    //clientStreaming.injectOpen(atOnceUsers(1)).protocols(grpcProtocol),
    //bidiStreaming.injectOpen(atOnceUsers(1)).protocols(grpcProtocol),
    //dynamic.injectOpen(atOnceUsers(1)).protocols(grpcProtocol)
  ).protocols(grpcProtocol);
});
