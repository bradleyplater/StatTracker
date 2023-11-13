import NavBar from '@/Components/NavBar';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getServerSession(options);

    return (
        <>
            <NavBar Session={session}></NavBar>
            {session ? (
                <h1 className="text-slate-900">You are logged in</h1>
            ) : (
                <h1 className="text-slate-900">You are logged out</h1>
            )}
        </>
    );
}
