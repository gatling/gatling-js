const global = globalThis;
export { global };

export { Buffer } from "buffer";

// These values are used by some of the JSPM polyfills
export const navigator = {
  deviceMemory: 8, // Highest allowed value
  hardwareConcurrency: 8, // Fairly common default
  language: "en-US", // Most common default
};

export * as crypto from "crypto"
