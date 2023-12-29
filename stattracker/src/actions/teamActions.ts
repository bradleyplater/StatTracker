'use server';

import prisma, { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { Team, teamValidation } from '@/types/teamTypes';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function createTeamInDb(prevState: any, formData: FormData) {
    const session = await getServerSession(authOptions);

    const teamData = {
        name: formData.get('teamName') as string,
    } as Team;

    const validatedFields = teamValidation.safeParse(teamData);

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
    let id = 'TM' + generateRandom6DigitNumber();

    while (idIsInDB && iteration <= 5) {
        const team = await prisma.teams.findFirst({
            where: {
                id: id,
            },
        });

        if (team != null) {
            console.log(`iteration ${iteration}: id already in use ${id}`);
            idIsInDB = true;
            iteration++;
        } else {
            idIsInDB = false;
        }
    }

    try {
        await prisma.teams.create({
            data: {
                id: id,
                name: teamData.name,
                admins: {
                    connect: { id: session?.user.id as string },
                },
            },
        });
    } catch (error: any) {
        console.log('Creating new team failed: ', error);

        redirect('/Error');
    }
    redirect('/Team');
}

function generateRandom6DigitNumber() {
    const randomNumber = Math.floor(Math.random() * 1000000);

    // Format the number to have leading zeros and ensure it's 6 digits long
    const formattedNumber = String(randomNumber).padStart(6, '0');

    return formattedNumber;
}
