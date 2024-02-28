import TeamService from '@/services/teamService';
import '@/extensions/stringExtensions';
import TeamPanel from '@/Components/TeamPanel';
import { redirect } from 'next/navigation';
import GamesService from '@/services/gamesService';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Page({ params }: { params: { teamId: string } }) {
    const session = await getSession();
    const team = await TeamService.FindTeamById(params.teamId);
    const games = await GamesService.GetAllGamesForTeam(params.teamId);

    if (team == null) {
        redirect('/Error');
    }

    return (
        <>
            <div className="flex flex-col justify-center pt-2 text-gray-900 border-b">
                <h1 className="text-2xl font-bold text-center pb-2">
                    {team?.name.toTitleCase()}
                </h1>
            </div>
            <div>
                <TeamPanel
                    team={team}
                    games={games}
                    currentUserId={session?.user.playerId as string}
                />
            </div>
        </>
    );
}
