import { PingPong } from "./jvmTypes/poc";

var pingPong = new PingPong("Received: ");
var pong = pingPong.ping("Hello World!");
console.log(pong);
