import { Command } from "commander";
import { ResolvedOptions } from "./resolveOptions";
import { findSimulations } from "../simulations";
import { resolveBundle } from "../dependencies";
import { logger } from "../log";
import { bundle } from "../bundle";
import { runSimulation } from "../run";

export default (opts: ResolvedOptions, program: Command): void => {
  program
    .command("run")
    .description(
      "Build and run a Gatling simulation, after installing all required components and dependencies for Gatling"
    )
    .addOption(opts.sourcesFolderOption)
    .addOption(opts.simulationOption)
    .addOption(opts.typescriptOption)
    .addOption(opts.bundleFileOption)
    .addOption(opts.resourcesFolderOption)
    .addOption(opts.resultsFolderOption)
    .addOption(opts.gatlingHomeOption)
    .addOption(opts.memoryOption)
    .addOption(opts.postmanOption)
    .addOption(opts.nonInteractiveOption)
    .addArgument(opts.runParametersArgument)
    .action(async (args: string[], options) => {
      const gatlingHome = opts.gatlingHomeOptionValueWithDefaults(options);
      const sourcesFolder = opts.sourcesFolderOptionValue(options);
      const bundleFile = opts.bundleFileOptionValue(options);
      const resourcesFolder = opts.resourcesFolderOptionValue(options);
      const resultsFolder = opts.resultsFolderOptionValue(options);
      const memory = opts.memoryOptionValue(options);
      const nonInteractive = opts.nonInteractiveOptionValue(options);
      const postman = opts.postmanOptionValueWithDefaults(options);
      const runParameters = opts.parseRunParametersArgument(args);

      const simulations = await findSimulations(sourcesFolder);
      const typescript = opts.typescriptOptionValueWithDefaults(options, simulations);
      const simulation = opts.simulationOptionValueWithDefaults(options, simulations, !nonInteractive);

      const { graalvmHome, jvmClasspath } = await resolveBundle({ gatlingHome });
      logger.debug(`graalvmHome=${graalvmHome}`);
      logger.debug(`jvmClasspath=${jvmClasspath}`);

      await bundle({ sourcesFolder, bundleFile, postman, typescript, simulations });

      await runSimulation({
        graalvmHome,
        jvmClasspath,
        simulation,
        bundleFile,
        resourcesFolder,
        resultsFolder,
        memory,
        runParameters
      });
    });
};
