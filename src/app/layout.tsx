import type { Metadata } from 'next';
import './styles/layout.scss';
import { Provider } from './provider';

export const metadata: Metadata = {
    title: 'AnimeNews',
    description: 'Latest anime news and season information'
};

// export default function RootLayout(props: { children: React.ReactNode }) {
//     const { children } = props;
//     return (
//         <html lang="en" suppressHydrationWarning>
//             <head />
//             <body suppressHydrationWarning>
//                 <Provider>{children}</Provider>
//             </body>
//         </html>
//     );
// }

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" suppressHydrationWarning>
        <body>
            <Provider>{children}</Provider>
        </body>
    </html>
    );
}
