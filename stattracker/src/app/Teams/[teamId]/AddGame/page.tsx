import AddPlayerStepForm from '@/Components/AddPlayerStepForm';
import AddGameForm from '@/Components/Forms/AddGameForm';
import PlayerService from '@/services/playerService';
import TeamService from '@/services/teamService';
import { Team } from '@/types/teamTypes';
import { redirect } from 'next/navigation';

export default async function AddGame({
    params,
}: {
    params: { teamId: string };
}) {
    const players = await PlayerService.GetAllPlayers();
    const team = await TeamService.FindTeamById(params.teamId);

    if (team == null) {
        redirect('/Error');
    }

    return (
        <>
            <AddGameForm team={team}></AddGameForm>
        </>
    );
}
