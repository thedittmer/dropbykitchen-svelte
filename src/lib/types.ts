export interface Recipe {
	ingredients: string[];
	directions: string[];
}

export interface MusicCredit {
	title: string;
	artist: string;
	sourceUrl?: string;
	license: string;
	licenseUrl: string;
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
	music?: MusicCredit;
}

// Type alias for mdsvex layout metadata
export interface EpisodeMetadata extends Episode {
	[key: string]: any;
}
