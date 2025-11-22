<script lang="ts">
	import { resolve } from '$app/paths';
	import Chip from '$lib/components/Chip.svelte';
	import Prompt from '$lib/components/Prompt.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import { create_prompt, delete_prompt, get_prompts } from '$lib/prompts.remote';

	const prompts = $derived(await get_prompts());
</script>

<svelte:head>
	<title>Dashboard | .prompts</title>
</svelte:head>

<div class="dashboard">
	<header class="page-header">
		<div class="header-content">
			<h1>Your Prompts</h1>
			<p class="header-subtitle">Manage your AI prompt configurations</p>
		</div>
		<div class="header-stats">
			<div class="stat-badge">
				<span class="stat-value">{prompts.length}</span>
				<span class="stat-label">{prompts.length === 1 ? 'prompt' : 'prompts'}</span>
			</div>
		</div>
	</header>

	<div class="dashboard-grid">
		<section class="create-panel">
			<div class="panel-header">
				<span class="panel-indicator"></span>
				<h2>New Prompt</h2>
			</div>

			<form {...create_prompt} class="create-form">
				<div class="form-field">
					<label for="prompt-title" class="field-label">
						<span class="label-text">title</span>
						<span class="label-hint">string</span>
					</label>
					<input
						id="prompt-title"
						{...create_prompt.fields.title.as('text')}
						class="text-input"
						placeholder="my-awesome-prompt"
					/>
					{#each create_prompt.fields.title.issues() as issue, i (i)}
						<p class="field-error">{issue.message}</p>
					{/each}
				</div>

				<div class="form-field">
					<label for="prompt-title" class="field-label">
						<span class="label-text">description</span>
						<span class="label-hint">string</span>
					</label>
					<input
						id="prompt-title"
						{...create_prompt.fields.description.as('text')}
						class="text-input"
						placeholder="what-is-this-prompt-about"
					/>
					{#each create_prompt.fields.description.issues() as issue, i (i)}
						<p class="field-error">{issue.message}</p>
					{/each}
				</div>

				<div class="form-field">
					<label for="prompt-content" class="field-label">
						<span class="label-text">content</span>
						<span class="label-hint">text</span>
					</label>
					<textarea
						{...create_prompt.fields.prompt.as('text')}
						id="prompt-content"
						class="textarea-input"
						placeholder="You are a helpful assistant that..."
						rows="7"
					></textarea>
					{#each create_prompt.fields.prompt.issues() as issue, i (i)}
						<p class="field-error">{issue.message}</p>
					{/each}
				</div>

				<div class="form-field">
					<Toggle id="prompt-as-tool" {...create_prompt.fields.as_tool.as('checkbox')}>
						<div>
							<span class="label-text">as tool</span>
							<span class="label-hint">boolean</span>
						</div>
						<small class="hint"
							>Some MCP clients don't support prompts...adding this prompt as a tool would allow you
							to still calling it indirectly</small
						>
					</Toggle>
					{#each create_prompt.fields.as_tool.issues() as issue, i (i)}
						<p class="field-error">{issue.message}</p>
					{/each}
				</div>

				<button type="submit" class="create-btn">
					<span class="btn-prefix">+</span>
					<span>Create Prompt</span>
				</button>
			</form>
		</section>

		<section class="url-panel">
			<div class="panel-header">
				<span class="panel-indicator"></span>
				<h2>URL</h2>
			</div>
			<div class="url-content">
				<p>You can setup this MCP server by adding a remote server with this URL.</p>
				<code>https://dotprompts.com/mcp</code>
			</div>
		</section>

		<section class="prompts-panel">
			<div class="panel-header">
				<span class="panel-indicator"></span>
				<h2>Collection</h2>
			</div>

			{#if prompts.length === 0}
				<div class="empty-state">
					<div class="empty-terminal">
						<div class="terminal-line">
							<span class="terminal-prompt">$</span>
							<span class="terminal-command">ls ~/.prompts/</span>
						</div>
						<div class="terminal-output">No prompts found</div>
					</div>
					<p class="empty-hint">Create your first prompt to populate your collection</p>
				</div>
			{:else}
				<div class="prompts-list">
					{#each prompts as prompt (prompt.id)}
						<article class="prompt-card">
							<div class="card-header">
								<h3 class="prompt-title">
									<a href={resolve('/(protected)/[id]', { id: prompt.id })}>
										{prompt.title}
									</a>
								</h3>
							</div>
							<div class="prompt-preview">
								<code><Prompt prompt={prompt.prompt} /></code>
							</div>
							{#if prompt.inputs}
								<div class="prompt-inputs">
									{#each prompt.inputs
										.split(',')
										.map((s) => s.trim())
										.filter(Boolean) as variable (variable)}
										<Chip {variable} />
									{/each}
								</div>
							{/if}
							<div class="card-actions">
								<a href={resolve('/(protected)/[id]', { id: prompt.id })} class="action-btn">
									<svg height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
										><path
											fill="currentColor"
											d="M18 2h-2v2h-2v2h-2v2h-2v2H8v2H6v2H4v2H2v6h6v-2h2v-2h2v-2h2v-2h2v-2h2v-2h2V8h2V6h-2V4h-2zm0 8h-2v2h-2v2h-2v2h-2v2H8v-2H6v-2h2v-2h2v-2h2V8h2V6h2v2h2zM6 16H4v4h4v-2H6z"
										/></svg
									>
									<span>Edit</span>
								</a>
								<form {...delete_prompt.for(prompt.id)}>
									<input {...delete_prompt.fields.id.as('hidden', prompt.id)} />

									<button class="action-btn action-danger">
										<svg height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
											><path
												fill="currentColor"
												d="M16 2v4h6v2h-2v14H4V8H2V6h6V2zm-2 2h-4v2h4zm0 4H6v12h12V8zm-5 2h2v8H9zm6 0h-2v8h2z"
											/></svg
										>
										<span>Delete</span>
									</button>
								</form>
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</div>

<style>
	.dashboard {
		display: grid;
		gap: 2.5rem;
	}

	/* Page Header */
	.page-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
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

	.stat-badge {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 8px;
	}

	.stat-value {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-accent);
	}

	.stat-label {
		font-family: var(--font-display);
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Dashboard Grid */
	.dashboard-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto 1fr;
		gap: 2rem;
		align-items: start;
	}

	.create-panel {
		grid-row: 1 / -1;
	}

	/* Panel Styling */
	.create-panel,
	.prompts-panel,
	.url-panel {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		overflow: hidden;
	}

	.url-content {
		padding: 1.25rem;
		color: var(--color-text-primary);
		font-family: var(--font-display);
		font-size: 0.75rem;
		code {
			font-size: 1rem;
		}
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

	/* Create Form */
	.create-form {
		display: grid;
		gap: 1.25rem;
		padding: 1.25rem;
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

	.hint {
		font-family: var(--font-display);
		color: var(--color-text-secondary);
		font-size: 0.75rem;
		display: block;
		margin-block: 0.5rem;
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
		min-height: 100px;
		line-height: 1.6;
	}

	.create-btn {
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

	.create-btn:hover {
		background: var(--color-accent-dim);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px -4px rgba(255, 62, 0, 0.5);
	}

	.create-btn:active {
		transform: translateY(0);
	}

	.btn-prefix {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 700;
	}

	/* Empty State */
	.empty-state {
		padding: 3rem 2rem;
		text-align: center;
	}

	.empty-terminal {
		display: inline-block;
		text-align: left;
		padding: 1rem 1.25rem;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		margin-bottom: 1rem;
	}

	.terminal-line {
		display: flex;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 0.8125rem;
	}

	.terminal-prompt {
		color: var(--color-accent);
	}

	.terminal-command {
		color: var(--color-text-primary);
	}

	.terminal-output {
		font-family: var(--font-display);
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
		margin-top: 0.5rem;
		font-style: italic;
	}

	.empty-hint {
		font-family: var(--font-display);
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
		margin: 0;
	}

	/* Prompts List */
	.prompts-list {
		display: grid;
		gap: 1px;
		background: var(--color-border);
	}

	.prompt-card {
		background: var(--color-surface);
		padding: 1rem 1.25rem;
		transition: background 0.15s ease;
	}

	.prompt-card:hover {
		background: var(--color-surface-elevated);
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.prompt-title {
		font-family: var(--font-display);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0;
	}

	.prompt-title a {
		color: inherit;
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.prompt-title a:hover {
		color: var(--color-accent);
	}

	.prompt-preview {
		margin-bottom: 0.75rem;
	}

	code {
		font-family: var(--font-display);
		font-size: 0.75rem;
		background-color: var(--color-surface-light);
		color: var(--color-text-secondary);
		line-height: 1.5;
		display: -webkit-box;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		user-select: all;
		padding: 0.5rem;
	}

	.prompt-inputs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-bottom: 0.75rem;
	}

	.card-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}

	.action-btn {
		display: inline-flex;
		cursor: pointer;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.625rem;
		background: transparent;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		color: var(--color-text-secondary);
		font-family: var(--font-display);
		font-size: 0.6875rem;
		font-weight: 500;
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease;
	}

	.action-danger {
		border-color: var(--color-danger);
		color: var(--color-danger);
	}

	.action-btn:hover {
		background: var(--color-accent-subtle);
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.action-icon {
		width: 10px;
		height: 10px;
	}

	@media (max-width: 1024px) {
		.dashboard-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.header-content h1 {
			font-size: 1.75rem;
		}
	}
</style>
