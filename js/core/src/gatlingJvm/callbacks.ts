type Callback<T, R> = (arg: T) => R;
type BiCallback<T, U, R> = (arg0: T, arg1: U) => R;

interface CallbackWrapper {
  wrapFunction<T, R>(f: Callback<T, R>): Callback<T, R>;
  wrapBiFunction<T, U, R>(f: BiCallback<T, U, R>): BiCallback<T, U, R>;
}

const CallbackWrapper = Java.type<CallbackWrapper>("io.gatling.js.callbacks.CallbackWrapper");

export const wrapCallback = <T, R>(f: Callback<T, R>): Callback<T, R> => {
  return CallbackWrapper.wrapFunction(f);
};

export const wrapBiCallback = <T, U, R>(f: BiCallback<T, U, R>): BiCallback<T, U, R> => {
  return CallbackWrapper.wrapBiFunction(f);
};
