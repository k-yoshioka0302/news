import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: [
            'www.animenewsnetwork.com',
            'api.annict.com',
            'annict.com',
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            }
        ]
    }
};

export default nextConfig;
