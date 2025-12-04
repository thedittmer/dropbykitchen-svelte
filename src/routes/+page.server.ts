import type { EpisodeMetadata } from '$lib/types';

export const load = async () => {
	const modules = import.meta.glob<{ metadata: EpisodeMetadata }>('../../../content/episodes/*.md');
	
	const episodes = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const module = await resolver();
			const slug = path.split('/').pop()?.slice(0, -3) ?? '';
			return {
				...module.metadata,
				slug
			};
		})
	);

	return {
		episodes: episodes.sort((a, b) => b.episodeNumber - a.episodeNumber)
	};
};

