interface PingPongConstructor {
  new (msg: string): PingPong;
}
interface PingPong {
  readonly class: any;
  ping(msg: String): String;
}
export const PingPong: PingPongConstructor = Java.type("poc.PingPong");
