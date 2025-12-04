<script lang="ts">
  import type { EpisodeMetadata } from "$lib/types";

  let { data } = $props();

  let search = $state("");
  let selectedTag = $state("");

  let filteredEpisodes = $derived(
    data.episodes.filter((episode: EpisodeMetadata) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        episode.title.toLowerCase().includes(searchLower) ||
        episode.excerpt.toLowerCase().includes(searchLower) ||
        episode.guest.toLowerCase().includes(searchLower) ||
        episode.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      const matchesTag = selectedTag
        ? episode.tags.includes(selectedTag)
        : true;

      return matchesSearch && matchesTag;
    })
  );

  let allTags = $derived(
    Array.from(
      new Set(data.episodes.flatMap((e: EpisodeMetadata) => e.tags))
    ).sort()
  );
</script>

<svelte:head>
	<title>Drop-By Kitchen - Real Kitchens, Real Recipes</title>
	<meta name="description" content="Join Jason Dittmer as he drops by home kitchens to cook everyday recipes—from AI-generated dishes to family favorites—and see if they're keepers." />
	<meta name="keywords" content="cooking show, home cooking, recipes, food, kitchen, drop-by kitchen, jason dittmer" />
	<meta property="og:title" content="Drop-By Kitchen" />
	<meta property="og:description" content="Visiting real kitchens, cooking everyday recipes, and having real conversations around the stove." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://dropbykitchen.com" />
	<meta property="og:image" content="https://dropbykitchen.com/android-chrome-512x512.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="canonical" href="https://dropbykitchen.com" />
</svelte:head>

<section class="intro">
  <h1>Drop-By Kitchen</h1>
  <p class="mission-statement">
    Hi, I'm Jason Dittmer, and this is Drop-By Kitchen. Where I drop by your home kitchen, cook the recipes—AI or family favorites—and see if
    they're keepers.
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
      <hr class="divider" />
      <p class="description">{episode.excerpt}</p>
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
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    text-decoration: none;
    color: var(--color-text);
  }

  .episode-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
    color: var(--color-text-light); /* Change color to differentiate */
    font-style: italic; /* Optional: make italic to look more like metadata */
    margin: 0 0 0.5rem 0;
  }

  .divider {
    border: 0;
    border-top: 1px solid var(--color-border);
    margin: 0.5rem 0 1rem 0;
  }

  .description {
    margin-bottom: 1rem;
    overflow: hidden;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
  }
</style>
