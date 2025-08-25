import { supabase } from '$lib/server/db/supabase';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const load: PageServerLoad = async ({ url }) => {
	const access_token = url.searchParams.get('access_token');
	const refresh_token = url.searchParams.get('refresh_token');

	if (!access_token || !refresh_token) {
		return { success: false, message: 'Invalid access or refresh tokens' };
	}

	supabase.auth.setSession({
		access_token,
		refresh_token
	});

	const {
		data: { user },
		error
	} = await supabase.auth.getUser();

	if (error) {
		return { success: false, message: error.message };
	}

	if (!user || !user.confirmed_at) {
		return { success: false, message: 'Email not confirmed yet' };
	}

	try {
		const profileRow = await db
			.select()
			.from(table.profile)
			.where(eq(table.profile.id, user.id))
			.limit(1);

		if (profileRow?.[0].confirmed) {
			return { success: true, user };
		}

		if (!user.id || !user.email) {
			throw new Error('User id or email is undefined');
		}
		await db.insert(table.profile).values({
			id: user.id as string,
			publicId: nanoid(),
			email: user.email as string,
			confirmed: true,
			role: 'user',
			createdAt: new Date()
		});
	} catch (err) {
		console.log(err);
		return { success: false, message: 'Failed to update user confirmation status' };
	}

	return { success: true, user };
};
