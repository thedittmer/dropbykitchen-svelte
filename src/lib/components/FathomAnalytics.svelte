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

		const initialPath = window.location.pathname + window.location.search;
		previousPath = initialPath;
		isLoaded = true;

		// Track initial pageview
		trackPageview({
			url: initialPath,
			referrer: document.referrer
		});
	});

	// Track pageviews on route changes (but not on initial load)
	$effect(() => {
		if (!browser || !isLoaded || !$page.url) return;
		
		const currentPath = $page.url.pathname + $page.url.search;
		// Only track if path actually changed (avoid double-tracking initial load)
		if (currentPath !== previousPath && previousPath !== '') {
			previousPath = currentPath;
			trackPageview({
				url: currentPath,
				referrer: document.referrer
			});
		}
	});
</script>

