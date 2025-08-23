import { getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	return { user };
};

function requireLogin() {
	const { locals } = getRequestEvent();
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	return locals.user;
}
