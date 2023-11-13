import { Session } from 'inspector';
import Link from 'next/link';

type NavbarProps = {
    Session: Session | null;
};

export default function NavBar(props: NavbarProps) {
    return (
        <>
            <nav className="col-span-8">
                <div className="flex justify-between items-center mb-4 w-full p-5 bg-teal-900">
                    <h1>Stat Tracker</h1>
                    {props.Session ? (
                        <Link href="/api/auth/signout">Log out</Link>
                    ) : (
                        <Link href="/api/auth/signin?callbackUrl=/home">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}
