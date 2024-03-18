import { Player, PlayerTeamStats } from '@/types/playerTypes';
import { PlusIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { DataTable } from './Functional/Team/data-table';
import { teamPlayerDataColumns } from './Functional/Team/teamColumns';
import { redirect } from 'next/navigation';
import { useContext } from 'react';
import { SeasonContext } from './TeamPanel';

type TeamPlayersListProps = {
    players: Player[];
    teamId: string;
    isAdmin: boolean;
};

export default function TeamPlayersList(props: TeamPlayersListProps) {
    const currentSeason = useContext(SeasonContext);

    if (!currentSeason) {
        console.log('current Season not passed to TeamPlayersList');
        redirect('/Error');
    }

    const playerTeamStats: PlayerTeamStats[] = [];

    props.players.map((player) => {
        let chosenSeasonStats = player.stats.find(
            (stat) => stat.seasonId == currentSeason.id
        );

        if (!chosenSeasonStats) {
            // No stats object for this season need to go do something
            console.log('I have no stats');

            chosenSeasonStats = {
                id: 'asdasd',
                seasonId: 'gdfgdfg',
                seasonName: 'dfsdf',
                goals: 0,
                assists: 0,
                gamesPlayed: 0,
                pims: 0,
                totalPoints: 0,
                teamId: 'fsdfsdf',
            };
        }

        playerTeamStats.push({
            firstName: player.firstName,
            surname: player.surname,
            number: player.number || 0,
            id: chosenSeasonStats?.id,
            seasonId: chosenSeasonStats.seasonId,
            seasonName: chosenSeasonStats.seasonName,
            goals: chosenSeasonStats.goals,
            assists: chosenSeasonStats.assists,
            gamesPlayed: chosenSeasonStats.gamesPlayed,
            pims: chosenSeasonStats.pims,
            totalPoints: chosenSeasonStats.totalPoints,
            teamId: chosenSeasonStats.teamId,
        });
    });

    return (
        <>
            <div className="text-gray-900 flex flex-col">
                {props.isAdmin && (
                    <div className="flex justify-center mb-4">
                        <Link
                            className="p-2 px-4 bg-emerald-400 rounded-xl w-3/6 flex justify-between items-center"
                            href={`/Teams/${props.teamId}/AddPlayer`}
                        >
                            Add Player <PlusIcon className="w-6 h-6" />
                        </Link>
                    </div>
                )}
                <div className="overflow-x-auto flex justify-center">
                    <DataTable
                        columns={teamPlayerDataColumns}
                        data={playerTeamStats}
                    />
                </div>
            </div>
        </>
    );
}
