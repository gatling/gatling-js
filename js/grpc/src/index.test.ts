import { Session, Simulation, atOnceUsers, scenario } from "@gatling.io/core";

import { grpc } from "./index";
import {
  asciiHeader,
  asciiTrailer,
  binaryHeader,
  binaryTrailer,
  response,
  statusCode,
  statusDescription
} from "./checks";

const runSimulationMock = (_: Simulation): void => {};

const defaultServerConfiguration = grpc.serverConfiguration("defaultServerConfiguration").forTarget("target");

const serverConfiguration1 = grpc.serverConfiguration("serverConfiguration1").forTarget("target");

const serverConfiguration2 = grpc.serverConfiguration("serverConfiguration2").forTarget("target");

const serverConfiguration3 = grpc
  .serverConfiguration("serverConfiguration3")
  .forAddress("host", 1234)
  .forTarget("dns:///host:1234")
  .asciiHeader("key")
  .value("value")
  .asciiHeader("key")
  .valueEL("#{value}")
  .asciiHeader("key")
  .value((session: Session) => session.get<string>("value"))
  .asciiHeaders({ key: "value" })
  .binaryHeader("key")
  .value([118, 97, 108, 117, 101]) // FIXME "value".getBytes(UTF_8))
  .binaryHeader("key")
  .valueEL("#{value}")
  .binaryHeader("key")
  .value((session: Session) => session.get<number[]>("value"))
  .binaryHeaders({ key: [118, 97, 108, 117, 101] }) // FIXME "value".getBytes(UTF_8)))
  /*.callCredentials((_: Session) => ({
      requestInfo,
      appExecutor,
      applier
  }))*/
  //.channelCredentials(TlsChannelCredentials.create())
  //.channelCredentials(session -> TlsChannelCredentials.create())
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

const grpcProtocol = grpc
  .forAddress("host", 1234)
  .forTarget("dns:///host:1234")
  .asciiHeader("key")
  .value("value")
  .asciiHeader("key")
  .valueEL("#{value}")
  .asciiHeader("key")
  .value((session: Session) => session.get<string>("value"))
  .asciiHeaders({ key: "value" })
  .binaryHeader("key")
  .value([118, 97, 108, 117, 101]) // FIXME "value".getBytes(UTF_8))
  .binaryHeader("key")
  .valueEL("#{value}")
  .binaryHeader("key")
  .value((session: Session) => session.get<number[]>("value"))
  .binaryHeaders({ key: [118, 97, 108, 117, 101] }) // FIXME "value".getBytes(UTF_8)))
  /*.callCredentials((_: Session) => ({
      requestInfo,
      appExecutor,
      applier
  }))*/
  //.channelCredentials(TlsChannelCredentials.create())
  //.channelCredentials(session -> TlsChannelCredentials.create())
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
  .useChannelPool(4)
  .serverConfigurations(serverConfiguration1, serverConfiguration2, serverConfiguration3);

const sample = {
  param: "param"
};

// FIXME GrpcUnaryActionBuilder<SampleRequest, SampleResponse>
const statusCodeChecks = grpc("requestName")
  .unary("sample.SampleService/SampleUnary")
  .serverConfiguration("serverConfiguration")
  .send({ sample })
  .check(
    statusCode().saveAs("statusCode").name("statusCode"),
    statusCode().find().saveAs("statusCode").name("statusCode"),
    statusCode().isEL("#{statusCode}"),
    statusCode().is("OK"),
    statusCode().is((_: Session) => "OK"),
    statusCode().notEL("#{statusCode}"),
    statusCode().not("OK"),
    statusCode().not((_: Session) => "OK"),
    statusCode().in("OK", "CANCELLED", "DEADLINE_EXCEEDED"),
    statusCode().in((_: Session) => ["OK", "CANCELLED", "DEADLINE_EXCEEDED"])
  );

const unary = scenario("name")
  .exec(
    grpc("requestName")
      .unary("sample.SampleService/SampleUnary")
      .serverConfiguration("serverConfiguration")
      .send({ sample })
      .deadlineAfter(1)
      .deadlineAfter({ amount: 1, unit: "seconds" })
      .check(statusCode().is("OK"))
      .check(statusDescription().is("OK"))
      .check(asciiHeader("key").is("value"))
      .check(binaryHeader("key").is([118, 97, 108, 117, 101])) // FIXME "value".getBytes(UTF_8)))
      .check(response((response: any) => response.result).saveAs("result"))
      .check(asciiTrailer("key").is("value"))
      .check(binaryTrailer("key").is([118, 97, 108, 117, 101])) // FIXME "value".getBytes(UTF_8)))
      .check(
        statusCode().is("OK"),
        statusDescription().is("OK"),
        asciiHeader("key").is("value"),
        binaryHeader("key").is([118, 97, 108, 117, 101]), // FIXME "value".getBytes(UTF_8)),
        response((response: any) => response.result).saveAs("result"),
        asciiTrailer("key").is("value"),
        binaryTrailer("key").is([118, 97, 108, 117, 101]) // FIXME "value".getBytes(UTF_8))
      )
      .asciiHeader("key")
      .value("value")
      .asciiHeader("key")
      .valueEL("#{value}")
      .asciiHeader("key")
      .value((session: Session) => session.get<string>("value"))
      .asciiHeaders({ key: "value" })
      .binaryHeader("key")
      .value([118, 97, 108, 117, 101]) // FIXME "value".getBytes(UTF_8))
      .binaryHeader("key")
      .valueEL("#{value}")
      .binaryHeader("key")
      .value((session: Session) => session.get<number[]>("value"))
      .binaryHeaders({ key: [118, 97, 108, 117, 101] }) // FIXME "value".getBytes(UTF_8)))
  )
  .exec(
    grpc((_: Session) => "requestName")
      .unary("getSampleUnaryMethod") // FIXME SampleServiceGrpc.getSampleUnaryMethod())
      .send((_: Session) => ({ sample }))
  );

const serverStream = grpc("streamRequestName")
  .serverStream("sample.SampleService/SampleServerStreaming")
  .serverConfiguration("serverConfiguration")
  .streamName("streamName")
  .deadlineAfter(1)
  .deadlineAfter({ amount: 1, unit: "seconds" })
  .check(statusCode().is("OK"))
  .check(statusDescription().is("OK"))
  .check(asciiHeader("key").is("value"))
  .check(binaryHeader("key").is([118, 97, 108, 117, 101])) // FIXME "value".getBytes(UTF_8)))
  .check(response((response: any) => response.result).saveAs("result"))
  .check(asciiTrailer("key").is("value"))
  .check(binaryTrailer("key").is([118, 97, 108, 117, 101])) // FIXME "value".getBytes(UTF_8)))
  .check(
    statusCode().is("OK"),
    statusDescription().is("OK"),
    asciiHeader("key").is("value"),
    binaryHeader("key").is([118, 97, 108, 117, 101]), // FIXME "value".getBytes(UTF_8)),
    response((response: any) => response.result).saveAs("result"),
    asciiTrailer("key").is("value"),
    binaryTrailer("key").is([118, 97, 108, 117, 101])
  ) // FIXME "value".getBytes(UTF_8)),
  .asciiHeader("key")
  .value("value")
  .asciiHeader("key")
  .valueEL("#{value}")
  .asciiHeader("key")
  .value((session: Session) => session.get<string>("value"))
  .asciiHeaders({ key: "value" })
  .binaryHeader("key")
  .value([118, 97, 108, 117, 101]) // FIXME "value".getBytes(UTF_8))
  .binaryHeader("key")
  .valueEL("#{value}")
  .binaryHeader("key")
  .value((session: Session) => session.get<number[]>("value"))
  .binaryHeaders({ key: [118, 97, 108, 117, 101] }) // "value".getBytes(UTF_8)))
  .messageRequestName("#{messageRequestName}")
  .messageRequestName((session: Session) => session.get<string>("messageRequestName"))
  .messageResponseTimePolicy("FROM_LAST_MESSAGE_SENT");

const _serverStreamWithStreamName = grpc("requestName").serverStream(
  "sample.SampleService/SampleServerStreaming",
  "streamName"
);

const _serverStreamCopyWithStreamName = serverStream.streamName("streamName");

const serverStreaming = scenario("name")
  .exec(serverStream.send({ sample }))
  .exec(serverStream.send((_: Session) => ({ sample })))
  .exec(serverStream.awaitStreamEnd())
  .exec(serverStream.awaitStreamEnd((_: Session, forked: Session) => forked))
  .exec(serverStream.cancel());

const clientStream = grpc("streamRequestName")
  .clientStream("sample.SampleService/SampleClientStreaming")
  .serverConfiguration("serverConfiguration")
  .streamName("streamName")
  .deadlineAfter(1)
  .deadlineAfter({ amount: 1, unit: "seconds" })
  .check(statusCode().is("OK"))
  .check(statusDescription().is("OK"))
  .check(asciiHeader("key").is("value"))
  .check(binaryHeader("key").is([118, 97, 108, 117, 101])) // FIXME "value".getBytes(UTF_8)))
  .check(response((response: any) => response.result).saveAs("result"))
  .check(asciiTrailer("key").is("value"))
  .check(binaryTrailer("key").is([118, 97, 108, 117, 101])) // FIXME "value".getBytes(UTF_8)))
  .check(
    statusCode().is("OK"),
    statusDescription().is("OK"),
    asciiHeader("key").is("value"),
    binaryHeader("key").is([118, 97, 108, 117, 101]), // FIXME "value".getBytes(UTF_8)),
    response((response: any) => response.result).saveAs("result"),
    asciiTrailer("key").is("value"),
    binaryTrailer("key").is([118, 97, 108, 117, 101])
  ) // FIXME "value".getBytes(UTF_8))
  .asciiHeader("key")
  .value("value")
  .asciiHeader("key")
  .valueEL("#{value}")
  .asciiHeader("key")
  .value((session: Session) => session.get<string>("value"))
  .asciiHeaders({ key: "value" })
  .binaryHeader("key")
  .value([118, 97, 108, 117, 101]) // FIXME "value".getBytes(UTF_8))
  .binaryHeader("key")
  .valueEL("#{value}")
  .binaryHeader("key")
  .value((session: Session) => session.get<number[]>("value"))
  .binaryHeaders({ key: [118, 97, 108, 117, 101] }) // FIXME "value".getBytes(UTF_8)))
  .messageRequestName("#{messageRequestName}")
  .messageRequestName((session: Session) => session.get<string>("messageRequestName"))
  .messageResponseTimePolicy("FROM_LAST_MESSAGE_SENT");

const clientStreaming = scenario("name")
  .exec(clientStream.send({ sample }))
  .exec(clientStream.send((_: Session) => ({ sample })))
  .exec(clientStream.cancel())
  .exec(clientStream.halfClose())
  .exec(clientStream.awaitStreamEnd())
  .exec(clientStream.awaitStreamEnd((_: Session, forked: Session) => forked));

const bidiStream = grpc("streamRequestName")
  .bidiStream("sample.SampleService/SampleBidirectionalStreaming")
  .serverConfiguration("serverConfiguration")
  .streamName("streamName")
  .deadlineAfter(1)
  .deadlineAfter({ amount: 1, unit: "seconds" })
  .check(statusCode().is("OK"))
  .check(statusDescription().is("OK"))
  .check(asciiHeader("key").is("value"))
  .check(binaryHeader("key").is([118, 97, 108, 117, 101])) // FIXME "value".getBytes(UTF_8)))
  .check(response((response: any) => response.result).saveAs("result"))
  .check(asciiTrailer("key").is("value"))
  .check(binaryTrailer("key").is([118, 97, 108, 117, 101])) // FIXME "value".getBytes(UTF_8)))
  .check(
    statusCode().is("OK"),
    statusDescription().is("OK"),
    asciiHeader("key").is("value"),
    binaryHeader("key").is([118, 97, 108, 117, 101]), // FIXME "value".getBytes(UTF_8)),
    response((response: any) => response.result).saveAs("result"),
    asciiTrailer("key").is("value"),
    binaryTrailer("key").is([118, 97, 108, 117, 101])
  ) // FIXME "value".getBytes(UTF_8))
  .asciiHeader("key")
  .value("value")
  .asciiHeader("key")
  .valueEL("#{value}")
  .asciiHeader("key")
  .value((session: Session) => session.get<string>("value"))
  .asciiHeaders({ key: "value" })
  .binaryHeader("key")
  .value([118, 97, 108, 117, 101]) // FIXME "value".getBytes(UTF_8))
  .binaryHeader("key")
  .valueEL("#{value}")
  .binaryHeader("key")
  .value((session: Session) => session.get<number[]>("value"))
  .binaryHeaders({ key: [118, 97, 108, 117, 101] }) // FIXME "value".getBytes(UTF_8)))
  .messageRequestName("#{messageRequestName}")
  .messageRequestName((session: Session) => session.get<string>("messageRequestName"))
  .messageResponseTimePolicy("FROM_LAST_MESSAGE_SENT");

const _bidiStreamWithStreamName = grpc("requestName").bidiStream("sample.SampleService/SampleBidirectionalStreaming");

const _bidiStreamCopyWithStreamName = bidiStream.streamName("streamName");

const bidiStreaming = scenario("name")
  .exec(bidiStream.send({ sample }))
  .exec(bidiStream.send((_: Session) => ({ sample })))
  .exec(bidiStream.cancel())
  .exec(bidiStream.halfClose())
  .exec(bidiStream.awaitStreamEnd())
  .exec(bidiStream.awaitStreamEnd((_: Session, forked: Session) => forked));

runSimulationMock((setUp) => {
  setUp(
    unary.injectOpen(atOnceUsers(1)).protocols(grpcProtocol),
    serverStreaming.injectOpen(atOnceUsers(1)).protocols(grpcProtocol),
    clientStreaming.injectOpen(atOnceUsers(1)).protocols(grpcProtocol),
    bidiStreaming.injectOpen(atOnceUsers(1)).protocols(grpcProtocol)
  ).protocols(grpcProtocol);
});
