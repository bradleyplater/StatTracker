'use server';
import PenaltyService from '@/services/penaltyService';
import { Penalty } from '@/types/penaltyTypes';
import { redirect } from 'next/navigation';

export async function addPenaltyAction(prevState: any, formData: FormData) {
    const minute = parseInt(formData.get('minute') as string);
    const seconds = parseInt(formData.get('seconds') as string);

    const penlatyTimeInSeconds = seconds + minute * 60;

    const penaltyData = {
        gameId: formData.get('gameId') as string,
        teamId: formData.get('teamId') as string,
        offender: formData.get('offender') as string,
        type: formData.get('typeOfPenalty') as string,
        penaltyTimeInSeconds: penlatyTimeInSeconds,
        duration: parseInt(formData.get('penaltyDuration') as string),
    } as Penalty;

    //ADD VALIDATION

    //const validatedFields = postGameValidation.safeParse(gameData);

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
        const response = await PenaltyService.CreatePenalty(penaltyData);

        return {
            success: true,
            game: {
                latestPenalty: response.latestPenalty,
            },
        };
    } catch (error) {
        console.log('Creating new penalty failed: ', error);
        redirect('/Error');
    }
}
