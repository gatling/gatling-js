import archiver from "archiver";
import fs from "fs";
import { pipeline } from "stream/promises";
import { constants as zConstants } from "zlib";

import { versions } from "./dependencies/versions";
import { logger } from "./log";
import { SimulationFile } from "./simulations";

export interface EnterprisePackageOptions {
  bundleFile: string;
  resourcesFolder: string;
  enterprisePackageFile: string;
  simulations: SimulationFile[];
}

export const enterprisePackage = async (options: EnterprisePackageOptions): Promise<void> => {
  logger.info(`Packaging a Gatling simulation with options:
 - bundleFile: ${options.bundleFile}
 - enterprisePackageFile: ${options.enterprisePackageFile}`);

  const manifest = generateManifest(options.simulations.map((s) => s.name));

  const output = fs.createWriteStream(options.enterprisePackageFile);

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

  logger.info(`Package for Gatling Enterprise created at ${options.enterprisePackageFile}`);
};

const generateManifest = (simulationNames: string[]) => {
  const utf8Encoder = new TextEncoder();
  const eol = utf8Encoder.encode("\n");
  const continuation = utf8Encoder.encode("\n ");
  const lines = [
    "Manifest-Version: 1.0",
    "Implementation-Title: gatling-javascript",
    `Implementation-Version: ${versions.gatling.jsAdapter}`,
    "Implementation-Vendor: GatlingCorp",
    "Specification-Vendor: GatlingCorp",
    "Gatling-Context: js",
    `Gatling-Version: ${versions.gatling.core}`,
    "Gatling-Packager: javascript",
    `Gatling-Packager-Version: ${versions.gatling.jsAdapter}`,
    `Gatling-Simulations: ${simulationNames.join(",")}`,
    `Java-Version: ${versions.graalvm.jdk.split(".")[0]}`
  ];

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
