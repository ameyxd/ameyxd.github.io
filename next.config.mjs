/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  // Stamp the build time into the bundle so the footer can render "this page
  // is N minutes old" against the static export's creation moment. Evaluated
  // once per `next build`; in dev it's frozen to when the server started.
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
  // Add basePath configuration
  // basePath: "/focus",
};

export default nextConfig;
