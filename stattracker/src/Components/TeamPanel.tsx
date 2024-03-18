'use client';
import { ChangeEvent, createContext, useState } from 'react';
import TeamPlayersList from './TeamPlayersList';
import { Team } from '@/types/teamTypes';
import TeamGamesList from './TeamsGamesList';
import { Game } from '@/types/gameTypes';
import { Season } from '@/types/seasonTypes';

type TeamPanelProps = {
    team: Team;
    games: Game[];
    currentUserId: string;
    currentSeason: Season;
};

export const SeasonContext = createContext<Season | null>(null);

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
            case 'games':
                return (
                    <TeamGamesList
                        teamId={props.team.id}
                        games={props.games}
                        isAdmin={props.team.admins.includes(
                            props.currentUserId
                        )}
                    ></TeamGamesList>
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
                        <option value="games">Games</option>
                    </select>
                </div>
                <SeasonContext.Provider value={props.currentSeason}>
                    <div>{renderPanel()}</div>
                </SeasonContext.Provider>
            </div>
        </>
    );
}
