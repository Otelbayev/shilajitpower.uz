import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "http", // yoki "https" agar rasm HTTPS da bo‘lsa
        hostname: "pay.dezex.uz",
        pathname: "/uploads/**", // kerakli path, barcha rasm fayllarini qamrab olish uchun /** ishlatish mumkin
      },
    ],
  },
};

export default nextConfig;
