import { atOnceUsers, scenario, simulation } from "@gatling.io/core";
import { grpc, response, statusCode } from "@gatling.io/grpc";

export default simulation((setUp) => {
  const grpcProtocol = grpc
    .forAddress("localhost", 50051)
    .overrideAuthority("gatling-grpc-demo-test-server");

  const scn = scenario("Greeting Unary").exec(
    grpc("Greet")
      .unary("greeting.GreetingService/Greet")
      .send({
        greeting: {
          first_name: "John",
          last_name: "Doe"
        }
      })
      .check(
        statusCode().is("OK"),
        response((response) => response.result).isEL("Hello John Doe")
      )
  );

  setUp(scn.injectOpen(atOnceUsers(5))).protocols(grpcProtocol);
});
