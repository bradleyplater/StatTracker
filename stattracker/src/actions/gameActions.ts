'use server';
import { generateRandom6DigitNumber } from '@/Helpers/numberHelpers';
import GamesService from '@/services/gamesService';
import { PostGame, postGameValidation } from '@/types/gameTypes';
import { redirect } from 'next/navigation';

export async function addGameAction(prevState: any, formData: FormData) {
    const playerIds: { id: string }[] = [];

    formData.forEach((value, name) => {
        if (name === 'players') playerIds.push({ id: value as string });
    });

    const gameData = {
        id: undefined,
        teamCreatedBy: formData.get('teamCreatedBy') as string,
        opponentTeam: formData.get('opponentTeam') as string,
        isHome: (formData.get('location') as string).toLowerCase() === 'home',
        date: new Date(formData.get('date') as string),
        type: formData.get('type') as string,
        players: playerIds,
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

export async function updateOpponentGoalsAction(
    prevState: any,
    formData: FormData
) {
    const gameData = {
        gameId: formData.get('gameId') as string,
        opponentGoals: parseInt(formData.get('numberOfGoals') as string),
    };

    try {
        await GamesService.UpdateGamesGoalsScoredByOpponent(
            gameData.gameId,
            gameData.opponentGoals
        );
        return gameData.opponentGoals;
    } catch (error) {
        console.log('Updating opponent goals failed: ', error);
        return prevState;
    }
}
