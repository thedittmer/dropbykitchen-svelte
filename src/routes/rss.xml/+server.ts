import type { EpisodeMetadata } from '$lib/types';

const siteUrl = 'https://dropbykitchen.com';
const siteTitle = 'Drop-By Kitchen';
const siteDescription = 'Visiting real kitchens, cooking everyday recipes, and having real conversations around the stove.';

export async function GET() {
	const modules = import.meta.glob('/content/episodes/*.md');
	
	const episodes = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const episode = await resolver() as { metadata: EpisodeMetadata };
			const slug = path.split('/').pop()?.slice(0, -3) ?? '';
			return {
				...episode.metadata,
				slug
			};
		})
	);

	// Sort by episode number (newest first)
	const sortedEpisodes = episodes.sort((a, b) => b.episodeNumber - a.episodeNumber);

	const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteTitle}</title>
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${sortedEpisodes
		.map(
			(episode) => `
    <item>
      <title><![CDATA[${episode.title}]]></title>
      <link>${siteUrl}/episodes/${episode.slug}</link>
      <guid isPermaLink="true">${siteUrl}/episodes/${episode.slug}</guid>
      <description><![CDATA[${episode.excerpt}]]></description>
      <pubDate>${new Date(episode.publishedDate).toUTCString()}</pubDate>
      <content:encoded><![CDATA[
        <p>${episode.excerpt}</p>
        <p><strong>Guest:</strong> ${episode.guest}</p>
        <p><strong>Location:</strong> ${episode.location}</p>
        <p><a href="${siteUrl}/episodes/${episode.slug}">Watch the episode and get the recipe →</a></p>
      ]]></content:encoded>
    </item>
    `
		)
		.join('')}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}

