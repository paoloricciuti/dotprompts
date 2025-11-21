<script lang="ts">
	let { children } = $props();
</script>

<div class="app-container">
	<div class="background-pattern"></div>
	{@render children()}
</div>

<style>
	.app-container {
		min-height: 100vh;
		background: var(--color-bg);
		position: relative;
		display: grid;
		place-items: center;
		padding: 1.5rem;
	}

	.background-pattern {
		position: fixed;
		inset: 0;
		background:
			radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 62, 0, 0.08), transparent),
			radial-gradient(ellipse 60% 40% at 100% 100%, rgba(255, 87, 34, 0.05), transparent);
		pointer-events: none;
	}
</style>
