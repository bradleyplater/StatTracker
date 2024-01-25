import { z } from 'zod';
import { Team } from './teamTypes';

export type Goals = {
    id: number;
    gameId: string;
    scoredBy: string;
    assistedBy: string[];
};

export type Game = {
    id: string;
    goals: Goals[];
    teamCreatedBy: Team;
    opponentTeam: string;
    isHome: boolean;
    goalsConceeded: number;
    goalsScored: number;
};

export type PostGame = {
    id: string | undefined;
    teamCreatedBy: string;
    opponentTeam: string;
    isHome: boolean;
};

// TODO add regexs here for better validation
export const postGameValidation = z.object({
    teamCreatedBy: z.string(),
    opponentTeam: z.string(),
    isHome: z.boolean(),
});
