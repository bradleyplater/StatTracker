import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getSession();

    return (
        <>
            {session?.user ? (
                redirect('/Profile')
            ) : (
                <h1 className="text-slate-900">You are logged out</h1>
            )}
        </>
    );
}
