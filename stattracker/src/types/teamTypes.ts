import { z } from 'zod';

export type Team = {
    id: string;
    name: string;
    admins: string[];
};

// Validation Type
export const teamValidation = z.object({
    name: z.string().min(3),
});
