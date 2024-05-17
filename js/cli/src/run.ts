import { spawn } from "child_process";
import * as path from "path";

import { logger } from "./log";
import { versions } from "./dependencies/versions";
import { osType } from "./dependencies/os";

export interface RunOptions {
  graalvmHome: string;
  jvmClasspath: string;
}

export interface RunSimulationOptions extends RunOptions {
  simulation: string;
  bundleFile: string;
  resourcesFolder: string;
  resultsFolder: string;
}

export interface RunRecorderOptions extends RunOptions {
  sourcesFolder: string;
  typescript: boolean;
  resourcesFolder: string;
}

export const runSimulation = async (options: RunSimulationOptions): Promise<void> => {
  logger.info(`Running a Gatling simulation with options:
 - simulation: ${options.simulation}
 - bundleFile: ${options.bundleFile}`);

  const additionalClasspathElements = [options.resourcesFolder];
  const javaArgs = [
    `-Dgatling.js.bundle.filePath=${options.bundleFile}`,
    `-Dgatling.js.simulation=${options.simulation}`
  ];
  const simulationArgs = [
    "--results-folder",
    options.resultsFolder,
    "--simulation",
    "io.gatling.js.JsSimulation",
    "--launcher",
    "gatling-js-cli",
    "--build-tool-version",
    versions.gatling.jsAdapter
  ];
  return run(options, "io.gatling.app.Gatling", additionalClasspathElements, javaArgs, simulationArgs);
};

export const runRecorder = async (options: RunRecorderOptions): Promise<void> => {
  logger.info("Running the Gatling Recorder");

  const recorderArgs = [
    "--simulations-folder",
    options.sourcesFolder,
    "--resources-folder",
    options.resourcesFolder,
    "--format",
    options.typescript ? "typescript" : "javascript"
  ];
  return run(options, "io.gatling.recorder.GatlingRecorder", [], [], recorderArgs);
};

const run = (
  options: RunOptions,
  mainClass: string,
  additionalClasspathElements: string[],
  javaArgs: string[],
  mainClassArgs: string[]
): Promise<void> => {
  const command = `${options.graalvmHome}/bin/java`;
  const classpathSeparator = osType === "Windows_NT" ? ";" : ":";
  const classpath = [...additionalClasspathElements, options.jvmClasspath].join(classpathSeparator);
  const allArgs = [
    "-server",
    "-XX:+HeapDumpOnOutOfMemoryError",
    "-XX:MaxInlineLevel=20",
    "-XX:MaxTrivialSize=12",
    "-Xmx1G",
    "-classpath",
    classpath,
    ...javaArgs,
    mainClass,
    ...mainClassArgs
  ];

  const process = spawn(command, allArgs);

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
