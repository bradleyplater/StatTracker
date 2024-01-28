'use client';
import '@/extensions/stringExtensions';
import { redirect } from 'next/navigation';
import { Game, Goals } from '@/types/gameTypes';
import { useState } from 'react';
import { Team } from '@/types/teamTypes';
import { useFormState } from 'react-dom';
import { addGoalAction } from '@/actions/goalActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AddGoalForm from '@/Components/Forms/AddGoalForm';
import { Separator } from '@/Components/ui/separator';
import { createContext } from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { ScrollBar, ScrollArea } from '@/Components/ui/scroll-area';
import GoalList from '../Goal/GoalList';

export type GameDisplayProps = {
    game: Game;
    team: Team;
    goals: Goals[];
};

export const GameContext = createContext({} as GameDisplayProps);

export default function GameDisplay(props: GameDisplayProps) {
    const [addGoalFormState, formAction] = useFormState(addGoalAction, null);
    const [adminTab, updateAdminTab] = useState('');

    if (props.game == null) {
        redirect('/Error');
    }

    if (addGoalFormState?.success) {
        addGoalFormState.success = false;
        updateAdminTab('');
        props.game.goalsScored = addGoalFormState.game.goalsScored;
    }

    function handleAdminTabChange(value: string) {
        updateAdminTab(value);
    }

    return (
        <GameContext.Provider value={props}>
            <div className="text-gray-900 flex flex-col p-2 items-center gap-2">
                <div className="flex flex-row justify-between items-center w-full">
                    <span className="text-lg w-1/3 text-center">
                        {props.team.name.toTitleCase()}
                    </span>
                    <div className="text-xl px-5 py-2 flex justify-center bg-gray-100 inner-shadow rounded-md gap-2">
                        <span>{props.game.goalsScored}</span>
                        <span>:</span>
                        <span>{props.game.goalsConceeded}</span>
                    </div>
                    <span className="text-lg w-1/3 text-center">
                        {props.game.opponentTeam}
                    </span>
                </div>
                <Separator />
                <div className="w-full">
                    <Tabs onValueChange={handleAdminTabChange} value={adminTab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="addGoal">Add Goal</TabsTrigger>
                            <TabsTrigger value="addPims">Add Pims</TabsTrigger>
                        </TabsList>
                        <TabsContent value="addGoal">
                            <AddGoalForm formAction={formAction} />
                        </TabsContent>
                    </Tabs>
                </div>

                <div>
                    <GoalList />
                </div>
            </div>
        </GameContext.Provider>
    );
}
