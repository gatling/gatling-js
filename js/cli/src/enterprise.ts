import archiver from "archiver";
import fs from "fs";
import { pipeline } from "stream/promises";
import { constants as zConstants } from "zlib";

import { versions } from "./dependencies";
import { RunJavaProcessOptions, runJavaProcess } from "./java";
import { logger } from "./log";
import { SimulationFile } from "./simulations";

export interface EnterprisePackageOptions {
  bundleFile: string;
  resourcesFolder: string;
  packageFile: string;
  simulations: SimulationFile[];
}

export const enterprisePackage = async (options: EnterprisePackageOptions): Promise<void> => {
  logger.info(`Packaging a Gatling simulation with options:
 - bundleFile: ${options.bundleFile}
 - packageFile: ${options.packageFile}`);

  const manifest = generateManifest(options.simulations.map((s) => s.name));

  const output = fs.createWriteStream(options.packageFile);

  const archive = archiver("zip", {
    zlib: { level: zConstants.Z_MAX_LEVEL }
  });
  archive.on("warning", (err) => {
    // The pipeline will rethrow errors but not warnings. We don't want to ignore warnings from the archiver, because
    // they include things like 'no such file or directory'.
    throw err;
  });
  archive.file(options.bundleFile, { name: "bundle.js" });
  archive.append(Buffer.from(manifest), { name: "META-INF/MANIFEST.MF" });
  archive.directory(options.resourcesFolder + "/", false);
  archive.finalize();

  await pipeline(archive, output);

  logger.info(`Package for Gatling Enterprise created at ${options.packageFile}`);
};

const generateManifest = (simulationNames: string[]) => {
  const utf8Encoder = new TextEncoder();
  const eol = utf8Encoder.encode("\n");
  const continuation = utf8Encoder.encode("\n ");
  const lines = [
    "Manifest-Version: 1.0",
    "Specification-Vendor: GatlingCorp",
    "Gatling-Context: js",
    `Gatling-Version: ${versions.gatling.core}`,
    "Gatling-Packager: js-cli",
    `Gatling-Packager-Version: ${versions.gatling.jsAdapter}`,
    `Gatling-Simulations: ${simulationNames.join(",")}`,
    `Java-Version: ${versions.java.compilerRelease}`
  ];
  const pkg = getPackageNameAndVersion();
  lines.push(`Implementation-Title: ${pkg.name}`);
  if (pkg.version !== undefined) {
    lines.push(`Implementation-Version: ${pkg.version}`);
  }

  let totalLength = 0;
  const buffer: Uint8Array[] = [];
  for (const line of lines) {
    let lineLength = 0;
    for (const char of line) {
      const bytes = utf8Encoder.encode(char);
      const byteLength = bytes.byteLength;
      if (lineLength + byteLength > 71) {
        buffer.push(continuation);
        buffer.push(bytes);
        // reset length for the new line (with +1 for leading space)
        lineLength = byteLength + 1;
        totalLength += byteLength + 2;
      } else {
        buffer.push(bytes);
        lineLength += byteLength;
        totalLength += byteLength;
      }
    }
    buffer.push(eol);
    totalLength += 1;
  }

  const manifest = new Uint8Array(totalLength);
  let cursor = 0;
  for (const elt of buffer) {
    manifest.set(elt, cursor);
    cursor += elt.byteLength;
  }

  return manifest;
};

const getPackageNameAndVersion = (): { name: string; version?: string } => {
  // npm_package_* env vars are available when launching CLI with npx
  let name = process.env.npm_package_name;
  let version = process.env.npm_package_version;
  // otherwise, try to read from package.json file
  if (name === undefined || version === undefined) {
    if (!fs.existsSync("package.json")) {
      throw Error("package.json not found");
    }
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
    if (name === undefined) {
      if (typeof pkg.name === "string") {
        name = pkg.name;
      } else {
        throw Error("package.json does not contain a valid package name");
      }
    }
    if (version === undefined && typeof pkg.version === "string") {
      version = pkg.version;
    }
  }
  return { name: name as string, version: version };
};

export interface EnterprisePluginOptions extends RunJavaProcessOptions {
  bundleFile: string;
  resourcesFolder: string;
  resultsFolder: string;
  // Base
  apiUrl: string;
  webAppUrl: string;
  apiToken?: string;
  // Plugin configuration
  controlPlaneUrl?: string;
  nonInteractive: boolean;
}

const javaArgsFromPluginOptions = (options: EnterprisePluginOptions) => {
  const javaArgs: string[] = [];

  // Base
  javaArgs.push(`-Dgatling.enterprise.apiUrl=${options.apiUrl}`);
  javaArgs.push(`-Dgatling.enterprise.webAppUrl=${options.webAppUrl}`);
  if (options.apiToken !== undefined) {
    javaArgs.push(`-Dgatling.enterprise.apiToken=${options.apiToken}`);
  }

  // Plugin configuration
  if (options.controlPlaneUrl !== undefined) {
    javaArgs.push(`-Dgatling.enterprise.controlPlaneUrl=${options.controlPlaneUrl}`);
  }
  javaArgs.push("-Dgatling.enterprise.buildTool=js-cli");
  javaArgs.push(`-Dgatling.enterprise.pluginVersion=${versions.gatling.jsAdapter}`);

  if (options.nonInteractive) {
    javaArgs.push(`-Dgatling.enterprise.batchMode=true`);
  }

  return javaArgs;
};

export interface EnterpriseDeployOptions extends EnterprisePluginOptions {
  // Descriptor file
  packageDescriptorFilename: string;
  // Deployment info
  packageFile: string;
}

const javaArgsFromDeployOptions = (options: EnterpriseDeployOptions) => {
  const javaArgs = javaArgsFromPluginOptions(options);

  // Descriptor file
  javaArgs.push(`-Dgatling.enterprise.baseDirectory=${process.cwd()}`);
  javaArgs.push(`-Dgatling.enterprise.packageDescriptorFilename=${options.packageDescriptorFilename}`);

  // Deployment info
  javaArgs.push(`-Dgatling.enterprise.packageFile=${options.packageFile}`);
  javaArgs.push(`-Dgatling.enterprise.artifactId=${getPackageNameAndVersion().name}`);

  return javaArgs;
};

export const enterpriseDeploy = async (options: EnterpriseDeployOptions): Promise<void> => {
  const additionalClasspathElements = [options.resourcesFolder];
  const javaArgs = javaArgsFromDeployOptions(options);

  if (process.env["DEBUG"] === "true") {
    logger.debug("Java arguments:");
    for (let i = 0; i < javaArgs.length; i++) {
      logger.debug("  " + javaArgs[i]);
    }
  }

  return runJavaProcess(options, "io.gatling.plugin.cli.EnterpriseDeploy", additionalClasspathElements, javaArgs, []);
};

export interface EnterpriseStartOptions extends EnterpriseDeployOptions {
  enterpriseSimulation?: string;
  runTitle?: string;
  runDescription?: string;
  waitForRunEnd?: boolean;
}

export const enterpriseStart = async (options: EnterpriseStartOptions): Promise<void> => {
  const additionalClasspathElements = [options.resourcesFolder];
  const javaArgs = javaArgsFromDeployOptions(options);

  // Start
  if (options.enterpriseSimulation !== undefined) {
    javaArgs.push(`-Dgatling.enterprise.simulationName=${options.enterpriseSimulation}`);
  }
  if (options.runTitle !== undefined) {
    javaArgs.push(`-Dgatling.enterprise.runTitle=${options.runTitle}`);
  }
  if (options.runDescription !== undefined) {
    javaArgs.push(`-Dgatling.enterprise.runDescription=${options.runDescription}`);
  }
  if (options.waitForRunEnd) {
    javaArgs.push("-Dgatling.enterprise.waitForRunEnd=true");
  }

  if (process.env["DEBUG"] === "true") {
    logger.debug("Java arguments:");
    for (let i = 0; i < javaArgs.length; i++) {
      logger.debug("  " + javaArgs[i]);
    }
  }

  return runJavaProcess(options, "io.gatling.plugin.cli.EnterpriseStart", additionalClasspathElements, javaArgs, []);
};
