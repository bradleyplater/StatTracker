'use client';

import { AddPlayerContext } from '@/app/contexts/contexts';
import { Player } from '@/types/playerTypes';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { ChangeEvent, useContext, useState } from 'react';

type PlayerSearchProps = {
    players: Player[];
    selectedPlayer: string;
    handleElementChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function PlayerSearch(props: PlayerSearchProps) {
    const [filteredPlayers, updateFilteredPlayers] = useState([] as Player[]);
    const currentTeam = useContext(AddPlayerContext);

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        updateFilteredPlayers(
            props.players.filter((player) => {
                const fullName = [player.firstName, player.surname].join(' ');

                if (event.target.value.toLowerCase() == '') {
                    return null;
                }

                if (
                    currentTeam.players.some(
                        (teamPlayer) => teamPlayer.id == player.id
                    )
                ) {
                    return null;
                }

                return fullName
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase());
            })
        );
    }

    return (
        <>
            <div className="flex flex-col items-center mt-2 px-5">
                <div>
                    <h1 className="text-xl font-bold text-center">
                        Player Search
                    </h1>
                    <h2 className="text-md">
                        Type the players name you want to add to the team
                    </h2>
                </div>
                <div className="relative flex items-center w-full text-gray-600 focus-within:text-gray-800 mt-4 mb-1">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search player"
                        className="pr-3 pl-10 py-2 bg-gray-100 rounded-xl w-full font-semibold border-none ring-2 ring-gray-600 focus:ring-gray-800 focus:ring-2"
                        onChange={(event) => handleSearchChange(event)}
                    ></input>
                </div>
                <div
                    className={`w-full bg-gray-100 text-gray-500 border-2 border-gray-600 rounded-xl divide-y divide-gray-500 ${
                        filteredPlayers.length == 0 ? 'hidden' : ''
                    } `}
                >
                    {filteredPlayers.map((player) => {
                        return (
                            <div className="py-2 px-5" key={player.id}>
                                <label
                                    className="flex justify-between items-center"
                                    htmlFor={player.id.toString()}
                                >
                                    {player.firstName}
                                    <input
                                        id={player.id.toString()}
                                        type="radio"
                                        className="w-3 h-3"
                                        name="playerId"
                                        value={player.id}
                                        checked={
                                            player.id == props.selectedPlayer
                                        }
                                        onChange={(event) =>
                                            props.handleElementChange(event)
                                        }
                                    ></input>
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
