import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // This is the domain from your image URL
  },
};

export default nextConfig;
