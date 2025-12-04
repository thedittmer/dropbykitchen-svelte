<script lang="ts">
	import '../app.css';
	import FathomAnalytics from '$lib/components/FathomAnalytics.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	
	let { children } = $props();
</script>

<FathomAnalytics />

<div class="container">
	<header class="no-print">
		<nav>
			<a href="/" class="logo">Drop-By Kitchen</a>
			<div class="nav-links">
				<ThemeToggle />
				<a href="https://www.youtube.com/@DropByKitchen" target="_blank" rel="noopener noreferrer" class="youtube-btn">
					<svg class="youtube-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
					</svg>
					<span>YouTube</span>
				</a>
			</div>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>
	
	<footer class="no-print" style="margin-top: 4rem; padding-bottom: 2rem; color: var(--color-text-light); font-size: 0.9rem; text-align: center;">
		<p>&copy; {new Date().getFullYear()} Drop-By Kitchen. All rights reserved.</p>
		<p style="margin-top: 0.5rem;">
			<a href="/rss.xml" style="color: inherit; text-decoration: underline; margin-right: 1rem;">RSS Feed</a>
			Website by <a href="https://dittmer.pro" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Dittmer Internet Pro</a>
		</p>
	</footer>
</div>
