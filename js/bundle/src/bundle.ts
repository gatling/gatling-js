import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import { constants as zConstants } from "node:zlib";

import archiver from "archiver";

import { TmpDirStructure } from "./tmpDir";

export const bundle = async (tmpDir: TmpDirStructure): Promise<void> => {
  console.log(`Creating bundle file ${tmpDir.bundleFile}`);

  const output = fs.createWriteStream(tmpDir.bundleFile);

  const archive = archiver("zip", {
    zlib: { level: zConstants.Z_MAX_LEVEL }
  });
  archive.on("warning", (err) => {
    // The pipeline will rethrow errors but not warnings. We don't want to ignore warnings from the archiver, because
    // they include things like 'no such file or directory'.
    throw err;
  });
  archive.directory(tmpDir.graalVm.homeDir + "/", "graalvm");
  archive.finalize();

  await pipeline(archive, output);
};
