/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src'],
  },
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  async headers() {
    return [
      {
        source: '/data/countries.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Content-Encoding',
            value: 'gzip'
          }
        ]
      },
      {
        source: '/data/cities.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Content-Encoding',
            value: 'gzip'
          }
        ]
      },
      {
        source: '/data/:path*.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800'
          }
        ]
      }
    ]
  },
  
  compress: true,
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig