import prisma from '../../prisma/prisma';
import { Player } from '@/types/playerTypes';
import { Team } from '@/types/teamTypes';
import { Session, getSession } from '@auth0/nextjs-auth0';
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
                players: [],
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
                        stats: true,
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
                        id: player?.playerId,
                        number: player.playerNumber,
                        authId: player.player.authId,
                        firstName: player?.player.firstName,
                        surname: player?.player.surname,
                        shootingSide: player?.player.shooting_side,
                        stats: player.stats.map((stat) => {
                            return {
                                id: stat.id,
                                gamesPlayed: stat.gamesPlayed,
                                seasonId: stat.seasonId,
                                goals: stat.numberOfGoals,
                                assists: stat.numberOfAssists,
                                pims: stat.totalPenaltyDuration,
                                totalPoints: stat.totalPoints,
                            };
                        }),
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
        const session = await getSession();

        const player = await prisma.players.findUnique({
            where: {
                id: playerId,
            },
        });

        try {
            await prisma.teams.update({
                where: {
                    id: teamId,
                },
                data: {
                    players: {
                        create: {
                            player: { connect: { id: playerId } },
                            playerNumber: playerNumber,
                        },
                    },
                },
            });
        } catch (exception) {
            console.log('Failed to update team with new player ', exception);
        }

        try {
            await prisma.playerStats.create({
                data: {
                    id: crypto.randomUUID(),
                    playerId: playerId,
                    teamId: teamId,
                    seasonId: session?.user.season.id,
                },
            });
        } catch (exception) {
            console.log(
                'Failed to add new player stat object for player in team ',
                exception
            );
        }
    }
}
