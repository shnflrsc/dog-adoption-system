import { db } from '$lib/server/db';
import { validateEmail, validatePassword } from '$lib/server/utils/validationUtils';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/server/db/supabase';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const { data } = await supabase.auth.getUser();
	if (data.user) {
		throw redirect(302, '/account');
	}
};

export const actions: Actions = {
	register: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!validateEmail(email)) {
			return {
				success: false,
				message: 'Please enter a valid email'
			};
		}
		if (!validatePassword(password)) {
			return {
				success: false,
				message: 'Please enter a valid password'
			};
		}

		const users = await db
			.select()
			.from(table.profile)
			.where(eq(table.profile.email, email))
			.limit(1);

		if (users.length > 0) {
			return {
				success: false,
				message: 'User already exists'
			};
		}

		/*
		const publicId = nanoid();
		const createdAt = new Date();
		*/

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: 'http://localhost:5173/confirmed'
				}
			}); // insert user into supabase auth

			if (error || !data.user) {
				return { success: false, message: error?.message || 'An error occured' };
			}

			/*
			const id = data.user.id;
			await db.insert(table.profile).values({ id, publicId, email, createdAt }); // insert user into profile table
			*/
		} catch {
			return { success: false, message: 'An error occurred' };
		}

		return { success: true, message: 'A confirmation link has been sent to your email address' };

		//return redirect(302, '/account');
	}
};
