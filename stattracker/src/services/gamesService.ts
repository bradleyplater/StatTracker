import { Game, PostGame } from '@/types/gameTypes';
import prisma from '../../prisma/prisma';
import { redirect } from 'next/navigation';
import { Player } from '@/types/playerTypes';
import { Penalties } from '@/enums/Penalties';
import PlayerService from './playerService';
import { getSession } from '@auth0/nextjs-auth0';
import { GameType } from '@/enums/GameType';

export default class GamesService {
    constructor() {}

    static async GetGameById(gameId: string): Promise<Game | null> {
        const response = await prisma.games.findUnique({
            include: {
                goals: true,
                teamCreatedBy: true,
                players: true,
                penalties: true,
            },
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
                    assistedBy: goals.assistedById,
                    timeScoredInSeconds: goals.time,
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
                    authId: player?.authId,
                    number: undefined,
                    firstName: player?.firstName,
                    surname: player?.surname,
                    shootingSide: player?.shooting_side,
                    stats: [],
                } as Player;
            }),
            penalties: response.penalties.map((penalty) => {
                return {
                    offender: penalty.playerId,
                    gameId: penalty.gameId,
                    duration: penalty.duration,
                    type: penalty.type as Penalties,
                    penaltyTimeInSeconds: penalty.time,
                    teamId: undefined,
                };
            }),
            opponentTeam: response?.opponentTeam,
            isHome: response?.isHome,
            goalsConceeded: response?.goalsConceeded,
            goalsScored: response?.goalsScored,
            date: response.date,
            type: response.type,
        };

        return game;
    }

    static async CreateGame(game: PostGame) {
        const session = await getSession();
        if (!session) {
            console.log('CreateGame: No session found');
            redirect('/Error');
        }

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
                    date: game.date,
                    type: game.type,
                },
            });
        } catch (error) {
            console.log('Creating new team failed: ', error);
            redirect('/Error');
        }

        await PlayerService.IncrementGamesPlayed(
            session.user.season.id,
            game.teamCreatedBy,
            game.players
        );
    }

    static async GetAllGamesForTeam(teamId: string): Promise<Game[]> {
        const response = await prisma.games.findMany({
            include: {
                goals: true,
                teamCreatedBy: true,
                players: true,
                penalties: true,
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
                        timeScoredInSeconds: goals.time,
                    };
                }),
                teamCreatedBy: {
                    id: game.teamCreatedById,
                    name: game.teamCreatedBy.name,
                    admins: [],
                    players: [],
                },
                players: [],
                penalties: game.penalties.map((penalty) => {
                    return {
                        offender: penalty.playerId,
                        gameId: penalty.gameId,
                        duration: penalty.duration,
                        type: penalty.type as Penalties,
                        penaltyTimeInSeconds: penalty.time,
                        teamId: undefined,
                    };
                }),
                opponentTeam: game.opponentTeam,
                isHome: game.isHome,
                goalsConceeded: game.goalsConceeded,
                goalsScored: game.goalsScored,
                date: game.date,
                type: game.type,
            });
        });

        return games;
    }

    /**
     * Updates goals scored by the team that created the game
     *
     * @param {string} gameId Id for the game you want to increment assists for
     */
    static async UpdateGamesGoalsScored(gameId: string) {
        let goalsScored: number;
        try {
            const response = await prisma.games.update({
                where: {
                    id: gameId,
                },
                data: {
                    goalsScored: { increment: 1 },
                },
            });
            goalsScored = response.goalsScored;
        } catch (error) {
            console.log(
                'Updating incrementing goal count for player in team: ',
                error
            );
            redirect('/Error');
        }

        return goalsScored;
    }

    /**
     * Updates goals scored by the opponent team
     *
     * @param {string} gameId Id for the game you want to increment assists for
     * @param {number} numberOfGoals Number of goals the opponent scored
     * @returns number of goals scored.
     */
    static async UpdateGamesGoalsScoredByOpponent(
        gameId: string,
        numberOfGoals: number
    ) {
        let goalsConceeded: number;
        try {
            const response = await prisma.games.update({
                where: {
                    id: gameId,
                },
                data: {
                    goalsConceeded: numberOfGoals,
                },
            });
            goalsConceeded = response.goalsConceeded;
        } catch (error) {
            console.log('Error: updating goals conceded for game ', error);
            redirect('/Error');
        }

        return goalsConceeded;
    }
}
