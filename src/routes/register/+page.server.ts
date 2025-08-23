import { db } from '$lib/server/db';
import { validateUsername, validatePassword } from '$lib/server/utils/validationUtils';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';
import { hash } from '@node-rs/argon2';
import { nanoid } from 'nanoid';
import * as auth from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username)) {
			return {
				success: false,
				message: 'Username must be between 6 to 20 characters long'
			};
		}
		if (!validatePassword(password)) {
			return {
				success: false,
				message: 'Password must be between 8 and 255 characters long'
			};
		}

		const users = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, username))
			.limit(1);

		if (users.length > 0) {
			return {
				success: false,
				message: 'Username already exists'
			};
		}

		const userId = nanoid();
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		const registeredAt = Date.now();

		try {
			await db.insert(table.user).values({ id: userId, username, passwordHash, registeredAt });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch {
			return { success: false, message: 'An error occurred' };
		}
		return redirect(302, '/account');
	}
};
