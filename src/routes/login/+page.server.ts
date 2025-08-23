import type { Actions } from './$types';
import { validateUsername, validatePassword } from '$lib/server/utils/validationUtils';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { verify } from '@node-rs/argon2';
import * as auth from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username) || !validatePassword(password)) {
			return { success: false, message: 'Incorrect username or password' };
		}

		const users = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, username))
			.limit(1);

		if (users.length === 0) {
			return { success: false, message: 'Incorrect username or password' };
		}

		const user = users[0];

		const validPassword = await verify(user.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			return { success: false, message: 'Incorrect username or password' };
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, user.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/account');
	}
};
