'use client';
import { ChangeEvent, useState } from 'react';
import TeamPlayersList from './TeamPlayersList';
import { Team } from '@/types/teamTypes';

type TeamPanelProps = {
    team: Team;
    currentUserId: string;
};
export default function TeamPanel(props: TeamPanelProps) {
    const [panel, updatePanel] = useState('players');

    function handleOnChange(event: ChangeEvent<HTMLSelectElement>) {
        updatePanel(event.target.value.toLowerCase());
    }

    function renderPanel() {
        switch (panel) {
            case 'players':
                return (
                    <TeamPlayersList
                        teamId={props.team.id}
                        players={props.team.players}
                        isAdmin={props.team.admins.includes(
                            props.currentUserId
                        )}
                    />
                );
        }
    }

    return (
        <>
            <div className="text-gray-900 flex flex-col">
                <div className="flex justify-center w-full mb-4">
                    <select
                        onChange={(event) => handleOnChange(event)}
                        className="bg-teal-100 w-3/6 p-2 rounded-md cursor-pointer hover:bg-teal-500 hover:font-bold text-center"
                        defaultValue={panel}
                    >
                        <option value="players">Players</option>
                    </select>
                </div>

                <div>{renderPanel()}</div>
            </div>
        </>
    );
}
