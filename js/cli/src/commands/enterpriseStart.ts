import { Command } from "commander";

import {
  apiTokenOption,
  apiTokenOptionValue,
  bundleFileOption,
  bundleFileOptionValue,
  controlPlaneUrlOption,
  controlPlaneUrlOptionValue,
  enterpriseSimulationOption,
  enterpriseSimulationOptionValue,
  gatlingHomeOption,
  gatlingHomeOptionValueWithDefaults,
  nonInteractiveOption,
  nonInteractiveOptionValue,
  packageDescriptorFilenameOption,
  packageDescriptorFilenameOptionValue,
  packageFileOption,
  packageFileOptionValue,
  postmanOption,
  postmanOptionValueWithDefaults,
  protoFolderOption,
  protoFolderOptionValue,
  protoTargetFolderOption,
  protoTargetFolderOptionValue,
  resourcesFolderOption,
  resourcesFolderOptionValue,
  resultsFolderOption,
  resultsFolderOptionValue,
  runDescriptionOption,
  runDescriptionOptionValue,
  runTitleOption,
  runTitleOptionValue,
  sourcesFolderOption,
  sourcesFolderOptionValue,
  trustStoreOption,
  trustStoreOptionValue,
  trustStorePasswordOption,
  trustStorePasswordOptionValue,
  typescriptOption,
  typescriptOptionValueWithDefaults,
  apiUrlOption,
  apiUrlOptionValue,
  webAppUrlOption,
  webAppUrlOptionValue,
  waitForRunEndOption,
  waitForRunEndOptionValue
} from "./options";
import { findSimulations } from "../simulations";
import { resolveBundle } from "../dependencies";
import { bundle } from "../bundle";
import { enterprisePackage, enterpriseStart } from "../enterprise";

export default (program: Command): void => {
  program
    .command("enterprise-start")
    .description("Start a simulation deployed with `enterprise-deploy`")
    .addOption(sourcesFolderOption)
    .addOption(protoFolderOption)
    .addOption(resourcesFolderOption)
    .addOption(bundleFileOption)
    .addOption(protoTargetFolderOption)
    .addOption(resultsFolderOption)
    .addOption(postmanOption)
    .addOption(typescriptOption)
    .addOption(gatlingHomeOption)
    // Base
    .addOption(apiUrlOption)
    .addOption(webAppUrlOption)
    .addOption(apiTokenOption)
    // Plugin configuration
    .addOption(controlPlaneUrlOption)
    .addOption(trustStoreOption)
    .addOption(trustStorePasswordOption)
    .addOption(nonInteractiveOption)
    // Descriptor file
    .addOption(packageDescriptorFilenameOption)
    // Deployment info
    .addOption(packageFileOption)
    // Start
    .addOption(enterpriseSimulationOption)
    .addOption(runTitleOption)
    .addOption(runDescriptionOption)
    .addOption(waitForRunEndOption)
    .action(async (options) => {
      const sourcesFolder: string = sourcesFolderOptionValue(options);
      const protoFolder: string = protoFolderOptionValue(options);

      const simulations = await findSimulations(sourcesFolder);
      const postman = postmanOptionValueWithDefaults(options);
      const typescript = typescriptOptionValueWithDefaults(options, simulations);

      const resourcesFolder: string = resourcesFolderOptionValue(options);
      const bundleFile = bundleFileOptionValue(options);
      const protoTargetFolder = protoTargetFolderOptionValue(options);
      const resultsFolder: string = resultsFolderOptionValue(options);
      const gatlingHome = gatlingHomeOptionValueWithDefaults(options);
      const apiUrl = apiUrlOptionValue(options);
      const webAppUrl = webAppUrlOptionValue(options);
      const apiToken = apiTokenOptionValue(options);
      const controlPlaneUrl = controlPlaneUrlOptionValue(options);
      const trustStore = trustStoreOptionValue(options);
      const trustStorePassword = trustStorePasswordOptionValue(options);
      const nonInteractive = nonInteractiveOptionValue(options);
      const packageDescriptorFilename = packageDescriptorFilenameOptionValue(options);
      const packageFile = packageFileOptionValue(options);
      const enterpriseSimulation = enterpriseSimulationOptionValue(options);
      const runTitle = runTitleOptionValue(options);
      const runDescription = runDescriptionOptionValue(options);
      const waitForRunEnd = waitForRunEndOptionValue(options);

      if (nonInteractiveOptionValue(options) && enterpriseSimulation === undefined) {
        throw new Error(`No simulation specified when using non-interactive mode`);
      }

      const { graalvmHome, jvmClasspath, protocPath } = await resolveBundle({ gatlingHome });
      await bundle({
        sourcesFolder,
        protoFolder,
        bundleFile,
        protoTargetFolder,
        postman,
        typescript,
        simulations,
        protocPath
      });
      await enterprisePackage({ bundleFile, resourcesFolder, protoTargetFolder, packageFile, postman, simulations });
      await enterpriseStart({
        graalvmHome,
        jvmClasspath,
        bundleFile,
        resourcesFolder,
        resultsFolder,
        apiUrl,
        webAppUrl,
        apiToken,
        controlPlaneUrl,
        trustStore,
        trustStorePassword,
        nonInteractive,
        packageDescriptorFilename,
        packageFile,
        enterpriseSimulation,
        runTitle,
        runDescription,
        waitForRunEnd
      });
    });
};
