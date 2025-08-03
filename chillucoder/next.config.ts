import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Enable WebAssembly support
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // Important: return the modified config
    return config;
  },
  // Optional: Add if you need to disable static generation for pages using SQL.js
  // (Not typically needed for client-side only usage)
  // output: 'standalone',
};

export default nextConfig;