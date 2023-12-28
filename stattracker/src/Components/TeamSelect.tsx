'use client';

import { ChangeEvent, useState } from 'react';

type TeamSelectProps = {
    selectedTeam: string;
    onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export default function TeamSelect(props: TeamSelectProps) {
    return (
        <>
            <select
                onChange={(event) => props.onSelectChange(event)}
                className="bg-teal-100 w-3/6 p-2 rounded-md cursor-pointer hover:bg-teal-500 hover:font-bold text-center"
                defaultValue={props.selectedTeam}
            >
                <option value="overall">Overall</option>
                <option value="warriors">Warriors</option>
                <option value="Preds">Preds</option>
            </select>
        </>
    );
}
