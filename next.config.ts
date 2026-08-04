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
  // /activity was the GitHub graph; it is now /process. Anything already
  // linking to the old path lands on the page that replaced it.
  async redirects() {
    return [{ source: "/activity", destination: "/process", permanent: true }];
  },
};

export default nextConfig;
