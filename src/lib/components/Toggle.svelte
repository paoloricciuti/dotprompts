<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let { disabled = false, children, ...rest }: HTMLInputAttributes = $props();
</script>

<label class={['toggle', { disabled }]}>
	{@render children?.()}
	<div>
		<input {...rest} type="checkbox" {disabled} />
		<span class="toggle-track">
			<span class="toggle-thumb"></span>
		</span>
	</div>
</label>

<style>
	.toggle {
		div {
			position: relative;
			display: inline-flex;
			align-items: center;
			cursor: pointer;
		}
	}

	.toggle.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.toggle input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.toggle-track {
		position: relative;
		width: 36px;
		height: 20px;
		background: var(--color-surface-elevated);
		border: 1px solid var(--color-border);
		border-radius: 10px;
		transition:
			border-color 0.15s ease,
			background 0.15s ease;
	}

	.toggle:hover:not(.disabled) .toggle-track {
		border-color: var(--color-accent);
	}

	.toggle input:checked + .toggle-track {
		background: var(--color-accent-subtle);
		border-color: var(--color-accent);
	}

	.toggle-thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 14px;
		height: 14px;
		background: var(--color-text-secondary);
		border-radius: 50%;
		transition:
			transform 0.15s ease,
			background 0.15s ease;
	}

	.toggle input:checked + .toggle-track .toggle-thumb {
		transform: translateX(16px);
		background: var(--color-accent);
	}

	.toggle input:focus-visible + .toggle-track {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}
</style>
