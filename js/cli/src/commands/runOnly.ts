import { Command } from "commander";

import { ResolvedOptions } from "./resolveOptions";
import { runSimulation } from "../run";

export default (opts: ResolvedOptions, program: Command): void => {
  program
    .command("run-only")
    .description("Run a Gatling simulation from an already built bundle")
    .addOption(opts.graalvmHomeMandatoryOption)
    .addOption(opts.jvmClasspathMandatoryOption)
    .addOption(opts.simulationMandatoryOption)
    .addOption(opts.bundleFileOption)
    .addOption(opts.resourcesFolderOption)
    .addOption(opts.resultsFolderOption)
    .addOption(opts.memoryOption)
    .addArgument(opts.runParametersArgument)
    .action(async (args: string[], options) => {
      const graalvmHome = opts.graalvmHomeMandatoryOptionValue(options);
      const jvmClasspath = opts.jvmClasspathMandatoryOptionValue(options);
      const simulation = opts.simulationMandatoryOptionValue(options);
      const bundleFile = opts.bundleFileOptionValue(options);
      const resourcesFolder = opts.resourcesFolderOptionValue(options);
      const resultsFolder = opts.resultsFolderOptionValue(options);
      const memory = opts.memoryOptionValue(options);
      const runParameters = opts.parseRunParametersArgument(args);

      await runSimulation({
        graalvmHome,
        jvmClasspath,
        simulation: simulation,
        bundleFile,
        resourcesFolder,
        resultsFolder,
        memory,
        runParameters
      });
    });
};
