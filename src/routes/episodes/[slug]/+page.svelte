<script lang="ts">
	import { YouTube } from 'sveltekit-embed';
	import type { EpisodeMetadata } from '$lib/types';
	
	let { data } = $props();
	let { episode, content: Content } = $derived(data);

	let printMode = $state(false);

	function handlePrint() {
		window.print();
	}
</script>

<svelte:head>
	<title>{episode.title} | Drop-By Kitchen</title>
</svelte:head>

<article class="episode-detail">
	<header class="no-print">
		<div class="meta-top">
			<span class="episode-number">Episode {episode.episodeNumber}</span>
			<span class="date">{episode.publishedDate}</span>
		</div>
		<h1>{episode.title}</h1>
		<div class="meta-details">
			<p><strong>Guest:</strong> {episode.guest}</p>
			<p><strong>Location:</strong> {episode.location}</p>
		</div>
		
		<div class="tags">
			{#each episode.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>
	</header>

	<div class="video-container no-print">
		<YouTube youTubeId={episode.youtubeId} />
	</div>

	<div class="content-wrapper">
		<section class="description no-print">
			<Content />
		</section>

		<section class="recipe-card">
			<div class="recipe-header">
				<h2>Recipe</h2>
				<button class="print-btn no-print" onclick={handlePrint}>
					Print Recipe Card
				</button>
			</div>
			
			<!-- Print-only header -->
			<div class="print-only print-header">
				<h1>{episode.title}</h1>
				<p>{episode.excerpt}</p>
				<p class="print-meta">From DropByKitchen.com • Episode {episode.episodeNumber}</p>
			</div>

			<div class="recipe-content">
				<div class="ingredients">
					<h3>Ingredients</h3>
					<ul>
						{#each episode.recipe.ingredients as ingredient}
							<li>{ingredient}</li>
						{/each}
					</ul>
				</div>

				<div class="directions">
					<h3>Directions</h3>
					<ol>
						{#each episode.recipe.directions as step}
							<li>{step}</li>
						{/each}
					</ol>
				</div>
			</div>
		</section>
	</div>
</article>

<style>
	.episode-detail {
		padding-bottom: 4rem;
	}

	.meta-top {
		text-transform: uppercase;
		font-size: 0.875rem;
		color: var(--color-text-light);
		margin-bottom: 0.5rem;
		letter-spacing: 0.05em;
	}

	.meta-top span:first-child {
		margin-right: 1rem;
		font-weight: 700;
		color: var(--color-theme-1);
	}

	h1 {
		margin-top: 0;
		font-size: 2.5rem;
	}

	.meta-details p {
		margin: 0.25rem 0;
	}

	.tags {
		margin-top: 1rem;
	}

	.video-container {
		margin: 2rem 0;
		aspect-ratio: 16/9;
		background: #000;
		border-radius: 8px;
		overflow: hidden;
	}

	.content-wrapper {
		display: grid;
		gap: 3rem;
	}

	.recipe-card {
		background: var(--color-bg-1);
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid var(--color-border);
	}

	.recipe-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		border-bottom: 2px solid var(--color-border);
		padding-bottom: 1rem;
	}

	.recipe-header h2 {
		margin: 0;
	}

	.print-btn {
		background: var(--color-theme-2);
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-weight: 500;
		transition: background 0.2s;
	}

	.print-btn:hover {
		background: #305a80;
	}

	.recipe-content {
		display: grid;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.recipe-content {
			grid-template-columns: 1fr 1.5fr;
		}
	}

	.ingredients ul {
		padding-left: 1.25rem;
	}

	.ingredients li {
		margin-bottom: 0.5rem;
	}

	.directions ol {
		padding-left: 1.25rem;
	}

	.directions li {
		margin-bottom: 1rem;
	}

	/* Print Styles */
	.print-header {
		margin-bottom: 1rem;
		border-bottom: 1px solid black;
		padding-bottom: 0.5rem;
	}

	.print-header h1 {
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}

	.print-meta {
		font-size: 0.75rem;
		color: #666;
		margin: 0;
	}
	
	@media print {
		@page {
			margin: 0.5in;
			size: auto;
		}

		body {
			font-size: 11pt;
			line-height: 1.3;
		}

		.episode-detail {
			padding-bottom: 0;
		}

		.content-wrapper {
			gap: 0;
			display: block;
		}

		.recipe-card {
			border: none;
			padding: 0;
			background: transparent;
			margin: 0;
		}

		.recipe-header {
			display: none; /* Hide "Recipe" H2 and print button */
		}

		.recipe-content {
			display: grid;
			grid-template-columns: 1fr 2fr;
			gap: 2rem;
			margin-top: 1rem;
		}

		.ingredients h3, .directions h3 {
			font-size: 1.1rem;
			margin-top: 0;
			margin-bottom: 0.5rem;
			border-bottom: 1px solid #eee;
			padding-bottom: 0.25rem;
		}

		.ingredients ul {
			padding-left: 1rem;
			margin-bottom: 0;
		}

		.ingredients li {
			margin-bottom: 0.25rem;
		}

		.directions ol {
			padding-left: 1rem;
			margin-bottom: 0;
		}
		
		.directions li {
			margin-bottom: 0.75rem;
			page-break-inside: avoid;
		}

		/* If ingredients list is very long, ensuring it doesn't waste space */
		.ingredients {
			font-size: 0.95em;
		}
	}
</style>

