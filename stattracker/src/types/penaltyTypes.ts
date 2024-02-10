import { Penalties } from '@/enums/Penalties';

export type Penalty = {
    penalty: Penalties;
    offender: string;
    type: string;
    duration: number;
    gameId: string;
    teamId: string | undefined;
};
