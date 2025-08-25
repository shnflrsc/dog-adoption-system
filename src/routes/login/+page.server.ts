import type { Actions, PageServerLoad } from './$types';
import { validateEmail, validatePassword } from '$lib/server/utils/validationUtils';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/server/db/supabase';

export const load: PageServerLoad = async () => {
	const { data } = await supabase.auth.getUser();
	if (data.user) {
		throw redirect(302, '/account');
	}
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!validateEmail(email) || !validatePassword(password)) {
			return { success: false, message: 'Incorrect email or password' };
		}

		const users = await db
			.select()
			.from(table.profile)
			.where(eq(table.profile.email, email))
			.limit(1);

		if (users.length === 0) {
			return { success: false, message: 'Incorrect email or password' };
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error || !data.user) {
			return { success: false, message: 'Incorrect email or password' };
		}

		return redirect(302, '/account');
	}
};
