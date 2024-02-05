'use client';
import '@/extensions/stringExtensions';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '../ui/label';
import Select from 'react-select';
import { createPlayerOptions } from '@/Helpers/playerHelpers';
import { Button } from '../ui/button';
import { useContext } from 'react';
import { GameContext } from '../Functional/Game/GameDisplay';
import { getNumericEnumKeys } from '@/Helpers/enumHelpers';
import { Penalties } from '@/enums/Penalties';

export type AddPenaltyFormProps = {
    formAction: (payload: FormData) => void;
};

export default function AddPenaltyForm(props: AddPenaltyFormProps) {
    const gameContext = useContext(GameContext);

    const penaltyTypeSelectLabels: { value: string; label: string }[] = [];
    const penaltyDurationSelectLabels = [
        { value: 2, label: '2' },
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 20, label: '20' },
    ];

    getNumericEnumKeys(Penalties).map((key, index) => {
        penaltyTypeSelectLabels.push({
            label: Penalties[key],
            value: key,
        });
    });

    return (
        <Card>
            <form action={props.formAction}>
                <CardHeader>
                    <CardTitle>Add Penalty</CardTitle>
                    <CardDescription>
                        Add a Penalty to the game here!
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="offender">Offender</Label>
                        <Select
                            name="offender"
                            id="offender"
                            options={createPlayerOptions(
                                gameContext.game.players
                            )}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="typeOfPenalty">Type of Penalty</Label>
                        <Select
                            name="typeOfPenalty"
                            id="typeOfPenalty"
                            options={penaltyTypeSelectLabels}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="penaltyDuration">
                            Penalty Duration
                        </Label>
                        <Select
                            name="penaltyDuration"
                            id="penaltyDuration"
                            options={penaltyDurationSelectLabels}
                        />
                    </div>
                    <Input
                        id="gameId"
                        className="hidden"
                        name="gameId"
                        hidden
                        readOnly
                        value={gameContext.game.id}
                    />
                    <Input
                        id="teamId"
                        className="hidden"
                        name="teamId"
                        hidden
                        readOnly
                        value={gameContext.game.teamCreatedBy.id}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit">Save changes</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
