import type { Metadata } from 'next';
import { Provider } from '@/components/ui/provider';
import './styles/layout.scss';

export const metadata: Metadata = {
    title: 'AnimeNews',
    description: 'Latest anime news and season information'
};

export default function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props;
    return (
        <html suppressHydrationWarning>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
