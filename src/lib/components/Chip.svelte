<script lang="ts">
	let { variable }: { variable: string } = $props();
</script>

<span class="chip">
	<span class="chip-prefix">$</span>
	<span class="chip-text">{variable}</span>
</span>

<style>
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.5rem;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 4px;
		font-family: var(--font-display);
		font-size: 0.6875rem;
		line-height: 1;
		transition:
			border-color 0.15s ease,
			background 0.15s ease;
	}

	.chip:hover {
		border-color: var(--color-accent);
		background: var(--color-accent-subtle);
	}

	.chip-prefix {
		color: var(--color-accent);
		font-weight: 600;
	}

	.chip-text {
		color: var(--color-text-primary);
	}
</style>
