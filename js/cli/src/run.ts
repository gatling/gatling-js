import { spawn } from "child_process";
import * as path from "path";

import { logger } from "./log";
import { versions } from "./dependencies/versions";
import { osType } from "./dependencies/os";

export interface RunOptions {
  graalvmHome: string;
  jvmClasspath: string;
  simulation: string;
  bundleFile: string;
  resourcesFolder: string;
  resultsFolder: string;
}

export const run = async (options: RunOptions): Promise<void> => {
  logger.info(`Running a Gatling simulation with options:
 - simulation: ${options.simulation}
 - bundleFile: ${options.bundleFile}`);

  const command = `${options.graalvmHome}/bin/java`;

  const classpathSeparator = osType === "Windows_NT" ? ";" : ":";
  const args = [
    "-server",
    "-XX:+HeapDumpOnOutOfMemoryError",
    "-XX:MaxInlineLevel=20",
    "-XX:MaxTrivialSize=12",
    "-Xmx1G",
    "-classpath",
    `${options.resourcesFolder}${classpathSeparator}${options.jvmClasspath}`,
    `-Dgatling.js.bundle.filePath=${options.bundleFile}`,
    `-Dgatling.js.simulation=${options.simulation}`,
    "io.gatling.app.Gatling",
    "--results-folder",
    options.resultsFolder,
    "--simulation",
    "io.gatling.js.JsSimulation",
    "--launcher",
    "gatling-js-cli",
    "--build-tool-version",
    versions.gatling.jsAdapter
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
