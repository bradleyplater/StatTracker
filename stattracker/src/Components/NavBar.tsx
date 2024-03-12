'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Bars3Icon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

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
                        {user ? (
                            <div className="flex w-full justify-between">
                                <Link href="/Profile">Profile</Link>
                                <Link href="/Teams">Teams</Link>
                                <a href="/api/auth/logout">Log out</a>
                            </div>
                        ) : (
                            <a className="w-full" href="/api/auth/login">
                                Login
                            </a>
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
                    } flex flex-col bg-teal-900 justify-center items-center  text-center divide-y`}
                >
                    {user ? (
                        <>
                            <Link
                                onClick={handleClick}
                                className="w-full py-1"
                                href="/Profile"
                            >
                                Profile
                            </Link>
                            <Link
                                onClick={handleClick}
                                className="w-full py-1"
                                href="/Teams"
                            >
                                Teams
                            </Link>

                            <a
                                onClick={handleClick}
                                className="w-full py-1"
                                href="/api/auth/logout"
                            >
                                Log out
                            </a>
                        </>
                    ) : (
                        <a className="w-full" href="/api/auth/login">
                            Login
                        </a>
                    )}
                </div>
            </nav>
        </>
    );
}
