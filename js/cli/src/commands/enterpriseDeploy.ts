import { Command } from "commander";

import { ResolvedOptions } from "./resolveOptions";
import { findSimulations } from "../simulations";
import { resolveBundle } from "../dependencies";
import { bundle } from "../bundle";
import { enterpriseDeploy, enterprisePackage } from "../enterprise";

export default (opts: ResolvedOptions, program: Command): void => {
  program
    .command("enterprise-deploy")
    .description("Deploy a package and configured simulations")
    .addOption(opts.sourcesFolderOption)
    .addOption(opts.resourcesFolderOption)
    .addOption(opts.bundleFileOption)
    .addOption(opts.resultsFolderOption)
    .addOption(opts.postmanOption)
    .addOption(opts.typescriptOption)
    .addOption(opts.gatlingHomeOption)
    // Base
    .addOption(opts.apiUrlOption)
    .addOption(opts.webAppUrlOption)
    .addOption(opts.apiTokenOption)
    // Plugin configuration
    .addOption(opts.controlPlaneUrlOption)
    .addOption(opts.trustStoreOption)
    .addOption(opts.trustStorePasswordOption)
    .addOption(opts.nonInteractiveOption)
    // Descriptor file
    .addOption(opts.packageDescriptorFilenameOption)
    // Deployment info
    .addOption(opts.packageFileOption)
    .action(async (options) => {
      const sourcesFolder: string = opts.sourcesFolderOptionValue(options);

      const simulations = await findSimulations(sourcesFolder);
      const postman = opts.postmanOptionValueWithDefaults(options);
      const typescript = opts.typescriptOptionValueWithDefaults(options, simulations);

      const resourcesFolder = opts.resourcesFolderOptionValue(options);
      const bundleFile = opts.bundleFileOptionValue(options);
      const resultsFolder = opts.resultsFolderOptionValue(options);
      const gatlingHome = opts.gatlingHomeOptionValueWithDefaults(options);
      const apiUrl = opts.apiUrlOptionValue(options);
      const webAppUrl = opts.webAppUrlOptionValue(options);
      const apiToken = opts.apiTokenOptionValue(options);
      const controlPlaneUrl = opts.controlPlaneUrlOptionValue(options);
      const trustStore = opts.trustStoreOptionValue(options);
      const trustStorePassword = opts.trustStorePasswordOptionValue(options);
      const nonInteractive = opts.nonInteractiveOptionValue(options);
      const packageDescriptorFilename = opts.packageDescriptorFilenameOptionValue(options);
      const packageFile = opts.packageFileOptionValue(options);

      const { graalvmHome, jvmClasspath } = await resolveBundle({ gatlingHome });
      await bundle({ sourcesFolder, bundleFile, postman, typescript, simulations });
      await enterprisePackage({ bundleFile, resourcesFolder, packageFile, postman, simulations });
      await enterpriseDeploy({
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
        packageFile
      });
    });
};
