import { logger } from "./log";
import { versions } from "./dependencies";
import { RunJavaProcessOptions, runJavaProcess, runNodeProcess } from "./java";

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
  const jitTuningArgs = ["--vm.XX:JVMCINativeLibraryThreadFraction=0.8", "--vm.Dgraal.MethodInlineBailoutLimit=500"];
  const memoryArgs = options.memory !== undefined ? [`--vm.Xms${options.memory}M`, `--vm.Xmx${options.memory}M`] : [];
  const javaArgs = [
    ...Object.entries(options.runParameters).map(([key, value]) => `--vm.D${key}=${value}`),
    `--vm.Dgatling.js.bundle.filePath=${options.bundleFile}`,
    `--vm.Dgatling.js.simulation=${options.simulation}`,
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

  const evalScript = `
const simulationInitializer = () => {
  const bundle = require("./${options.bundleFile}");
  const jsSimulation = bundle.gatling["${options.simulation}"];

  const JsSimulationWrapper = Java.type("io.gatling.js.JsSimulation");
  return new JsSimulationWrapper(jsSimulation);
}

const Gatling = Java.type("io.gatling.app.Gatling");
// TODO escape strings or pass args some other way
Gatling.run([${simulationArgs.map((arg) => `"${arg}"`)}], simulationInitializer);
`;

  return runNodeProcess(options, additionalClasspathElements, javaArgs, evalScript);
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
