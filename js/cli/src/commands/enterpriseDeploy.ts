import { Command } from "commander";

import {
  apiTokenOption,
  apiTokenOptionValue,
  bundleFileOption,
  bundleFileOptionValue,
  controlPlaneUrlOption,
  controlPlaneUrlOptionValue,
  gatlingHomeOption,
  gatlingHomeOptionValueWithDefaults,
  nonInteractiveOption,
  nonInteractiveOptionValue,
  packageDescriptorFilenameOption,
  packageDescriptorFilenameOptionValue,
  packageFileOption,
  packageFileOptionValue,
  resourcesFolderOption,
  resourcesFolderOptionValue,
  resultsFolderOption,
  resultsFolderOptionValue,
  sourcesFolderOption,
  sourcesFolderOptionValue,
  typescriptOption,
  typescriptOptionValueWithDefaults,
  urlOption,
  urlOptionValue
} from "./options";
import { findSimulations } from "../simulations";
import { installGatlingJs } from "../dependencies";
import { bundle } from "../bundle";
import { enterpriseDeploy, enterprisePackage } from "../enterprise";

export default (program: Command): void => {
  program
    .command("enterprise-deploy")
    .description("Deploy a package and configured simulations")
    .addOption(sourcesFolderOption)
    .addOption(resourcesFolderOption)
    .addOption(bundleFileOption)
    .addOption(resultsFolderOption)
    .addOption(typescriptOption)
    .addOption(gatlingHomeOption)
    // Base
    .addOption(urlOption)
    .addOption(apiTokenOption)
    // Plugin configuration
    .addOption(controlPlaneUrlOption)
    .addOption(nonInteractiveOption)
    // Descriptor file
    .addOption(packageDescriptorFilenameOption)
    // Deployment info
    .addOption(packageFileOption)
    .action(async (options) => {
      const sourcesFolder: string = sourcesFolderOptionValue(options);

      const simulations = await findSimulations(sourcesFolder);
      const typescript = typescriptOptionValueWithDefaults(options, simulations);

      const resourcesFolder: string = resourcesFolderOptionValue(options);
      const bundleFile = bundleFileOptionValue(options);
      const resultsFolder: string = resultsFolderOptionValue(options);
      const gatlingHome = gatlingHomeOptionValueWithDefaults(options);
      const url = urlOptionValue(options);
      const apiToken = apiTokenOptionValue(options);
      const controlPlaneUrl = controlPlaneUrlOptionValue(options);
      const nonInteractive = nonInteractiveOptionValue(options);
      const packageDescriptorFilename = packageDescriptorFilenameOptionValue(options);
      const packageFile = packageFileOptionValue(options);

      const { graalvmHome, jvmClasspath } = await installGatlingJs({ gatlingHome });
      await bundle({ sourcesFolder, bundleFile, typescript, simulations });
      await enterprisePackage({ bundleFile, resourcesFolder, packageFile, simulations });
      await enterpriseDeploy({
        graalvmHome,
        jvmClasspath,
        bundleFile,
        resourcesFolder,
        resultsFolder,
        url,
        apiToken,
        controlPlaneUrl,
        nonInteractive,
        packageDescriptorFilename,
        packageFile
      });
    });
};
