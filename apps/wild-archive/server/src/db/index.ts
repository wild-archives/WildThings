import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as users from './schema/user.ts';
import * as archives from './schema/archive.ts';
import * as files from './schema/file.ts';
import * as commons from './schema/common.ts';
import * as auths from './schema/auth.ts';

// Create a PostgreSQL connection pool
export const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({
  client: pgPool,
  schema: { users, archives, files, commons, auths },
});
