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

    static async CreateNewPlayer(playerData: Player, authId: string) {
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
                    authId: authId,
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
    }
}
