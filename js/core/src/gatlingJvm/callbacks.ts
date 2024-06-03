import JvmSession = io.gatling.javaapi.core.Session;

type JvmExpression<T> = (arg: JvmSession) => T;

type Callback<T, R> = (arg: T) => R;
type BiCallback<T, U, R> = (arg0: T, arg1: U) => R;

// interface CallbackWrapper {
//   // Byte arrays
//   wrapByteArray(v: number[]): number[];
//   wrapByteArrayFunction(f: JvmExpression<number[]>): JvmExpression<number[]>;
//   // Generic functions
//   wrapFunction<T, R>(f: Callback<T, R>): Callback<T, R>;
//   wrapBiFunction<T, U, R>(f: BiCallback<T, U, R>): BiCallback<T, U, R>;
// }
//
// const CallbackWrapper = Java.type<CallbackWrapper>("io.gatling.js.callbacks.CallbackWrapper");

// Byte arrays

export const wrapByteArray = (v: number[]) => v;

export const wrapByteArrayCallback = (f: JvmExpression<number[]>) => f;

// Generic functions

export const wrapCallback = <T, R>(f: Callback<T, R>): Callback<T, R> => f;

export const wrapBiCallback = <T, U, R>(f: BiCallback<T, U, R>): BiCallback<T, U, R> => f;
