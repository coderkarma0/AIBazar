import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static optimization
  output: "export",
  trailingSlash: true,

  // Image optimization
  images: {
    unoptimized: true, // For static export
  },

  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },

  // Bundle analyzer in development
  webpack: (config, { dev, isServer }) => {
    // Bundle splitting optimization
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
