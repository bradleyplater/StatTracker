import '@/extensions/stringExtensions';
import { redirect } from 'next/navigation';
import GamesService from '@/services/gamesService';
import GameDisplay from '@/Components/Functional/Game/GameDisplay';
import GoalService from '@/services/goalService';

export default async function Page({ params }: { params: { gameId: string } }) {
    const game = await GamesService.GetGameById(params.gameId);
    const goals = await GoalService.GetAllGoalsByGame(params.gameId);

    if (game == null) {
        redirect('/Error');
    }

    return (
        <>
            <GameDisplay game={game} goals={goals} />
        </>
    );
}
