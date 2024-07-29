/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "a0.muscache.com",
    ],
    minimumCacheTTL: 1,
  },
};

export default nextConfig;
