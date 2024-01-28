'use client';
import '@/extensions/stringExtensions';
import { Card, CardContent } from '@/Components/ui/card';
import { ScrollBar, ScrollArea } from '@/Components/ui/scroll-area';
import { useContext } from 'react';
import { GameContext } from '../Game/GameDisplay';

export default function GoalList() {
    const gameContext = useContext(GameContext);

    return (
        <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
            <div className="flex p-2 gap-5">
                {gameContext.goals.map((goal, index) => {
                    const scoredByPlayer = gameContext.team.players.filter(
                        (player) => player.id == goal.scoredBy
                    )[0];

                    const scoredByName = `${scoredByPlayer.firstName} ${scoredByPlayer.surname}`;

                    const assistedBy = gameContext.team.players.filter(
                        (player) => goal.assistedBy.includes(player.id)
                    );

                    return (
                        <Card key={goal.id}>
                            <CardContent className="pb-4">
                                <div className="flex flex-col pt-2">
                                    <p className="text-base">Goal {index}</p>
                                    <p className="text-base">{scoredByName}</p>
                                    <div className="flex gap-2">
                                        {assistedBy.map((player) => {
                                            return (
                                                <p
                                                    key={player.id}
                                                    className="text-gray-600 text-sm"
                                                >
                                                    {player.firstName}{' '}
                                                    {player.surname}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
                <ScrollBar orientation="horizontal" />
            </div>
        </ScrollArea>
    );
}
