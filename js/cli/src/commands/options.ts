import { Option, Argument } from "commander";
import fs from "fs";
import os from "os";
import path from "path";

import { SimulationFile } from "../simulations";
import { keyInSelectPaginated } from "../readline";
import { logger } from "../log";

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

export const gatlingHomeOption = new Option(
  "--gatling-home <value>",
  'The folder used to download and install Gatling components (default: "~/.gatling")'
);
export const gatlingHomeOptionValueWithDefaults = (options: any): string =>
  getStringValueOptional(gatlingHomeOption)(options) || `${os.homedir()}/.gatling`;

export const sourcesFolderOption = new Option("--sources-folder <value>", "The sources folder path").default("src");
export const sourcesFolderOptionValue = getStringValueMandatory(sourcesFolderOption);

export const simulationOption = new Option(
  "--simulation <value>",
  "The simulation entry point function name (default: if only one *.gatling.js or *.gatling.ts file is found, will execute that simulation)"
);
export const simulationOptionValueWithDefaults = (
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

export const simulationMandatoryOption = new Option(
  "--simulation <value>",
  "The simulation entry point function name"
).makeOptionMandatory(true);
export const simulationMandatoryOptionValue = getStringValueMandatory(simulationMandatoryOption);

export const bundleFileOption = new Option(
  "--bundle-file <value>",
  "The target bundle file path when building simulations (must have a .js extension)"
)
  .default("target/bundle.js")
  .argParser((value) => {
    if (!value.endsWith(".js")) {
      throw Error(`'${value}' is not a valid bundle file path: should have a .js extension`);
    }
    return value;
  });
export const bundleFileOptionValue = getStringValueMandatory(bundleFileOption);

export const packageFileOption = new Option(
  "--package-file <value>",
  "The target package file path when packaging simulations for Gatling Enterprise (must have a .zip extension)"
)
  .default("target/package.zip")
  .argParser((value) => {
    if (!value.endsWith(".zip")) {
      throw Error(`'${value}' is not a valid package file path: should have a .zip extension`);
    }
    return value;
  });
export const packageFileOptionValue = getStringValueMandatory(packageFileOption);

export const resourcesFolderOption = new Option("--resources-folder <value>", "The resources folder path").default(
  "resources"
);
export const resourcesFolderOptionValue = getStringValueMandatory(resourcesFolderOption);

export const resultsFolderOption = new Option("--results-folder <value>", "The results folder path").default(
  "target/gatling"
);
export const resultsFolderOptionValue = getStringValueMandatory(resultsFolderOption);

export const typescriptOption = new Option(
  "--typescript",
  "Use the typescript compiler to compile your code (default: true if the sourcesFolder contains any *.gatling.ts file, false otherwise)"
);
export const typescriptOptionValueWithDefaults = (options: any, simulationsFound: SimulationFile[]): boolean => {
  const value = getBooleanValueOptional(typescriptOption)(options);
  return value !== undefined ? value : simulationsFound.findIndex((s) => s.type === "typescript") >= 0;
};

export const graalvmHomeMandatoryOption = new Option(
  "--graalvm-home <value>",
  "Path to the GraalVM home"
).makeOptionMandatory(true);
export const graalvmHomeMandatoryOptionValue = getStringValueMandatory(graalvmHomeMandatoryOption);

export const jvmClasspathMandatoryOption = new Option(
  "--jvm-classpath <value>",
  "The classpath containing all Gatling JVM components"
).makeOptionMandatory(true);
export const jvmClasspathMandatoryOptionValue = getStringValueMandatory(jvmClasspathMandatoryOption);

export const memoryOption = new Option(
  "--memory <value>",
  "Heap space memory size in MiB for Gatling. Half the total available memory is usually a good default, as the Gatling process will use more memory than just the heap space."
).argParser((value) => {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new Error(`${value} is not a valid memory size, must be an integer number`);
  }
  return parsedValue;
});
export const memoryOptionValue = getNumberValueOptional(memoryOption);

export const nonInteractiveOption = new Option(
  "--non-interactive",
  "Switch to non-interactive mode and fail if no simulation is explicitly specified"
).default(false);
export const nonInteractiveOptionValue = getBooleanValueMandatory(nonInteractiveOption);

export const postmanOption = new Option(
  "--postman <version>",
  "Postman compatibility option: adds polyfills, etc."
).hideHelp();
export const postmanOptionValueWithDefaults = (options: any): string | undefined => {
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

export const runParametersArgument = new Argument(
  "[optionKey=optionValue...]",
  "Specify one or more parameter which can be read in the simulation script with the getParameter() function; format must be key=value"
);
export const parseRunParametersArgument = (args: string[]): Record<string, string> => {
  const parsedParameters: Record<string, string> = {};
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

export const apiUrlOption = new Option("--apiUrl <value>", "URL of the Gatling Enterprise API")
  .default("https://api.gatling.io")
  .hideHelp();
export const apiUrlOptionValue = getStringValueMandatory(apiUrlOption);

export const webAppUrlOption = new Option("--webAppUrl <value>", "URL of the Gatling Enterprise web app")
  .default("https://cloud.gatling.io")
  .hideHelp();
export const webAppUrlOptionValue = getStringValueMandatory(webAppUrlOption);

export const apiTokenOption = new Option(
  "--api-token <value>",
  "API Token on Gatling Enterprise. Prefer configuration using `GATLING_ENTERPRISE_API_TOKEN` environment variable."
);
export const apiTokenOptionValue = getStringValueOptional(apiTokenOption);

// Plugin configuration

export const controlPlaneUrlOption = new Option(
  "--control-plane-url <value>",
  "URL of a control plane for Gatling Enterprise providing a private repository. If this parameter is provided, packages will be registered as private packages and uploaded through this private control plane."
);
export const controlPlaneUrlOptionValue = getStringValueOptional(controlPlaneUrlOption);

// Descriptor file

export const packageDescriptorFilenameOption = new Option(
  "--package-descriptor-filename <value>",
  "Path to a package descriptor inside the .gatling folder"
).default("package.conf");
export const packageDescriptorFilenameOptionValue = getStringValueMandatory(packageDescriptorFilenameOption);

// Deployment info

export const enterpriseSimulationOption = new Option(
  "--enterprise-simulation <value>",
  "Specify the simulation name directly to bypass the prompt using the following command."
);
export const enterpriseSimulationOptionValue = getStringValueOptional(enterpriseSimulationOption);

export const runTitleOption = new Option("--run-title <value>", "Allows setting a title for your run reports.");
export const runTitleOptionValue = getStringValueOptional(runTitleOption);

export const runDescriptionOption = new Option(
  "--run-description <value>",
  "Allows setting a description for your run reports summary."
);
export const runDescriptionOptionValue = getStringValueOptional(runDescriptionOption);

export const waitForRunEndOption = new Option(
  "--wait-for-run-end",
  "Wait for the result after starting the simulation on Gatling Enterprise, and complete with an error if the simulation ends with any error status"
).default(false);
export const waitForRunEndOptionValue = getBooleanValueMandatory(waitForRunEndOption);
