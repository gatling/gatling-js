import { Command } from "commander";

import { ResolvedOptions } from "./resolveOptions";
import { findSimulations } from "../simulations";
import { resolveBundle } from "../dependencies";
import { bundle } from "../bundle";
import { enterprisePackage, enterpriseStart } from "../enterprise";

export default (opts: ResolvedOptions, program: Command): void => {
  program
    .command("enterprise-start")
    .description("Start a simulation deployed with `enterprise-deploy`")
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
    // Start
    .addOption(opts.enterpriseSimulationOption)
    .addOption(opts.runTitleOption)
    .addOption(opts.runDescriptionOption)
    .addOption(opts.waitForRunEndOption)
    .action(async (options) => {
      const sourcesFolder: string = opts.sourcesFolderOptionValue(options);

      const simulations = await findSimulations(sourcesFolder);
      const postman = opts.postmanOptionValueWithDefaults(options);
      const typescript = opts.typescriptOptionValueWithDefaults(options, simulations);

      const resourcesFolder: string = opts.resourcesFolderOptionValue(options);
      const bundleFile = opts.bundleFileOptionValue(options);
      const resultsFolder: string = opts.resultsFolderOptionValue(options);
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
      const enterpriseSimulation = opts.enterpriseSimulationOptionValue(options);
      const runTitle = opts.runTitleOptionValue(options);
      const runDescription = opts.runDescriptionOptionValue(options);
      const waitForRunEnd = opts.waitForRunEndOptionValue(options);

      if (nonInteractive && enterpriseSimulation === undefined) {
        throw new Error(`No simulation specified when using non-interactive mode`);
      }

      const { graalvmHome, jvmClasspath } = await resolveBundle({ gatlingHome });
      await bundle({ sourcesFolder, bundleFile, postman, typescript, simulations });
      await enterprisePackage({ bundleFile, resourcesFolder, packageFile, postman, simulations });
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
