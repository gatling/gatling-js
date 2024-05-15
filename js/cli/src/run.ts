import { spawn } from "child_process";
import * as path from "path";

import { logger } from "./log";

export interface RunOptions {
  graalvmHome: string;
  jvmClasspath: string;
  simulationName: string;
  bundleFile: string;
  resourcesFolder: string;
  resultsFolder: string;
}

export const run = async (options: RunOptions): Promise<void> => {
  logger.info(`Running a Gatling simulation with options:
 - simulationName: ${options.simulationName}
 - bundleFile: ${options.bundleFile}`);

  const bundleFolder = path.parse(options.bundleFile).dir;
  const bundleFileName = path.parse(options.bundleFile).base;

  const command = `${options.graalvmHome}/bin/java`;
  const args = [
    "-server",
    "-XX:+HeapDumpOnOutOfMemoryError",
    "-XX:MaxInlineLevel=20",
    "-XX:MaxTrivialSize=12",
    "-Xmx1G",
    "-classpath",
    `${bundleFolder}:${options.resourcesFolder}:${options.jvmClasspath}`,
    `-Dgatling.js.bundle.resourcePath=${bundleFileName}`,
    `-Dgatling.js.simulationName=${options.simulationName}`,
    "io.gatling.app.Gatling",
    "--results-folder",
    options.resultsFolder,
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
