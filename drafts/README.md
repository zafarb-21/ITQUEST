# Unfinished admin integration

These files preserve an incomplete authentication and database integration.
They use `.ts.txt` extensions because they are reference drafts, not executable
application configuration. The current website does not import them.

- `auth.ts.txt` requires NextAuth, `lib/admin-authorization`, admin routes, and
  session/token type extensions that are not present in this project.
- `prisma.config.ts.txt` requires Prisma, dotenv, a database schema, migrations,
  and a seed script that are not present in this project.

To resume this work, implement the missing pieces and install their dependencies
before restoring these files to their original names in the project root.
Run the production build and verify admin authorization before deployment.
