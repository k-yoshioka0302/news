import type { Metadata } from 'next';
import './styles/layout.scss';

export const metadata: Metadata = {
    title: 'AnimeNews',
    description: 'Latest anime news and season information'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    );
}
