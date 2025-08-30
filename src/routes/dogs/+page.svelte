<script lang="ts">
	export let data;
	const { dogs } = data;
</script>

<svelte:head>
	<title>Adopt a Dog</title>
</svelte:head>

<main class="m-4">
	<h1 class="text-xl font-bold">Adopt a Dog</h1>
	<ul class="grid md:grid-cols-3 md:grid-flow-row gap-y-8 md:gap-8 justify-center md:w-1/2">
		{#each dogs as dog}
			<li class="flex flex-col w-fit bg-neutral-100 gap-y-2 rounded-lg">
				<a href={`/dogs/${dog.publicId}`}>
					<picture>
						<img
							src={dog.image}
							alt={dog.name}
							class="rounded-t-lg w-[256px] h-[256px] object-cover"
							loading="lazy"
						/>
					</picture>
					<section class="flex flex-col gap-y-4 mb-4 mt-4">
						<h2 class="font-bold text-xl text-center">{dog.name}</h2>
						<span class="text-center">{dog.breed} • {dog.age} years old</span>
					</section>
				</a>
			</li>
		{/each}
	</ul>
</main>
