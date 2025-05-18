
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure any component using Lucide icons will work properly in Next.js
  transpilePackages: ['lucide-react'],
  images: {
    domains: ['images.unsplash.com'], // Add any domains for images used in your app
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack(config) {
    // Support SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
}

module.exports = nextConfig;
