import { db } from '$lib/server/db/index';
import * as table from '$lib/server/db/schema';
import { json, error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET({ params }) {
	const users = await db
		.select()
		.from(table.profile)
		.where(eq(table.profile.id, params.id))
		.limit(1);
	if (users.length === 0) {
		return error(404, { message: 'User not found' });
	}
	return json(users[0]);
}
