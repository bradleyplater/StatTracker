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
import { Button } from '../ui/button';
import { useContext } from 'react';
import { GameContext } from '../Functional/Game/GameDisplay';

export type UpdateOpponentsGoalsFormProps = {
    formAction: (payload: FormData) => void;
    onSubmitClick: () => void;
};

export default function UpdateOpponentsGoalsForm(
    props: UpdateOpponentsGoalsFormProps
) {
    const gameContext = useContext(GameContext);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        props.onSubmitClick();
        props.formAction(formData);
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Update Opponent Goals</CardTitle>
                    <CardDescription>
                        Add how many goals your opponent scored here
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="numberOfGoals">Number of Goals</Label>
                        <Input
                            type="number"
                            id="numberOfGoals"
                            name="numberOfGoals"
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
