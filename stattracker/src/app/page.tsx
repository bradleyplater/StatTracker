import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
    const session = await getSession();

    return (
        <>
            {session?.user ? (
                <h1 className="text-slate-900">You are logged in</h1>
            ) : (
                <h1 className="text-slate-900">You are logged out</h1>
            )}
        </>
    );
}
