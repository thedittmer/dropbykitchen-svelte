<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let theme = $state<'light' | 'dark' | 'auto'>('auto');

	onMount(() => {
		// Load saved theme from localStorage
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null;
		if (savedTheme) {
			theme = savedTheme;
			applyTheme(savedTheme);
		}
	});

	function applyTheme(newTheme: 'light' | 'dark' | 'auto') {
		if (!browser) return;

		if (newTheme === 'auto') {
			document.documentElement.removeAttribute('data-theme');
		} else {
			document.documentElement.setAttribute('data-theme', newTheme);
		}
	}

	function toggleTheme() {
		// Cycle through: auto -> light -> dark -> auto
		if (theme === 'auto') {
			theme = 'light';
		} else if (theme === 'light') {
			theme = 'dark';
		} else {
			theme = 'auto';
		}

		localStorage.setItem('theme', theme);
		applyTheme(theme);
	}

	function getIcon() {
		if (theme === 'light') return '☀️';
		if (theme === 'dark') return '🌙';
		return '🔄'; // auto
	}

	function getLabel() {
		if (theme === 'light') return 'Light';
		if (theme === 'dark') return 'Dark';
		return 'Auto';
	}
</script>

<button onclick={toggleTheme} class="theme-toggle" title="Toggle theme" aria-label="Toggle theme">
	<span class="icon">{getIcon()}</span>
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		background: transparent;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		color: var(--color-text);
		transition: all 0.2s ease;
	}

	.theme-toggle:hover {
		background: var(--color-bg-2);
		border-color: var(--color-text-light);
	}

	.theme-toggle:active {
		scale: 0.95;
	}

	.icon {
		font-size: 1.125rem;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

