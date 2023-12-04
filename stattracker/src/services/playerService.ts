import prisma from '@/app/api/auth/[...nextauth]/options';

export default class PlayerService {
    constructor() {}

    static async GetPlayer(userId: string) {
        return await prisma.players.findFirst({
            include: {
                user: {
                    where: {
                        id: userId,
                    },
                },
            },
        });
    }
}
