#! /usr/bin/env node

import { Command } from "commander";
import { bundle } from "./bundle";
import { installAll } from "./dependencies";
import { run } from "./run";

import { logger } from "./log";

const program = new Command()
  .name("gatling-js-cli")
  .version("0.0.1")
  .description("The Gatling Javascript run & packaging tool");

program
  .command("bundle")
  .description("Package a Gatling simulation to a single bundle file")
  .option("--entryPointFile <value>", "Your simulation entry point file path, defaults to src/index.ts", "src/index.ts")
  .option("--bundleFile <value>", "Your simulation bundle file path, defaults to target/bundle.js", "target/bundle.js")
  .option("--typescript", "Use the typescript compiler to compile your code", false)
  .action(async (options) => {
    const entryPoint: string = options.entryPoint;
    const outfile: string = options.bundleFile;
    const typescript: boolean = options.typescript;
    await bundle({ entryPoint, outfile, typescript });
  });

program
  .command("install")
  .description("Install all required components and dependencies to run Gatling simulations")
  .option("--tmpDir <value>", "Temporary directory used to download and install components", "tmp")
  .action(async (options) => {
    const tmpDir: string = options.tmpDir;
    const { graalvmHomePath, coursierPath, classpath } = await installAll({ tmpDir });
      logger.info(`graalvmHomePath=${graalvmHomePath}`)
      logger.info(`coursierPath=${coursierPath}`)
      logger.info(`classpath=${classpath}`)
  });

program
  .command("run")
  .description("Run a Gatling simulation")
  .requiredOption("--graalvmHome <value>", "Path to the GraalVM home")
    .requiredOption("--classpath <value>", "The classpath")
    .requiredOption("--entryPointName <value>", "Your simulation entry point function name")
    .option("--bundleFile <value>", "Your simulation bundle file path, defaults to target/bundle.js", "target/bundle.js")
    .action(async (options) => {
        const graalvmHomePath: string = options.graalvmHome;
        const classpath: string = options.classpath;
        const entryPoint: string = options.entryPointName;
        const bundleFilePath: string = options.bundleFile;
        await run({ graalvmHomePath, classpath, entryPoint, bundleFilePath });
    });


program.parse(process.argv);
