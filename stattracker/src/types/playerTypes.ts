import { ShootingSide } from '@/enums/ShootingSide';
import { z } from 'zod';

export type Player = {
    id: string;
    authId: string;
    number: number | undefined;
    firstName: string;
    surname: string;
    shootingSide: ShootingSide;
    stats: PlayerStats[];
};

export type PlayerStats = {
    id: string;
    seasonId: string;
    seasonName: string;
    teamId: string | undefined;
    goals: number;
    assists: number;
    gamesPlayed: number;
    pims: number;
    totalPoints: number;
};

export type PlayerTeamStats = PlayerStats & {
    firstName: string;
    surname: string;
    number: number;
};

// Validation Type
export const playerValidation = z.object({
    firstName: z.string().min(3),
    surname: z.string().min(3),
    shootingSide: z.nativeEnum(ShootingSide),
});
