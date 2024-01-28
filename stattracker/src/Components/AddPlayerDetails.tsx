'use client';

import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import Select from 'react-select';
import { getNumericEnumKeys } from '@/Helpers/enumHelpers';
import { ShootingSide } from '@/enums/ShootingSide';

type AddPlayerDetails = {
    playerId: string;
};

export default function AddPlayerDetails(props: AddPlayerDetails) {
    function createShootingSideOptions() {
        const options: { value: string; label: string }[] = [];
        getNumericEnumKeys(ShootingSide).map((key, index) =>
            options.push({
                value: index.toString(),
                label: key,
            })
        );

        return options;
    }

    return (
        <div className="text-gray-900 flex flex-col p-2 items-center gap-2">
            <div>
                <h1 className="text-2xl font-bold text-center">
                    Player Details
                </h1>

                {props.playerId != '' ? (
                    <h2 className="text-sm text-gray-600 text-center">
                        We just need a few more details about this player to get
                        them added!
                    </h2>
                ) : (
                    <h2 className="text-sm text-gray-600 text-center">
                        Looks like you did not select a player! Enter the
                        details and we will get one created for you!
                    </h2>
                )}
            </div>
            <div className="w-full">
                {props.playerId == '' ? (
                    <div className="w-full">
                        <div className="grid w-full max-w-sm items-center gap-1">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstname"
                                name="firstname"
                                placeholder="First name"
                            />
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1">
                            <Label htmlFor="surname">Surname</Label>
                            <Input
                                id="surname"
                                name="surname"
                                placeholder="Surname"
                            />
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1">
                            <Label htmlFor="shootingSide">Shooting Side</Label>
                            <Select
                                name="shootingSide"
                                id="shootingSide"
                                className="basic-multi-select"
                                options={createShootingSideOptions()}
                            />
                        </div>
                    </div>
                ) : null}
                <div className="grid w-full max-w-sm items-center gap-1">
                    <Label htmlFor="playerNumber">Player Number</Label>
                    <Input
                        id="playerNumber"
                        type="number"
                        name="playerNumber"
                        placeholder="Player Number"
                    />
                </div>

                <input
                    name="playerId"
                    value={props.playerId}
                    className="hidden"
                    readOnly={true}
                ></input>
            </div>
        </div>
    );
}
