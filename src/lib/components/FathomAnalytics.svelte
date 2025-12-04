<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { load, trackPageview } from 'fathom-client';
	import { browser } from '$app/environment';

	let isLoaded = $state(false);
	let previousPath = $state('');

	onMount(() => {
		if (!browser) return;

		const fathomId = import.meta.env.PUBLIC_FATHOM_ID || 'ZKXWCMJN';
		
		// Load Fathom script
		load(fathomId, {
			auto: false
		});

		isLoaded = true;
		previousPath = window.location.pathname + window.location.search;

		// Track initial pageview
		trackPageview({
			url: previousPath,
			referrer: document.referrer
		});
	});

	// Track pageviews on route changes (but not on initial load)
	$: if (browser && isLoaded && $page.url) {
		const currentPath = $page.url.pathname + $page.url.search;
		if (currentPath !== previousPath) {
			previousPath = currentPath;
			trackPageview({
				url: currentPath,
				referrer: document.referrer
			});
		}
	}
</script>

