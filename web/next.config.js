/** @type {import('next').NextConfig} */

const pathPrefix =
  process.env.NODE_ENV === "production" ? "/Seed-Planting-Robot" : "";

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: pathPrefix,
  env: {
    pathPrefix,
  },
  basePath: pathPrefix,
};

module.exports = nextConfig;
