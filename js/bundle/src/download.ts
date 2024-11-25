import fs from "node:fs";
import stream from "node:stream";
import util from "node:util";

import axios from "axios";

const pipeline = util.promisify(stream.pipeline);

export const downloadFile = async (url: string, targetFile: string): Promise<void> => {
  const request = await axios.get(url, { responseType: "stream" });
  await pipeline(request.data, fs.createWriteStream(targetFile));
};
