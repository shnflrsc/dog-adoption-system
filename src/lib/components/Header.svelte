<script lang="ts">
	import { Menu } from '@lucide/svelte';
	import { navLinks, sideMenuState } from '../../routes/state.svelte';
</script>

<header class="flex items-center justify-center p-4 bg-orange-500 md:justify-start md:gap-x-4">
	<button
		class="absolute md:hidden left-4"
		onclick={() => (sideMenuState.active = !sideMenuState.active)}
		aria-label="Toggle Menu"
	>
		<Menu class="w-6 h-6 text-white" />
	</button>
	<a href="/">
		<h1 class="text-lg font-bold text-white">DoAdSy</h1>
	</a>
	<nav class="items-center hidden gap-x-2 md:flex md:gap-x-4">
		{#each navLinks as { href, name }}
			<a {href} class="text-white hover:underline">{name}</a>
		{/each}
	</nav>
</header>
