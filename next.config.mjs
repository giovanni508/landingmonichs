/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://www.kickstarter.com/projects/monichs/monichs-delta-collection-italian-design-swiss-engineering',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
