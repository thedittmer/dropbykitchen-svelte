import type { EpisodeMetadata } from '$lib/types';

const siteUrl = 'https://dropbykitchen.com';

export async function GET() {
	const modules = import.meta.glob('/content/episodes/*.md');
	
	const episodes = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const episode = await resolver() as { metadata: EpisodeMetadata };
			const slug = path.split('/').pop()?.slice(0, -3) ?? '';
			return {
				slug,
				publishedDate: episode.metadata.publishedDate
			};
		})
	);

	const pages = [
		{ url: '/', changefreq: 'daily', priority: 1.0 },
		...episodes.map((episode) => ({
			url: `/episodes/${episode.slug}`,
			changefreq: 'monthly',
			priority: 0.8,
			lastmod: episode.publishedDate
		}))
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
		.map(
			(page) => `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
  </url>
  `
		)
		.join('')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}

