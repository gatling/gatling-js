import { System as JvmSystem } from "@gatling.io/jvm-types";

export interface GetWithDefault {
  (name: string): string | undefined;
  (name: string, defaultValue: string): string;
}

/**
 * Gets the parameter indicated by the specified name.
 *
 * Parameters can be specified in the `gatling run` command by passing arguments with the format `key=value`, e.g.
 * `gatling run parameter1=foo parameter2=bar`. You would then retrieve them in your simulation by calling
 * `getParameter("parameter1")` and `getParameter("parameter2")`.
 *
 * @param key - the key of the parameter.
 * @param defaultValue - a default value
 * @returns the string value of the parameter if it is defined, or else `defaultValue` if provided, or else `undefined`.
 */
export const getParameter: GetWithDefault = (key: string, defaultValue?: string) =>
  getOrElse(JvmSystem.getProperty(key), defaultValue) as any;

/**
 * @deprecated Use {@link getParameter} instead.
 */
export const getOption: GetWithDefault = getParameter;

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
