export interface Recipe {
	ingredients: string[];
	directions: string[];
}

export interface Episode {
	title: string;
	slug: string;
	episodeNumber: number;
	publishedDate: string;
	guest: string;
	location: string;
	tags: string[];
	youtubeId: string;
	excerpt: string;
	recipe: Recipe;
}

// Type alias for mdsvex layout metadata
export interface EpisodeMetadata extends Episode {
	[key: string]: any;
}
