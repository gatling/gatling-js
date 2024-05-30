import fs from "fs/promises";

export interface SimulationFile {
  path: string;
  name: string;
  type: "javascript" | "typescript";
}

export const findSimulations = async (sourcesFolder: string): Promise<Array<SimulationFile>> => {
  const children = await fs.readdir(sourcesFolder, { recursive: false });
  const simulations = children
    .filter((path) => path.endsWith(".gatling.js") || path.endsWith(".gatling.ts"))
    .map(
      (path): SimulationFile => ({
        path,
        name: path.slice(0, -11),
        type: path.endsWith(".ts") ? "typescript" : "javascript"
      })
    );
  const duplicates = simulations.filter(
    (value, index) => simulations.findIndex((other) => other.name === value.name) !== index
  );
  if (duplicates.length > 0) {
    throw Error(
      `Found ambiguous simulation name(s) ${duplicates.map((s) => s.name)}: found as both *.gatling.js and *.gatling.ts file(s)`
    );
  }
  return simulations;
};
