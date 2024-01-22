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
