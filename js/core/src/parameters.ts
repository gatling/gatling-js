import { System as JvmSystem } from "@gatling.io/jvm-types";

export interface GetWithDefault {
  (name: string): string | undefined;
  (name: string, defaultValue: string): string;
}

/**
 * Gets the option indicated by the specified name.
 *
 * Options can be specified in the `gatling run` command by passing arguments with the format `key=value`, e.g.
 * `gatling run option1=foo option2=bar`.
 *
 * @param key - the key of the option.
 * @param defaultValue - a default value
 * @returns the string value of the option if it is defined, or else `defaultValue` if provided, or else `undefined`.
 */
export const getOption: GetWithDefault = (key: string, defaultValue?: string) =>
  getOrElse(JvmSystem.getProperty(key), defaultValue) as any;

/**
 * Gets the environment variable indicated by the specified name.
 *
 * @param name - the name of the environment variable.
 * @param defaultValue - a default value
 * @returns the string value of the environment variable if it is defined, or else `defaultValue` if provided, or else `undefined`.
 */
export const getEnvironmentVariable: GetWithDefault = (name: string, defaultValue?: string) =>
  getOrElse(JvmSystem.getenv(name), defaultValue) as any;

const getOrElse = (value: string | null, defaultValue?: string): string | undefined =>
  typeof value === "string" ? value : defaultValue;
