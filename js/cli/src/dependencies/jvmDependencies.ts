import { execFile } from "node:child_process";
import fsSync from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { osType } from "./os";
import { generateProxyArgs } from "../java";
import { logger } from "../log";
import { proxyConfiguration } from "../proxy";

/**
 * The JVM libraries a project needs on top of the ones the Gatling bundle provides, typically JDBC drivers, come from two
 * independent sources: the JAR files in its JVM libraries folder ("jvm_libs" by default), and the Maven dependencies
 * declared in the "gatling" section of its package.json:
 *
 * <pre>
 * "gatling": {
 *   "jvmDependencies": {
 *     "artifacts": ["org.postgresql:postgresql:42.7.14"],
 *     "repositories": ["https://repo.example.com/maven"],
 *     "credentials": ["repo.example.com user:password"],
 *     "credentialFiles": ["/path/to/credentials.properties"]
 *   }
 * }
 * </pre>
 *
 * Credentials are passed to Coursier, see https://get-coursier.io/docs/other-credentials for their formats. Coursier
 * also reads the COURSIER_CREDENTIALS environment variable and its default credentials files, which keep secrets out of
 * package.json.
 */
export interface JvmDependenciesConfiguration {
  /**
   * Maven coordinates, as groupId:artifactId:version
   */
  artifacts: string[];
  /**
   * Additional Maven repositories, Maven Central being used by default
   */
  repositories: string[];
  /**
   * Inline credentials, as "host user:password" or "host(realm) user:password", passed to Coursier's --credentials
   */
  credentials: string[];
  /**
   * Absolute paths of credentials properties files, passed to Coursier's --credential-file; declared relative to
   * package.json
   */
  credentialFiles: string[];
}

const emptyConfiguration: JvmDependenciesConfiguration = {
  artifacts: [],
  repositories: [],
  credentials: [],
  credentialFiles: []
};

const parentKey = "gatling.jvmDependencies";

const readStringArray = (conf: any, key: string): string[] => {
  const value = conf?.[key];
  if (value === undefined) {
    return [];
  } else if (Array.isArray(value) && value.every((element) => typeof element === "string")) {
    return value;
  } else {
    throw Error(`"${parentKey}.${key}" in package.json must be an array of strings`);
  }
};

export const readJvmDependenciesConfiguration = (packageJsonPath = "package.json"): JvmDependenciesConfiguration => {
  if (!fsSync.existsSync(packageJsonPath)) {
    return emptyConfiguration;
  }
  const conf = JSON.parse(fsSync.readFileSync(packageJsonPath, "utf-8")).gatling?.jvmDependencies;
  if (conf !== undefined && (typeof conf !== "object" || conf === null || Array.isArray(conf))) {
    throw Error(
      `"${parentKey}" in package.json must be an object, with "artifacts", "repositories", "credentials" and "credentialFiles" arrays of strings`
    );
  }

  const artifacts = readStringArray(conf, "artifacts");
  for (const artifact of artifacts) {
    if (artifact.split(":").length !== 3) {
      throw Error(
        `JVM dependency '${artifact}' in package.json isn't valid: format should be groupId:artifactId:version`
      );
    }
  }

  // relative to package.json, and checked here as Coursier silently ignores missing credential files
  const credentialFiles = readStringArray(conf, "credentialFiles").map((credentialFile) =>
    path.resolve(path.dirname(packageJsonPath), credentialFile)
  );
  for (const credentialFile of credentialFiles) {
    if (!fsSync.statSync(credentialFile, { throwIfNoEntry: false })?.isFile()) {
      throw Error(`Credential file '${credentialFile}', declared in package.json, doesn't exist or isn't a file`);
    }
  }

  return {
    artifacts,
    repositories: readStringArray(conf, "repositories"),
    credentials: readStringArray(conf, "credentials"),
    credentialFiles
  };
};

export interface ResolveJvmDependenciesOptions {
  graalvmHome: string;
  /**
   * The classpath of the Gatling bundle, as resolved by resolveBundle
   */
  jvmClasspath: string;
  /**
   * The Coursier JAR-based launcher shipped in the Gatling bundle, as resolved by resolveBundle
   */
  coursierJarPath: string;
  /**
   * The folder of the JAR files the project provides directly, an alternative when its dependencies can't be resolved
   * from Maven repositories
   */
  jvmLibsFolder: string;
}

/**
 * Lists the JAR files of the JVM libraries folder, and resolves the JVM dependencies the project declares, with their
 * transitive dependencies, except the ones the Gatling bundle already provides. Both are used, but a JAR file name found
 * in both is an error.
 *
 * @returns the paths of the jars
 */
export const resolveJvmDependencies = async (
  options: ResolveJvmDependenciesOptions,
  configuration: JvmDependenciesConfiguration = readJvmDependenciesConfiguration()
): Promise<string[]> => {
  const libs = await listJvmLibs(options.jvmLibsFolder);
  const fetched = await fetchJvmDependencies(options, configuration);

  // ignoring case, like the default file systems of macOS and Windows
  const libNames = new Set(libs.map((jar) => path.basename(jar).toLowerCase()));
  const conflicts = fetched.map((jar) => path.basename(jar)).filter((name) => libNames.has(name.toLowerCase()));
  if (conflicts.length > 0) {
    throw Error(
      `JAR file name conflict between the JVM libraries folder '${options.jvmLibsFolder}' and the JVM dependencies declared in package.json: ${conflicts.map((name) => `'${name}'`).join(", ")}; remove them from one or the other`
    );
  }
  return [...libs, ...fetched];
};

const listJvmLibs = async (jvmLibsFolder: string): Promise<string[]> => {
  if (!fsSync.existsSync(jvmLibsFolder)) {
    return [];
  }
  const jars: string[] = [];
  for (const file of (await fs.readdir(jvmLibsFolder)).sort()) {
    const jar = path.resolve(jvmLibsFolder, file);
    // skipping hidden files, such as the "._" metadata files macOS creates on some volumes; stat follows symbolic links
    if (!file.startsWith(".") && file.toLowerCase().endsWith(".jar") && (await fs.stat(jar)).isFile()) {
      jars.push(jar);
    }
  }
  if (jars.length > 0) {
    logger.info(`Found JVM libraries in ${jvmLibsFolder}: ${jars.map((jar) => path.basename(jar)).join(", ")}`);
  }
  return jars;
};

const fetchJvmDependencies = async (
  options: ResolveJvmDependenciesOptions,
  configuration: JvmDependenciesConfiguration
): Promise<string[]> => {
  if (configuration.artifacts.length === 0) {
    return [];
  }
  logger.info(`Resolving JVM dependencies ${configuration.artifacts.join(", ")}`);

  const args = [
    ...generateProxyArgs(proxyConfiguration),
    "-jar",
    options.coursierJarPath,
    "fetch",
    "--classpath",
    ...configuration.repositories.flatMap((repository) => ["-r", repository]),
    ...configuration.credentials.flatMap((credentials) => ["--credentials", credentials]),
    ...configuration.credentialFiles.flatMap((credentialFile) => ["--credential-file", credentialFile]),
    ...configuration.artifacts
  ];
  let stdout: string;
  try {
    ({ stdout } = await execFileAsync(path.join(options.graalvmHome, "bin", "java"), args, {
      maxBuffer: 16 * 1024 * 1024
    }));
  } catch (e) {
    // never fall back to the "Command failed: <command line>" message of a failed process, as the command line holds the
    // inline credentials
    const { stderr, code, signal } = e as any;
    const cause =
      stderr ||
      (signal ? `killed by ${signal}` : typeof code === "number" ? `exited with code ${code}` : (e as Error).message);
    throw Error(`Failed to resolve JVM dependencies: ${cause}`);
  }

  const separator = osType === "Windows_NT" ? ";" : ":";
  const resolvedJars = stdout
    .trim()
    .split(separator)
    .filter((jar) => jar.length > 0);
  const bundleArtifacts = await listBundleArtifacts(options.jvmClasspath);

  const jars = resolvedJars.filter((jar) => {
    const artifact = artifactOf(jar);
    if (artifact !== undefined && bundleArtifacts.has(artifact)) {
      logger.debug(`Skipping ${jar}, already provided by the Gatling bundle`);
      return false;
    }
    return true;
  });
  logger.info(`Resolved JVM dependencies: ${jars.map((jar) => path.basename(jar)).join(", ")}`);
  return jars;
};

const execFileAsync = promisify(execFile);

// Coursier stores artifacts as <...>/<artifactId>/<version>/<artifactId>-<version>[-<classifier>].jar
const artifactOf = (jar: string): string | undefined => {
  const versionDir = path.dirname(jar);
  const artifactDir = path.dirname(versionDir);
  const artifact = path.basename(artifactDir);
  return path.basename(jar).startsWith(`${artifact}-${path.basename(versionDir)}`) ? artifact : undefined;
};

// The bundle stores jars as <artifactId>-<version>.jar, versions starting with a digit
const listBundleArtifacts = async (jvmClasspath: string): Promise<Set<string>> => {
  const libDir = path.dirname(jvmClasspath);
  const artifacts = new Set<string>();
  for (const file of await fs.readdir(libDir)) {
    const match = /^(.+?)-\d.*\.jar$/.exec(file);
    if (match !== null) {
      artifacts.add(match[1]);
    }
  }
  return artifacts;
};
