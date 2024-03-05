This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Setting up DB

# Prisma

https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/evolve-your-schema-typescript-postgresql

When making a change to the schema run -
npx run db push

# Schemas

Authentication schemas can be found here - https://authjs.dev/reference/adapter/pg

# Database

Database Owner must be the Apps User use this command to change it -

ALTER DATABASE "DATABASE_NAME" OWNER TO "APP_USER_NAME";

# Other set up

Make sure to allow permssions on each table created within pgadmin, this needs to be against the application account.
User needs permissions to Write and Read data from tables use this command. Quotes are Important!!!!
GRANT SELECT, UPDATE, DELETE ON TABLE public.TABLE_NAME TO "StatTrackerApp" WITH GRANT OPTION;

GRANT pg_write_all_data TO "StatTrackerApp";
GRANT pg_read_all_data TO "StatTrackerApp";

# Deployment notes

When adding environment variables / secrets to task definition. Make sure to give the task executioner role the new permission to access the secret
