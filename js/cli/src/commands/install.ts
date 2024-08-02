import { Command } from "commander";

import { gatlingHomeOption, gatlingHomeOptionValueWithDefaults } from "./options";
import { installGatlingJs } from "../dependencies";
import { logger } from "../log";

export default (program: Command): void => {
  program
    .command("install")
    .description("Install all required components and dependencies for Gatling")
    .addOption(gatlingHomeOption)
    .action(async (options) => {
      const gatlingHome = gatlingHomeOptionValueWithDefaults(options);
      const { graalvmHome, coursierBinary, jvmClasspath } = await installGatlingJs({ gatlingHome });
      logger.info(`graalvmHome=${graalvmHome}`);
      logger.info(`coursierBinary=${coursierBinary}`);
      logger.info(`jvmClasspath=${jvmClasspath}`);
    });
};
