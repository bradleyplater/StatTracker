import prisma from '@/app/api/auth/[...nextauth]/options';
import { Team } from '@/types/teamTypes';
import { Prisma } from '@prisma/client';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';

export default class TeamService {
    constructor() {}

    static async GetAllTeams(): Promise<Team[]> {
        const response = await prisma.teams.findMany({
            include: { admins: true },
        });

        const teams = [] as Team[];

        response.forEach((team) => {
            teams.push({
                id: team.id,
                name: team?.name as string,
                admins: team?.admins.map((admin) => admin.id),
            });
        });

        return teams;
    }

    static async FindTeamById(id: string): Promise<Team | null> {
        const response = await prisma.teams.findFirst({
            where: {
                id: id,
            },
            include: {
                admins: true,
            },
        });

        if (response != null) {
            return {
                id: response.id,
                name: response?.name as string,
                admins: response?.admins.map((admin) => admin.id),
            } as Team;
        } else {
            return null;
        }
    }

    static async CreateTeam(
        team: Team,
        session: Session
    ): Promise<string | { error: string }> {
        try {
            const response = await prisma.teams.create({
                data: {
                    id: team.id,
                    name: team.name.toLowerCase(),
                    admins: {
                        connect: { id: session?.user.id as string },
                    },
                },
            });
            return response.id;
        } catch (error: any) {
            console.log('Creating new team failed: ', error);

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.meta && (error.meta['target'] as string) == 'name') {
                    return {
                        error: 'This name already exists! Please choose another one',
                    };
                }
            }
            redirect('/Error');
        }
    }
}
