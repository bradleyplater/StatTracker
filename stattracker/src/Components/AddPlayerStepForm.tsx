'use client';

import { addPlayerToTeamAction } from '@/actions/teamActions';
import { Player } from '@/types/playerTypes';
import { ChangeEvent, useContext, useState } from 'react';
import { useFormState } from 'react-dom';
import PlayerSearch from './PlayerSearch';
import { Team } from '@/types/teamTypes';
import AddPlayerDetails from './AddPlayerDetails';
import SubmitButton from './SubmitButton';
import { AddPlayerContext } from '@/app/contexts/contexts';

type AddPlayerProps = {
    players: Player[];
    currentTeam: Team;
};

export default function AddPlayerStepForm(props: AddPlayerProps) {
    const [state, formAction] = useFormState(addPlayerToTeamAction, null);
    const [data, updateData] = useState({
        playerId: '',
        teamId: '',
        playerNumber: 0,
    });
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        updateData({
            ...data,
            [name]: value,
        });
    };

    const formTabs = [
        <PlayerSearch
            key={props.currentTeam.id}
            players={props.players}
            selectedPlayer={data.playerId}
            handleElementChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChange(event)
            }
        ></PlayerSearch>,
        <AddPlayerDetails
            key={props.currentTeam.id}
            playerId={data.playerId}
        />,
    ];

    return (
        <>
            <AddPlayerContext.Provider value={props.currentTeam}>
                <div className="text-gray-900">
                    <form action={formAction}>
                        {formTabs[activeTab]}

                        <input
                            name="teamId"
                            value={props.currentTeam.id}
                            className="hidden"
                            readOnly={true}
                        ></input>

                        {activeTab == formTabs.length - 1 ? (
                            <div className="flex justify-around">
                                <button
                                    className="bg-gray-100 py-2 px-7 rounded-md text-center flex justify-center"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setActiveTab((prev) => prev - 1);
                                    }}
                                >
                                    back
                                </button>
                                <SubmitButton />
                            </div>
                        ) : (
                            <div className="flex justify-end py-5 px-10">
                                <button
                                    type="button"
                                    className="bg-cyan-700 disabled:bg-gray-300 text-gray-100 disabled:text-gray-500 py-2 px-7 rounded-md text-center flex justify-center"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setActiveTab((prev) => prev + 1);
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </AddPlayerContext.Provider>
        </>
    );
}
