import fetch, { MakeFetchHappenOptions, TlsOptions } from "make-fetch-happen";
import fs from "fs";
import util from "util";
import stream from "stream";

import { proxyConfiguration } from "../proxy";

const pipeline = util.promisify(stream.pipeline);

const fetchOptionsFromNpmConfiguration = (): MakeFetchHappenOptions & TlsOptions => ({
  proxy: proxyConfiguration.httpsProxyUrl || proxyConfiguration.proxyUrl,
  noProxy: proxyConfiguration.noProxyHosts
});

export const downloadFile = async (url: string, targetFile: string): Promise<void> => {
  const options = fetchOptionsFromNpmConfiguration();
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }

  await pipeline(response.body, fs.createWriteStream(targetFile));
};
