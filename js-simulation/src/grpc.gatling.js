import { atOnceUsers, exec, scenario, simulation } from "@gatling.io/core";
import { grpc, response, statusCode } from "@gatling.io/grpc";

export default simulation((setUp) => {
  const greetingServerConfiguration = grpc
    .serverConfiguration("greeting")
    .forAddress("localhost", 50051)
    .overrideAuthority("gatling-grpc-demo-test-server");

  const calculatorServerConfiguration = grpc.serverConfiguration("calculator").forAddress("localhost", 50052);

  const grpcProtocol = grpc.serverConfigurations(greetingServerConfiguration, calculatorServerConfiguration);

  const serverStream = grpc("Prime Number Decomposition")
    .serverStream("calculator.CalculatorService/PrimeNumberDecomposition")
    .serverConfiguration("calculator");

  const bidiStream = grpc("Find Maximum")
    .bidiStream("calculator.CalculatorService/FindMaximum")
    .serverConfiguration("calculator");

  const scn = scenario("Greeting Unary").exec(
    grpc("Greet")
      .unary("greeting.GreetingService/Greet")
      .serverConfiguration("greeting")
      .send({
        greeting: {
          first_name: "John",
          last_name: "Doe"
        }
      })
      .check(statusCode().is("OK"), response((response) => response.result).isEL("Hello John Doe")),
    grpc("Sum")
      .unary("calculator.CalculatorService/Sum")
      .serverConfiguration("calculator")
      .send({
        first_number: 1,
        second_number: 2
      })
      .check(statusCode().is("OK"), response((response) => response.sum_result).is(3)),
    serverStream.send({ number: 109987656890 }),
    // without the forked Session
    serverStream.awaitStreamEndAndProcessUnmatchedMessages((messages, main) =>
      main.set("primeFactors", messages.length)
    ),
    bidiStream.start(),
    bidiStream.send({ number: 1 }),
    bidiStream.send({ number: 3 }),
    bidiStream.halfClose(),
    // with the forked Session
    bidiStream.awaitStreamEndAndProcessUnmatchedMessages((messages, main, forked) =>
      main.set("maximums", messages.length).set("forkedUserId", forked.userId())
    ),
    exec((session) => {
      console.log(
        `primeFactors: ${session.get("primeFactors")}, maximums: ${session.get("maximums")}, forkedUserId: ${session.get("forkedUserId")}`
      );
      return session;
    })
  );

  setUp(scn.injectOpen(atOnceUsers(5))).protocols(grpcProtocol);
});
