import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY)
	throw new Error('SUPABASE_URL or SUPABASE_ANON_KEY is not set');

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
