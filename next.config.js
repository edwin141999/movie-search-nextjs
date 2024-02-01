/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_KEY_API: process.env.NEXT_PUBLIC_KEY_API,
    NEXT_PUBLIC_TOKEN_API: process.env.NEXT_PUBLIC_TOKEN_API,
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
