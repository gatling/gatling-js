import fs from "node:fs";

import { dictionary, errorDebugString, number, object, string } from "idonttrustlikethat";

export const readConfigFile = (): ConfigFile => {
  const path = ".gatling/cli.json";
  const content = fs.existsSync(path) ? fs.readFileSync(path, { encoding: "utf-8" }) : "{}";
  const validated = configFileValidation.validate(JSON.parse(content));
  if (validated.ok) {
    return validated.value;
  } else {
    throw Error(`Gatling CLI configuration file is not valid.
${errorDebugString(validated.errors)}`);
  }
};

export type ConfigFile = typeof configFileValidation.T;

const configFileValidation = object({
  // --gatling-home <value>
  gatlingHome: string.optional(),
  // --sources-folder <value>
  sourcesFolder: string.optional(),
  // --resources-folder <value>
  resourcesFolder: string.optional(),
  // --results-folder <value>
  resultsFolder: string.optional(),
  // --bundle-file <value>
  bundleFile: string.optional(),
  // --package-file <value>
  packageFile: string.optional(),
  // --memory <value>
  memory: number.optional(),
  // args [optionKey=optionValue...]
  runParameters: dictionary(string, string).default({}),
  // --control-plane-url <value>
  controlPlaneUrl: string.optional(),
  // --package-descriptor-filename <value>
  packageDescriptorFilename: string.optional()
});
