import { logger } from "./log";
import { versions } from "./dependencies";
import { RunJavaProcessOptions, runJavaProcess } from "./java";

export interface RunSimulationOptions extends RunJavaProcessOptions {
  simulation: string;
  bundleFile: string;
  resourcesFolder: string;
  resultsFolder: string;
  memory?: number;
  runParameters: Record<string, string>;
}

export interface RunRecorderOptions extends RunJavaProcessOptions {
  sourcesFolder: string;
  typescript: boolean;
  resourcesFolder: string;
}

export const runSimulation = async (options: RunSimulationOptions): Promise<void> => {
  logger.info(`Running a Gatling simulation with options:
 - simulation: ${options.simulation}
 - bundleFile: ${options.bundleFile}
 - resourcesFolder: ${options.resourcesFolder}
 - resultsFolder: ${options.resultsFolder}`);

  const additionalClasspathElements = [options.resourcesFolder];
  const jitTuningArgs = ["-XX:JVMCINativeLibraryThreadFraction=0.8", "-Dgraal.MethodInlineBailoutLimit=500"];
  const memoryArgs = options.memory !== undefined ? [`-Xms${options.memory}M`, `-Xmx${options.memory}M`] : [];
  const javaArgs = [
    ...Object.entries(options.runParameters).map(([key, value]) => `-D${key}=${value}`),
    "--add-opens=java.base/java.lang=ALL-UNNAMED",
    `-Dgatling.js.bundle.filePath=${options.bundleFile}`,
    `-Dgatling.js.simulation=${options.simulation}`,
    ...jitTuningArgs,
    ...memoryArgs
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

  return runJavaProcess(options, "io.gatling.app.Gatling", additionalClasspathElements, javaArgs, simulationArgs);
};

export const runRecorder = async (options: RunRecorderOptions): Promise<void> => {
  logger.info(`Running the Gatling Recorder with options:
 - sourcesFolder: ${options.sourcesFolder}
 - resourcesFolder: ${options.resourcesFolder}
 - typescript: ${options.typescript}`);

  const recorderArgs = [
    "--simulations-folder",
    options.sourcesFolder,
    "--resources-folder",
    options.resourcesFolder,
    "--format",
    options.typescript ? "typescript" : "javascript"
  ];

  return runJavaProcess(options, "io.gatling.recorder.GatlingRecorder", [], [], recorderArgs);
};
