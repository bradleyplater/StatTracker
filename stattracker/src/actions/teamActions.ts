'use server';

import { generateRandom6DigitNumber } from '@/Helpers/numberHelpers';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import TeamService from '@/services/teamService';
import { Team, addPlayerValidation, teamValidation } from '@/types/teamTypes';
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

export async function addPlayerToTeamAction(
    prevState: any,
    formData: FormData
) {
    const teamAndPlayer = {
        teamId: formData.get('teamId') as string,
        playerId: formData.get('playerId') as string,
        playerNumber: parseInt(formData.get('playerNumber') as string),
    };

    const validatedFields = addPlayerValidation.safeParse(teamAndPlayer);

    if (!validatedFields.success) {
        console.log(
            'Model State is not valid:',
            validatedFields.error.flatten().fieldErrors
        );

        redirect('/Error');
    }

    await TeamService.AddPlayer(
        teamAndPlayer.teamId,
        teamAndPlayer.playerId,
        teamAndPlayer.playerNumber
    );

    redirect(`/Teams/${teamAndPlayer.teamId}`);
}
