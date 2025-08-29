import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	const dogs: table.Dog[] = await db.select().from(table.dog).limit(9);
	if (!dogs) {
		return error(404, { message: 'Error fetching dogs' });
	}
	return json(dogs);
}
