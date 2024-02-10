import { Penalty } from '@/types/penaltyTypes';
import prisma from '../../prisma/prisma';
import { redirect } from 'next/navigation';
import { Penalties } from '@/enums/Penalties';

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
        try {
            await prisma.penalties.create({
                data: {
                    type: penalty.type,
                    game: {
                        connect: { id: penalty.gameId },
                    },
                    player: {
                        connect: {
                            id: penalty.offender,
                        },
                    },
                    duration: penalty.duration,
                },
            });
        } catch (error) {
            console.log('Creating new penalty failed: ', error);
            redirect('/Error');
        }

        try {
            await prisma.players.update({
                where: {
                    id: penalty.offender,
                },
                data: {
                    totalPenaltyDuration: { increment: penalty.duration },
                },
            });
        } catch (error) {
            console.log(
                'error incrementing penalty duration count for player: ',
                error
            );
            redirect('/Error');
        }

        try {
            await prisma.playersInTeams.update({
                where: {
                    playerId_teamId: {
                        playerId: penalty.offender,
                        teamId: penalty.teamId as string,
                    },
                },
                data: {
                    totalPenaltyDuration: { increment: penalty.duration },
                },
            });
        } catch (error) {
            console.log(
                'error incrementing penalty duration for player in team: ',
                error
            );
            redirect('/Error');
        }
        return { latestPenalty: penalty };
    }
}
