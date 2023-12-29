'use server';

import prisma, { authOptions } from '@/app/api/auth/[...nextauth]/options';
import TeamService from '@/services/teamService';
import { Team, teamValidation } from '@/types/teamTypes';
import { Session, getServerSession } from 'next-auth';
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
        const team = await TeamService.FindTeamById(id);

        if (team != null) {
            console.log(`iteration ${iteration}: id already in use ${id}`);
            idIsInDB = true;
            iteration++;
        } else {
            idIsInDB = false;
            teamData.id = id;
        }
    }

    if (idIsInDB) {
        redirect('/Error');
    }

    const response = await TeamService.CreateTeam(teamData, session as Session);

    if (typeof response != 'string') {
        return {
            errors: {
                name: [response.error],
            },
        };
    }

    redirect('/Team');
}

function generateRandom6DigitNumber() {
    const randomNumber = Math.floor(Math.random() * 1000000);

    // Format the number to have leading zeros and ensure it's 6 digits long
    const formattedNumber = String(randomNumber).padStart(6, '0');

    return formattedNumber;
}
