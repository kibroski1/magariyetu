import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }]
  },
  images: {
    // Swap for your real CDN/storage host(s) in production, e.g. an
    // S3/R2/Cloudinary domain — see README → "Image storage".
    remotePatterns: [{ protocol: 'https', hostname: '**.public.blob.vercel-storage.com' }],
  },
  experimental: {
    reactCompiler: false,
    webpackBuildWorker: false, // Prevents spawns of heavy multi-threaded memory workers
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Force disk caching instead of keeping whole ASTs in RAM
      config.cache = {
        type: 'filesystem',
      }
    }
    return config
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
