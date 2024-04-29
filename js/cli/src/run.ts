import { spawn } from "child_process";
import * as path from "path";

import { logger } from "./log";

export interface RunOptions {
  graalvmHomePath: string;
  jvmClasspath: string;
  entryPointName: string;
  bundleFilePath: string;
  resourcesDirPath: string;
}

export const run = async (options: RunOptions): Promise<void> => {
  logger.info(`Running a Gatling simulation with options:
 - entryPointName: ${options.entryPointName}
 - bundleFilePath: ${options.bundleFilePath}`);

  const bundleDir = path.parse(options.bundleFilePath).dir;
  const bundleFileName = path.parse(options.bundleFilePath).base;

  const command = `${options.graalvmHomePath}/bin/java`;
  const args = [
    "-server",
    "-XX:+HeapDumpOnOutOfMemoryError",
    "-XX:MaxInlineLevel=20",
    "-XX:MaxTrivialSize=12",
    "-Xmx1G",
    "-classpath",
    `${bundleDir}:${options.resourcesDirPath}:${options.jvmClasspath}`,
    `-Dgatling.js.bundle.resourcePath=${bundleFileName}`,
    `-Dgatling.js.entryPointName=${options.entryPointName}`,
    "io.gatling.app.Gatling",
    "--results-folder",
    "results",
    "--simulation",
    "io.gatling.js.JsSimulation"
  ];

  const process = spawn(command, args);

  return new Promise((resolve, reject) => {
    process.stdout.on("data", (data) => logger.info(data.toString()));
    process.stderr.on("data", (data) => logger.error(data.toString()));
    process.on("error", (error) => logger.error("Failed to run Gatling process: " + error.toString()));
    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(Error("Gatling process finished with code " + code));
      }
    });
  });
};
