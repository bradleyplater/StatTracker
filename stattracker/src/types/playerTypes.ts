import { ShootingSide } from '@/enums/ShootingSide';
import { z } from 'zod';

export type Player = {
    id: string;
    number: number;
    firstName: string;
    surname: string;
    shootingSide: ShootingSide;
    goals: number;
    assists: number;
    gamesPlayed: number;
    pims: number;
    userId: string;
};

// Validation Type
export const playerValidation = z.object({
    firstName: z.string().min(3),
    surname: z.string().min(3),
    shootingSide: z.nativeEnum(ShootingSide),
});
