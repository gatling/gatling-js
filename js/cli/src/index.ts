#!/usr/bin/env node

import { Command, Option } from "commander";
import os from "os";

import { bundle } from "./bundle";
import { installGatlingJs, installRecorder } from "./dependencies";
import { EnterpriseDeployOptions, enterpriseDeploy, enterprisePackage, enterpriseStart } from "./enterprise";
import { SimulationFile, findSimulations } from "./simulations";
import { logger } from "./log";
import { keyInSelectPaginated } from "./readline";
import { runRecorder, runSimulation } from "./run";

const program = new Command()
  .name("gatling-js-cli")
  .version("0.0.1")
  .description("The Gatling Javascript run & packaging tool");

const gatlingHomeOption = new Option(
  "--gatling-home <value>",
  'The folder used to download and install Gatling components (default: "~/.gatling")'
);

const gatlingHomeDirWithDefaults = (options: { gatlingHome?: string }): string =>
  options.gatlingHome || `${os.homedir()}/.gatling`;

const sourcesFolderOption = new Option("--sources-folder <value>", "The sources folder path").default("src");

const simulationOption = new Option(
  "--simulation <value>",
  "The simulation entry point function name (default: if only one *.gatling.js or *.gatling.ts file is found, will execute that simulation)"
);

const simulationWithDefaults = (
  options: { simulation?: string },
  simulationsFound: SimulationFile[],
  interactive: boolean
): string => {
  if (options.simulation !== undefined) {
    return options.simulation;
  } else if (simulationsFound.length === 1) {
    return simulationsFound[0].name;
  } else if (simulationsFound.length === 0) {
    throw new Error(
      "No simulation found, simulations must be defined in a <simulation name>.gatling.js or <simulation name>.gatling.ts file)"
    );
  } else if (interactive) {
    const idx = keyInSelectPaginated(
      simulationsFound.map((s) => s.name).sort((a, b) => a.localeCompare(b)),
      "Choose a simulation to run"
    );
    if (idx >= 0) {
      const simulation = simulationsFound[idx].name;
      logger.info(`Simulation '${simulation}' was chosen.`);
      return simulation;
    } else {
      throw new Error("Simulation choice was cancelled.");
    }
  } else {
    throw new Error(
      `Several simulations found, specify one using the --simulation option (available simulations: ${simulationsFound.map((s) => s.name)})`
    );
  }
};

const simulationRequiredOption = new Option(
  "--simulation <value>",
  "The simulation entry point function name"
).makeOptionMandatory(true);

const bundleFileOption = new Option(
  "--bundle-file <value>",
  "The target bundle file path when building simulations (must have a .js extension)"
).default("target/bundle.js");

const validateBundleFile = (options: { bundleFile: string }): string => {
  if (!options.bundleFile.endsWith(".js")) {
    throw Error(`'${options.bundleFile}' is not a valid bundle file path: should have a .js extension`);
  }
  return options.bundleFile;
};

const packageFileOption = new Option(
  "--package-file <value>",
  "The target package file path when packaging simulations for Gatling Enterprise (must have a .zip extension)"
).default("target/package.zip");

const validatePackageFile = (options: { packageFile: string }): string => {
  if (!options.packageFile.endsWith(".zip")) {
    throw Error(`'${options.packageFile}' is not a valid package file path: should have a .zip extension`);
  }
  return options.packageFile;
};

const resourcesFolderOption = new Option("--resources-folder <value>", "The resources folder path").default(
  "resources"
);

const resultsFolderOption = new Option("--results-folder <value>", "The results folder path").default("target/gatling");

const typescriptOption = new Option(
  "--typescript",
  "Use the typescript compiler to compile your code (default: true if the sourcesFolder contains any *.gatling.ts file, false otherwise)"
);

const typescriptWithDefaults = (options: { typescript?: boolean }, simulationsFound: SimulationFile[]): boolean =>
  options.typescript !== undefined
    ? options.typescript
    : simulationsFound.findIndex((s) => s.type === "typescript") >= 0;

const graalvmHomeMandatoryOption = new Option("--graalvm-home <value>", "Path to the GraalVM home").makeOptionMandatory(
  true
);

const jvmClasspathMandatoryOption = new Option(
  "--jvm-classpath <value>",
  "The classpath containing all Gatling JVM components"
).makeOptionMandatory(true);

const memoryOption = new Option(
  "--memory <value>",
  "Heap space memory size in MiB for Gatling. Half the total available memory is usually a good default, as the Gatling process will use more memory than just the heap space."
).argParser((value) => {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new Error(`${value} is not a valid memory size, must be an integer number`);
  }
  return parsedValue;
});

const nonInteractiveOption = new Option(
  "--non-interactive",
  "Switch to non-interactive mode and fail if no simulation is explicitly specified"
).default(false);

program
  .command("install")
  .description("Install all required components and dependencies for Gatling")
  .addOption(gatlingHomeOption)
  .action(async (options) => {
    const gatlingHome = gatlingHomeDirWithDefaults(options);
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
    const sourcesFolder: string = options.sourcesFolder;
    const bundleFile = validateBundleFile(options);

    const simulations = await findSimulations(sourcesFolder);
    const typescript = typescriptWithDefaults(options, simulations);

    await bundle({ sourcesFolder, bundleFile, typescript, simulations });
  });

program
  .command("run-only")
  .description("Run a Gatling simulation from an already built bundle")
  .addOption(graalvmHomeMandatoryOption)
  .addOption(jvmClasspathMandatoryOption)
  .addOption(simulationRequiredOption)
  .addOption(bundleFileOption)
  .addOption(resourcesFolderOption)
  .addOption(resultsFolderOption)
  .addOption(memoryOption)
  .action(async (options) => {
    const graalvmHome: string = options.graalvmHome;
    const jvmClasspath: string = options.jvmClasspath;
    const simulation: string = options.simulation;
    const bundleFile = validateBundleFile(options);
    const resourcesFolder: string = options.resourcesFolder;
    const resultsFolder: string = options.resultsFolder;
    const memory: number | undefined = options.memory;

    await runSimulation({
      graalvmHome,
      jvmClasspath,
      simulation: simulation,
      bundleFile,
      resourcesFolder,
      resultsFolder,
      memory
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
  .action(async (options) => {
    const gatlingHome = gatlingHomeDirWithDefaults(options);
    const sourcesFolder: string = options.sourcesFolder;
    const bundleFile = validateBundleFile(options);
    const resourcesFolder: string = options.resourcesFolder;
    const resultsFolder: string = options.resultsFolder;
    const memory: number | undefined = options.memory;
    const nonInteractive: boolean = options.nonInteractive;

    const simulations = await findSimulations(sourcesFolder);
    const typescript = typescriptWithDefaults(options, simulations);
    const simulation = simulationWithDefaults(options, simulations, !nonInteractive);

    const { graalvmHome, coursierBinary, jvmClasspath } = await installGatlingJs({ gatlingHome });
    logger.debug(`graalvmHome=${graalvmHome}`);
    logger.debug(`coursierBinary=${coursierBinary}`);
    logger.debug(`jvmClasspath=${jvmClasspath}`);

    await bundle({ sourcesFolder, bundleFile, typescript, simulations });

    await runSimulation({ graalvmHome, jvmClasspath, simulation, bundleFile, resourcesFolder, resultsFolder, memory });
  });

program
  .command("recorder")
  .description("Run the Gatling recorder")
  .addOption(gatlingHomeOption)
  .addOption(sourcesFolderOption)
  .addOption(typescriptOption)
  .addOption(resourcesFolderOption)
  .action(async (options) => {
    const gatlingHome: string = gatlingHomeDirWithDefaults(options);
    const sourcesFolder: string = options.sourcesFolder;
    const resourcesFolder: string = options.resourcesFolder;

    const simulations = await findSimulations(sourcesFolder);
    const typescript = typescriptWithDefaults(options, simulations);

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
    const sourcesFolder: string = options.sourcesFolder;
    const resourcesFolder: string = options.resourcesFolder;
    const bundleFile = validateBundleFile(options);
    const packageFile = validatePackageFile(options);

    const simulations = await findSimulations(sourcesFolder);
    const typescript = typescriptWithDefaults(options, simulations);

    await bundle({ sourcesFolder, bundleFile, typescript, simulations });

    await enterprisePackage({ bundleFile, resourcesFolder, packageFile, simulations });
  });

const urlOption = new Option("--url <value>", "URL of Gatling Enterprise")
  .default("https://cloud.gatling.io")
  .hideHelp();

const apiTokenOption = new Option(
  "--api-token <value>",
  "API Token on Gatling Enterprise. Prefer configuration using `GATLING_ENTERPRISE_API_TOKEN` environment variable."
);

// Plugin configuration

const controlPlaneUrlOption = new Option(
  "--control-plane-url <value>",
  "URL of a control plane for Gatling Enterprise providing a private repository. If this parameter is provided, packages will be registered as private packages and uploaded through this private control plane."
);

// Descriptor file

const packageDescriptorFilenameOption = new Option(
  "--package-descriptor-filename <value>",
  "Path to a package descriptor inside the .gatling folder"
).default("package.conf");

const enterpriseBundleAndPackage = async (options: any): Promise<EnterpriseDeployOptions> => {
  const gatlingHome = gatlingHomeDirWithDefaults(options);
  const sourcesFolder: string = options.sourcesFolder;
  const bundleFile = validateBundleFile(options);
  const resourcesFolder: string = options.resourcesFolder;
  const resultsFolder: string = options.resultsFolder;

  const simulations = await findSimulations(sourcesFolder);
  const typescript = typescriptWithDefaults(options, simulations);

  // Base
  const url = options.url;
  const apiToken = options.apiToken;

  // Plugin configuration
  const controlPlaneUrl = options.controlPlaneUrl;
  const nonInteractive = options.nonInteractive;

  // Descriptor file
  const packageDescriptorFilename = options.packageDescriptorFilename;

  // Deployment info
  const packageFile = validatePackageFile(options);

  const { graalvmHome, coursierBinary, jvmClasspath } = await installGatlingJs({ gatlingHome });
  logger.debug(`graalvmHome=${graalvmHome}`);
  logger.debug(`coursierBinary=${coursierBinary}`);
  logger.debug(`jvmClasspath=${jvmClasspath}`);

  await bundle({ sourcesFolder, bundleFile, typescript, simulations });
  await enterprisePackage({ bundleFile, resourcesFolder, packageFile, simulations });

  return {
    graalvmHome,
    jvmClasspath,
    bundleFile,
    resourcesFolder,
    resultsFolder,
    // Base
    url,
    apiToken,
    // Plugin configuration
    controlPlaneUrl,
    nonInteractive,
    // Descriptor file
    packageDescriptorFilename,
    // Deployment info
    packageFile
  };
};

program
  .command("enterprise-deploy")
  .description("Deploy a package and configured simulations")
  .addOption(sourcesFolderOption)
  .addOption(resourcesFolderOption)
  .addOption(bundleFileOption)
  .addOption(resultsFolderOption)
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
    const deployOptions = await enterpriseBundleAndPackage(options);
    await enterpriseDeploy(deployOptions);
  });

// Deployment info

const enterpriseSimulationOption = new Option(
  "--enterprise-simulation <value>",
  "Specify the simulation name directly to bypass the prompt using the following command."
);

const runTitleOption = new Option("--run-title <value>", "Allows setting a title for your run reports.");

const runDescriptionOption = new Option(
  "--run-description <value>",
  "Allows setting a description for your run reports summary."
);

const waitForRunEndOption = new Option(
  "--wait-for-run-end",
  "Wait for the result after starting the simulation on Gatling Enterprise, and complete with an error if the simulation ends with any error status"
).default(false);

program
  .command("enterprise-start")
  .description("Start a simulation deployed with `enterprise-deploy`")
  .addOption(sourcesFolderOption)
  .addOption(resourcesFolderOption)
  .addOption(bundleFileOption)
  .addOption(resultsFolderOption)
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
    const deployOptions = await enterpriseBundleAndPackage(options);

    if (options.nonInteractive && options.enterpriseSimulation === undefined) {
      throw new Error(`No simulation specified when using non-interactive mode`);
    }

    await enterpriseStart({
      ...deployOptions,
      // Start
      enterpriseSimulation: options.enterpriseSimulation,
      runTitle: options.runTitle,
      runDescription: options.runDescription,
      waitForRunEnd: options.waitForRunEnd
    });
  });

program.parse(process.argv);
