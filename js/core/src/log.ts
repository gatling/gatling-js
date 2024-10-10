import { getEnvironmentVariable } from "./parameters";

const debug: (message: string) => void =
  getEnvironmentVariable("DEBUG") === "true" ? console.debug : () => {};

const info: (message: string) => void = console.info;

const error: (message: string) => void = console.error;

export interface Logger {
  debug: (message: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
}

export const logger: Logger = {
  debug,
  info,
  error
};
