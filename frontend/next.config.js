/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com', // Cloudinary
    ],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL || 'http://localhost:1337',
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: process.env.STRAPI_API_URL || 'http://localhost:1337/admin',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;