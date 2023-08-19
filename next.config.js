/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    KEY_API: process.env.KEY_API,
    TOKEN_API: process.env.TOKEN_API,
  },
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
}

module.exports = nextConfig
