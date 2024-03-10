import { redirect } from 'next/navigation';
import PlayerService from '@/services/playerService';
import { PageProps } from '@/types/GenericTypes';
import StatsPanel from '@/Components/StatsPanel';
import { Session, getSession } from '@auth0/nextjs-auth0';

// TRYING TO GET QUERY PARAMS TO MAKE ACTIVE STATES ON BUTTONS

export default async function Profile(pageProps: PageProps) {
    console.log('I am on the profile page');

    let session: Session | null | undefined;
    try {
        session = await getSession();
    } catch (exception) {
        console.log(exception);
    }

    if (!session) {
        redirect('/api/auth/login');
    }
    var response = await PlayerService.GetPlayerByAuthId(session.user.sub);

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
