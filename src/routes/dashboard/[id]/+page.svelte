<script lang="ts">
	import { browser } from '$app/environment';
	import Chip from '$lib/components/Chip.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import { extract_inputs } from '$lib/inputs.utils.js';
	import { delete_prompt, get_prompt, update_prompt } from '$lib/prompts.remote.js';
	import { UpdatePromptSchema } from '$lib/prompts.schema.js';

	let { params } = $props();

	const prompt = $derived(await get_prompt(params.id));

	function populate_fields() {
		if (prompt) {
			update_prompt.fields.set({
				id: prompt.id,
				title: prompt.title,
				prompt: prompt.prompt,
				description: prompt.description,
				as_tool: prompt.as_tool ?? false
			});
		}
	}

	if (browser) {
		$effect.pre(populate_fields);
	} else {
		populate_fields();
	}
</script>

<svelte:head>
	<title>Edit: {prompt.title} | .prompts</title>
</svelte:head>

<div class="edit-page">
	<header class="page-header">
		<div class="header-content">
			<h1>Edit Prompt</h1>
			<p class="header-subtitle">~/.prompts/{prompt.title}</p>
		</div>
	</header>

	<div class="edit-grid">
		<section class="edit-panel">
			<div class="panel-header">
				<span class="panel-indicator"></span>
				<h2>Configuration</h2>
			</div>

			<form
				{...update_prompt.preflight(UpdatePromptSchema).enhance(async ({ submit, data, form }) => {
					await update_prompt.validate();
					form.reset();
					submit().updates(
						get_prompt(params.id).withOverride((prompt) => {
							return {
								...prompt,
								...data,
								inputs: extract_inputs(data.prompt)
							};
						})
					);
				})}
				class="edit-form"
			>
				<input {...update_prompt.fields.id.as('hidden', prompt.id)} />

				<div class="form-field">
					<label for="prompt-title" class="field-label">
						<span class="label-text">title</span>
						<span class="label-hint">string</span>
					</label>
					<input
						{...update_prompt.fields.title.as('text')}
						id="prompt-title"
						class="text-input"
						placeholder="my-awesome-prompt"
					/>
					{#each update_prompt.fields.title.issues() as issue, i (i)}
						<p class="field-error">{issue.message}</p>
					{/each}
				</div>

				<div class="form-field">
					<label for="prompt-title" class="field-label">
						<span class="label-text">description</span>
						<span class="label-hint">string</span>
					</label>
					<input
						{...update_prompt.fields.description.as('text')}
						class="text-input"
						placeholder="what-is-this-prompt-about"
					/>
					{#each update_prompt.fields.description.issues() as issue, i (i)}
						<p class="field-error">{issue.message}</p>
					{/each}
				</div>

				<div class="form-field">
					<label for="prompt-content" class="field-label">
						<span class="label-text">content</span>
						<span class="label-hint">text</span>
					</label>
					<textarea
						{...update_prompt.fields.prompt.as('text')}
						id="prompt-content"
						class="textarea-input"
						placeholder="You are a helpful assistant that..."
						rows="7"
					></textarea>
					{#each update_prompt.fields.prompt.issues() as issue, i (i)}
						<p class="field-error">{issue.message}</p>
					{/each}
				</div>

				<div class="form-field">
					<Toggle id="prompt-as-tool" {...update_prompt.fields.as_tool.as('checkbox')}>
						<div>
							<span class="label-text">as tool</span>
							<span class="label-hint">boolean</span>
						</div>
						<small class="hint"
							>Some MCP clients don't support prompts...adding this prompt as a tool would allow you
							to still calling it indirectly</small
						>
					</Toggle>
					{#each update_prompt.fields.as_tool.issues() as issue, i (i)}
						<p class="field-error">{issue.message}</p>
					{/each}
				</div>

				<div class="form-actions">
					<button type="submit" class="save-btn">
						<span class="btn-prefix">$</span>
						<span>Update Prompt</span>
					</button>
				</div>
			</form>
		</section>

		<aside class="meta-panel">
			<div class="meta-section">
				<h3>Prompt Info</h3>
				<dl class="meta-list">
					<div class="meta-item">
						<dt>ID</dt>
						<dd>#{prompt.id}</dd>
					</div>
				</dl>
			</div>

			{#if prompt.inputs}
				<div class="meta-section">
					<h3>Variables</h3>
					<div class="inputs-list">
						{#each prompt.inputs
							.split(',')
							.map((s) => s.trim())
							.filter(Boolean) as variable (variable)}
							<Chip {variable} />
						{/each}
					</div>
				</div>
			{/if}

			<div class="danger-zone">
				<h3>Danger Zone</h3>
				<p>This action cannot be undone.</p>
				<form {...delete_prompt} class="delete-form">
					<input {...delete_prompt.fields.id.as('hidden', prompt.id)} />
					<button type="submit" class="delete-btn">
						<svg height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
							><path
								fill="currentColor"
								d="M16 2v4h6v2h-2v14H4V8H2V6h6V2zm-2 2h-4v2h4zm0 4H6v12h12V8zm-5 2h2v8H9zm6 0h-2v8h2z"
							/></svg
						>
						<span>Delete Prompt</span>
					</button>
				</form>
			</div>
		</aside>
	</div>
</div>

<style>
	.edit-page {
		display: grid;
		gap: 2rem;
	}

	/* Page Header */
	.page-header {
		display: grid;
		gap: 1rem;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		color: var(--color-text-secondary);
		font-family: var(--font-display);
		font-size: 0.8125rem;
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.back-link:hover {
		color: var(--color-accent);
	}

	.back-icon {
		width: 14px;
		height: 14px;
	}

	.header-content {
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	.header-content h1 {
		font-family: var(--font-display);
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin: 0 0 0.25rem;
		letter-spacing: -0.02em;
	}

	.header-subtitle {
		font-family: var(--font-display);
		font-size: 0.8125rem;
		color: var(--color-text-tertiary);
		margin: 0;
	}

	/* Edit Grid */
	.edit-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		align-items: start;
	}

	/* Panel Styling */
	.edit-panel {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		overflow: hidden;
	}

	.panel-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		background: var(--color-surface-elevated);
		border-bottom: 1px solid var(--color-border);
	}

	.panel-indicator {
		width: 8px;
		height: 8px;
		background: var(--color-accent);
		border-radius: 50%;
		box-shadow: 0 0 8px var(--color-accent);
	}

	.panel-header h2 {
		font-family: var(--font-display);
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	/* Edit Form */
	.edit-form {
		display: grid;
		gap: 1.25rem;
		padding: 1.25rem;
	}

	.hint {
		font-family: var(--font-display);
		color: var(--color-text-secondary);
		font-size: 0.75rem;
		display: block;
		margin-block: 0.5rem;
	}

	.form-field {
		display: grid;
		gap: 0.5rem;
	}

	.field-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.label-text {
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-accent);
	}

	.label-hint {
		font-family: var(--font-display);
		font-size: 0.6875rem;
		color: var(--color-text-tertiary);
		padding: 0.125rem 0.375rem;
		background: var(--color-bg);
		border-radius: 4px;
	}

	.text-input,
	.textarea-input {
		width: 100%;
		padding: 0.75rem 1rem;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		color: var(--color-text-primary);
		font-family: var(--font-display);
		font-size: 0.875rem;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
		box-sizing: border-box;
	}

	.text-input::placeholder,
	.textarea-input::placeholder {
		color: var(--color-text-tertiary);
		font-style: italic;
	}

	.text-input:focus,
	.textarea-input:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px var(--color-accent-subtle);
	}

	.textarea-input {
		resize: vertical;
		line-height: 1.6;
	}

	.field-error {
		font-family: var(--font-display);
		font-size: 0.75rem;
		color: var(--color-danger);
		margin: 0;
		padding: 0.25rem 0.5rem;
		background: var(--color-danger-subtle);
		border-radius: 4px;
	}

	.form-actions {
		margin-top: 0.5rem;
	}

	.save-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.875rem 1.25rem;
		background: var(--color-accent);
		border: none;
		border-radius: 8px;
		color: var(--color-bg);
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.2s ease,
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.save-btn:hover {
		background: var(--color-accent-dim);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px -4px rgba(255, 62, 0, 0.5);
	}

	.save-btn:active {
		transform: translateY(0);
	}

	.btn-prefix {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 700;
	}

	/* Meta Panel */
	.meta-panel {
		display: grid;
		gap: 1.5rem;
	}

	.meta-section {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 1.25rem;
	}

	.meta-section h3 {
		font-family: var(--font-display);
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--color-text-tertiary);
		margin: 0 0 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.meta-list {
		margin: 0;
	}

	.meta-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.meta-item dt {
		font-family: var(--font-display);
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
	}

	.meta-item dd {
		font-family: var(--font-display);
		font-size: 0.75rem;
		color: var(--color-text-primary);
		margin: 0;
		padding: 0.25rem 0.5rem;
		background: var(--color-bg);
		border-radius: 4px;
	}

	.inputs-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	/* Danger Zone */
	.danger-zone {
		background: var(--color-surface);
		border: 1px solid var(--color-danger);
		border-radius: 12px;
		padding: 1.25rem;
	}

	.danger-zone h3 {
		font-family: var(--font-display);
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--color-danger);
		margin: 0 0 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.danger-zone > p {
		font-family: var(--font-display);
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		margin: 0 0 1rem;
		line-height: 1.4;
	}

	.delete-form {
		margin: 0;
	}

	.delete-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		background: transparent;
		border: 1px solid var(--color-danger);
		border-radius: 6px;
		color: var(--color-danger);
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}

	.delete-btn:hover {
		background: var(--color-danger);
		color: white;
	}

	.btn-icon {
		width: 14px;
		height: 14px;
	}

	@media (max-width: 1024px) {
		.edit-grid {
			grid-template-columns: 1fr;
		}

		.meta-panel {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 768px) {
		.header-content h1 {
			font-size: 1.75rem;
		}

		.meta-panel {
			grid-template-columns: 1fr;
		}
	}
</style>
