import { db } from '$lib/server/db/index';
import * as table from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const dogs: table.Dog[] = await db
		.select()
		.from(table.dog)
		.where(eq(table.dog.id, params.id))
		.limit(1);
	if (dogs.length === 0) {
		return error(404, { message: 'Dog not found' });
	}
	return json(dogs[0]);
}
