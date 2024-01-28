import '@/extensions/stringExtensions';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import GamesService from '@/services/gamesService';
import GameDisplay from '@/Components/Functional/Game/GameDisplay';
import TeamService from '@/services/teamService';
import GoalService from '@/services/goalService';

export default async function Page({ params }: { params: { gameId: string } }) {
    const session = await getServerSession(authOptions);
    const game = await GamesService.GetGameById(params.gameId);
    const team = await TeamService.FindTeamById(
        game?.teamCreatedBy.id as string
    );
    const goals = await GoalService.GetAllGoalsByGame(params.gameId);

    if (game == null || team == null) {
        redirect('/Error');
    }

    return (
        <>
            <GameDisplay game={game} team={team} goals={goals} />
        </>
    );
}
