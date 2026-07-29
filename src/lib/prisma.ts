import dotenv from 'dotenv';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Local development should use the Vercel environment pulled into .env.local,
// even if the shell happens to have an unrelated DATABASE_URL exported.
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.local', override: true, quiet: true });
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not configured. Pull the Vercel environment with `npx vercel env pull .env.local`.');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
