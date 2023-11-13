export { default } from 'next-auth/middleware';

// Can add routes below to make them require authentication for the app.
export const config = { matcher: ['/test'] };
