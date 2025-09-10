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
  const allGeneratedFiles: string[] = [];
  for (const protoFile of protoFiles) {
    const sourceFile = path.join(protoFolder, protoFile);
    const protoPath = path.dirname(sourceFile);
    const targetFile = protoFile + "c";
    const targetPath = path.join(protoTargetFolder, targetFile);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await runProtoc(protocPath, sourceFile, protoPath, targetPath);
    allGeneratedFiles.push(targetFile);
  }
  if (protoFiles.length > 0) {
    await fs.writeFile(path.join(protoTargetFolder, "compiled-protobuf-files"), allGeneratedFiles.join("\n"), {
      encoding: "utf-8"
    });
  }
};

const getFiles = async (dir: string, relativePath: string): Promise<string[]> => {
  const dirents = await listFiles(dir);
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

const listFiles = async (dir: string) => {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch (e) {
    if ((e as any)?.code === "ENOENT") {
      // Directory does not exist: there are no proto files to compile.
      return [];
    } else {
      throw e;
    }
  }
};

const runProtoc = async (
  protocPath: string,
  sourceFile: string,
  protoPath: string,
  targetFile: string
): Promise<void> => {
  // FIXME can't build simulations without the bundle...
  const args = [`--proto_path=${protoPath}`, `--descriptor_set_out=${targetFile}`, sourceFile];
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
