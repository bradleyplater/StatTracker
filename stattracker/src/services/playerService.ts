import { PlayerStats as PrismaPlayerStats } from '@prisma/client';
import prisma from '../../prisma/prisma';
import { Player, PlayerStats } from '@/types/playerTypes';
import { generateRandom6DigitNumber } from '@/Helpers/numberHelpers';
import { redirect } from 'next/navigation';
import SeasonService from './seasonService';
import { getSession } from '@auth0/nextjs-auth0';

export default class PlayerService {
    constructor() {}

    static async GetPlayerById(id: string) {
        const response = await prisma.players.findFirst({
            where: {
                id: id,
            },
        });

        if (response == null) return null;

        const player = {
            id: response?.id,
            authId: response?.authId,
            number: undefined,
            firstName: response?.firstName,
            surname: response?.surname,
            shootingSide: response?.shooting_side,
        } as Player;

        return player;
    }

    static async GetPlayerByAuthId(authId: string) {
        const response = await prisma.players.findFirst({
            where: {
                authId: authId,
            },
            include: {
                stats: {
                    include: {
                        season: true,
                    },
                },
            },
        });

        if (response == null) return null;

        const player = {
            id: response?.id,
            authId: response?.authId,
            number: undefined,
            firstName: response?.firstName,
            surname: response?.surname,
            shootingSide: response?.shooting_side,
            stats: response.stats.map((stat) => {
                return {
                    id: stat.id,
                    seasonName: stat.season.name,
                    seasonId: stat.season.id,
                    goals: stat.numberOfGoals,
                    assists: stat.numberOfAssists,
                    gamesPlayed: stat.gamesPlayed,
                    pims: stat.pims,
                    totalPoints: stat.totalPoints,
                } as PlayerStats;
            }),
        } as Player;

        return player;
    }

    static async GetAllPlayers() {
        const response = await prisma.players.findMany({});

        const players = [] as Player[];

        response.forEach((player) => {
            players.push({
                id: player?.id,
                authId: player?.authId,
                number: undefined,
                firstName: player?.firstName,
                surname: player?.surname,
                shootingSide: player?.shooting_side,
            } as Player);
        });

        return players;
    }

    /**
     * Creates a new player in the database. PlayerId is generated as part of this method too
     *
     * @param {Player} playerData - Player object which to add to the database
     * @return {string} The Id of the newly created player
     */
    static async CreateNewPlayer(playerData: Player): Promise<string> {
        let idIsInDB = true;
        let iteration = 0;
        let id = 'PLR' + generateRandom6DigitNumber();
        const session = await getSession();

        if (!session) {
            console.log('No session available to create new player');
            redirect('/Error');
        }

        while (idIsInDB && iteration <= 5) {
            const player = await PlayerService.GetPlayerById(id);

            if (player != null) {
                console.log(`iteration ${iteration}: id already in use ${id}`);
                idIsInDB = true;
                iteration++;
            } else {
                idIsInDB = false;
                playerData.id = id;
            }
        }

        const seasons = await SeasonService.GetAllSeasons();
        const playerStats: PrismaPlayerStats[] = [];

        seasons.forEach((season) => {
            const currentDate = new Date();
            if (currentDate > season.startDate) {
                playerStats.push({
                    playerId: playerData.id,
                    seasonId: season.id,
                    teamId: null,
                    gamesPlayed: 0,
                    numberOfAssists: 0,
                    numberOfGoals: 0,
                    pims: 0,
                    totalPenaltyDuration: 0,
                    totalPoints: 0,
                    id: crypto.randomUUID(),
                });
            }
        });

        try {
            await prisma.players.create({
                data: {
                    id: playerData.id,
                    authId: playerData.authId,
                    firstName: playerData.firstName,
                    surname: playerData.surname,
                    shooting_side: parseInt(playerData.shootingSide.toString()),
                    stats: {
                        createMany: {
                            data: playerStats.map((stats) => {
                                return {
                                    seasonId: stats.seasonId,
                                    gamesPlayed: 0,
                                    numberOfAssists: 0,
                                    numberOfGoals: 0,
                                    pims: 0,
                                    totalPenaltyDuration: 0,
                                    totalPoints: 0,
                                    id: crypto.randomUUID(),
                                };
                            }),
                        },
                    },
                },
            });
        } catch (error) {
            console.log('Creating new player failed: ', error);
            redirect('/Error');
        }
        return id;
    }

    /**
     * Updates playerStats record to increment their games played.
     *
     * @param {string} seasonId Id for the season you want to increment games played for
     * @param {string | null} teamId Id for the team you want to increment games played for. Leave null if no team need updating
     * @param {{id: string}[]}playerIds Array of playerIds to update for.
     */
    static async IncrementGamesPlayed(
        seasonId: string,
        teamId: string | null,
        playerIds: { id: string }[]
    ) {
        try {
            await prisma.playerStats.updateMany({
                where: {
                    playerId: {
                        in: playerIds.map((player) => player.id),
                    },
                    seasonId: seasonId,
                    teamId: null,
                },
                data: {
                    gamesPlayed: { increment: 1 },
                },
            });
        } catch (exception) {
            console.log('Failed to increment players overall games played');
        }
        if (teamId) {
            try {
                await prisma.playerStats.updateMany({
                    where: {
                        playerId: {
                            in: playerIds.map((player) => player.id),
                        },
                        seasonId: seasonId,
                        teamId: teamId,
                    },
                    data: {
                        gamesPlayed: { increment: 1 },
                    },
                });
            } catch (exception) {
                console.log('Failed to increment players overall games played');
            }
        }
    }

    /**
     * Updates playerStats record to increment their goals scored and total points.
     *
     * @param {string} seasonId Id for the season you want to increment goals scored for
     * @param {string | null} teamId Id for the team you want to increment goals scored for. Leave null if no team need updating
     * @param {string} playerId player to update
     */
    static async IncrementGoalsScoredAndTotalPoints(
        playerId: string,
        seasonId: string,
        teamId: string | null
    ) {
        try {
            await prisma.playerStats.updateMany({
                where: {
                    playerId: {
                        in: [playerId].map((player) => player),
                    },
                    seasonId: seasonId,
                    teamId: null,
                },
                data: {
                    numberOfGoals: { increment: 1 },
                    totalPoints: { increment: 1 },
                },
            });
        } catch (exception) {
            console.log('Failed to increment players overall goals scored');
        }
        if (teamId) {
            try {
                await prisma.playerStats.updateMany({
                    where: {
                        playerId: {
                            in: [playerId].map((player) => player),
                        },
                        seasonId: seasonId,
                        teamId: teamId,
                    },
                    data: {
                        numberOfGoals: { increment: 1 },
                        totalPoints: { increment: 1 },
                    },
                });
            } catch (exception) {
                console.log('Failed to increment players overall goals scored');
            }
        }
    }

    /**
     * Updates playerStats record to increment their assists and total points.
     *
     * @param {string} seasonId Id for the season you want to increment assists for
     * @param {string | null} teamId Id for the team you want to increment assists for. Leave null if no team need updating
     * @param {string[]} playerId players to update
     */
    static async IncrementAssistsAndTotalPoints(
        playerIds: string[],
        seasonId: string,
        teamId: string | null
    ) {
        try {
            await prisma.playerStats.updateMany({
                where: {
                    playerId: {
                        in: playerIds,
                    },
                    seasonId: seasonId,
                    teamId: null,
                },
                data: {
                    numberOfAssists: { increment: 1 },
                    totalPoints: { increment: 1 },
                },
            });
        } catch (exception) {
            console.log('Failed to increment players overall assists');
        }
        if (teamId) {
            try {
                await prisma.playerStats.updateMany({
                    where: {
                        playerId: {
                            in: playerIds,
                        },
                        seasonId: seasonId,
                        teamId: teamId,
                    },
                    data: {
                        numberOfAssists: { increment: 1 },
                        totalPoints: { increment: 1 },
                    },
                });
            } catch (exception) {
                console.log('Failed to increment players overall assists');
            }
        }
    }

    /**
     * Updates playerStats record to increment their goals scored and total points.
     *
     * @param {string} seasonId Id for the season you want to increment goals scored for
     * @param {string | null} teamId Id for the team you want to increment goals scored for. Leave null if no team need updating
     * @param {string} playerId player to update
     */
    static async IncrementPenalties(
        playerId: string,
        seasonId: string,
        teamId: string | undefined,
        penaltyDuration: number
    ) {
        try {
            await prisma.playerStats.updateMany({
                where: {
                    playerId: {
                        in: [playerId].map((player) => player),
                    },
                    seasonId: seasonId,
                    teamId: null,
                },
                data: {
                    totalPenaltyDuration: { increment: penaltyDuration },
                },
            });
        } catch (exception) {
            console.log('Failed to increment players overall penalties');
        }
        if (teamId) {
            try {
                await prisma.playerStats.updateMany({
                    where: {
                        playerId: {
                            in: [playerId].map((player) => player),
                        },
                        seasonId: seasonId,
                        teamId: teamId,
                    },
                    data: {
                        totalPenaltyDuration: { increment: penaltyDuration },
                    },
                });
            } catch (exception) {
                console.log('Failed to increment players overall goals scored');
            }
        }
    }
}
