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

        const player = {
            id: response?.id,
            firstName: response?.firstName,
            surname: response?.surname,
            shootingSide: response?.shooting_side,
            userId: response?.userid,
        } as Player;

        return player;
    }
}
