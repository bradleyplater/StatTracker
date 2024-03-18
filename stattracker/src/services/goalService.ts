import prisma from '../../prisma/prisma';
import { redirect } from 'next/navigation';
import { Goal, PostGoal } from '@/types/goalTypes';
import { Game, Goals } from '@/types/gameTypes';
import PlayerService from './playerService';
import { getSession } from '@auth0/nextjs-auth0';
import GamesService from './gamesService';

export default class GoalService {
    static async CreateGoal(goal: PostGoal) {
        const session = await getSession();
        if (!session) {
            console.log('CreateGame: No session found');
            redirect('/Error');
        }

        const assists: { id: string }[] = [];
        goal.assistedBy.map((assist) => assists.push({ id: assist }));
        let createdGoal: Goals = {
            id: '',
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
                        scoredByPlayerId: goal.scoredBy,
                        assistedById: goal.assistedBy,
                    },
                });
            } else {
                response = await prisma.goals.create({
                    data: {
                        game: {
                            connect: { id: goal.gameId },
                        },
                        scoredByPlayerId: goal.scoredBy,
                    },
                });
            }

            createdGoal.id = response.id;
            createdGoal.gameId = response.gameId;
            createdGoal.scoredBy = response.scoredByPlayerId;
            createdGoal.assistedBy = response.assistedById;
        } catch (error) {
            console.log('Creating new goal failed: ', error);
            redirect('/Error');
        }

        await PlayerService.IncrementGoalsScoredAndTotalPoints(
            createdGoal.scoredBy,
            session.user.season.id,
            goal.teamId
        );

        await PlayerService.IncrementAssistsAndTotalPoints(
            createdGoal.assistedBy,
            session.user.season.id,
            goal.teamId
        );

        const goalsScored = await GamesService.UpdateGamesGoalsScored(
            goal.gameId
        );

        return { updatedGoalsScored: goalsScored, latestGoal: createdGoal };
    }
}
