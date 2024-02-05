import { Game, PostGame } from '@/types/gameTypes';
import prisma from '../../prisma/prisma';
import { redirect } from 'next/navigation';
import { Player } from '@/types/playerTypes';

export default class GamesService {
    constructor() {}

    static async GetGameById(gameId: string): Promise<Game | null> {
        const response = await prisma.games.findUnique({
            include: { goals: true, teamCreatedBy: true, players: true },
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
            players: response.players.map((player) => {
                return {
                    id: player?.id,
                    firstName: player?.firstName,
                    surname: player?.surname,
                    shootingSide: player?.shooting_side,
                    goals: player?.numberOfGoals,
                    assists: player?.numberOfAssists,
                    gamesPlayed: player?.gamesPlayed,
                    pims: player?.pims,
                    userId: player?.userid,
                } as Player;
            }),
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
                    players: {
                        connect: game.players,
                    },
                    goalsConceeded: 0,
                    goalsScored: 0,
                },
            });
        } catch (error) {
            console.log('Creating new team failed: ', error);
            redirect('/Error');
        }

        try {
            await prisma.players.updateMany({
                where: {
                    id: {
                        in: game.players.map((player) => player.id),
                    },
                },
                data: {
                    gamesPlayed: { increment: 1 },
                },
            });
        } catch (error) {
            console.log('Incrementing players gamesPlayed failed: ', error);
            redirect('/Error');
        }

        try {
            await prisma.playersInTeams.updateMany({
                where: {
                    teamId: game.teamCreatedBy,
                    playerId: {
                        in: game.players.map((player) => player.id),
                    },
                },
                data: {
                    gamesPlayed: { increment: 1 },
                },
            });
        } catch (error) {
            console.log(
                'Incrementing playersInTeams gamesPlayed failed: ',
                error
            );
            redirect('/Error');
        }
    }

    static async GetAllGamesForTeam(teamId: string): Promise<Game[]> {
        const response = await prisma.games.findMany({
            include: {
                goals: true,
                teamCreatedBy: true,
                players: true,
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
                players: game.players.map((player) => {
                    return {
                        id: player?.id,
                        firstName: player?.firstName,
                        surname: player?.surname,
                        shootingSide: player?.shooting_side,
                        goals: player?.numberOfGoals,
                        assists: player?.numberOfAssists,
                        gamesPlayed: player?.gamesPlayed,
                        pims: player?.pims,
                        userId: player?.userid,
                    } as Player;
                }),
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
