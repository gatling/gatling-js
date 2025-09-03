import { Command } from "commander";

import { ResolvedOptions } from "./resolveOptions";
import { findSimulations } from "../simulations";
import { resolveBundle } from "../dependencies";
import { logger } from "../log";
import { runRecorder } from "../run";

export default (opts: ResolvedOptions, program: Command): void => {
  program
    .command("recorder")
    .description("Run the Gatling recorder")
    .addOption(opts.gatlingHomeOption)
    .addOption(opts.sourcesFolderOption)
    .addOption(opts.typescriptOption)
    .addOption(opts.resourcesFolderOption)
    .action(async (options) => {
      const gatlingHome = opts.gatlingHomeOptionValueWithDefaults(options);
      const sourcesFolder = opts.sourcesFolderOptionValue(options);
      const resourcesFolder = opts.resourcesFolderOptionValue(options);

      const simulations = await findSimulations(sourcesFolder);
      const typescript = opts.typescriptOptionValueWithDefaults(options, simulations);

      const { graalvmHome, jvmClasspath } = await resolveBundle({ gatlingHome });
      logger.debug(`graalvmHome=${graalvmHome}`);
      logger.debug(`jvmClasspath=${jvmClasspath}`);

      await runRecorder({ graalvmHome, jvmClasspath, sourcesFolder, typescript, resourcesFolder });
    });
};
