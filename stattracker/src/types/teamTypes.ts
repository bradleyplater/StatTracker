import { z } from 'zod';
import { Player } from './playerTypes';

export type Team = {
    id: string;
    name: string;
    admins: string[];
    players: Player[];
};

// Validation Type
export const teamValidation = z.object({
    name: z.string().min(3),
});

export const addPlayerValidation = z.object({
    teamId: z.string().min(3),
    playerId: z.number(),
});
