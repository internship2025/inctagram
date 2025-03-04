/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
