<script lang="ts">
	import type { EpisodeMetadata } from '$lib/types';

	let { data } = $props();
	
	let search = $state('');
	let selectedTag = $state('');

	let filteredEpisodes = $derived(data.episodes.filter((episode: EpisodeMetadata) => {
		const searchLower = search.toLowerCase();
		const matchesSearch = 
			episode.title.toLowerCase().includes(searchLower) ||
			episode.description.toLowerCase().includes(searchLower) ||
			episode.guest.toLowerCase().includes(searchLower) ||
			episode.tags.some(tag => tag.toLowerCase().includes(searchLower));
		
		const matchesTag = selectedTag ? episode.tags.includes(selectedTag) : true;
		
		return matchesSearch && matchesTag;
	}));

	let allTags = $derived(Array.from(new Set(data.episodes.flatMap((e: EpisodeMetadata) => e.tags))).sort());
</script>

<svelte:head>
	<title>Drop-By Kitchen</title>
</svelte:head>

<section class="intro">
	<h1>Drop-By Kitchen</h1>
	<p class="mission-statement">
		Visiting real kitchens, cooking everyday recipes, and having real conversations around the stove.
	</p>
</section>

<div class="filters">
	<input 
		type="text" 
		bind:value={search} 
		placeholder="Search episodes, guests, ingredients..." 
		class="search-box"
	/>

	<select bind:value={selectedTag} class="tag-select">
		<option value="">All Tags</option>
		{#each allTags as tag}
			<option value={tag}>{tag}</option>
		{/each}
	</select>
</div>

<div class="episode-list">
	{#each filteredEpisodes as episode}
		<a href="/episodes/{episode.slug}" class="episode-card">
			<div class="episode-header">
				<span class="episode-number">Ep. {episode.episodeNumber}</span>
				<span class="episode-date">{episode.publishedDate}</span>
			</div>
			<h2>{episode.title}</h2>
			<p class="guest">with {episode.guest}</p>
			<p class="description">{episode.description}</p>
			<div class="tags">
				{#each episode.tags.slice(0, 3) as tag}
					<span class="tag">{tag}</span>
				{/each}
				{#if episode.tags.length > 3}
					<span class="tag">+{episode.tags.length - 3} more</span>
				{/if}
			</div>
		</a>
	{:else}
		<p>No episodes found matching your criteria.</p>
	{/each}
</div>

<style>
	.intro {
		text-align: center;
		margin-bottom: 3rem;
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		color: var(--color-theme-1);
	}

	.mission-statement {
		font-size: 1.25rem;
		color: var(--color-text-light);
		max-width: 600px;
		margin: 0 auto;
	}

	.filters {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}
	
	.search-box {
		flex: 1;
		min-width: 200px;
		padding: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: var(--color-bg-0);
		color: var(--color-text);
	}
	
	.tag-select {
		padding: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: var(--color-bg-0);
		color: var(--color-text);
	}
	
	.episode-list {
		display: grid;
		gap: 1.5rem;
	}
	
	.episode-card {
		display: block;
		padding: 1.5rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-bg-1);
		transition: transform 0.2s, box-shadow 0.2s;
		text-decoration: none;
		color: var(--color-text);
	}
	
	.episode-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
		text-decoration: none;
	}
	
	.episode-header {
		display: flex;
		justify-content: space-between;
		font-size: 0.875rem;
		color: var(--color-text-light);
		margin-bottom: 0.5rem;
	}
	
	.episode-card h2 {
		margin-top: 0;
		margin-bottom: 0.5rem;
		color: var(--color-theme-2);
	}
	
	.guest {
		font-weight: 500;
		margin: 0 0 1rem 0;
	}
	
	.description {
		margin-bottom: 1rem;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	.tags {
		display: flex;
		flex-wrap: wrap;
	}
</style>
