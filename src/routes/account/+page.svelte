<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<svelte:head>
	<title>Account</title>
</svelte:head>

<main class="m-4">
	<h1 class="text-xl font-bold">Account</h1>
	<form action="?/logout" method="post">
		<button class="self-end p-2 text-white bg-orange-500 rounded-lg w-fit" type="submit"
			>Logout</button
		>
	</form>
</main>
