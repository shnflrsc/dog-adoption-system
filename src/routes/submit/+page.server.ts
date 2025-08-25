import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/server/db/supabase';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { nanoid } from 'nanoid';
import sharp from 'sharp';

export const load: PageServerLoad = async () => {
	const { data } = await supabase.auth.getUser();
	if (!data.user) {
		throw redirect(302, '/login');
	}
};

export const actions: Actions = {
	registerDog: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name');
		const breed = formData.get('breed');
		const age = formData.get('age');
		const gender = formData.get('gender');
		const description = formData.get('description');
		const image = formData.get('image') as File;

		if (String(name).length > 255) {
			return { success: false, message: 'Name is too long' };
		}
		if (String(breed).length > 255) {
			return { success: false, message: 'Breed is too long' };
		}
		if (Number(age) < 0) {
			return { success: false, message: 'Age must be a positive number' };
		}
		if (String(gender).length > 6) {
			return { success: false, message: 'Gender is too long' };
		}
		if (String(description).length > 255) {
			return { success: false, message: 'Description is too long' };
		}
		if (!image || !(image instanceof File) || !['image/png', 'image/jpeg'].includes(image.type)) {
			return { success: false, message: 'Invalid image' };
		}

		const arrayBuffer = await image.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		let webpBuffer;
		try {
			webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
		} catch (error) {
			console.error('Image conversion failed: ', error);
			return { success: false, message: 'Image processing failed' };
		}

		const fileName = `${Date.now()}_${image.name.replace(/\.[^/.]+$/, '')}.webp`;
		const { error } = await supabase.storage.from('dog-images').upload(fileName, webpBuffer, {
			contentType: 'image/webp'
		});

		if (error) {
			console.error('Image upload failed: ', error);
			return { success: false, message: 'Image upload failed' };
		}

		const { data } = supabase.storage.from('dog-images').getPublicUrl(fileName);

		try {
			await db.insert(table.dog).values({
				publicId: nanoid(),
				registeredAt: new Date(),
				status: 'unadopted',
				name: String(name),
				breed: String(breed),
				age: Number(age),
				gender: String(gender),
				description: String(description),
				image: data.publicUrl
			});
		} catch (err) {
			console.error(err);
			return { success: false, message: 'Dog registration failed' };
		}

		return { success: true, message: 'Dog registered successfully' };
	}
};
