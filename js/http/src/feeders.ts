import { HttpDsl as JvmHttpDsl } from "@gatling.io/jvm-types";

import { FileBasedFeederBuilder, wrapFileBasedFeederBuilder } from "@gatling.io/core";

/**
 * Bootstrap a feeder that reads from a sitemap XML file
 *
 * @param filePath - the path of the file, either relative to the root of the classpath, or absolute, expressed as a
 * Gatling Expression Language String
 * @returns the next DSL step
 */
export const sitemap = (filePath: string): FileBasedFeederBuilder<string> =>
  wrapFileBasedFeederBuilder(JvmHttpDsl.sitemap(filePath));
