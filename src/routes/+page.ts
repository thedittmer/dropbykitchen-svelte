import type { EpisodeMetadata } from '$lib/types';

export const load = async () => {
	// Import markdown files from the content directory
	// Using same pattern depth as sitemap/rss files for consistency
	const modules = import.meta.glob('../../../content/episodes/*.md');
	
	const episodes = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const episode = await resolver() as { metadata: EpisodeMetadata };
			return {
				...episode.metadata,
				slug: path.split('/').pop()?.slice(0, -3) ?? '' // extract slug from filename
			};
		})
	);

	return {
		episodes: episodes.sort((a, b) => b.episodeNumber - a.episodeNumber)
	};
};

