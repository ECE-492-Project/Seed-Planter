/** @type {import('next').NextConfig} */

const pathPrefix =
  process.env.NODE_ENV === "production" ? "/Seed-Planting-Robot" : "";

const nextConfig = {
  basePath: pathPrefix,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: pathPrefix,
  env: {
    pathPrefix,
  },
};

module.exports = nextConfig;
