'use client';

import { ChangeEvent, useState } from 'react';
import TeamSelect from './TeamSelect';
import { Player } from '@/types/playerTypes';
import { DataTable } from './Functional/Team/data-table';
import { profileColumns } from './Functional/Profile/profileColumns';

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

                <DataTable columns={profileColumns} data={[props.player]} />
            </div>
        </>
    );
}
