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
  postmanOption,
  postmanOptionValueWithDefaults,
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
    .addOption(postmanOption)
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
      const postman = postmanOptionValueWithDefaults(options);
      const runParameters = parseRunParametersArgument(args);

      const simulations = await findSimulations(sourcesFolder);
      const typescript = typescriptOptionValueWithDefaults(options, simulations);
      const simulation = simulationOptionValueWithDefaults(options, simulations, !nonInteractive);

      const { graalvmHome, coursierBinary, jvmClasspath } = await installGatlingJs({ gatlingHome, postman });
      logger.debug(`graalvmHome=${graalvmHome}`);
      logger.debug(`coursierBinary=${coursierBinary}`);
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
