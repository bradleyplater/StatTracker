'use client';
import { Team } from '@/types/teamTypes';
import '@/extensions/stringExtensions';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { useFormState } from 'react-dom';
import { addGameAction } from '@/actions/gameActions';
import Select from 'react-select';
import { createPlayerOptions } from '@/Helpers/playerHelpers';

export type AddGameFormProps = {
    team: Team;
};

export default function AddGameForm(props: AddGameFormProps) {
    const [formState, formAction] = useFormState(addGameAction, null);

    return (
        <form
            className="text-gray-900 flex flex-col p-2 items-center gap-2"
            action={formAction}
        >
            <div>
                <h1 className="text-xl font-bold text-center">Add Game</h1>
                <span className="text-xs text-gray-500 mb-5">
                    All information entered here should be in relation to your
                    team. We currently do not support adding information for
                    other teams when creating a game
                </span>
            </div>
            <div className="flex flex-col items-center w-full gap-3">
                <div className="grid w-full max-w-sm items-center gap-1">
                    <Label htmlFor="teamCreatedBy">Your Team</Label>
                    <Input
                        id="teamCreatedBy"
                        className="hidden"
                        name="teamCreatedBy"
                        hidden
                        readOnly
                        value={props.team.id}
                    />
                    <Input
                        disabled
                        readOnly
                        value={props.team.name.toTitleCase()}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1">
                    <Label htmlFor="opponentTeam">Opponent Team</Label>
                    <Input
                        id="opponentTeam"
                        name="opponentTeam"
                        placeholder="Opponent Team"
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1">
                    <Label htmlFor="players">Players</Label>

                    <Select
                        isMulti
                        name="players"
                        options={createPlayerOptions(props.team.players)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1">
                    <Label htmlFor="location">Location</Label>
                    <Select
                        name="location"
                        id="location"
                        options={[
                            { value: 'home', label: 'Home' },
                            { value: 'away', label: 'Away' },
                        ]}
                    />
                </div>
                <Button
                    className="bg-teal-700 w-1/3 text-gray-100"
                    type="submit"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}
