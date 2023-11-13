import Link from 'next/link';

export default function NavBar() {
    return (
        <>
            <nav className="col-span-8">
                <div className="flex justify-between items-center mb-4 w-full p-5 bg-teal-900">
                    <h1>Stat Tracker</h1>
                    <Link href="/login">Login</Link>
                </div>
            </nav>
        </>
    );
}
