/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    KEY_API: process.env.KEY_API,
    TOKEN_API: process.env.TOKEN_API,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version," },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: 'https://api.themoviedb.org/3/movie/:path*',
        destination: 'https://movie-search-nextjs.vercel.app/:path*',
      },
    ]
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
