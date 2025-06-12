import { Command } from "commander";

import { ResolvedOptions } from "./resolveOptions";
import { installBundleFile, resolveBundle } from "../dependencies";
import { logger } from "../log";

export default (opts: ResolvedOptions, program: Command): void => {
  program
    .command("install")
    .description("Install all required components and dependencies for Gatling")
    .addOption(opts.gatlingHomeOption)
    .addArgument(opts.bundleFileArgument)
    .action(async (bundleFilePath: string | undefined, options) => {
      const gatlingHome = opts.gatlingHomeOptionValueWithDefaults(options);
      const { graalvmHome, jvmClasspath } =
        bundleFilePath !== undefined
          ? await installBundleFile({ gatlingHome, bundleFilePath })
          : await resolveBundle({ gatlingHome });
      logger.info(`graalvmHome=${graalvmHome}`);
      logger.info(`jvmClasspath=${jvmClasspath}`);
    });
};
