/** @type {import("next").NextConfig} */
const nextConfig = {
  basePath: "",
  productionBrowserSourceMaps: false,
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
