import fetch, { MakeFetchHappenOptions, TlsOptions } from "make-fetch-happen";
import fs from "fs";
import util from "util";
import stream from "stream";

const pipeline = util.promisify(stream.pipeline);

const NPM_CONFIG_PROXY_KEY = "npm_config_proxy";
const NPM_CONFIG_HTTPS_PROXY_KEY = "npm_config_https_proxy";
const NPM_CONFIG_NOPROXY_KEY = "npm_config_noproxy";

const fetchOptionsFromNpmConfiguration = (): MakeFetchHappenOptions & TlsOptions => {
  const proxy = process.env[NPM_CONFIG_HTTPS_PROXY_KEY] || process.env[NPM_CONFIG_PROXY_KEY] || undefined;
  const noProxy = process.env[NPM_CONFIG_NOPROXY_KEY] || undefined;
  return {
    proxy,
    noProxy
  };
};

export const downloadFile = async (url: string, targetFile: string): Promise<void> => {
  const options = fetchOptionsFromNpmConfiguration();
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }

  await pipeline(response.body, fs.createWriteStream(targetFile));
};
