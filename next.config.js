/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST, HEAD" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-Requested-With, X-CSRF-Token, XSRF-TOKEN," },
        ],
      }
    ]
  }
}

module.exports = nextConfig
