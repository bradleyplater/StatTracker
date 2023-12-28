'use server';

import prisma, { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { Player, playerValidation } from '@/types/playerTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

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

    try {
        await prisma.players.create({
            data: {
                firstName: playerData.firstName,
                surname: playerData.surname,
                shooting_side: parseInt(playerData.shootingSide.toString()),
                userid: session?.user.id,
                goals: 0,
                assists: 0,
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
