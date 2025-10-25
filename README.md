# AI Reel Generator

A lightweight TypeScript Node.js backend for generating short AI-powered reels. This repository uses Express, Prisma (Postgres or another supported provider), and TypeScript.

## What this is

- Simple Express + TypeScript API scaffold.
- Prisma ORM for database modelling and client generation.
- Development tooling with `ts-node-dev`, formatting with Prettier.

## Prerequisites

- Node.js (recommended v18 or newer)
- npm (or yarn/pnpm)
- A database supported by Prisma (Postgres, SQLite, MySQL, etc.) and a connection URL

## Quickstart

1. Install dependencies

```powershell
npm install
```

2. Create a `.env` file at the project root and add at minimum:

```text
DATABASE_URL="your_database_connection_string"
# Optionally set PORT or other env vars used in src
```

3. Generate Prisma client

```powershell
npx prisma generate
```

4. Push schema / run migrations

If you are using migrations and want to create a migration and apply it:

```powershell
npx prisma migrate dev --name init
```

If you prefer to push the current schema to the database without migrations (useful for quick dev):

```powershell
npx prisma db push
```

5. Start the app in development

```powershell
npm run dev
```

## Available npm scripts

- `npm run dev` — run the app with `ts-node-dev` (fast reload during development)
- `npm run build` — compile TypeScript to `dist` using `tsc`
- `npm run start` — run the compiled `dist/index.js`
- `npm run format` — run Prettier to format code

## Project layout (important files)

- `src/index.ts` — application entry (starts server)
- `src/app.ts` — Express app setup (routes, middleware)
- `prisma/schema.prisma` — Prisma schema and models
- `src/prisma/client.ts` — Prisma client wrapper (auto-generated/handwritten depending on setup)
- `src/` — main source for controllers, services, repository, router, etc.
