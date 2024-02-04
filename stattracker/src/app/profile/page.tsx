import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import PlayerService from '@/services/playerService';

import { PageProps } from '@/types/GenericTypes';

import StatsPanel from '@/Components/StatsPanel';

// TRYING TO GET QUERY PARAMS TO MAKE ACTIVE STATES ON BUTTONS

export default async function Profile(pageProps: PageProps) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    var response = await PlayerService.GetPlayerByUserId(session.user.id);

    if (response === null) {
        redirect('/CreatePlayer');
    }

    return (
        <>
            <div className="flex flex-col p-2">
                <div className="bg-teal-100 text-gray-900 p-3 rounded-xl flex flex-row justify-around items-center gap-5">
                    <div>
                        <h1 className="text-2xl font-bold">
                            {response.firstName} {response.surname}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="text-gray-900">
                <StatsPanel player={response} />
            </div>
        </>
    );
}
