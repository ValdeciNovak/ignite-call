/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: [
    'page.tsx',
    'api.ts',
    'api.tsx'
  ],

  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // Verifica a cada segundo
      aggregateTimeout: 300,
      ignored: /node_modules/
    }
    return config
  }
}

module.exports = nextConfig
