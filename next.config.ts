import type { NextConfig } from 'next'
import nextTranslate from 'next-translate-plugin'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
      }
    ],
  },
}

const translatedConfig = nextTranslate(nextConfig,{turbopack:true})

export default translatedConfig