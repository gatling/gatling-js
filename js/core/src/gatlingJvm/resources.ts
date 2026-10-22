import { shared } from "./shared";

interface Resources {
  readResourceAsBytes(filePath: string): number[];
  readResourceAsString(filePath: string, charset: string): string;
}

const Resources = Java.type<Resources>("io.gatling.js.Resources");

export const readResourceAsBytes = (filePath: string): number[] =>
  shared(`readResourceAsBytes:${filePath}`, () => Resources.readResourceAsBytes(filePath));

export const readResourceAsString = (filePath: string, charset?: string): string =>
  shared(`readResourceAsString:${filePath}`, () =>
    Resources.readResourceAsString(filePath, charset !== undefined ? charset : "utf-8")
  );
