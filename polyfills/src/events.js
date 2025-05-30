import events from "events";

// https://github.com/denoland/deno_std/blob/d005433c709054af87aca54f57a446b4f7966f11/node/events.ts#L501-L638
events.once = function (emitter, name) {
  return new Promise((resolve, reject) => {
    function eventListener(...args) {
      if (errorListener !== undefined) {
        emitter.removeListener("error", errorListener);
      }
      resolve(args);
    }

    let errorListener;
    if (name !== "error") {
      // deno-lint-ignore no-explicit-any
      errorListener = (err) => {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once("error", errorListener);
    }

    emitter.once(name, eventListener);
  });
};

events.on = function (emitter, name) {
  const unconsumedEventValues = [];
  const unconsumedPromises = [];
  let error = null;
  let finished = false;

  const iterator = {
    async next() {
      const value = unconsumedEventValues.shift();
      if (value) {
        return createIterResult(value, false);
      }

      if (error) {
        const p = Promise.reject(error);
        error = null;
        return p;
      }

      if (finished) {
        return createIterResult(undefined, true);
      }

      return new Promise((resolve, reject) => unconsumedPromises.push({ resolve, reject }));
    },
    async return() {
      emitter.removeListener(name, eventHandler);
      emitter.removeListener("error", errorHandler);
      finished = true;

      for (const promise of unconsumedPromises) {
        promise.resolve(createIterResult(undefined, true));
      }

      return createIterResult(undefined, true);
    },
    throw(err) {
      error = err;
      emitter.removeListener(name, eventHandler);
      emitter.removeListener("error", errorHandler);
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };

  emitter.on(name, eventHandler);
  emitter.on("error", errorHandler);

  return iterator;

  function eventHandler(...args) {
    const promise = unconsumedPromises.shift();
    if (promise) {
      promise.resolve(createIterResult(args, false));
    } else {
      unconsumedEventValues.push(args);
    }
  }

  function errorHandler(err) {
    finished = true;
    const toError = unconsumedPromises.shift();
    if (toError) {
      toError.reject(err);
    } else {
      error = err;
    }
    iterator.return();
  }
};

export default events;

export const { EventEmitter, defaultMaxListeners, init, listenerCount, on, once } = events;
