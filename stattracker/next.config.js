/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['stattracker.co.uk'],
        },
    },
};

module.exports = nextConfig;
