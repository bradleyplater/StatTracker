/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    basePath: process.env.BASE_URL,
    experimental: {
        serverActions: {
            allowedOrigins: ['stattracker.co.uk'],
        },
    },
};

module.exports = nextConfig;
