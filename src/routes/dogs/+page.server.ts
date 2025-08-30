import type { Dog } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('/api/dogs');

	if (!res.ok) {
		throw new Error('Failed to fetch dogs');
	}

	const data: Dog[] = await res.json();

	return {
		dogs: data
	};
};
