/** @type {import("next").NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  output: "standalone",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
