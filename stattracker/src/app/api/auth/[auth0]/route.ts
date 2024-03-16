import {
    GetLoginState,
    Session,
    handleAuth,
    handleCallback,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import PlayerService from '@/services/playerService';
import SeasonService from '@/services/seasonService';
import { Season } from '@/types/seasonTypes';

const afterCallback = async (req: any, session: any, state: any) => {
    if (session.user) {
        const player = await PlayerService.GetPlayerByAuthId(session.user.sub);

        if (!player) {
            state.returnTo = `${process.env.BASE_URL}/CreatePlayer`;
        }
        console.log('User found during callback: ', player);
        session.user.playerId = player?.id;
        session.user.season = await GetCurrentSeason(); // TODO: Add logic to check if player has stats object for this season, if not go create one.
        return session;
    } else {
        console.log('user not found');
    }

    console.log('Session returned after callback: ', session);
    return session;
};

export const GET = handleAuth({
    callback: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            return await handleCallback(req, res, {
                afterCallback,
            });
        } catch (error) {
            console.error(error);
        }
    },
});

async function GetCurrentSeason() {
    let seasons = await SeasonService.GetAllSeasons();
    const currentDate = new Date();

    seasons = seasons.filter((season) => {
        if (currentDate > season.startDate && currentDate < season.endDate) {
            return season;
        }
    });

    return {
        id: seasons[0].id,
        name: seasons[0].name,
        startDate: seasons[0].startDate,
        endDate: seasons[0].endDate,
    } as Season;
}
