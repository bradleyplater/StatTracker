import NavBar from '@/Components/NavBar';

export default function Home() {
    return (
        <>
            <div className="col-span-8 bg-teal-900 h-screen flex justify-center items-center">
                <div className="bg-teal-100 text-gray-900 p-10 rounded-xl">
                    <h1>Login</h1>
                    <button className="bg-cyan-500 p-3 rounded-xl">
                        Login with google
                    </button>
                </div>
            </div>
        </>
    );
}
