import { getServerSession } from 'next-auth';

export default async function Home() {
    const session = true;

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
