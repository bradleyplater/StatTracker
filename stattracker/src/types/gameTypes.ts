import { z } from 'zod';
import { Team } from './teamTypes';
import { Player } from './playerTypes';
import { Penalty } from './penaltyTypes';
import { GameType } from '@/enums/GameType';

export type Goals = {
    id: string;
    gameId: string;
    scoredBy: string;
    assistedBy: string[];
    timeScoredInSeconds: number;
};

export type Game = {
    id: string;
    goals: Goals[];
    teamCreatedBy: Team;
    opponentTeam: string;
    isHome: boolean;
    goalsConceeded: number;
    goalsScored: number;
    players: Player[];
    penalties: Penalty[];
    date: Date;
    type: string;
};

export type PostGame = {
    id: string | undefined;
    teamCreatedBy: string;
    opponentTeam: string;
    isHome: boolean;
    players: { id: string }[];
    date: Date;
    type: string;
};

// TODO add regexs here for better validation
export const postGameValidation = z.object({
    teamCreatedBy: z.string(),
    opponentTeam: z.string(),
    isHome: z.boolean(),
});
