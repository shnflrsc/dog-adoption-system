import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const dogPublicId = params.publicId;
	const dog = await db.select().from(table.dog).where(eq(table.dog.publicId, dogPublicId)).limit(1);

	if (!dog || dog.length === 0) {
		return error(404, 'Dog not found');
	}

	return { dog: dog[0] };
};
