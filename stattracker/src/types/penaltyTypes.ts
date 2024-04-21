import { Penalties } from '@/enums/Penalties';

export type Penalty = {
    offender: string;
    type: string;
    duration: number;
    penaltyTimeInSeconds: number;
    gameId: string;
    teamId: string | undefined;
};
