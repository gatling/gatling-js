import fs from "fs/promises";
import { pipeline } from 'stream/promises';
import { existsSync } from "fs";
import { downloadFile } from "./download";
import { logger } from "../log";
import { createReadStream } from "fs";
import tar from "tar-fs";
import gunzip from "gunzip-maybe";
import { exec } from "child_process";
import { promisify } from "util"

export const execAsync = promisify(exec)
export interface DependenciesOptions {
  tmpDir: string;
}

export interface ResolvedDependencies {
  graalvmHomePath: string;
  coursierPath: string;
  classpath: string;
}

export const installAll = async (options: DependenciesOptions): Promise<ResolvedDependencies> => {
  const downloadDir = `${options.tmpDir}/dl`;
  await fs.mkdir(downloadDir, { recursive: true });

  const graalvmRootPath = `${options.tmpDir}/graalvm`;
  const graalvmHomePath = await installGraalVm(downloadDir, graalvmRootPath);

  const coursierRootPath = `${options.tmpDir}/coursier`;
  const coursierPath = await installCoursier(downloadDir, coursierRootPath);

  const classpath = await resolveDependencies(coursierPath)

  return {
    graalvmHomePath,
    coursierPath,
    classpath
  };
};

const installGraalVm = async (downloadDir: string, graalvmRootPath: string): Promise<string> => {
  // TODO handle Linux/windows
  const graalvmHomePath = `${graalvmRootPath}/Contents/Home`; // Depends on platform, seems to be just ${graalvmRootPath} on Linux
  const graalvmJavaPath = `${graalvmHomePath}/bin/java`;

  if (!existsSync(graalvmJavaPath)) {
    // TODO handle Linux/windows
    const jdk = "21";
    const os = "macos"; // linux, macos, windows
    const arch = "aarch64"; // aarch64, x64
    const url = `https://download.oracle.com/graalvm/${jdk}/latest/graalvm-jdk-${jdk}_${os}-${arch}_bin.tar.gz`;
    const downloadPath = `${downloadDir}/graalvm.tgz`;

    if (existsSync(graalvmRootPath)) {
      await fs.rm(graalvmRootPath, { recursive: true });
    }
    if (existsSync(downloadPath)) {
      await fs.rm(downloadPath);
    }
    await fs.mkdir(graalvmRootPath, { recursive: true });

    logger.info(`Downloading GraalVM to ${downloadPath}`);
    await downloadFile(url, downloadPath);

    logger.info(`Unpacking GraalVM to ${graalvmRootPath}`);
    const readStream = createReadStream(downloadPath);
    const unZipStream = gunzip();
    const unTarStream = tar.extract(graalvmRootPath, {
          map: (header) => {
            header.name = header.name.replace(/^graalvm-jdk-[^\/]*\//, "");
            return header;
          }
        });
    await pipeline(readStream, unZipStream, unTarStream)

    await fs.rm(downloadPath);
  } else {
    logger.info(`GraalVM already installed at ${graalvmRootPath}`);
  }

  return graalvmHomePath
};

const installCoursier = async (downloadDir: string, coursierRootPath: string): Promise<string> => {
  const downloadPath = `${downloadDir}/cs`;
  const coursierPath = `${coursierRootPath}/cs`;

  if (!existsSync(coursierPath)) {
    // TODO test Linux/windows

    if (existsSync(coursierRootPath)) {
      await fs.rm(coursierRootPath, { recursive: true });
    }
    if (existsSync(downloadPath)) {
      await fs.rm(downloadPath);
    }
    await fs.mkdir(coursierRootPath, { recursive: true });

    logger.info(`Downloading Coursier to ${downloadPath}`);
    await downloadFile("https://git.io/coursier-cli", downloadPath);
    await fs.chmod(downloadPath, 0o744);

    logger.info(`Installing Coursier to ${coursierPath}`);
    await fs.rename(downloadPath, coursierPath);
  } else {
    logger.info(`Coursier already installed at ${coursierPath}`);
  }

  return coursierPath;
};

const resolveDependencies = async(coursierPath: string): Promise<string> => {
  const gatlingVersion="3.10.3"
  const gatlingAdapterVersion="3.10.3-SNAPSHOT"
  const graalvmJsVersion="23.1.2"

  const gatlingDep = `"io.gatling.highcharts:gatling-charts-highcharts:${gatlingVersion}"`
  const gatlingAdapterDep = `"io.gatling:gatling-jvm-to-js-adapter:${gatlingAdapterVersion}"`
  const graalvmJsDep = `"org.graalvm.polyglot:js-community:${graalvmJsVersion}"`

  const command = `"${coursierPath}" fetch --classpath ${gatlingDep} ${gatlingAdapterDep} ${graalvmJsDep}`

  // TODO could add a timeout
  logger.info(`Resolving dependencies with Coursier`);
  const { stdout} = await execAsync(command);
  return stdout
}
