'use server';

import { generateRandom6DigitNumber } from '@/Helpers/numberHelpers';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import PlayerService from '@/services/playerService';
import { Player, playerValidation } from '@/types/playerTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '../../prisma/prisma';

export async function createPlayerInDb(prevState: any, formData: FormData) {
    const session = await getServerSession(authOptions);

    const playerData = {
        firstName: formData.get('firstname') as string,
        surname: formData.get('surname') as string,
        shootingSide: parseInt(formData.get('shootingSide') as string),
    } as Player;

    const validatedFields = playerValidation.safeParse(playerData);

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
    let id = 'PLR' + generateRandom6DigitNumber();

    while (idIsInDB && iteration <= 5) {
        const player = await PlayerService.GetPlayerByUserId(id);

        if (player != null) {
            console.log(`iteration ${iteration}: id already in use ${id}`);
            idIsInDB = true;
            iteration++;
        } else {
            idIsInDB = false;
            playerData.id = id;
        }
    }

    try {
        await prisma.players.create({
            data: {
                id: playerData.id,
                firstName: playerData.firstName,
                surname: playerData.surname,
                shooting_side: parseInt(playerData.shootingSide.toString()),
                userid: session?.user.id,
                numberOfGoals: 0,
                numberOfAssists: 0,
                gamesPlayed: 0,
                pims: 0,
            },
        });
    } catch (error) {
        console.log('Creating new player failed: ', error);
        redirect('/Error');
    }

    redirect('/Profile');
}
