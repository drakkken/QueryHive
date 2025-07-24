// next.config.js or next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint errors from breaking the build
  },
  logging: {
    incomingRequests: {
      // Enable logging for all API routes
      ignore: [],
    },
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
};

export default nextConfig;
