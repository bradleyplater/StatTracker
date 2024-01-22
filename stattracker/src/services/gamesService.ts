import { Game } from '@/types/gameTypes';
import prisma from '../../prisma/prisma';

export default class GamesService {
    constructor() {}

    static async GetAllGamesForTeam(teamId: string): Promise<Game[]> {
        const response = await prisma.games.findMany({
            include: {
                goals: true,
                teamCreatedBy: true,
            },
            where: {
                teamCreatedById: teamId,
            },
        });

        const games = [] as Game[];

        response.forEach((game) => {
            games.push({
                id: game.id,
                goals: game.goals.map((goals) => {
                    return {
                        id: goals.id,
                        gameId: goals.gameId,
                        scoredBy: goals.scoredByPlayerId,
                        assistedBy: [],
                    };
                }),
                teamCreatedBy: {
                    id: game.teamCreatedById,
                    name: game.teamCreatedBy.name,
                    admins: [],
                    players: [],
                },
                opponentTeam: game.opponentTeam,
                isHome: game.isHome,
                goalsConceeded: game.goalsConceeded,
                goalsScored: game.goalsScored,
            });
        });

        return games;
    }
}
