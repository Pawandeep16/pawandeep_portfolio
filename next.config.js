/** @type {import('next').NextConfig} */
const nextConfig = {
 
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, 
    domains: ['cdn.sanity.io','res.cloudinary.com', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;


