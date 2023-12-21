import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/options';

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <>
            {session ? (
                <h1 className="text-slate-900">You are logged in</h1>
            ) : (
                <h1 className="text-slate-900">You are logged out</h1>
            )}
        </>
    );
}
