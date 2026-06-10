import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

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

export default withNextIntl(nextConfig);
