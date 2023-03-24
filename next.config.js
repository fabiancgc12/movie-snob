const nextTranslate = require('next-translate-plugin')

module.exports = nextTranslate({
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
})
/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     unoptimized: true,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'image.tmdb.org',
//         port: '',
//       },
//       {
//         protocol: 'https',
//         hostname: 'img.youtube.com',
//         port: '',
//       }
//     ],
//   },
//   i18n:{
//     locales: ['en-US', 'es'],
//     defaultLocale: 'en-US',
//   }
// }

// module.exports = nextConfig
