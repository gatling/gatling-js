import { Command } from "commander";

import { readConfigFile, ConfigFile } from "./configFile";
import { resolveOptions } from "./resolveOptions";
import registerInstallCommand from "./install";
import registerBuildCommand from "./build";
import registerRunOnlyCommand from "./runOnly";
import registerRunCommand from "./run";
import registerRecorderCommand from "./recorder";
import registerEnterprisePackageCommand from "./enterprisePackage";
import registerEnterpriseDeployCommand from "./enterpriseDeploy";
import registerEnterpriseStartCommand from "./enterpriseStart";
import { versions } from "../dependencies";

const configFile: ConfigFile = readConfigFile();
const options = resolveOptions(configFile);

export const program: Command = new Command()
  .name("gatling-js-cli")
  .version(versions.gatling.jsAdapter)
  .description("The Gatling Javascript run & packaging tool");

registerInstallCommand(options, program);
registerBuildCommand(options, program);
registerRunOnlyCommand(options, program);
registerRunCommand(options, program);
registerRecorderCommand(options, program);
registerEnterprisePackageCommand(options, program);
registerEnterpriseDeployCommand(options, program);
registerEnterpriseStartCommand(options, program);
