import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import { logger } from "../log";

export const compileProtoFiles = async (
  protocPath: string,
  protoFolder: string,
  protoTargetFolder: string
): Promise<void> => {
  await fs.rm(protoTargetFolder, { recursive: true, force: true });
  const protoFiles = await getFiles(protoFolder, "");
  for (const protoFile of protoFiles) {
    const sourceFile = path.join(protoFolder, protoFile);
    const protoPath = path.dirname(sourceFile);
    const targetFile = path.join(protoTargetFolder, `${protoFile}c`);
    await fs.mkdir(path.dirname(targetFile), { recursive: true });
    await runProtoc(protocPath, sourceFile, protoPath, targetFile);
  }
};

const getFiles = async (dir: string, relativePath: string): Promise<string[]> => {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory()
        ? getFiles(res, path.join(relativePath, dirent.name))
        : dirent.name.endsWith(".proto")
          ? [path.join(relativePath, dirent.name)]
          : [];
    })
  );
  return files.flat();
};

const runProtoc = async (
  protocPath: string,
  sourceFile: string,
  protoPath: string,
  targetFile: string
): Promise<void> => {
  const args = [`--proto_path=${protoPath}`, `--descriptor_set_out=${targetFile}`, sourceFile];
  logger.info(`args: ${args}`);
  const spawned = spawn(protocPath, args, {
    env: process.env,
    stdio: [process.stdin, process.stdout, process.stderr]
  });

  return new Promise((resolve, reject) => {
    spawned.on("error", (error) => logger.error("Failed to run protoc process: " + error.toString()));
    spawned.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(Error("Protoc process finished with code " + code));
      }
    });
  });
};
