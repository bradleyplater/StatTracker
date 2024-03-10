import {
    GetLoginState,
    Session,
    handleAuth,
    handleCallback,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import PlayerService from '@/services/playerService';

const afterCallback = async (req: any, session: any, state: any) => {
    if (session.user) {
        const player = await PlayerService.GetPlayerByAuthId(session.user.sub);

        if (!player) {
            state.returnTo = `${process.env.BASE_URL}/CreatePlayer`;
        }
        console.log('User found during callback: ', player);
        session.user.playerId = player?.id;
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
