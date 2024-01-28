'use server';
import { generateRandom6DigitNumber } from '@/Helpers/numberHelpers';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import GamesService from '@/services/gamesService';
import { Game, PostGame, postGameValidation } from '@/types/gameTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function addGameAction(prevState: any, formData: FormData) {
    const gameData = {
        id: undefined,
        teamCreatedBy: formData.get('teamCreatedBy') as string,
        opponentTeam: formData.get('opponentTeam') as string,
        isHome: (formData.get('location') as string).toLowerCase() === 'home',
    } as PostGame;

    const validatedFields = postGameValidation.safeParse(gameData);

    if (!validatedFields.success) {
        console.log(
            'Model State is not valid:',
            validatedFields.error.flatten().fieldErrors
        );

        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    let idIsInDB = true;
    let iteration = 0;
    let id = 'GME' + generateRandom6DigitNumber();

    while (idIsInDB && iteration <= 5) {
        const player = await GamesService.GetGameById(id);

        if (player != null) {
            console.log(`iteration ${iteration}: id already in use ${id}`);
            idIsInDB = true;
            iteration++;
        } else {
            idIsInDB = false;
            gameData.id = id;
        }
    }

    try {
        await GamesService.CreateGame(gameData);
    } catch (error) {
        console.log('Creating new player failed: ', error);
        redirect('/Error');
    }

    redirect(`/Games/${gameData.id}`);
}
