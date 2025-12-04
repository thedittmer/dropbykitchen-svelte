import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		const post = await import(`/content/episodes/${params.slug}.md`);
		
		return {
			content: post.default,
			episode: post.metadata
		};
	} catch (e) {
		throw error(404, 'Episode not found');
	}
};

