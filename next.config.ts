import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.animenewsnetwork.com'
            },
            {
                protocol: 'https',
                hostname: 'api.annict.com'
            },
            {
                protocol: 'https',
                hostname: 'annict.com'
            },
            {
                protocol: 'https',
                hostname: 'api.myanimelist.net'
            },
            {
                protocol: 'https',
                hostname: 'myanimelist.net'
            },
            {
                protocol: 'https',
                hostname: 'cdn.myanimelist.net'
            }
        ]
    }
};
const config: NextConfig = {
    experimental: {
        optimizePackageImports: ['@chakra-ui/react']
    }
};

export default nextConfig;
