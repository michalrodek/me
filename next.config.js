/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "api.michalrodek.cz",
      },
    ],
  },
};

module.exports = nextConfig;
