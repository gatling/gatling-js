import { atOnceUsers, scenario, simulation } from "@gatling.io/core";
import { grpc, response, statusCode } from "@gatling.io/grpc";

export default simulation((setUp) => {
  const greetingServerConfiguration = grpc
    .serverConfiguration("greeting")
    .forAddress("localhost", 50051)
    .overrideAuthority("gatling-grpc-demo-test-server");

  const calculatorServerConfiguration = grpc.serverConfiguration("calculator").forAddress("localhost", 50052);

  const grpcProtocol = grpc.serverConfigurations(greetingServerConfiguration, calculatorServerConfiguration);

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
      .check(statusCode().is("OK"), response((response) => response.sum_result).is(3))
  );

  setUp(scn.injectOpen(atOnceUsers(5))).protocols(grpcProtocol);
});
