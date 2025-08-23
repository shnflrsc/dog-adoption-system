import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { error, json } from '@sveltejs/kit';

export async function GET() {
	const dogs: table.Dog[] = await db.select().from(table.dog);
	if (dogs.length === 0) {
		return error(404, { message: 'No dogs found' });
	}
	return json(dogs);
}
