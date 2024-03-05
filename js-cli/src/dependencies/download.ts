import axios from "axios";
import util from "util";
import stream from "stream";
import fs from "fs";

const pipeline = util.promisify(stream.pipeline);

export const downloadFile = async (url: string, targetPath: string): Promise<void> => {
  const request = await axios.get(url, { responseType: "stream" });
  await pipeline(request.data, fs.createWriteStream(targetPath));
};
