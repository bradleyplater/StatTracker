'use server';

import prisma from '../../prisma/prisma';

import { generateRandom6DigitNumber } from '@/Helpers/numberHelpers';
import PlayerService from '@/services/playerService';
import TeamService from '@/services/teamService';
import { Player, playerValidation } from '@/types/playerTypes';
import { Team, addPlayerValidation, teamValidation } from '@/types/teamTypes';
import { Session, getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export async function createTeamInDb(prevState: any, formData: FormData) {
    const session = await getSession();

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

    redirect(`Teams/${teamData.id}`);
}

export async function addPlayerToTeamAction(
    prevState: any,
    formData: FormData
) {
    const session = (await getSession()) as Session;

    const teamAndPlayer = {
        teamId: formData.get('teamId') as string,
        playerId: formData.get('playerId') as string,
        playerNumber: parseInt(formData.get('playerNumber') as string),
    };

    if (teamAndPlayer.playerId == '') {
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
            const newPlayerId = await PlayerService.CreateNewPlayer({
                id: playerData.id,
                authId: `DEFAULT-NO-AUTH-${crypto.randomUUID()}`, // This is so that the db has a unique authId even though the player isn't connected to a user
                firstName: playerData.firstName,
                surname: playerData.surname,
                shootingSide: parseInt(playerData.shootingSide.toString()),
                stats: [],
                number: undefined,
            });

            teamAndPlayer.playerId = newPlayerId;
        } catch (error) {
            console.log('Creating new player failed: ', error);
            redirect('/Error');
        }
    }

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
