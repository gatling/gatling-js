import { spawn } from "child_process";

import { osType } from "./dependencies/os";
import { logger } from "./log";
import { ProxyConfiguration } from "./proxy";

export interface RunJavaProcessOptions {
  graalvmHome: string;
  jvmClasspath: string;
}

export const runJavaProcess = (
  options: RunJavaProcessOptions,
  mainClass: string,
  additionalClasspathElements: string[],
  javaArgs: string[],
  mainClassArgs: string[],
  proxyConf?: ProxyConfiguration
): Promise<void> => {
  const command = `${options.graalvmHome}/bin/java`;
  const classpathSeparator = osType === "Windows_NT" ? ";" : ":";
  const classpath = [...additionalClasspathElements, options.jvmClasspath].join(classpathSeparator);
  const proxyArgs = generateProxyArgs(proxyConf);
  const allArgs = [
    "-server",
    "-XX:+HeapDumpOnOutOfMemoryError",
    "-XX:MaxInlineLevel=20",
    "-XX:MaxTrivialSize=12",
    "-classpath",
    classpath,
    ...javaArgs,
    ...proxyArgs,
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
      // exit code 2
      if (code === 0) {
        resolve();
      } else {
        reject(Error("Gatling process finished with code " + code));
      }
    });
  });
};

const generateProxyArgs = (proxyConf?: ProxyConfiguration): string[] => {
  const proxyProps = (protocol: string, url?: URL): string[] => {
    const props = [];
    if (url !== undefined) {
      props.push(`-D${protocol}.proxyHost=${url.hostname}`);
      props.push(`-D${protocol}.proxyPort=${url.port || "80"}`);
      if (url.username) {
        props.push(`-D${protocol}.proxyUser=${url.username}`);
      }
      if (url.password) {
        props.push(`-D${protocol}.proxyPassword=${url.password}`);
      }
    }
    return props;
  };

  const httpProps = proxyProps("http", proxyConf?.proxyUrl);
  // For HTTPS, fallback on proxyUrl if httpsProxyUrl isn't set, following npm's own behavior
  const httpsProps = proxyProps("https", proxyConf?.httpsProxyUrl || proxyConf?.proxyUrl);
  const noProxyProps =
    proxyConf !== undefined && proxyConf.noProxyHosts.length > 0
      ? [`-Dhttp.nonProxyHosts=${proxyConf.noProxyHosts.join("|")}`]
      : [];

  return [...httpProps, ...httpsProps, ...noProxyProps];
};
