/** @type {import('next').NextConfig} */

const nextConfig = {};

export default{
  webpack: (webpackConfig, {webpack}) => {
    webpackConfig.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    return webpackConfig;
  },
  nextConfig
}