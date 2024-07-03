import JvmSession = io.gatling.javaapi.core.Session;

type JvmExpression<T> = (arg: JvmSession) => T;

interface ByteArrays {
  asByteArray(v: number[]): number[];
  asByteArrayFunction(f: JvmExpression<number[]>): JvmExpression<number[]>;
}

const ByteArrays = Java.type<ByteArrays>("io.gatling.js.callbacks.ByteArrays");

export const asByteArray = (v: number[]) => ByteArrays.asByteArray(v);

export const asByteArrayFunction = (f: JvmExpression<number[]>) => ByteArrays.asByteArrayFunction(f);
