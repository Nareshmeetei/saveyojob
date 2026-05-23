import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/jobs',
        destination: '/jobs-at-risk',
        permanent: true,
      },
      {
        source: '/jobs/',
        destination: '/jobs-at-risk/',
        permanent: true,
      },
      {
        source: '/jobs/:slug',
        destination: '/jobs-at-risk/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
