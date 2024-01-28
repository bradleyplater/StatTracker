'use server';
import { generateRandom6DigitNumber } from '@/Helpers/numberHelpers';
import GamesService from '@/services/gamesService';
import GoalService from '@/services/goalService';
import { PostGoal } from '@/types/goalTypes';
import { redirect } from 'next/navigation';

export async function addGoalAction(prevState: any, formData: FormData) {
    const assistedBy: string[] = [];

    formData.forEach((value, name) => {
        if (name === 'assistedBy') assistedBy.push(value as string);
    });

    const goalData = {
        gameId: formData.get('gameId') as string,
        scoredBy: formData.get('scoredBy') as string,
        teamId: formData.get('teamId') as string,
        assistedBy: assistedBy,
    } as PostGoal;

    //const validatedFields = postGameValidation.safeParse(gameData); ADD VALIDATION

    // if (!validatedFields.success) {
    //     console.log(
    //         'Model State is not valid:',
    //         validatedFields.error.flatten().fieldErrors
    //     );

    //     return {
    //         errors: validatedFields.error.flatten().fieldErrors,
    //     };
    // }

    try {
        const response = await GoalService.CreateGoal(goalData);

        return {
            success: true,
            game: { goalsScored: response.updatedGoalsScored },
        };
    } catch (error) {
        console.log('Creating new player failed: ', error);
        redirect('/Error');
    }
}
