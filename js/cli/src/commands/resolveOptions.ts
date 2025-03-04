import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { Option, Argument } from "commander";

import { ConfigFile } from "./configFile";
import { SimulationFile } from "../simulations";
import { keyInSelectPaginated } from "../readline";
import { logger } from "../log";

export interface ResolvedOptions {
  gatlingHomeOption: Option;
  gatlingHomeOptionValueWithDefaults(options: any): string;
  sourcesFolderOption: Option;
  sourcesFolderOptionValue(options: any): string;
  simulationOption: Option;
  simulationOptionValueWithDefaults(options: any, simulationsFound: SimulationFile[], interactive: boolean): string;
  simulationMandatoryOption: Option;
  simulationMandatoryOptionValue(options: any): string;
  bundleFileOption: Option;
  bundleFileOptionValue(options: any): string;
  packageFileOption: Option;
  packageFileOptionValue(options: any): string;
  resourcesFolderOption: Option;
  resourcesFolderOptionValue(options: any): string;
  resultsFolderOption: Option;
  resultsFolderOptionValue(options: any): string;
  typescriptOption: Option;
  typescriptOptionValueWithDefaults(options: any, simulationsFound: SimulationFile[]): boolean;
  graalvmHomeMandatoryOption: Option;
  graalvmHomeMandatoryOptionValue(options: any): string;
  jvmClasspathMandatoryOption: Option;
  jvmClasspathMandatoryOptionValue(options: any): string;
  memoryOption: Option;
  memoryOptionValue(options: any): number | undefined;
  nonInteractiveOption: Option;
  nonInteractiveOptionValue(options: any): boolean;
  postmanOption: Option;
  postmanOptionValueWithDefaults(options: any): string | undefined;
  runParametersArgument: Argument;
  parseRunParametersArgument(args: string[]): Record<string, string>;
  bundleFileArgument: Argument;
  apiUrlOption: Option;
  apiUrlOptionValue(options: any): string;
  webAppUrlOption: Option;
  webAppUrlOptionValue(options: any): string;
  apiTokenOption: Option;
  apiTokenOptionValue(options: any): string | undefined;
  controlPlaneUrlOption: Option;
  controlPlaneUrlOptionValue(options: any): string | undefined;
  trustStoreOption: Option;
  trustStoreOptionValue(options: any): string | undefined;
  trustStorePasswordOption: Option;
  trustStorePasswordOptionValue(options: any): string | undefined;
  packageDescriptorFilenameOption: Option;
  packageDescriptorFilenameOptionValue(options: any): string;
  enterpriseSimulationOption: Option;
  enterpriseSimulationOptionValue(options: any): string | undefined;
  runTitleOption: Option;
  runTitleOptionValue(options: any): string | undefined;
  runDescriptionOption: Option;
  runDescriptionOptionValue(options: any): string | undefined;
  waitForRunEndOption: Option;
  waitForRunEndOptionValue(options: any): boolean;
}

export const resolveOptions = (configFile: ConfigFile): ResolvedOptions => {
  const gatlingHomeOption = new Option(
    "--gatling-home <value>",
    'The folder used to download and install Gatling components (default: "<user home>/.gatling")'
  ).default(getDefault(configFile.gatlingHome, `${os.homedir()}/.gatling`));
  const gatlingHomeOptionValueWithDefaults = getStringValueMandatory(gatlingHomeOption);

  const sourcesFolderOption = new Option("--sources-folder <value>", "The sources folder path").default(
    getDefault(configFile.sourcesFolder, "src")
  );
  const sourcesFolderOptionValue = getStringValueMandatory(sourcesFolderOption);

  const simulationOption = new Option(
    "--simulation <value>",
    "The simulation entry point function name (default: if only one *.gatling.js or *.gatling.ts file is found, will execute that simulation)"
  );
  const simulationOptionValueWithDefaults = (
    options: any,
    simulationsFound: SimulationFile[],
    interactive: boolean
  ): string => {
    const declaredSimulation = getStringValueOptional(simulationOption)(options);
    if (declaredSimulation !== undefined) {
      return declaredSimulation;
    } else if (simulationsFound.length === 1) {
      return simulationsFound[0].name;
    } else if (simulationsFound.length === 0) {
      throw new Error(
        "No simulation found, simulations must be defined in a <simulation name>.gatling.js or <simulation name>.gatling.ts file)"
      );
    } else if (interactive) {
      const sortedSimulations = simulationsFound.sort((a, b) => a.name.localeCompare(b.name));
      const idx = keyInSelectPaginated(
        sortedSimulations.map((s) => s.name),
        "Choose a simulation to run"
      );
      if (idx >= 0) {
        const simulation = sortedSimulations[idx].name;
        logger.info(`Simulation '${simulation}' was chosen.`);
        return simulation;
      } else {
        throw new Error("Simulation choice was cancelled.");
      }
    } else {
      throw new Error(
        `Several simulations found, specify one using the --simulation option (available simulations: ${simulationsFound.map((s) => s.name)})`
      );
    }
  };

  const simulationMandatoryOption = new Option(
    "--simulation <value>",
    "The simulation entry point function name"
  ).makeOptionMandatory(true);
  const simulationMandatoryOptionValue = getStringValueMandatory(simulationMandatoryOption);

  const bundleFileOption = new Option(
    "--bundle-file <value>",
    "The target bundle file path when building simulations (must have a .js extension)"
  )
    .default(getDefault(configFile.bundleFile, "target/bundle.js"))
    .argParser((value) => {
      if (!value.endsWith(".js")) {
        throw Error(`'${value}' is not a valid bundle file path: should have a .js extension`);
      }
      return value;
    });
  const bundleFileOptionValue = getStringValueMandatory(bundleFileOption);

  const packageFileOption = new Option(
    "--package-file <value>",
    "The target package file path when packaging simulations for Gatling Enterprise (must have a .zip extension)"
  )
    .default(getDefault(configFile.packageFile, "target/package.zip"))
    .argParser((value) => {
      if (!value.endsWith(".zip")) {
        throw Error(`'${value}' is not a valid package file path: should have a .zip extension`);
      }
      return value;
    });
  const packageFileOptionValue = getStringValueMandatory(packageFileOption);

  const resourcesFolderOption = new Option("--resources-folder <value>", "The resources folder path").default(
    getDefault(configFile.resourcesFolder, "resources")
  );
  const resourcesFolderOptionValue = getStringValueMandatory(resourcesFolderOption);

  const resultsFolderOption = new Option("--results-folder <value>", "The results folder path").default(
    getDefault(configFile.resultsFolder, "target/gatling")
  );
  const resultsFolderOptionValue = getStringValueMandatory(resultsFolderOption);

  const typescriptOption = new Option(
    "--typescript",
    "Use the typescript compiler to compile your code (default: true if the sourcesFolder contains any *.gatling.ts file, false otherwise)"
  );
  const typescriptOptionValueWithDefaults = (options: any, simulationsFound: SimulationFile[]): boolean => {
    const value = getBooleanValueOptional(typescriptOption)(options);
    return value !== undefined ? value : simulationsFound.findIndex((s) => s.type === "typescript") >= 0;
  };

  const graalvmHomeMandatoryOption = new Option(
    "--graalvm-home <value>",
    "Path to the GraalVM home"
  ).makeOptionMandatory(true);
  const graalvmHomeMandatoryOptionValue = getStringValueMandatory(graalvmHomeMandatoryOption);

  const jvmClasspathMandatoryOption = new Option(
    "--jvm-classpath <value>",
    "The classpath containing all Gatling JVM components"
  ).makeOptionMandatory(true);
  const jvmClasspathMandatoryOptionValue = getStringValueMandatory(jvmClasspathMandatoryOption);

  const memoryOption = new Option(
    "--memory <value>",
    "Heap space memory size in MiB for Gatling. Half the total available memory is usually a good default, as the Gatling process will use more memory than just the heap space."
  )
    .default(configFile.memory)
    .argParser((value) => {
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        throw new Error(`${value} is not a valid memory size, must be an integer number`);
      }
      return parsedValue;
    });
  const memoryOptionValue = getNumberValueOptional(memoryOption);

  const nonInteractiveOption = new Option(
    "--non-interactive",
    "Switch to non-interactive mode and fail if no simulation is explicitly specified"
  ).default(false);
  const nonInteractiveOptionValue = getBooleanValueMandatory(nonInteractiveOption);

  const postmanOption = new Option(
    "--postman <version>",
    "Postman compatibility option: adds polyfills, etc."
  ).hideHelp();
  const postmanOptionValueWithDefaults = (options: any): string | undefined => {
    const postmanOptionValue = getStringValueOptional(postmanOption)(options);
    if (postmanOptionValue !== undefined) {
      return postmanOptionValue;
    } else {
      try {
        const conf = JSON.parse(fs.readFileSync("package.json", { encoding: "utf-8", flag: "r" }));
        const withPostman =
          conf.dependencies?.["@gatling.io/postman"] !== undefined ||
          conf.devDependencies?.["@gatling.io/postman"] !== undefined;
        if (withPostman) {
          let directory = path.normalize(path.dirname("package.json"));
          const root = path.parse(directory).root;
          while (true) {
            const file = path.join(directory, "node_modules", "@gatling.io", "postman", "package.json");
            if (fs.existsSync(file)) {
              const installedPackage = JSON.parse(fs.readFileSync(file, { encoding: "utf-8", flag: "r" }));
              return installedPackage.version;
            } else if (directory === root) {
              return undefined;
            } else {
              directory = path.normalize(path.join(directory, ".."));
            }
          }
        } else {
          return undefined;
        }
      } catch {
        return undefined;
      }
    }
  };

  const runParametersArgument = new Argument(
    "[optionKey=optionValue...]",
    "Specify one or more parameter which can be read in the simulation script with the getParameter() function; format must be key=value"
  );
  const parseRunParametersArgument = (args: string[]): Record<string, string> => {
    const parsedParameters: Record<string, string> = configFile.runParameters;
    for (const arg of args) {
      const i = arg.indexOf("=");
      if (i < 0) {
        throw Error(`Parameter '${arg}' is not valid: format should be key=value`);
      } else {
        const key = arg.slice(0, i).trim();
        parsedParameters[key] = arg.slice(i + 1);
      }
    }
    return parsedParameters;
  };

  const bundleFileArgument = new Argument(
    "[bundleFile]",
    "Specify the path to a Gatling JS bundle file to install; if not specified, bundle will be downloaded automatically"
  );

  const apiUrlOption = new Option("--api-url <value>", "URL of the Gatling Enterprise API")
    .default("https://api.gatling.io")
    .hideHelp();
  const apiUrlOptionValue = getStringValueMandatory(apiUrlOption);

  const webAppUrlOption = new Option("--web-app-url <value>", "URL of the Gatling Enterprise web app")
    .default("https://cloud.gatling.io")
    .hideHelp();
  const webAppUrlOptionValue = getStringValueMandatory(webAppUrlOption);

  const apiTokenOption = new Option(
    "--api-token <value>",
    "API Token on Gatling Enterprise. Prefer configuration using `GATLING_ENTERPRISE_API_TOKEN` environment variable."
  );
  const apiTokenOptionValue = getStringValueOptional(apiTokenOption);

  // Plugin configuration

  const controlPlaneUrlOption = new Option(
    "--control-plane-url <value>",
    "URL of a control plane for Gatling Enterprise providing a private repository. If this parameter is provided, packages will be registered as private packages and uploaded through this private control plane."
  ).default(configFile.controlPlaneUrl);
  const controlPlaneUrlOptionValue = getStringValueOptional(controlPlaneUrlOption);

  const trustStoreOption = new Option(
    "--trust-store <value>",
    `Path to a trust store (in PKCS#12 or JKS format) used when calling remote APIs over HTTPS. Useful with the ${controlPlaneUrlOption.long} option, if your control plane uses a certificate signed by an internal CA.`
  );
  const trustStoreOptionValue = getStringValueOptional(trustStoreOption);

  const trustStorePasswordOption = new Option(
    "--trust-store-password <value>",
    `Use with the ${trustStoreOption.long} option, if your trust store is protected by a password.`
  );
  const trustStorePasswordOptionValue = getStringValueOptional(trustStorePasswordOption);

  // Descriptor file

  const packageDescriptorFilenameOption = new Option(
    "--package-descriptor-filename <value>",
    "Path to a package descriptor inside the .gatling folder"
  ).default(getDefault(configFile.packageDescriptorFilename, "package.conf"));
  const packageDescriptorFilenameOptionValue = getStringValueMandatory(packageDescriptorFilenameOption);

  // Deployment info

  const enterpriseSimulationOption = new Option(
    "--enterprise-simulation <value>",
    "Specify the simulation name directly to bypass the prompt using the following command."
  );
  const enterpriseSimulationOptionValue = getStringValueOptional(enterpriseSimulationOption);

  const runTitleOption = new Option("--run-title <value>", "Allows setting a title for your run reports.");
  const runTitleOptionValue = getStringValueOptional(runTitleOption);

  const runDescriptionOption = new Option(
    "--run-description <value>",
    "Allows setting a description for your run reports summary."
  );
  const runDescriptionOptionValue = getStringValueOptional(runDescriptionOption);

  const waitForRunEndOption = new Option(
    "--wait-for-run-end",
    "Wait for the result after starting the simulation on Gatling Enterprise, and complete with an error if the simulation ends with any error status"
  ).default(false);
  const waitForRunEndOptionValue = getBooleanValueMandatory(waitForRunEndOption);

  return {
    gatlingHomeOption,
    gatlingHomeOptionValueWithDefaults,
    sourcesFolderOption,
    sourcesFolderOptionValue,
    simulationOption,
    simulationOptionValueWithDefaults,
    simulationMandatoryOption,
    simulationMandatoryOptionValue,
    bundleFileOption,
    bundleFileOptionValue,
    packageFileOption,
    packageFileOptionValue,
    resourcesFolderOption,
    resourcesFolderOptionValue,
    resultsFolderOption,
    resultsFolderOptionValue,
    typescriptOption,
    typescriptOptionValueWithDefaults,
    graalvmHomeMandatoryOption,
    graalvmHomeMandatoryOptionValue,
    jvmClasspathMandatoryOption,
    jvmClasspathMandatoryOptionValue,
    memoryOption,
    memoryOptionValue,
    nonInteractiveOption,
    nonInteractiveOptionValue,
    postmanOption,
    postmanOptionValueWithDefaults,
    runParametersArgument,
    parseRunParametersArgument,
    bundleFileArgument,
    apiUrlOption,
    apiUrlOptionValue,
    webAppUrlOption,
    webAppUrlOptionValue,
    apiTokenOption,
    apiTokenOptionValue,
    controlPlaneUrlOption,
    controlPlaneUrlOptionValue,
    trustStoreOption,
    trustStoreOptionValue,
    trustStorePasswordOption,
    trustStorePasswordOptionValue,
    packageDescriptorFilenameOption,
    packageDescriptorFilenameOptionValue,
    enterpriseSimulationOption,
    enterpriseSimulationOptionValue,
    runTitleOption,
    runTitleOptionValue,
    runDescriptionOption,
    runDescriptionOptionValue,
    waitForRunEndOption,
    waitForRunEndOptionValue
  };
};

const getDefault = <T>(fromConfigFile: T | undefined, hardcoded: T): T =>
  fromConfigFile !== undefined ? fromConfigFile : hardcoded;

const getStringValueOptional =
  (option: Option) =>
  (options: any): string | undefined => {
    const value = options[option.attributeName()];
    if (typeof value === "string" || typeof value === "undefined") {
      return value;
    } else {
      throw Error(
        `Expected type string|undefined for attribute ${option.attributeName()}, got ${typeof value} - please report this as a bug.`
      );
    }
  };
const getStringValueMandatory =
  (option: Option) =>
  (options: any): string => {
    const value = options[option.attributeName()];
    if (typeof value === "string") {
      return value;
    } else {
      throw Error(
        `Expected type string for attribute ${option.attributeName()}, got ${typeof value} - please report this as a bug.`
      );
    }
  };
const getBooleanValueOptional =
  (option: Option) =>
  (options: any): boolean | undefined => {
    const value = options[option.attributeName()];
    if (typeof value === "boolean" || typeof value === "undefined") {
      return value;
    } else {
      throw Error(
        `Expected type boolean|undefined for attribute ${option.attributeName()}, got ${typeof value} - please report this as a bug.`
      );
    }
  };
const getBooleanValueMandatory =
  (option: Option) =>
  (options: any): boolean => {
    const value = options[option.attributeName()];
    if (typeof value === "boolean") {
      return value;
    } else {
      throw Error(
        `Expected type boolean for attribute ${option.attributeName()}, got ${typeof value} - please report this as a bug.`
      );
    }
  };
const getNumberValueOptional =
  (option: Option) =>
  (options: any): number | undefined => {
    const value = options[option.attributeName()];
    if (typeof value === "number" || typeof value === "undefined") {
      return value;
    } else {
      throw Error(
        `Expected type number|undefined for attribute ${option.attributeName()}, got ${typeof value} - please report this as a bug.`
      );
    }
  };
