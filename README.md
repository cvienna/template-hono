A minimal Hono + Drizzle + Better Auth template for Node.js.

## Stack

- [Hono](https://hono.dev) — Web framework
- [Drizzle](https://orm.drizzle.team) — ORM
- [Better Auth](https://better-auth.com) — Authentication
- [better-sqlite3](https://www.sqlite.org) — database

## Structure

```
src/
├── features/         # feature modules (routes, schemas)
├── lib/              # shared config (auth, db)
└── index.ts          # entry point
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Set up environment variables:

```bash
PORT=8787
ORIGIN=http://localhost:8787
BETTER_AUTH_SECRET=your-secret
```

Run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

Start the dev server:

```bash
pnpm dev
```

## Scripts

| Script | Description |
|---|---|
| `db:generate` | Generate migration files |
| `db:migrate` | Apply migrations |
| `auth:generate` | (Optional) Regenerate auth schema after adding better-auth plugins — move output to `src/features/auth/auth.schema.ts` |