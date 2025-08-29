<script lang="ts">
	import { navLinks, sideMenuState } from '../../routes/state.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
</script>

{#if sideMenuState.active}
	<article
		class="grid grid-cols-2 grid-rows-1 md:hidden h-full fixed left-0 top-0 z-50"
		transition:fly={{ x: -300, easing: cubicOut }}
	>
		<section
			class="w-64 bg-orange-500 shadow-lg shadow-neutral-900 flex justify-center items-center z-500"
		>
			<nav>
				<ul class="flex flex-col gap-y-4">
					{#each navLinks as { href, name }}
						<li>
							<a
								class="text-white text-2xl font-bold"
								onclick={() => (sideMenuState.active = false)}
								{href}>{name}</a
							>
						</li>
					{/each}
				</ul>
			</nav>
		</section>
		<button onclick={() => (sideMenuState.active = false)} aria-label="Close menu"></button>
	</article>
{/if}
