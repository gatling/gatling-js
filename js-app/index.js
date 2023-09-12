var PingPongClass = Java.type("poc.PingPong");
var pingPong = new PingPongClass("Received: ")
var pong = pingPong.ping("Hello World!")
console.log(pong)
