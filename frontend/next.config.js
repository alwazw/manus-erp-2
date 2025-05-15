/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
      {
        source: '/grafana/:path*',
        destination: `${process.env.NEXT_PUBLIC_GRAFANA_URL}/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
