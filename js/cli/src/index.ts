#!/usr/bin/env node

import { Command, Option } from "commander";
import os from "os";

import { bundle } from "./bundle";
import { installAll } from "./dependencies";
import { logger } from "./log";
import { run } from "./run";

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

const simulationOption = new Option("--simulation <value>", "The simulation entry point function name").default(
  "default",
  '"default", compatible with using "export default"'
);

const bundleFileOption = new Option("--bundle-file <value>", "The simulation target bundle file path").default(
  "target/bundle.js"
);

const resourcesFolderOption = new Option("--resources-folder <value>", "The resources folder path").default(
  "resources"
);

const resultsFolderOption = new Option("--results-folder <value>", "The results folder path").default("target/gatling");

const typescriptOption = new Option("--typescript", "Use the typescript compiler to compile your code").default(false);

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
    const { graalvmHome, coursierBinary, jvmClasspath } = await installAll({ gatlingHome });
    logger.info(`graalvmHome=${graalvmHome}`);
    logger.info(`coursierBinary=${coursierBinary}`);
    logger.info(`jvmClasspath=${jvmClasspath}`);
  });

program
  .command("build")
  .description("Build a Gatling simulation")
  .addOption(sourcesFolderOption)
  .addOption(bundleFileOption)
  .addOption(typescriptOption)
  .action(async (options) => {
    const sourcesFolder: string = options.sourcesFolder;
    const bundleFile: string = options.bundleFile;
    const typescript: boolean = options.typescript;
    await bundle({ sourcesFolder, bundleFile, typescript });
  });

program
  .command("run-only")
  .description("Run a Gatling simulation")
  .addOption(graalvmHomeMandatoryOption)
  .addOption(jvmClasspathMandatoryOption)
  .addOption(simulationOption)
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
    await run({ graalvmHome, jvmClasspath, simulation: simulation, bundleFile, resourcesFolder, resultsFolder });
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
    const simulation: string = options.simulation;
    const bundleFile: string = options.bundleFile;
    const resourcesFolder: string = options.resourcesFolder;
    const resultsFolder: string = options.resultsFolder;
    const typescript: boolean = options.typescript;

    const { graalvmHome, coursierBinary, jvmClasspath } = await installAll({ gatlingHome });
    logger.debug(`graalvmHome=${graalvmHome}`);
    logger.debug(`coursierBinary=${coursierBinary}`);
    logger.debug(`jvmClasspath=${jvmClasspath}`);

    await bundle({ sourcesFolder, bundleFile, typescript });

    await run({ graalvmHome, jvmClasspath, simulation, bundleFile, resourcesFolder, resultsFolder });
  });

program.parse(process.argv);
