/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // Ignore TypeScript errors during build
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors
    ignoreDuringBuilds: true,
  },
  // Add production domain configuration
  images: {
    domains: ['bubbleup.pt', 'www.bubbleup.pt'],
  },
};

export default config;
