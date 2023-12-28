import prisma from '@/app/api/auth/[...nextauth]/options';
import { Player } from '@/types/playerTypes';

export default class PlayerService {
    constructor() {}

    static async GetPlayerByUserId(userId: string) {
        const response = await prisma.players.findFirst({
            where: {
                userid: userId,
            },
        });

        if (response == null) return null;

        const player = {
            id: response?.id,
            firstName: response?.firstName,
            surname: response?.surname,
            shootingSide: response?.shooting_side,
            goals: response?.goals,
            assists: response?.assists,
            gamesPlayed: response?.gamesPlayed,
            pims: response?.pims,
            userId: response?.userid,
        } as Player;

        return player;
    }
}
