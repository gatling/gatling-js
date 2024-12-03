import fs from "node:fs/promises";
import path from "node:path";

import StreamZip from "node-stream-zip";

import { logger } from "../log";
import { osType } from "./os";
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
  } else {
    throw Error("TODO try to install the bundle automatically");
  }

  return getResolvedBundle(bundlePath);
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
