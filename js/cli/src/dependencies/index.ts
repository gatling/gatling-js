import * as fsSync from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

import StreamZip from "node-stream-zip";

import { downloadFile } from "./download";
import { logger } from "../log";
import { osArch, osType } from "./os";
import { versions } from "./versions";

export { versions } from "./versions";

export interface BundleOptions {
  gatlingHome: string;
}

export interface BundleInstallOptions extends BundleOptions {
  bundleFilePath: string;
}

export interface ResolvedBundle {
  graalvmHome: string;
  jvmClasspath: string;
}

export const installBundleFile = async (options: BundleInstallOptions): Promise<ResolvedBundle> => {
  logger.info(`bundleFilePath: ${options.bundleFilePath}`);
  const zip = new StreamZip.async({ file: options.bundleFilePath });
  const metadata = await zip.entryData(metadataFileName);
  const { version } = JSON.parse(metadata.toString("utf-8"));
  if (version === versions.gatling.jsAdapter) {
    logger.info(`Installing dependencies bundle for Gatling JS ${version}, which is the current version`);
  } else {
    logger.info(
      `Installing dependencies bundle for Gatling JS ${version}, which is not the current version (${versions.gatling.jsAdapter})`
    );
  }

  const bundlePath = getBundlePath(options, version);
  if (await canReadPath(bundlePath)) {
    throw Error(`Directory ${bundlePath} already exists`);
  }
  await fs.mkdir(bundlePath, { recursive: true });
  await zip.extract(null, bundlePath);
  if (osType !== "Windows_NT") {
    const graalVmBinDir = path.join(bundlePath, "graalvm", "bin");
    const binFiles = await fs.readdir(graalVmBinDir);
    for (const binFile of binFiles) {
      await fs.chmod(path.join(graalVmBinDir, binFile), 0o744); // chmod +x
    }
  }
  logger.info(`Gatling JS dependencies bundle installed in ${bundlePath}`);

  return getResolvedBundle(bundlePath);
};

export const resolveBundle = async (options: BundleOptions): Promise<ResolvedBundle> => {
  const bundlePath = getBundlePath(options, versions.gatling.jsAdapter);
  if (await canReadPath(bundlePath)) {
    // Basic check of the installed bundle we found
    const bundleMetadataPath = path.join(bundlePath, metadataFileName);
    let version = "";
    try {
      const f = await fs.readFile(bundleMetadataPath, { encoding: "utf-8" });
      const metadata = JSON.parse(f);
      version = metadata.version;
    } catch {}
    if (version !== versions.gatling.jsAdapter) {
      throw Error(`Inconsistent bundle content found at ${bundlePath}`);
    }
    return getResolvedBundle(bundlePath);
  } else {
    return await downloadAndInstallBundle(options);
  }
};

const getBundlePath = (options: BundleOptions, version: string) =>
  path.join(options.gatlingHome, "gatling-js-bundle", version);

const metadataFileName = "gatling-bundle.json";

const canReadPath = async (path: string) => {
  try {
    await fs.access(path, fs.constants.R_OK);
    return true;
  } catch (e) {
    if ((e as any).code === "ENOENT") {
      return false;
    } else {
      throw e;
    }
  }
};

const getResolvedBundle = (bundlePath: string): ResolvedBundle => ({
  graalvmHome: path.join(bundlePath, "graalvm"),
  jvmClasspath: path.join(bundlePath, "lib", "java", "*")
});

const downloadAndInstallBundle = async (options: BundleOptions) => {
  const tmpFolder = path.join(options.gatlingHome, "tmp");
  if (!fsSync.existsSync(tmpFolder)) {
    await fs.mkdir(tmpFolder, { recursive: true });
  }

  const tmpFile = path.join(tmpFolder, "bundle-download.zip");
  if (fsSync.existsSync(tmpFile)) {
    await fs.rm(tmpFile);
  }

  const version = versions.gatling.jsAdapter;
  const url = `https://github.com/gatling/gatling-js/releases/download/v${version}/gatling-js-bundle-${version}-${osType}-${osArch}.zip`;
  try {
    logger.info(`Downloading bundle file from ${url} to temporary file ${tmpFile}`);
    await downloadFile(url, tmpFile);

    const resolvedBundle = await installBundleFile({ ...options, bundleFilePath: tmpFile });

    logger.info(`Deleting temporary file ${tmpFile}`);
    await fs.rm(tmpFile);

    return resolvedBundle;
  } catch (e) {
    logger.error(`Failed to automatically download and install the Gatling runtime bundle. You can try to:
1. Make sure you have access to https://github.com/gatling/gatling-js/releases/; and if you connect to the Internet through a proxy, make sure it is configured in your NPM configuration file (.npmrc).
2. Alternatively, you can try manually downloading the file from ${url}, and install it with the command 'npx gatling install <path-to-downloaded-file.zip>'.`);
    throw e;
  }
};
