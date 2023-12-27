'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavbarProps = {
    hasSession: boolean;
};

export default function NavBar(props: NavbarProps) {
    const pathname = usePathname();

    if (pathname === '/CreatePlayer') {
        return <></>;
    }

    return (
        <>
            <nav className="">
                <div className="flex justify-between items-center p-5 bg-teal-900">
                    <h1>Stat Tracker</h1>
                    {props.hasSession ? (
                        <Link href="/api/auth/signout">Log out</Link>
                    ) : (
                        <Link href="/api/auth/signin?callbackUrl=/Profile">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}
