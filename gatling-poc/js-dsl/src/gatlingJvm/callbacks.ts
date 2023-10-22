type Callback<T, R> = (arg: T) => R;
interface CallbackWrapper {
  wrap<T, R>(f: Callback<T, R>): Callback<T, R>;
}
const CallbackWrapper = Java.type<CallbackWrapper>("io.gatling.js.callbacks.CallbackWrapper");
export const wrapCallback = <T, R>(f: Callback<T, R>): Callback<T, R> => {
  return CallbackWrapper.wrap(f);
};
