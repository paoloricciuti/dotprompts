<script lang="ts">
	let { prompt }: { prompt: string } = $props();

	const parts = $derived(prompt.split(/{{(\S+)}}/));
</script>

<!-- eslint-disable-next-line svelte/require-each-key -->
{#each parts as part, index}
	{#if index % 2 === 0}
		<span class="prompt-text">{part}</span>
	{:else}
		<span class="prompt-input">{`{{${part}}}`}</span>
	{/if}
{/each}

<style>
	.prompt-text {
		color: currentColor;
	}

	.prompt-input {
		color: var(--color-accent-dim);
		font-weight: 800;
	}
</style>
