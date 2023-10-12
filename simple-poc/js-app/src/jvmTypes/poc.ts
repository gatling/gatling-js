interface PingPongConstructor {
  new (msg: string): PingPong;
}
interface PingPong {
  readonly class: any;
  ping(msg: String): String;
  pingFn(msg: String, f: (a: string) => string): String;
  testFn(a: any): void;
}
export const PingPong: PingPongConstructor = Java.type("poc.PingPong");
