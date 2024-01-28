import { Game, PostGame } from '@/types/gameTypes';
import prisma from '../../prisma/prisma';
import { redirect } from 'next/navigation';

export default class GamesService {
    constructor() {}

    static async GetGameById(gameId: string): Promise<Game | null> {
        const response = await prisma.games.findUnique({
            include: { goals: true, teamCreatedBy: true },
            where: {
                id: gameId,
            },
        });

        if (response == null) {
            return null;
        }

        const game: Game = {
            id: response?.id,
            goals: response?.goals.map((goals) => {
                return {
                    id: goals.id,
                    gameId: goals.gameId,
                    scoredBy: goals.scoredByPlayerId,
                    assistedBy: [],
                };
            }),
            teamCreatedBy: {
                id: response?.teamCreatedById,
                name: response?.teamCreatedBy.name,
                admins: [],
                players: [],
            },
            opponentTeam: response?.opponentTeam,
            isHome: response?.isHome,
            goalsConceeded: response?.goalsConceeded,
            goalsScored: response?.goalsScored,
        };

        return game;
    }

    static async CreateGame(game: PostGame) {
        try {
            await prisma.games.create({
                data: {
                    id: game.id as string,
                    teamCreatedById: game.teamCreatedBy,
                    opponentTeam: game.opponentTeam,
                    isHome: game.isHome,
                    goalsConceeded: 0,
                    goalsScored: 0,
                },
            });
        } catch (error) {
            console.log('Creating new team failed: ', error);
            redirect('/Error');
        }
    }

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

    static async UpdateYourTeamGoals() {}
}
