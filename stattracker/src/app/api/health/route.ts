import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string;
};

function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    return new Response('Healthy', {
        status: 200,
    });
}

export { handler as GET };
