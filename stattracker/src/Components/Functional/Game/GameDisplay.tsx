'use client';
import '@/extensions/stringExtensions';
import { redirect } from 'next/navigation';
import { Game, Goals } from '@/types/gameTypes';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { addGoalAction } from '@/actions/goalActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AddGoalForm from '@/Components/Forms/AddGoalForm';
import { Separator } from '@/Components/ui/separator';
import { createContext } from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { ScrollBar, ScrollArea } from '@/Components/ui/scroll-area';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/ui/accordion';
import AddPenaltyForm from '@/Components/Forms/AddPenaltyForm';
import { addPenaltyAction } from '@/actions/penaltyActions';
import { Penalties } from '@/enums/Penalties';
import { formatDurationFromSeconds } from '@/Helpers/numberHelpers';
import UpdateOpponentsGoalsForm from '@/Components/Forms/UpdateOpponentGoalsForm';
import { updateOpponentGoalsAction } from '@/actions/gameActions';

export type GameDisplayProps = {
    game: Game;
    goals: Goals[];
};

export const GameContext = createContext({} as GameDisplayProps);

export default function GameDisplay(props: GameDisplayProps) {
    const [addGoalFormState, formAction] = useFormState(addGoalAction, null);
    const [addPenaltyFormState, penaltyFormAction] = useFormState(
        addPenaltyAction,
        null
    );

    const [updateOpponentsGoalsFormState, opponentGoalsFormAction] =
        useFormState(updateOpponentGoalsAction, props.game.goalsConceeded);

    const [adminTab, updateAdminTab] = useState('');
    const [gameState, setGameState] = useState(props);

    if (props.game == null) {
        redirect('/Error');
    }

    if (addGoalFormState?.success) {
        addGoalFormState.success = false;
        updateAdminTab('');

        const newState = {
            ...gameState,
            game: {
                ...gameState.game,
                goalsScored: addGoalFormState.game.goalsScored,
                goals: [
                    ...gameState.game.goals,
                    addGoalFormState.game.latestGoal,
                ],
            },
            goals: [...gameState.game.goals, addGoalFormState.game.latestGoal],
        };

        setGameState(newState);
    }

    if (addPenaltyFormState?.success) {
        addPenaltyFormState.success = false;
        updateAdminTab('');

        const newState = {
            ...gameState,
            game: {
                ...gameState.game,
                penalties: [
                    ...gameState.game.penalties,
                    addPenaltyFormState?.game.latestPenalty,
                ],
            },
        };

        setGameState(newState);
    }

    function handleAdminTabChange(value: string) {
        updateAdminTab(value);
    }

    return (
        <GameContext.Provider value={gameState}>
            <div className="text-gray-900 flex flex-col p-2 items-center gap-2">
                <div className="flex flex-row justify-between items-center w-full">
                    <span className="text-lg w-1/3 text-center">
                        {gameState.game.teamCreatedBy.name.toTitleCase()}
                    </span>
                    <div className="text-xl px-5 py-2 flex justify-center bg-gray-100 inner-shadow rounded-md gap-2">
                        <span>{gameState.game.goalsScored}</span>
                        <span>:</span>
                        <span>{updateOpponentsGoalsFormState ?? 0}</span>
                    </div>
                    <span className="text-lg w-1/3 text-center">
                        {gameState.game.opponentTeam}
                    </span>
                </div>
                <Separator />
                <div className="w-full">
                    <Tabs onValueChange={handleAdminTabChange} value={adminTab}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="addGoal">Add Goal</TabsTrigger>
                            <TabsTrigger value="addPims">Add Pims</TabsTrigger>
                            <TabsTrigger value="updateOpponentsGoals">
                                Update Opponents Goals
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="addGoal">
                            <AddGoalForm formAction={formAction} />
                        </TabsContent>
                        <TabsContent value="addPims">
                            <AddPenaltyForm formAction={penaltyFormAction} />
                        </TabsContent>
                        <TabsContent value="updateOpponentsGoals">
                            <UpdateOpponentsGoalsForm
                                formAction={opponentGoalsFormAction}
                                onSubmitClick={() => handleAdminTabChange('')}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg">
                            Goals
                        </AccordionTrigger>
                        <AccordionContent className="w-ull">
                            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                                <div className="flex p-2 gap-5">
                                    {gameState.goals.map((goal, index) => {
                                        const scoredByPlayer =
                                            gameState.game.players.filter(
                                                (player) =>
                                                    player.id == goal.scoredBy
                                            )[0];

                                        const scoredByName = `${scoredByPlayer.firstName} ${scoredByPlayer.surname}`;

                                        const assistedBy =
                                            gameState.game.players.filter(
                                                (player) =>
                                                    goal.assistedBy.includes(
                                                        player.id
                                                    )
                                            );

                                        return (
                                            <Card key={goal.id}>
                                                <CardContent className="pb-4">
                                                    <div className="flex flex-col pt-2">
                                                        <p className="text-base">
                                                            {formatDurationFromSeconds(
                                                                goal.timeScoredInSeconds
                                                            )}
                                                        </p>
                                                        <p className="text-base">
                                                            {scoredByName}
                                                        </p>
                                                        <div className="flex gap-2">
                                                            {assistedBy.map(
                                                                (player) => {
                                                                    return (
                                                                        <p
                                                                            key={
                                                                                player.id
                                                                            }
                                                                            className="text-gray-600 text-sm"
                                                                        >
                                                                            {
                                                                                player.firstName
                                                                            }{' '}
                                                                            {
                                                                                player.surname
                                                                            }
                                                                        </p>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                    <ScrollBar orientation="horizontal" />
                                </div>
                            </ScrollArea>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-lg">
                            Penalties
                        </AccordionTrigger>
                        <AccordionContent>
                            <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
                                <div className="flex p-2 gap-5">
                                    {gameState.game.penalties.map(
                                        (penalty, index) => {
                                            const offendedBy =
                                                gameState.game.players.filter(
                                                    (player) =>
                                                        player.id ==
                                                        penalty.offender
                                                )[0];

                                            const offenderName = `${offendedBy.firstName} ${offendedBy.surname}`;
                                            const penaltyString = `${
                                                Penalties[
                                                    penalty.type as keyof typeof Penalties
                                                ]
                                            } ${penalty.duration} minutes`;

                                            return (
                                                <Card key={penalty.offender}>
                                                    <CardContent className="pb-4">
                                                        <div className="flex flex-col pt-2">
                                                            <p className="text-base">
                                                                {formatDurationFromSeconds(
                                                                    penalty.penaltyTimeInSeconds
                                                                )}
                                                            </p>
                                                            <p className="text-base">
                                                                {offenderName}
                                                            </p>
                                                            <div className="flex gap-2">
                                                                <p
                                                                    key={
                                                                        penalty.offender
                                                                    }
                                                                    className="text-gray-600 text-sm"
                                                                >
                                                                    {
                                                                        penaltyString
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            );
                                        }
                                    )}
                                    <ScrollBar orientation="horizontal" />
                                </div>
                            </ScrollArea>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </GameContext.Provider>
    );
}
