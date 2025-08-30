<script lang="ts">
	export let data;
	const { dog } = data;
</script>

<svelte:head>
	<title>{dog.name}</title>
</svelte:head>

<main class="m-4">
	<article class="flex flex-col md:flex-row justify-center">
		<picture>
			<img
				class="rounded-xl w-72 h-72 md:w-96 md:h-96 fit place-self-center object-cover"
				src={dog.image}
				alt={dog.name}
			/>
		</picture>
		<section class="flex flex-col md:w-1/2 p-8 gap-y-8">
			<div>
				<h1 class="text-3xl font-bold text-center md:text-left">{dog.name}</h1>
				<p class="text-xl text-center md:text-left">{dog.breed} • {dog.age} years old</p>
			</div>
			<div>
				<p class="text-lg break-words">{dog.description}</p>
			</div>
		</section>
	</article>
</main>
