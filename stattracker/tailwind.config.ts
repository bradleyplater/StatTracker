import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                cyan: {
                    50: '#e5fffe',
                    100: '#b3fffb',
                    200: '#80fff9',
                    300: '#4dfff7',
                    400: '#1afff4',
                    500: '#00e6db',
                    600: '#00b3aa',
                    700: '#00807a',
                    800: '#004d49',
                    900: '#001a18',
                },
            },
        },
    },
    plugins: [],
};
export default config;
