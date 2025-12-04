<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	
	let { children } = $props();
</script>

<div class="container">
	<header class="no-print">
		<nav>
			<a href="/" class="logo">Drop-By Kitchen</a>
			<div class="nav-links">
				<a href="/episodes" class:active={$page.url.pathname.startsWith('/episodes')}>Episodes</a>
			</div>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>
	
	<footer class="no-print" style="margin-top: 4rem; padding-bottom: 2rem; color: var(--color-text-light); font-size: 0.9rem; text-align: center;">
		<p>&copy; {new Date().getFullYear()} Drop-By Kitchen. All rights reserved.</p>
	</footer>
</div>

<style>
	.active {
		text-decoration: underline;
		color: var(--color-theme-1) !important;
	}
</style>
