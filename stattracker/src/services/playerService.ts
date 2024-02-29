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
            firstName: response?.firstName,
            surname: response?.surname,
            shootingSide: response?.shooting_side,
            goals: response?.numberOfGoals,
            assists: response?.numberOfAssists,
            gamesPlayed: response?.gamesPlayed,
            pims: response?.totalPenaltyDuration,
            userId: response?.userid,
            totalPoints: response?.totalPoints,
        } as Player;

        return player;
    }

    static async GetPlayerByAuthId(authId: string) {
        const response = await prisma.players.findFirst({
            where: {
                authId: authId,
            },
        });

        if (response == null) return null;

        const player = {
            id: response?.id,
            authId: response?.authId,
            firstName: response?.firstName,
            surname: response?.surname,
            shootingSide: response?.shooting_side,
            goals: response?.numberOfGoals,
            assists: response?.numberOfAssists,
            gamesPlayed: response?.gamesPlayed,
            pims: response?.totalPenaltyDuration,
            userId: response?.userid,
            totalPoints: response?.totalPoints,
        } as Player;

        return player;
    }

    static async GetAllPlayers() {
        const response = await prisma.players.findMany();

        const players = [] as Player[];

        response.forEach((player) => {
            players.push({
                id: player?.id,
                authId: player?.authId,
                firstName: player?.firstName,
                surname: player?.surname,
                shootingSide: player?.shooting_side,
                goals: player?.numberOfGoals,
                assists: player?.numberOfAssists,
                gamesPlayed: player?.gamesPlayed,
                pims: player?.totalPenaltyDuration,
                userId: player?.userid,
                totalPoints: player?.totalPoints,
            } as Player);
        });

        return players;
    }
}
