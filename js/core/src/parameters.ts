import { System as JvmSystem } from "@gatling.io/jvm-types";

export interface GetWithDefault {
  (name: string): string | undefined;
  (name: string, defaultValue: string): string;
}

/**
 * Gets the parameter indicated by the specified name.
 *
 * Parameters can be specified in the `gatling run` command by passing arguments with the format `key=value`, e.g.
 * `gatling run param1=foo param2=bar`.
 *
 * @param name - the name of the property.
 * @param defaultValue - a default value
 * @returns the string value of the property if it is defined, or else `defaultValue` if provided, or else `undefined`.
 */
export const getParameter: GetWithDefault = (name: string, defaultValue?: string) =>
  getOrElse(JvmSystem.getProperty(name), defaultValue) as any;

/**
 * Gets the environment variable indicated by the specified name.
 *
 * @param name - the name of the property.
 * @param defaultValue - a default value
 * @returns the string value of the property if it is defined, or else `defaultValue` if provided, or else `undefined`.
 */
export const getEnvironmentVariable: GetWithDefault = (name: string, defaultValue?: string) =>
  getOrElse(JvmSystem.getenv(name), defaultValue) as any;

const getOrElse = (value: string | null, defaultValue?: string): string | undefined =>
  typeof value === "string" ? value : defaultValue;
