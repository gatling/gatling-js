import { Command } from "commander";

import { bundleFileArgument, gatlingHomeOption, gatlingHomeOptionValueWithDefaults } from "./options";
import { installBundleFile, resolveBundle } from "../dependencies";
import { logger } from "../log";

export default (program: Command): void => {
  program
    .command("install")
    .description("Install all required components and dependencies for Gatling")
    .addOption(gatlingHomeOption)
    .addArgument(bundleFileArgument)
    .action(async (bundleFilePath: string | undefined, options) => {
      const gatlingHome = gatlingHomeOptionValueWithDefaults(options);
      const { graalvmHome, jvmClasspath } =
        bundleFilePath !== undefined
          ? await installBundleFile({ gatlingHome, bundleFilePath })
          : await resolveBundle({ gatlingHome });
      logger.info(`graalvmHome=${graalvmHome}`);
      logger.info(`jvmClasspath=${jvmClasspath}`);
    });
};
