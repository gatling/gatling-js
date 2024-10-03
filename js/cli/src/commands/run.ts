import { Command } from "commander";
import {
  bundleFileOption,
  bundleFileOptionValue,
  gatlingHomeOption,
  gatlingHomeOptionValueWithDefaults,
  memoryOption,
  memoryOptionValue,
  nonInteractiveOption,
  nonInteractiveOptionValue,
  parseRunParametersArgument,
  resourcesFolderOption,
  resourcesFolderOptionValue,
  resultsFolderOption,
  resultsFolderOptionValue,
  runParametersArgument,
  simulationOption,
  simulationOptionValueWithDefaults,
  sourcesFolderOption,
  sourcesFolderOptionValue,
  typescriptOption,
  typescriptOptionValueWithDefaults
} from "./options";
import { findSimulations } from "../simulations";
import { installGatlingJs } from "../dependencies";
import { logger } from "../log";
import { bundle } from "../bundle";
import { runSimulation } from "../run";
import { resolveGatlingJsAgent } from "../dependencies/coursier";

export default (program: Command): void => {
  program
    .command("run")
    .description(
      "Build and run a Gatling simulation, after installing all required components and dependencies for Gatling"
    )
    .addOption(sourcesFolderOption)
    .addOption(simulationOption)
    .addOption(typescriptOption)
    .addOption(bundleFileOption)
    .addOption(resourcesFolderOption)
    .addOption(resultsFolderOption)
    .addOption(gatlingHomeOption)
    .addOption(memoryOption)
    .addOption(nonInteractiveOption)
    .addArgument(runParametersArgument)
    .action(async (args: string[], options) => {
      const gatlingHome = gatlingHomeOptionValueWithDefaults(options);
      const sourcesFolder: string = sourcesFolderOptionValue(options);
      const bundleFile = bundleFileOptionValue(options);
      const resourcesFolder: string = resourcesFolderOptionValue(options);
      const resultsFolder: string = resultsFolderOptionValue(options);
      const memory: number | undefined = memoryOptionValue(options);
      const nonInteractive: boolean = nonInteractiveOptionValue(options);
      const runParameters = parseRunParametersArgument(args);

      const simulations = await findSimulations(sourcesFolder);
      const typescript = typescriptOptionValueWithDefaults(options, simulations);
      const simulation = simulationOptionValueWithDefaults(options, simulations, !nonInteractive);

      const resolvedDependencies = await installGatlingJs({ gatlingHome });
      logger.debug(`graalvmHome=${resolvedDependencies.graalvmHome}`);
      logger.debug(`coursierBinary=${resolvedDependencies.coursierBinary}`);
      logger.debug(`jvmClasspath=${resolvedDependencies.jvmClasspath}`);
      const gatlingJsAgent = await resolveGatlingJsAgent(resolvedDependencies);
      logger.debug(`gatlingJsAgent=${gatlingJsAgent}`);

      await bundle({ sourcesFolder, bundleFile, typescript, simulations });

      await runSimulation({
        graalvmHome: resolvedDependencies.graalvmHome,
        jvmClasspath: resolvedDependencies.jvmClasspath,
        jsAgent: gatlingJsAgent,
        simulation,
        bundleFile,
        resourcesFolder,
        resultsFolder,
        memory,
        runParameters
      });
    });
};
