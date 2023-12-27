import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import NavBar from '@/Components/NavBar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/options';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Stat Tracker',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body
                className={`${jost.className} flex flex-col min-h-screen text-slate-100 w-screen overflow-x-hidden`}
            >
                <NavBar hasSession={session !== null}></NavBar>
                {children}
            </body>
        </html>
    );
}
