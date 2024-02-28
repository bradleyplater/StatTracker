import {
    GetLoginState,
    Session,
    handleAuth,
    handleCallback,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import PlayerService from '@/services/playerService';

//UPDATE SESSION WHEN PLAYER IS CREATED

const afterCallback = async (req: any, session: any, state: any) => {
    console.log('I am getting called after callback', session);
    if (session.user) {
        const player = await PlayerService.GetPlayerByAuthId(session.user.sub);

        if (!player) {
            state.returnTo = 'http://localhost:3000/CreatePlayer';
        }
        session.user.playerId = player?.id;
        return session;
    } else {
        console.log('user not found', session);
    }

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
