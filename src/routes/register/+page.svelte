<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	const { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<main class="m-4">
	<form class="flex flex-col gap-y-4 md:w-1/3" method="POST" action="?/register" use:enhance>
		<h1 class="text-xl font-bold">Register</h1>
		<label for="email">Email</label>
		<input
			class="p-2 text-black rounded-lg bg-neutral-200 focus:outline-none"
			type="text"
			id="email"
			name="email"
			required
		/>
		<label for="password">Password</label>
		<input
			class="p-2 rounded-lg bg-neutral-200 focus:outline-none"
			type="password"
			id="password"
			name="password"
			required
		/>
		{#if form?.message}
			<p class={form.success ? 'text-green-500' : 'text-red-500'}>{form.message}</p>
		{/if}
		<input
			class="self-end p-2 text-white bg-orange-500 rounded-lg w-fit"
			type="submit"
			value="Register"
		/>
	</form>
</main>
