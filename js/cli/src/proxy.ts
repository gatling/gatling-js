const NPM_CONFIG_PROXY_KEY = "npm_config_proxy";
const NPM_CONFIG_HTTPS_PROXY_KEY = "npm_config_https_proxy";
const NPM_CONFIG_NOPROXY_KEY = "npm_config_noproxy";

const httpProxy = process.env[NPM_CONFIG_PROXY_KEY] || undefined;
const proxyUrl = httpProxy !== undefined ? new URL(httpProxy) : undefined;
const httpsProxy = process.env[NPM_CONFIG_HTTPS_PROXY_KEY] || undefined;
const httpsProxyUrl = httpsProxy !== undefined ? new URL(httpsProxy) : undefined;
const noProxy = process.env[NPM_CONFIG_NOPROXY_KEY] || undefined;
const noProxyHosts = noProxy !== undefined ? noProxy.split(",") : [];

export interface ProxyConfiguration {
  proxyUrl?: URL;
  httpsProxyUrl?: URL;
  noProxyHosts: string[];
}

export const proxyConfiguration: ProxyConfiguration = {
  proxyUrl,
  httpsProxyUrl,
  noProxyHosts
};
