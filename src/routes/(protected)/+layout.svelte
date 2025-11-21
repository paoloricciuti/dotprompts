<script lang="ts">
	import { resolve } from '$app/paths';
	import { logout } from '$lib/auth.remote';

	let { children } = $props();
</script>

<div class="app-container">
	<div class="background-pattern"></div>

	<header class="app-header">
		<a href={resolve('/')} class="brand">
			<div class="logo-mark">
				<span class="dot"></span>
				<span class="dot"></span>
				<span class="dot"></span>
			</div>
			<h1>.prompts</h1>
		</a>

		<form {...logout} class="logout-form">
			<button type="submit" class="logout-btn">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					class="logout-icon"
					aria-hidden="true"
				>
					<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
					<polyline points="16,17 21,12 16,7" />
					<line x1="21" y1="12" x2="9" y2="12" />
				</svg>
				<span>Sign out</span>
			</button>
		</form>
	</header>

	<main class="main-content">
		{@render children()}
	</main>
</div>

<style>
	.app-container {
		min-height: 100vh;
		background: var(--color-bg);
		position: relative;
	}

	.background-pattern {
		position: fixed;
		inset: 0;
		background:
			radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 62, 0, 0.06), transparent),
			radial-gradient(ellipse 60% 40% at 100% 100%, rgba(255, 87, 34, 0.04), transparent);
		pointer-events: none;
	}

	.app-header {
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 2rem;
		background: rgba(10, 10, 11, 0.8);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--color-border-subtle);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		text-decoration: none;
		transition: opacity 0.2s ease;
	}

	.brand:hover {
		opacity: 0.8;
	}

	.logo-mark {
		display: flex;
		gap: 4px;
	}

	.dot {
		width: 6px;
		height: 6px;
		background: var(--color-accent);
		border-radius: 50%;
	}

	.dot:nth-child(2) {
		background: var(--color-accent-dim);
	}

	h1 {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin: 0;
		letter-spacing: -0.01em;
	}

	.logout-form {
		margin: 0;
	}

	.logout-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: transparent;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		color: var(--color-text-secondary);
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.logout-btn:hover {
		background: var(--color-surface-elevated);
		border-color: var(--color-border);
		color: var(--color-text-primary);
	}

	.logout-icon {
		width: 16px;
		height: 16px;
	}

	.main-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 2rem 4rem;
	}

	@media (max-width: 768px) {
		.app-header {
			padding: 1rem 1.25rem;
		}

		h1 {
			font-size: 1.25rem;
		}

		.main-content {
			padding: 2rem 1.25rem 3rem;
		}
	}
</style>
