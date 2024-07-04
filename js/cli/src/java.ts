import { spawn } from "child_process";

import { osType } from "./dependencies/os";
import { logger } from "./log";

export interface RunJavaProcessOptions {
  graalvmHome: string;
  jvmClasspath: string;
}

export const runJavaProcess = (
  options: RunJavaProcessOptions,
  mainClass: string,
  additionalClasspathElements: string[],
  javaArgs: string[],
  mainClassArgs: string[]
): Promise<void> => {
  const command = `${options.graalvmHome}/bin/java`;
  const classpathSeparator = osType === "Windows_NT" ? ";" : ":";
  const classpath = [...additionalClasspathElements, options.jvmClasspath].join(classpathSeparator);
  const allArgs = [
    "-server",
    "-XX:+HeapDumpOnOutOfMemoryError",
    "-XX:MaxInlineLevel=20",
    "-XX:MaxTrivialSize=12",
    "-classpath",
    classpath,
    ...javaArgs,
    mainClass,
    ...mainClassArgs
  ];

  const spawned = spawn(command, allArgs, {
    env: process.env,
    stdio: [process.stdin, process.stdout, process.stderr]
  });

  return new Promise((resolve, reject) => {
    spawned.on("error", (error) => logger.error("Failed to run Gatling process: " + error.toString()));
    spawned.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(Error("Gatling process finished with code " + code));
      }
    });
  });
};
