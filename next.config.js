/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    KEY_API: process.env.NEXT_PUBLIC_KEY_API,
    TOKEN_API: process.env.NEXT_PUBLIC_TOKEN_API,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
}

module.exports = nextConfig
