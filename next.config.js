/** @type {import("next").NextConfig} */
const nextConfig = {
  basePath: "",
  productionBrowserSourceMaps: false,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
