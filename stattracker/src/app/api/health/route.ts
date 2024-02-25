import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

type ResponseData = {
    message: string;
};

function handler(req: NextRequest, res: NextApiResponse<ResponseData>) {
    return new Response('Healthy', {
        status: 200,
    });
}

export { handler as GET };
