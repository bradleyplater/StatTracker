import { Player } from './playerTypes';

export type Goal = {
    scoredBy: Player;
    assistedBy: Player;
};

export type PostGoal = {
    scoredBy: string;
    assistedBy: string[];
    gameId: string;
    teamId: string;
    timeInSeconds: number;
};
