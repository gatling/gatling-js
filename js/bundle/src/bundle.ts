import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import { constants as zConstants } from "node:zlib";

import { ZipArchive } from "archiver";

import { TmpDirStructure } from "./tmpDir";
import { versions } from "./versions";

export const bundle = async (tmpDir: TmpDirStructure): Promise<void> => {
  console.log(`Creating bundle file ${tmpDir.bundleFile}`);

  const output = fs.createWriteStream(tmpDir.bundleFile);

  const archive = new ZipArchive({ zlib: { level: zConstants.Z_MAX_LEVEL } });
  archive.on("warning", (err) => {
    // The pipeline will rethrow errors but not warnings. We don't want to ignore warnings from the archiver, because
    // they include things like 'no such file or directory'.
    throw err;
  });
  archive.append(metadata, { name: "gatling-bundle.json" });
  archive.directory(tmpDir.graalVm.homeDir + "/", "graalvm");
  archive.directory(tmpDir.lib.dir + "/", "lib");
  archive.directory(tmpDir.bin.dir + "/", "bin");
  archive.finalize();

  await pipeline(archive, output);
};

const metadata = JSON.stringify(
  {
    version: versions.gatling.jsAdapter,
    "gatling-js": versions.gatling.jsAdapter,
    "gatling-core": versions.gatling.core,
    graalvm: versions.graalvm.jdkVersion,
    graaljs: versions.graalvm.js
  },
  null,
  2
);
