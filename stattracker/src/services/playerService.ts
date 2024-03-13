import { PlayerStats } from '@prisma/client';
import prisma from '../../prisma/prisma';
import { Player } from '@/types/playerTypes';

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
                    playerId: stat.playerId,
                    seasonId: stat.seasonId,
                    seasonName: stat.season.name,
                    goals: stat.numberOfGoals,
                    assists: stat.numberOfAssists,
                    gamesPlayed: stat.gamesPlayed,
                    pims: stat.pims,
                    totalPoints: stat.totalPoints,
                    totalPenaltyDuration: stat.totalPenaltyDuration,
                };
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
}
