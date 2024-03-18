'use client';
import { Player } from '@/types/playerTypes';
import { DataTable } from './Functional/Team/data-table';
import { profileColumns } from './Functional/Profile/profileColumns';
import { Season } from '@/types/seasonTypes';
import { redirect } from 'next/navigation';

type StatsPanelProps = {
    player: Player;
    currentSeason: Season;
};

export default function StatsPanel(props: StatsPanelProps) {
    const playerStatsThisSeason = props.player.stats.find(
        (stats) => stats.seasonId == props.currentSeason.id
    );

    if (!playerStatsThisSeason) {
        console.log('Player has no stats object for this season');
        redirect('/Error');
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center p-4">
                <h3 className="mb-4 text-2xl font-bold">Stats</h3>

                <DataTable
                    columns={profileColumns}
                    data={[playerStatsThisSeason]}
                />
            </div>
        </>
    );
}
