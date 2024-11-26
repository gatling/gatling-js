import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import { constants as zConstants } from "node:zlib";

import archiver from "archiver";

import { TmpDirStructure } from "./tmpDir";
import { versions } from "./versions";

export const bundle = async (tmpDir: TmpDirStructure): Promise<void> => {
  console.log(`Creating bundle file ${tmpDir.bundleFile}`);

  const output = fs.createWriteStream(tmpDir.bundleFile);

  const archive = archiver("zip", zipOptions)
    .on("warning", (err) => {
      // The pipeline will rethrow errors but not warnings. We don't want to ignore warnings from the archiver, because
      // they include things like 'no such file or directory'.
      throw err;
    })
    .append(metadata, { name: "gatling-bundle.json" })
    .directory(tmpDir.graalVm.homeDir + "/", "graalvm")
    .directory(tmpDir.lib.dir + "/", "lib");
  archive.finalize();

  await pipeline(archive, output);
};

const zipOptions = {
  zlib: { level: zConstants.Z_MAX_LEVEL }
};

const metadata = JSON.stringify(
  {
    version: versions.gatling.jsAdapter,
    "gatling-js": versions.gatling.jsAdapter,
    "gatling-core": versions.gatling.core,
    graalvm: versions.graalvm.jdk,
    graaljs: versions.graalvm.js
  },
  null,
  2
);
