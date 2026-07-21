# Mānoa Club Compass

## Product intent

Mānoa Club Compass is a simple directory for UH Mānoa student organizations.
Students should be able to discover clubs by interest and view useful club
details. Club leaders should be able to maintain their own public profile, and
super admins should be able to manage categories, clubs, and access.

Keep the experience clear, friendly, mobile-responsive, and deliberately
small. This is an ICS 314 final project, not a production campus system.

## Current M1 scope

M1 is a deployed, navigable front-end skeleton. Do not turn placeholders into
data-backed workflows unless the assigned issue calls for it.

Current routes:

- `/`: landing page and sign-in entry point.
- `/clubs`: browse/search/filter UI skeleton.
- `/club-details`: public club profile skeleton.
- `/club-admin`: club-leader edit-profile skeleton.
- `/admin-dashboard`: super-admin review/manage skeleton.

The placeholder club names and content are presentation-only. Replace them
with validated data only as part of the appropriate issue.

## Technical conventions

- Next.js App Router with TypeScript and React.
- Use React-Bootstrap and Bootstrap utilities for ordinary layout and forms.
  Keep visuals simple, readable, and consistent; do not add a new design
  system or component library without team agreement.
- React-Bootstrap pages/components must start with `'use client';` under this
  Next.js setup. The shared shell components already do.
- Reuse `src/components/PageHeading.tsx` for top-level screen headings.
- Keep route code in `src/app/<route>/page.tsx`; keep reusable UI in
  `src/components/`.
- Preserve the existing template auth and Prisma code unless an issue requires
  changing it. Remove the template's `Stuff` feature only through a deliberate,
  team-approved migration rather than incidental cleanup.

## Database and environment

- The linked Vercel project is `manoa-club-compass-nextjs`.
- Its Vercel Postgres store is `prisma-postgres-byzantium-cushion`.
- Prisma uses `DATABASE_URL` in `src/lib/prisma.ts` through the Prisma Pg
  adapter. Do not hard-code a connection string or switch to another database.
- For local work, run:

  ```bash
  npx vercel env pull .env.local --environment=development
  ```

- `.env.local` is ignored and must never be committed. `.env.example` is the
  tracked variable-name reference only.
- Any database schema/model change needs a Prisma migration and an assigned
  issue. Do not run destructive database commands against the shared Vercel
  database.

## Workflow

- One GitHub issue per coherent task. Use branches named `issue-XX`.
- Keep pull requests narrow and describe the user-visible change, test result,
  and any database/configuration impact.
- Run the relevant checks before requesting review. For front-end work this is
  normally `npm run lint`, `npm run build`, and a quick route check with
  `npm run dev`.
- Do not commit generated output, `.next/`, `node_modules/`, Vercel secrets, or
  `.env.local`.
- Do not overwrite teammates' in-progress work. Check the working tree and
  existing issues before broad refactors.

## Course and AI requirements

- Follow the ICS 314 AI policy. AI is allowed, but help must be understood,
  reviewed, and disclosed.
- Record AI assistance in the project effort/estimation log when applicable:
  provider/model, prompt count, prompt time, generation time,
  verification/debugging time, integration/refactor time, and brief notes.
- Keep effort estimates and actual effort current in the GitHub Project fields.

## Guardrails

- Do not add payments, campus SSO, scraping, email automation, or external API
  integrations unless the team explicitly decides they are in scope.
- Do not expose real student contact data in seed data, screenshots, or commits.
- Prefer a complete, boring Club Hub workflow over extra features.
