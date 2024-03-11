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

const gatlingHomeDir = new Option(
  "--gatlingHomeDir <value>",
  'The temporary directory used to download and install Gatling components (default: "~/.gatling")'
);

const gatlingHomeDirWithDefaults = (options: { gatlingHomeDir?: string }): string =>
  options.gatlingHomeDir || `${os.homedir()}/.gatling`;

const entryPointFileOption = new Option(
  "--entryPointFile <value>",
  'The simulation entry point source file path (default: "src/index.js", or "src/index.ts" when using the "--typescript" option)'
);

const entryPointNameOption = new Option("--entryPointName <value>", "The simulation entry point function name").default(
  "default",
  '"default", compatible with using "export default"'
);

const entryPointFileWithDefaults = (options: { entryPointFile?: string; typescript: boolean }): string =>
  options.entryPointFile || (options.typescript ? "src/index.ts" : "src/index.js");

const bundleFileOption = new Option("--bundleFile <value>", "The simulation target bundle file path").default(
  "target/bundle.js"
);

const typescriptOption = new Option("--typescript", "Use the typescript compiler to compile your code").default(false);

const graalvmHomeMandatoryOption = new Option("--graalvmHome <value>", "Path to the GraalVM home").makeOptionMandatory(
  true
);

const jvmClasspathMandatoryOption = new Option(
  "--jvmClasspath <value>",
  "The classpath containing all Gatling JVM components"
).makeOptionMandatory(true);

program
  .command("install")
  .description("Install all required components and dependencies for Gatling")
  .addOption(gatlingHomeDir)
  .action(async (options) => {
    const gatlingHomeDir: string = gatlingHomeDirWithDefaults(options);
    const { graalvmHomePath, coursierPath, jvmClasspath } = await installAll({ gatlingHomeDir });
    logger.info(`graalvmHomePath=${graalvmHomePath}`);
    logger.info(`coursierPath=${coursierPath}`);
    logger.info(`jvmClasspath=${jvmClasspath}`);
  });

program
  .command("build")
  .description("Build a Gatling simulation")
  .addOption(entryPointFileOption)
  .addOption(bundleFileOption)
  .addOption(typescriptOption)
  .action(async (options) => {
    const entryPointFile: string = entryPointFileWithDefaults(options);
    const bundleFilePath: string = options.bundleFile;
    const typescript: boolean = options.typescript;
    await bundle({ entryPointFile, bundleFilePath, typescript });
  });

program
  .command("run-only")
  .description("Run a Gatling simulation")
  .addOption(graalvmHomeMandatoryOption)
  .addOption(jvmClasspathMandatoryOption)
  .addOption(entryPointNameOption)
  .addOption(bundleFileOption)
  .action(async (options) => {
    const graalvmHomePath: string = options.graalvmHome;
    const jvmClasspath: string = options.jvmClasspath;
    const entryPointName: string = options.entryPointName;
    const bundleFilePath: string = options.bundleFile;
    await run({ graalvmHomePath, jvmClasspath, entryPointName, bundleFilePath });
  });

program
  .command("run")
  .description(
    "Build and run a Gatling simulation, after installing all required components and dependencies for Gatling"
  )
  .addOption(entryPointFileOption)
  .addOption(entryPointNameOption)
  .addOption(typescriptOption)
  .addOption(bundleFileOption)
  .addOption(gatlingHomeDir)
  .action(async (options) => {
    const gatlingHomeDir: string = gatlingHomeDirWithDefaults(options);
    const entryPointFile: string = entryPointFileWithDefaults(options);
    const entryPointName: string = options.entryPointName;
    const bundleFilePath: string = options.bundleFile;
    const typescript: boolean = options.typescript;

    const { graalvmHomePath, coursierPath, jvmClasspath } = await installAll({ gatlingHomeDir });
    logger.debug(`graalvmHomePath=${graalvmHomePath}`);
    logger.debug(`coursierPath=${coursierPath}`);
    logger.debug(`jvmClasspath=${jvmClasspath}`);

    await bundle({ entryPointFile, bundleFilePath, typescript });

    await run({ graalvmHomePath, jvmClasspath, entryPointName, bundleFilePath });
  });

program.parse(process.argv);
