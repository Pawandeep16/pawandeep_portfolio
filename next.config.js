/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // if you're disabling Next.js image optimization
    domains: ['cdn.sanity.io'],
  },
};

module.exports = nextConfig;
