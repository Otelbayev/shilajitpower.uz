import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "build",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pay.dezex.uz",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
