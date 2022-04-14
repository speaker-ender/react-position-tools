/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
    concurrentFeatures: true,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
