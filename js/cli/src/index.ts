#!/usr/bin/env node

import { Command, Option } from "commander";
import os from "os";

import { bundle } from "./bundle";
import { installGatlingJs, installRecorder } from "./dependencies";
import { enterprisePackage } from "./enterprisePackage";
import { findSimulations, SimulationFile } from "./simulations";
import { logger } from "./log";
import { runSimulation, runRecorder } from "./run";

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

const simulationWithDefaults = (options: { simulation?: string }, simulationsFound: SimulationFile[]): string => {
  if (options.simulation !== undefined) {
    return options.simulation;
  } else if (simulationsFound.length === 1) {
    return simulationsFound[0].name;
  } else if (simulationsFound.length === 0) {
    throw new Error(
      "No simulation found, simulations must be defined in a <simulation name>.gatling.js or <simulation name>.gatling.ts file)"
    );
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
  "The target bundle file path when building simulations"
).default("target/bundle.js");

const enterprisePackageFileOption = new Option(
  "--enterprise-package-file <value>",
  "The target package file path when packaging simulations for Gatling Enterprise"
).default("target/package.jar");

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
    const bundleFile: string = options.bundleFile;

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
  .action(async (options) => {
    const graalvmHome: string = options.graalvmHome;
    const jvmClasspath: string = options.jvmClasspath;
    const simulation: string = options.simulation;
    const bundleFile: string = options.bundleFile;
    const resourcesFolder: string = options.resourcesFolder;
    const resultsFolder: string = options.resultsFolder;

    await runSimulation({
      graalvmHome,
      jvmClasspath,
      simulation: simulation,
      bundleFile,
      resourcesFolder,
      resultsFolder
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
  .action(async (options) => {
    const gatlingHome = gatlingHomeDirWithDefaults(options);
    const sourcesFolder: string = options.sourcesFolder;
    const bundleFile: string = options.bundleFile;
    const resourcesFolder: string = options.resourcesFolder;
    const resultsFolder: string = options.resultsFolder;

    const simulations = await findSimulations(sourcesFolder);
    const typescript = typescriptWithDefaults(options, simulations);
    const simulation = simulationWithDefaults(options, simulations);

    const { graalvmHome, coursierBinary, jvmClasspath } = await installGatlingJs({ gatlingHome });
    logger.debug(`graalvmHome=${graalvmHome}`);
    logger.debug(`coursierBinary=${coursierBinary}`);
    logger.debug(`jvmClasspath=${jvmClasspath}`);

    await bundle({ sourcesFolder, bundleFile, typescript, simulations });

    await runSimulation({ graalvmHome, jvmClasspath, simulation, bundleFile, resourcesFolder, resultsFolder });
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
  .addOption(enterprisePackageFileOption)
  .addOption(typescriptOption)
  .action(async (options) => {
    const sourcesFolder: string = options.sourcesFolder;
    const resourcesFolder: string = options.resourcesFolder;
    const bundleFile: string = options.bundleFile;
    const enterprisePackageFile: string = options.enterprisePackageFile;

    const simulations = await findSimulations(sourcesFolder);
    const typescript = typescriptWithDefaults(options, simulations);

    await bundle({ sourcesFolder, bundleFile, typescript, simulations });

    await enterprisePackage({ bundleFile, resourcesFolder, enterprisePackageFile, simulations });
  });

program.parse(process.argv);
