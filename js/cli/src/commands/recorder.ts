import { Command } from "commander";

import {
  gatlingHomeOption,
  gatlingHomeOptionValueWithDefaults,
  resourcesFolderOption,
  resourcesFolderOptionValue,
  sourcesFolderOption,
  sourcesFolderOptionValue,
  typescriptOption,
  typescriptOptionValueWithDefaults
} from "./options";
import { findSimulations } from "../simulations";
import { installRecorder } from "../dependencies";
import { logger } from "../log";
import { runRecorder } from "../run";

export default (program: Command): void => {
  program
    .command("recorder")
    .description("Run the Gatling recorder")
    .addOption(gatlingHomeOption)
    .addOption(sourcesFolderOption)
    .addOption(typescriptOption)
    .addOption(resourcesFolderOption)
    .action(async (options) => {
      const gatlingHome: string = gatlingHomeOptionValueWithDefaults(options);
      const sourcesFolder: string = sourcesFolderOptionValue(options);
      const resourcesFolder: string = resourcesFolderOptionValue(options);

      const simulations = await findSimulations(sourcesFolder);
      const typescript = typescriptOptionValueWithDefaults(options, simulations);

      const { graalvmHome, coursierBinary, jvmClasspath } = await installRecorder({ gatlingHome });
      logger.debug(`graalvmHome=${graalvmHome}`);
      logger.debug(`coursierBinary=${coursierBinary}`);
      logger.debug(`jvmClasspath=${jvmClasspath}`);

      await runRecorder({ graalvmHome, jvmClasspath, sourcesFolder, typescript, resourcesFolder });
    });
};
