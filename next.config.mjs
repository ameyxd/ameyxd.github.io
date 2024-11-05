/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    // Don't run ESLint during builds
    ignoreDuringBuilds: true,
  },
  // basePath: "/portfolio", # TODO: Add domain name
};

export default nextConfig;
