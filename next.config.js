/** @type {import("next").NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  output: "standalone",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
