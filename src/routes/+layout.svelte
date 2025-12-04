<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="container">
	<header class="no-print">
		<nav>
			<a href="/" class="logo">Drop-By Kitchen</a>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>
	
	<footer class="no-print" style="margin-top: 4rem; padding-bottom: 2rem; color: var(--color-text-light); font-size: 0.9rem; text-align: center;">
		<p>&copy; {new Date().getFullYear()} Drop-By Kitchen. All rights reserved.</p>
	</footer>
</div>
