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

<button onclick={toggleTheme} class="theme-toggle" title="Toggle theme (current: {getLabel()})">
	<span class="icon">{getIcon()}</span>
	<span class="label">{getLabel()}</span>
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--color-bg-2);
		border: 1px solid var(--color-border);
		border-radius: 4px;
		color: var(--color-text);
		font-size: 0.875rem;
		transition: background-color 0.2s, border-color 0.2s;
	}

	.theme-toggle:hover {
		background: var(--color-bg-1);
	}

	.icon {
		font-size: 1.25rem;
		line-height: 1;
	}

	.label {
		font-weight: 500;
	}

	@media (max-width: 640px) {
		.label {
			display: none;
		}
	}
</style>

