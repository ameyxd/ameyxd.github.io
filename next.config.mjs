/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  typescript: {
    // Skip type checking during build
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    // Don't run ESLint during builds
    ignoreDuringBuilds: true,
  },
  // Add basePath configuration
  // basePath: "/focus",
};

export default nextConfig;
