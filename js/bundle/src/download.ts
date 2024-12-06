import fs from "node:fs";
import stream from "node:stream";
import util from "node:util";

import fetch from "make-fetch-happen";

const pipeline = util.promisify(stream.pipeline);

export const downloadFile = async (url: string, targetFile: string): Promise<void> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }
  await pipeline(response.body, fs.createWriteStream(targetFile));
};
