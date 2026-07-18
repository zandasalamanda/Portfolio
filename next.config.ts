import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The OG image route reads static font files at render time.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./content/fonts/*.woff"],
  },
};

export default nextConfig;
