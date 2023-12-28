'use client';

import { ChangeEvent, useState } from 'react';
import TeamSelect from './TeamSelect';
import { Player } from '@/types/playerTypes';

type StatsPanelProps = {
    player: Player;
};

export default function StatsPanel(props: StatsPanelProps) {
    const [selectedTeam, updateSelectedTeam] = useState('overall');

    const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateSelectedTeam(event.target.value as string);
    };

    return (
        <>
            <div className="flex flex-row justify-center gap-4 text-gray-900">
                <TeamSelect
                    selectedTeam={selectedTeam}
                    onSelectChange={(event: ChangeEvent<HTMLSelectElement>) =>
                        handleOnChange(event)
                    }
                />
            </div>
            <div className="flex flex-col justify-center items-center p-4">
                <h3 className="mb-4 text-2xl font-bold">Stats</h3>

                <table className="table-fixed bg-teal-100 rounded-xl">
                    <thead>
                        <tr className="border-b-slate">
                            <th className="p-5 border-b border-slate-500">
                                Games Played
                            </th>
                            <th className="p-5 border-b border-slate-500">
                                Goals
                            </th>
                            <th className="p-5 border-b border-slate-500">
                                Assists
                            </th>
                            <th className="p-5 border-b border-slate-500">
                                Pims
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-3 text-center">
                                {props.player.gamesPlayed}
                            </td>
                            <td className="p-3 text-center">
                                {props.player.goals}
                            </td>
                            <td className="p-3 text-center">
                                {props.player.assists}
                            </td>
                            <td className="p-3 text-center">
                                {props.player.pims}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
