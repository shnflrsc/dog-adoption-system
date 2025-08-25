import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/server/db/supabase';

export const load: PageServerLoad = async () => {
	const { data } = await supabase.auth.getUser();
	if (!data.user) {
		throw redirect(302, '/login');
	}
};

export const actions: Actions = {
	logout: async () => {
		await supabase.auth.signOut();
		return redirect(302, '/login');
	}
};
