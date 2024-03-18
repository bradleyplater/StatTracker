import { Penalty } from '@/types/penaltyTypes';
import prisma from '../../prisma/prisma';
import { redirect } from 'next/navigation';
import { Penalties } from '@/enums/Penalties';
import PlayerService from './playerService';
import { getSession } from '@auth0/nextjs-auth0';

export default class PenaltyService {
    // SET UP PENALTY SERVICE HERE
    static async GetAllPenaltiesByGame(gameId: string) {
        const response = await prisma.penalties.findMany({
            where: {
                gameId: gameId,
            },
            include: {
                player: true,
            },
        });

        const penalties: Penalty[] = [];

        response.forEach((penalty) => {
            penalties.push({
                offender: penalty.playerId,
                type: penalty.type as Penalties,
                duration: penalty.duration,
                gameId: penalty.gameId,
                teamId: undefined,
            });
        });
        return penalties;
    }

    static async CreatePenalty(penalty: Penalty) {
        const session = await getSession();
        if (!session) {
            console.log('CreateGame: No session found');
            redirect('/Error');
        }

        try {
            await prisma.penalties.create({
                data: {
                    type: penalty.type,
                    game: {
                        connect: { id: penalty.gameId },
                    },
                    playerId: penalty.offender,
                    duration: penalty.duration,
                },
            });
        } catch (error) {
            console.log('Creating new penalty failed: ', error);
            redirect('/Error');
        }

        await PlayerService.IncrementPenalties(
            penalty.offender,
            session.user.season.id,
            penalty.teamId,
            penalty.duration
        );

        return { latestPenalty: penalty };
    }
}
