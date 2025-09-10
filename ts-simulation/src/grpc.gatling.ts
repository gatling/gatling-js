import { simulation, scenario, atOnceUsers, getParameter } from "@gatling.io/core";
import { grpc, response, statusCode } from "@gatling.io/grpc";

export default simulation((setUp) => {
  const grpcProtocol = grpc.forAddress("localhost", 50051).usePlaintext();

  const unary = scenario("Greeting Unary").exec(
    grpc("Greet")
      .unary("greeting.GreetingService/Greet")
      .send({
        greeting: {
          firstName: "Salutations",
          lastName: "Maximales"
        }
      })
      .check(
        statusCode().is((_) => "OK"),
        response((response: any) => response.result).isEL("Hello Salutations Maximales")
        //response((response: any) => response.result).isEL("Hello #{firstName} #{lastName}")
      )
  );

  const name = getParameter("grpc.scenario");
  let scn;
  if (name == "unary") {
    scn = unary;
  } else {
    scn = unary;
  }

  setUp(scn.injectOpen(atOnceUsers(5)))
    .protocols(grpcProtocol);
});
