const debug: (message: string) => void =
  // On Node.js, console.debug is just an alias to console.log, so we handle debug level ourselves
  process.env["DEBUG"] === "true" ? console.debug : () => {};

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
