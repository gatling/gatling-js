#!/usr/bin/env node

import { Command } from "commander";

import { bundle } from "./bundle";
import { installGatlingJs, installRecorder, versions } from "./dependencies";
import { enterpriseDeploy, enterprisePackage, enterpriseStart } from "./enterprise";
import { findSimulations } from "./simulations";
import { logger } from "./log";
import { runRecorder, runSimulation } from "./run";

import {
  gatlingHomeOption,
  gatlingHomeOptionValueWithDefaults,
  sourcesFolderOption,
  sourcesFolderOptionValue,
  bundleFileOption,
  bundleFileOptionValue,
  typescriptOption,
  typescriptOptionValueWithDefaults,
  graalvmHomeMandatoryOption,
  graalvmHomeMandatoryOptionValue,
  jvmClasspathMandatoryOption,
  jvmClasspathMandatoryOptionValue,
  simulationMandatoryOption,
  simulationMandatoryOptionValue,
  resourcesFolderOption,
  resourcesFolderOptionValue,
  resultsFolderOption,
  resultsFolderOptionValue,
  memoryOption,
  memoryOptionValue,
  runParametersArgument,
  parseRunParametersArgument,
  simulationOption,
  simulationOptionValueWithDefaults,
  nonInteractiveOption,
  nonInteractiveOptionValue,
  packageFileOption,
  packageFileOptionValue,
  urlOption,
  urlOptionValue,
  apiTokenOption,
  apiTokenOptionValue,
  controlPlaneUrlOption,
  controlPlaneUrlOptionValue,
  packageDescriptorFilenameOption,
  packageDescriptorFilenameOptionValue,
  enterpriseSimulationOption,
  enterpriseSimulationOptionValue,
  runTitleOption,
  runTitleOptionValue,
  runDescriptionOption,
  runDescriptionOptionValue,
  waitForRunEndOption,
  waitForRunEndOptionValue
} from "./commands";

const program = new Command()
  .name("gatling-js-cli")
  .version(versions.gatling.jsAdapter)
  .description("The Gatling Javascript run & packaging tool");

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

program
  .command("build")
  .description("Build Gatling simulations")
  .addOption(sourcesFolderOption)
  .addOption(bundleFileOption)
  .addOption(typescriptOption)
  .action(async (options) => {
    const sourcesFolder: string = sourcesFolderOptionValue(options);
    const bundleFile = bundleFileOptionValue(options);

    const simulations = await findSimulations(sourcesFolder);
    const typescript = typescriptOptionValueWithDefaults(options, simulations);

    await bundle({ sourcesFolder, bundleFile, typescript, simulations });
  });

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

    const { graalvmHome, coursierBinary, jvmClasspath } = await installGatlingJs({ gatlingHome });
    logger.debug(`graalvmHome=${graalvmHome}`);
    logger.debug(`coursierBinary=${coursierBinary}`);
    logger.debug(`jvmClasspath=${jvmClasspath}`);

    await bundle({ sourcesFolder, bundleFile, typescript, simulations });

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

program
  .command("enterprise-package")
  .description("Build Gatling simulations and package them for Gatling Enterprise")
  .addOption(sourcesFolderOption)
  .addOption(resourcesFolderOption)
  .addOption(bundleFileOption)
  .addOption(packageFileOption)
  .addOption(typescriptOption)
  .action(async (options) => {
    const sourcesFolder: string = sourcesFolderOptionValue(options);
    const resourcesFolder: string = resourcesFolderOptionValue(options);
    const bundleFile = bundleFileOptionValue(options);
    const packageFile = packageFileOptionValue(options);

    const simulations = await findSimulations(sourcesFolder);
    const typescript = typescriptOptionValueWithDefaults(options, simulations);

    await bundle({ sourcesFolder, bundleFile, typescript, simulations });

    await enterprisePackage({ bundleFile, resourcesFolder, packageFile, simulations });
  });

program
  .command("enterprise-deploy")
  .description("Deploy a package and configured simulations")
  .addOption(sourcesFolderOption)
  .addOption(resourcesFolderOption)
  .addOption(bundleFileOption)
  .addOption(resultsFolderOption)
  .addOption(typescriptOption)
  .addOption(gatlingHomeOption)
  // Base
  .addOption(urlOption)
  .addOption(apiTokenOption)
  // Plugin configuration
  .addOption(controlPlaneUrlOption)
  .addOption(nonInteractiveOption)
  // Descriptor file
  .addOption(packageDescriptorFilenameOption)
  // Deployment info
  .addOption(packageFileOption)
  .action(async (options) => {
    const sourcesFolder: string = sourcesFolderOptionValue(options);

    const simulations = await findSimulations(sourcesFolder);
    const typescript = typescriptOptionValueWithDefaults(options, simulations);

    const resourcesFolder: string = resourcesFolderOptionValue(options);
    const bundleFile = bundleFileOptionValue(options);
    const resultsFolder: string = resultsFolderOptionValue(options);
    const gatlingHome = gatlingHomeOptionValueWithDefaults(options);
    const url = urlOptionValue(options);
    const apiToken = apiTokenOptionValue(options);
    const controlPlaneUrl = controlPlaneUrlOptionValue(options);
    const nonInteractive = nonInteractiveOptionValue(options);
    const packageDescriptorFilename = packageDescriptorFilenameOptionValue(options);
    const packageFile = packageFileOptionValue(options);

    const { graalvmHome, jvmClasspath } = await installGatlingJs({ gatlingHome });
    await bundle({ sourcesFolder, bundleFile, typescript, simulations });
    await enterprisePackage({ bundleFile, resourcesFolder, packageFile, simulations });
    await enterpriseDeploy({
      graalvmHome,
      jvmClasspath,
      bundleFile,
      resourcesFolder,
      resultsFolder,
      url,
      apiToken,
      controlPlaneUrl,
      nonInteractive,
      packageDescriptorFilename,
      packageFile
    });
  });

program
  .command("enterprise-start")
  .description("Start a simulation deployed with `enterprise-deploy`")
  .addOption(sourcesFolderOption)
  .addOption(resourcesFolderOption)
  .addOption(bundleFileOption)
  .addOption(resultsFolderOption)
  .addOption(typescriptOption)
  .addOption(gatlingHomeOption)
  // Base
  .addOption(urlOption)
  .addOption(apiTokenOption)
  // Plugin configuration
  .addOption(controlPlaneUrlOption)
  .addOption(nonInteractiveOption)
  // Descriptor file
  .addOption(packageDescriptorFilenameOption)
  // Deployment info
  .addOption(packageFileOption)
  // Start
  .addOption(enterpriseSimulationOption)
  .addOption(runTitleOption)
  .addOption(runDescriptionOption)
  .addOption(waitForRunEndOption)
  .action(async (options) => {
    const sourcesFolder: string = sourcesFolderOptionValue(options);

    const simulations = await findSimulations(sourcesFolder);
    const typescript = typescriptOptionValueWithDefaults(options, simulations);

    const resourcesFolder: string = resourcesFolderOptionValue(options);
    const bundleFile = bundleFileOptionValue(options);
    const resultsFolder: string = resultsFolderOptionValue(options);
    const gatlingHome = gatlingHomeOptionValueWithDefaults(options);
    const url = urlOptionValue(options);
    const apiToken = apiTokenOptionValue(options);
    const controlPlaneUrl = controlPlaneUrlOptionValue(options);
    const nonInteractive = nonInteractiveOptionValue(options);
    const packageDescriptorFilename = packageDescriptorFilenameOptionValue(options);
    const packageFile = packageFileOptionValue(options);
    const enterpriseSimulation = enterpriseSimulationOptionValue(options);
    const runTitle = runTitleOptionValue(options);
    const runDescription = runDescriptionOptionValue(options);
    const waitForRunEnd = waitForRunEndOptionValue(options);

    if (nonInteractiveOptionValue(options) && enterpriseSimulation === undefined) {
      throw new Error(`No simulation specified when using non-interactive mode`);
    }

    const { graalvmHome, jvmClasspath } = await installGatlingJs({ gatlingHome });
    await bundle({ sourcesFolder, bundleFile, typescript, simulations });
    await enterprisePackage({ bundleFile, resourcesFolder, packageFile, simulations });
    await enterpriseStart({
      graalvmHome,
      jvmClasspath,
      bundleFile,
      resourcesFolder,
      resultsFolder,
      url,
      apiToken,
      controlPlaneUrl,
      nonInteractive,
      packageDescriptorFilename,
      packageFile,
      enterpriseSimulation,
      runTitle,
      runDescription,
      waitForRunEnd
    });
  });

program.parse(process.argv);
