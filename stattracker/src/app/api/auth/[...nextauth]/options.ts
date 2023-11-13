import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username:',
                    type: 'text',
                    placeholder: 'username',
                },
                password: {
                    label: 'Password:',
                    type: 'text',
                    placeholder: 'password',
                },
            },
            async authorize(credentials) {
                // This will need setting up create ticket for it
                const user = { id: '42', name: 'John', password: 'nextauth' };

                if (
                    credentials?.username === user.name &&
                    credentials.password === user.password
                ) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
};
