import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF + WebP for better compression & quality
    formats: ["image/avif", "image/webp"],
    // Optimise for common device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 7-day browser/CDN cache for images
    minimumCacheTTL: 604800,
  },
  // Gzip/Brotli compress responses
  compress: true,
  // Enable React strict mode for better dev warnings
  reactStrictMode: true,
  // Remove X-Powered-By header
  poweredByHeader: false,
};

export default nextConfig;
