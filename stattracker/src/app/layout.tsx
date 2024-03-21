/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import NavBar from '@/Components/NavBar';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Stat Tracker',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <script
                    type="text/javascript"
                    src="https://app.termly.io/resource-blocker/8cc8968f-a1ea-4e10-a0bd-d7c55c1afdbc?autoBlock=on"
                ></script>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest"></link>
            </head>
            <UserProvider>
                <body
                    className={`${jost.className} flex flex-col min-h-screen text-slate-100 text-sm w-screen overflow-x-hidden`}
                >
                    <NavBar></NavBar>
                    {children}
                </body>
            </UserProvider>
        </html>
    );
}
function localFont(arg0: {
    src: { path: string; weight: string }[];
    variable: string;
}) {
    throw new Error('Function not implemented.');
}
