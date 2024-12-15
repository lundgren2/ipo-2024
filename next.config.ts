import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // add images.unsplash.com to the image domains
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
