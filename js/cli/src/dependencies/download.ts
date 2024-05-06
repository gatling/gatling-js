import axios from "axios";
import fs from "fs";
import stream from "stream";
import util from "util";

const pipeline = util.promisify(stream.pipeline);

export const downloadFile = async (url: string, targetFile: string): Promise<void> => {
  const request = await axios.get(url, { responseType: "stream" });
  await pipeline(request.data, fs.createWriteStream(targetFile));
};
