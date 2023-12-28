'use client';
import { Bars3Icon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type NavbarProps = {
    hasSession: boolean;
};

export default function NavBar(props: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();

    if (pathname === '/CreatePlayer') {
        return <></>;
    }

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <nav className="">
                <div className="flex items-center p-5 bg-teal-900 gap-4 w-full justify-between md:w-auto">
                    <h1 className="text-nowrap">Stat Tracker</h1>
                    <div className="hidden md:block md:w-full">
                        {props.hasSession ? (
                            <div className="flex w-full justify-between">
                                <Link href="/Profile?Stats=overall">
                                    Profile
                                </Link>
                                <Link href="/api/auth/signout">Log out</Link>
                            </div>
                        ) : (
                            <Link
                                className="w-full"
                                href="/api/auth/signin?callbackUrl=/Profile"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                    <div className="w-6 h-6 md:hidden">
                        <button onClick={handleClick}>
                            <Bars3Icon className="w-full h-full" />
                        </button>
                    </div>
                </div>
                <div
                    className={` ${
                        isOpen ? 'block' : 'hidden'
                    } flex flex-col bg-teal-900 justify-center items-center py-2 text-center divide-y`}
                >
                    {props.hasSession ? (
                        <>
                            <Link
                                className="w-full"
                                href="/Profile?Stats=overall"
                            >
                                Profile
                            </Link>
                            <Link className="w-full" href="/api/auth/signout">
                                Log out
                            </Link>
                        </>
                    ) : (
                        <Link
                            className="w-full"
                            href="/api/auth/signin?callbackUrl=/Profile"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}
