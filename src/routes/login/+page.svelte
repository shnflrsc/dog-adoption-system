<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<main class="m-4">
	<form class="flex flex-col gap-y-4" method="POST" action="?/login" use:enhance>
		<h1 class="text-xl font-bold">Login</h1>
		<label for="username">Username</label>
		<input
			class="p-2 text-black rounded-lg bg-neutral-200 focus:outline-none"
			type="text"
			id="username"
			name="username"
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
			<p class="mt-4 text-red-500">{form.message}</p>
		{/if}
		<input
			class="self-end p-2 text-white bg-orange-500 rounded-lg w-fit"
			type="submit"
			value="Login"
		/>
	</form>
	<article class="absolute -translate-x-1/2 left-1/2 bottom-8">
		<h1>No account yet? <a class="text-blue-400" href="/register">Register</a></h1>
	</article>
</main>
