import AddPlayerStepForm from '@/Components/AddPlayerStepForm';
import { AddPlayerContext } from '@/app/contexts/contexts';
import PlayerService from '@/services/playerService';
import TeamService from '@/services/teamService';
import { Team } from '@/types/teamTypes';
import { redirect } from 'next/navigation';

export default async function AddPlayer({
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
            <AddPlayerStepForm
                players={players}
                currentTeam={team as Team}
            ></AddPlayerStepForm>
        </>
    );
}
