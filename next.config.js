/** @type {import("next").NextConfig} */
const nextConfig = {
  basePath: "",
  productionBrowserSourceMaps: false,
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
