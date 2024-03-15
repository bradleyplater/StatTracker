'use server';

import { generateRandom6DigitNumber } from '@/Helpers/numberHelpers';
import PlayerService from '@/services/playerService';
import { Player, playerValidation } from '@/types/playerTypes';
import { redirect } from 'next/navigation';
import prisma from '../../prisma/prisma';
import { Session, getSession, updateSession } from '@auth0/nextjs-auth0';

export async function createPlayerInDb(prevState: any, formData: FormData) {
    const session = (await getSession()) as Session;

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

    await PlayerService.CreateNewPlayer(playerData, session.user.sub);

    await updateSession({
        ...session,
        user: { ...session?.user, playerId: playerData?.id },
    });

    redirect('/Profile');
}
