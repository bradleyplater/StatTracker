import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import PlayerService from '@/services/playerService';

export default async function profile() {
    const session = await getServerSession(options);

    if (!session) {
        redirect('/login');
    }

    var response = await PlayerService.GetPlayer('');

    return (
        <>
            <div className="col-span-8 bg-teal-900 h-screen flex justify-center items-center">
                <div className="bg-teal-100 text-gray-900 p-10 rounded-xl">
                    {response?.shooting_side}
                </div>
            </div>
        </>
    );
}
