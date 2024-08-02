import { Command } from "commander";

import {
  bundleFileOption,
  bundleFileOptionValue,
  graalvmHomeMandatoryOption,
  graalvmHomeMandatoryOptionValue,
  jvmClasspathMandatoryOption,
  jvmClasspathMandatoryOptionValue,
  memoryOption,
  memoryOptionValue,
  parseRunParametersArgument,
  resourcesFolderOption,
  resourcesFolderOptionValue,
  resultsFolderOption,
  resultsFolderOptionValue,
  runParametersArgument,
  simulationMandatoryOption,
  simulationMandatoryOptionValue
} from "./options";
import { runSimulation } from "../run";

export default (program: Command): void => {
  program
    .command("run-only")
    .description("Run a Gatling simulation from an already built bundle")
    .addOption(graalvmHomeMandatoryOption)
    .addOption(jvmClasspathMandatoryOption)
    .addOption(simulationMandatoryOption)
    .addOption(bundleFileOption)
    .addOption(resourcesFolderOption)
    .addOption(resultsFolderOption)
    .addOption(memoryOption)
    .addArgument(runParametersArgument)
    .action(async (args: string[], options) => {
      const graalvmHome: string = graalvmHomeMandatoryOptionValue(options);
      const jvmClasspath: string = jvmClasspathMandatoryOptionValue(options);
      const simulation: string = simulationMandatoryOptionValue(options);
      const bundleFile = bundleFileOptionValue(options);
      const resourcesFolder: string = resourcesFolderOptionValue(options);
      const resultsFolder: string = resultsFolderOptionValue(options);
      const memory: number | undefined = memoryOptionValue(options);
      const runParameters = parseRunParametersArgument(args);

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
