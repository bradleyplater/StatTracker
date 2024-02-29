import prisma from '../../prisma/prisma';
import { Player } from '@/types/playerTypes';
import { Team } from '@/types/teamTypes';
import { Session } from '@auth0/nextjs-auth0';
import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';
import PlayerService from './playerService';

export default class TeamService {
    constructor() {}

    static async GetAllTeams(): Promise<Team[]> {
        const response = await prisma.teams.findMany({
            include: {
                admins: true,
                players: {
                    include: {
                        player: true,
                    },
                },
            },
        });

        const teams = [] as Team[];

        response.forEach((team) => {
            teams.push({
                id: team.id,
                name: team?.name as string,
                admins: team?.admins.map((admin) => admin.id),
                players: team.players.map((player) => {
                    return {
                        id: player?.player.id,
                        authId: player?.player.authId,
                        number: player.playerNumber,
                        firstName: player?.player.firstName,
                        surname: player?.player.surname,
                        shootingSide: player?.player.shooting_side,
                        goals: player?.player.numberOfGoals,
                        assists: player?.player.numberOfAssists,
                        gamesPlayed: player?.player.gamesPlayed,
                        pims: player?.player.totalPenaltyDuration,
                        userId: player?.player.userid,
                        totalPoints: player?.player.totalPoints,
                    } as Player;
                }),
            });
        });

        return teams;
    }

    static async FindTeamById(id: string): Promise<Team | null> {
        const response = await prisma.teams.findFirst({
            where: {
                id: id,
            },
            include: {
                admins: true,
                players: {
                    include: {
                        player: true,
                    },
                },
            },
        });

        if (response != null) {
            return {
                id: response.id,
                name: response?.name as string,
                admins: response?.admins.map((admin) => admin.id),
                players: response.players.map((player) => {
                    return {
                        id: player?.player.id,
                        authId: player?.player.authId,
                        number: player.playerNumber,
                        firstName: player?.player.firstName,
                        surname: player?.player.surname,
                        shootingSide: player?.player.shooting_side,
                        goals: player?.player.numberOfGoals,
                        assists: player?.player.numberOfAssists,
                        gamesPlayed: player?.player.gamesPlayed,
                        pims: player?.player.totalPenaltyDuration,
                        userId: player?.player.userid,
                        totalPoints: player?.player.totalPoints,
                    } as Player;
                }),
            } as Team;
        } else {
            return null;
        }
    }

    static async CreateTeam(
        team: Team,
        session: Session
    ): Promise<string | { error: string }> {
        const player = await PlayerService.GetPlayerByAuthId(session.user.sub);

        if (!player) {
            redirect('/Error');
        }

        try {
            const response = await prisma.teams.create({
                data: {
                    id: team.id,
                    name: team.name.toLowerCase(),
                    admins: {
                        connect: { id: player.id as string },
                    },
                },
            });
            return response.id;
        } catch (error: any) {
            console.log('Creating new team failed: ', error);

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.meta && (error.meta['target'] as string) == 'name') {
                    return {
                        error: 'This name already exists! Please choose another one',
                    };
                }
            }
            redirect('/Error');
        }
    }

    static async AddPlayer(
        teamId: string,
        playerId: string,
        playerNumber: number
    ) {
        await prisma.teams.update({
            where: {
                id: teamId,
            },
            data: {
                players: {
                    create: [
                        {
                            player: {
                                connect: { id: playerId },
                            },
                            playerNumber: playerNumber,
                        },
                    ],
                },
            },
        });
    }
}
