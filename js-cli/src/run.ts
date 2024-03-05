import { logger } from "./log";
import { spawn } from "child_process";
import  * as path  from "path";
import util from "util";
import stream from "stream";

const pipeline = util.promisify(stream.pipeline);

export interface RunOptions {
    graalvmHomePath: string,
    classpath: string,
    entryPoint: string,
    bundleFilePath: string
}

export const run = async (options: RunOptions): Promise<void> => {
    const bundleDir = path.parse(options.bundleFilePath).base
    const bundleFileName = options.bundleFilePath.split('/')

    const command = `${options.graalvmHomePath}/bin/java`
    const args = [
        "-server",
        "-XX:+HeapDumpOnOutOfMemoryError",
        "-XX:MaxInlineLevel=20",
        "-XX:MaxTrivialSize=12",
        "-Xmx1G",
        "-classpath",
        `${options.bundleFilePath}:${options.classpath}` ,
        `-Dgatling.js.bundle.resourcePath=${bundleFileName}` ,
        `-Dgatling.js.entryPoint=${options.entryPoint}`,
        "io.gatling.app.Gatling",
        "--simulation",
        "io.gatling.js.JsSimulation"
    ]

    const process = spawn(command, args)

}
