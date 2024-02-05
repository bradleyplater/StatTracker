import prisma from '../../prisma/prisma';
import { redirect } from 'next/navigation';
import { Goal, PostGoal } from '@/types/goalTypes';
import { Game, Goals } from '@/types/gameTypes';

export default class GoalService {
    static async GetAllGoalsByGame(gameId: string) {
        const response = await prisma.goals.findMany({
            where: {
                gameId: gameId,
            },
            include: {
                assistedBy: true,
            },
        });

        const goals: Goals[] = [];

        response.forEach((goal) => {
            goals.push({
                id: goal.id,
                gameId: goal.gameId,
                scoredBy: goal.scoredByPlayerId,
                assistedBy: goal.assistedBy.map((assist) => assist.id),
            });
        });

        return goals;
    }

    static async CreateGoal(goal: PostGoal) {
        const assists: { id: string }[] = [];
        goal.assistedBy.map((assist) => assists.push({ id: assist }));
        let createdGoal: Goals = {
            id: 0,
            assistedBy: [''],
            scoredBy: '',
            gameId: '',
        };
        try {
            let response;
            if (assists[0].id !== '') {
                response = await prisma.goals.create({
                    data: {
                        game: {
                            connect: { id: goal.gameId },
                        },
                        scoredBy: {
                            connect: { id: goal.scoredBy },
                        },
                        assistedBy: {
                            connect: assists,
                        },
                    },
                    include: {
                        assistedBy: true,
                    },
                });
            } else {
                response = await prisma.goals.create({
                    data: {
                        game: {
                            connect: { id: goal.gameId },
                        },
                        scoredBy: {
                            connect: { id: goal.scoredBy },
                        },
                    },
                    include: {
                        assistedBy: true,
                    },
                });
            }

            createdGoal.id = response.id;
            createdGoal.gameId = response.gameId;
            createdGoal.scoredBy = response.scoredByPlayerId;
            createdGoal.assistedBy = response.assistedBy.map(
                (player) => player.id
            );
        } catch (error) {
            console.log('Creating new goal failed: ', error);
            redirect('/Error');
        }

        try {
            await prisma.players.update({
                where: {
                    id: goal.scoredBy,
                },
                data: {
                    numberOfGoals: { increment: 1 },
                    totalPoints: { increment: 1 },
                },
            });
        } catch (error) {
            console.log('Updating incrementing goal count for player: ', error);
            redirect('/Error');
        }

        try {
            await prisma.players.updateMany({
                where: {
                    id: {
                        in: goal.assistedBy,
                    },
                },
                data: {
                    numberOfAssists: { increment: 1 },
                    totalPoints: { increment: 1 },
                },
            });
        } catch (error) {
            console.log(
                'Updating incrementing assist count for player: ',
                error
            );
            redirect('/Error');
        }

        try {
            await prisma.playersInTeams.update({
                where: {
                    playerId_teamId: {
                        playerId: goal.scoredBy,
                        teamId: goal.teamId,
                    },
                },
                data: {
                    numberOfGoals: { increment: 1 },
                    totalPoints: { increment: 1 },
                },
            });
        } catch (error) {
            console.log(
                'Updating incrementing goal count for player in team: ',
                error
            );
            redirect('/Error');
        }

        try {
            await prisma.playersInTeams.updateMany({
                where: {
                    AND: [
                        { playerId: { in: goal.assistedBy } },
                        { teamId: goal.teamId },
                    ],
                },
                data: {
                    numberOfAssists: { increment: 1 },
                    totalPoints: { increment: 1 },
                },
            });
        } catch (error) {
            console.log(
                'Updating incrementing goal count for player in team: ',
                error
            );
            redirect('/Error');
        }

        let goalsScored: number;
        try {
            const response = await prisma.games.update({
                where: {
                    id: goal.gameId,
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

        return { updatedGoalsScored: goalsScored, latestGoal: createdGoal };
    }
}
