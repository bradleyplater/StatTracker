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

export type AddGoalFormProps = {
    formAction: (payload: FormData) => void;
};

export default function AddGoalForm(props: AddGoalFormProps) {
    const gameContext = useContext(GameContext);

    return (
        <Card>
            <form action={props.formAction}>
                <CardHeader>
                    <CardTitle>Add Goal</CardTitle>
                    <CardDescription>
                        Add a Goal to the game here!
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="scoredBy">Scored By</Label>
                        <Select
                            name="scoredBy"
                            id="scoredBy"
                            options={createPlayerOptions(
                                gameContext.team.players
                            )}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="assistedBy">Assisted By</Label>
                        <Select
                            isMulti
                            name="assistedBy"
                            id="assistedBy"
                            className="basic-multi-select"
                            options={createPlayerOptions(
                                gameContext.team.players
                            )}
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
                        value={gameContext.team.id}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit">Save changes</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
