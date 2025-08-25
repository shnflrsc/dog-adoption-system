import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const connectionString = env.DATABASE_URL;

const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
