<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	const { form }: { form: ActionData } = $props();

	let imagePreview: string | null = $state(null);

	function handleImageChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				imagePreview = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		} else {
			imagePreview = null;
		}
	}
</script>

<svelte:head>
	<title>Dog Adoption Registration</title>
</svelte:head>

<main class="m-4">
	<h1 class="font-bold text-xl">Register a Dog for Adoption</h1>
	<form
		class="flex flex-col gap-y-8 md:flex-row md:gap-x-32 md:p-4 rounded-xl"
		method="POST"
		action="?/registerDog"
		enctype="multipart/form-data"
		use:enhance
	>
		<article class="flex flex-col md:w-fit gap-y-4">
			<label for="name">Name</label>
			<input
				class="p-2 rounded-lg bg-neutral-200 focus:outline-blue-500"
				type="text"
				name="name"
				id="name"
				required
			/>
			<label for="breed">Breed</label>
			<input
				class="p-2 rounded-lg bg-neutral-200 focus:outline-blue-500"
				type="text"
				name="breed"
				id="breed"
				required
			/>
			<label for="gender">Gender</label>
			<select
				class="p-3 rounded-lg bg-neutral-200 focus:outline-blue-500 w-fit"
				name="gender"
				id="gender"
			>
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>
			<label for="age">Age</label>
			<input
				class="p-2 rounded-lg bg-neutral-200 focus:outline-blue-500"
				type="number"
				name="age"
				id="age"
				required
			/>
		</article>
		<article class="flex flex-col md:w-1/3 gap-y-4">
			<label class="text-lg font-bold" for="description">Tell Us About Their Personality</label>
			<textarea
				class="p-2 rounded-lg bg-neutral-200 resize-none focus:outline-blue-500"
				name="description"
				id="description"
				rows="9"
				required
			></textarea>
			<label class="p-2 bg-orange-500 text-white rounded-xl font-bold w-fit" for="image"
				>Upload a cute photo</label
			>
			<input
				class="sr-only"
				type="file"
				name="image"
				id="image"
				accept="image/png, image/jpeg"
				required
				onchange={handleImageChange}
			/>

			{#if imagePreview}
				<img class="rounded-lg" src={imagePreview} alt="Dog preview" />
			{/if}

			<input
				class="self-end p-2 text-white bg-orange-500 rounded-lg w-fit font-bold"
				type="submit"
				value="Submit"
			/>
			{#if form?.message}
				<p class={form.success ? 'text-green-500' : 'text-red-500'}>{form.message}</p>
			{/if}
		</article>
	</form>
</main>
