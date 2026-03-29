A minimal Hono + Drizzle + Better Auth template for Node.js.

## Stack

- [Hono](https://hono.dev) — Web framework
- [Drizzle](https://orm.drizzle.team) — ORM
- [Better Auth](https://better-auth.com) — Authentication
- [PostgreSQL](https://www.postgres.com) — database
- [Zod](https://www.zod.com) — validation

## Structure

```
src/
├── lib/              # shared config (auth, db)
├── repository/       # database helper functions
├── routes/           # api routes
├── schemas/          # database schemas
├── env.ts            # environment variables utils
├── errors.ts         # extended error class
├── middleware.ts     # middleware functions
├── response.ts       # api response functions
└── index.ts          # entry point
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Set up environment variables:

```bash
PORT="4060"

BETTER_AUTH_URL="http://localhost:4060"
BETTER_AUTH_SECRET="4tvpl1DwpgkuhGnchqwHLkKGi0ceAt2F"

DATABASE_HOST="localhost"
DATABASE_PORT="5432"
DATABASE_USER="postgres"
DATABASE_PASSWORD="postgres"
DATABASE_NAME="template-hono_dev"
```

Start the db:

```bash
pnpm db:start
```

Start the dev server:

```bash
pnpm dev
```

## Scripts

| Script          | Description                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| `dev`           | Start the dev server                                                                                      |
| `auth:generate` | (Optional) Regenerate auth schema after adding better-auth plugins — move output to `src/schemas/auth.ts` |
| `db:start`      | Start the local postgres server via docker                                                                |
| `db:stop`       | Stop the local postgres server via docker                                                                 |
| `db:generate`   | Generate migration files                                                                                  |
| `db:migrate`    | Apply migrations                                                                                          |
| `format`        | Prettier code formatting                                                                                  |
| `tree`          | Project tree (folder structure)                                                                           |
