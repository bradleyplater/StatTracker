/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    // NEXT HAS INCONSISTENT URLS. CONSIDER CREATING MIDDLEWARE TO FIX THIS
    rewrites: async () => {
        return [
            {
                source: '/Profile',
                destination: '/profile',
            },
        ];
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['stattracker.co.uk'],
        },
    },
};

module.exports = nextConfig;
