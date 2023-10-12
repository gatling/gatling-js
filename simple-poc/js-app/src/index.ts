import { PingPong } from "./jvmTypes/poc";

var pingPong = new PingPong("Received: ");
var pong = pingPong.ping("Hello World!");
console.log(pong);

pingPong.testFn((a: string): string => a);

pong = pingPong.pingFn("Hello World!", (a) => `function received param '${a}'`);
console.log(pong);
