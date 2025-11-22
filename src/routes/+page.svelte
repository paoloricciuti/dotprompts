<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<div class="landing">
	<div class="background-effects">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="grid-overlay"></div>
	</div>

	<header class="nav">
		<div class="logo">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="logo-text">.prompts</span>
		</div>
		<a href={resolve('/login')} class="nav-login">Sign In</a>
	</header>

	<main class="hero">
		<div class="hero-content">
			<div class="badge">
				<span class="badge-dot"></span>
				MCP Server for AI Prompts
			</div>

			<h1 class="title">
				<span class="title-line">Your prompts,</span>
				<span class="title-line accent">beautifully organized</span>
			</h1>

			<p class="subtitle">
				Craft, curate, and deploy AI prompts as an MCP server. Connect to any MCP-compatible client
				and access your prompt library instantly.
			</p>

			<div class="cta-group">
				<a href={resolve('/login')} class="cta-primary">
					<span>Get Started</span>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</a>
				<a
					href="https://modelcontextprotocol.io"
					target="_blank"
					rel="noopener"
					class="cta-secondary"
				>
					Learn about MCP
				</a>
			</div>
		</div>

		<div class="hero-visual">
			<div class="terminal">
				<div class="terminal-header">
					<span class="terminal-dot red"></span>
					<span class="terminal-dot yellow"></span>
					<span class="terminal-dot green"></span>
					<span class="terminal-title">prompt.md</span>
				</div>
				<div class="terminal-body">
					<div class="code-line">
						<span class="line-number">1</span>
						<span class="code-comment"># Code Review Assistant</span>
					</div>
					<div class="code-line">
						<span class="line-number">2</span>
						<span class="code-text"></span>
					</div>
					<div class="code-line">
						<span class="line-number">3</span>
						<span class="code-text">Review the following code for:</span>
					</div>
					<div class="code-line">
						<span class="line-number">4</span>
						<span class="code-text">- Security vulnerabilities</span>
					</div>
					<div class="code-line">
						<span class="line-number">5</span>
						<span class="code-text">- Performance issues</span>
					</div>
					<div class="code-line">
						<span class="line-number">6</span>
						<span class="code-text">- Best practices</span>
					</div>
					<div class="code-line">
						<span class="line-number">7</span>
						<span class="code-text"></span>
					</div>
					<div class="code-line">
						<span class="line-number">8</span>
						<span class="code-text">Code: <span class="code-var">{'{{code}}'}</span></span>
					</div>
					<div class="code-line">
						<span class="line-number">9</span>
						<span class="code-text">Language: <span class="code-var">{'{{language}}'}</span></span>
					</div>
				</div>
			</div>
		</div>
	</main>

	<section class="features">
		<div class="feature">
			<div class="feature-icon">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
					/>
				</svg>
			</div>
			<h3>Prompts as Tools</h3>
			<p>Convert prompts to MCP tools for clients that don't support prompts natively.</p>
		</div>

		<div class="feature">
			<div class="feature-icon">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
				</svg>
			</div>
			<h3>Variable Templates</h3>
			<p>Define dynamic variables with {'{{mustache}}'} syntax for flexible, reusable prompts.</p>
		</div>

		<div class="feature">
			<div class="feature-icon">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
					/>
					<polyline points="3.27 6.96 12 12.01 20.73 6.96" />
					<line x1="12" y1="22.08" x2="12" y2="12" />
				</svg>
			</div>
			<h3>Remote MCP Server</h3>
			<p>Connect via URL from any MCP client. Your prompts, accessible everywhere.</p>
		</div>
	</section>

	<footer class="footer">
		<p>Built for developers who craft AI experiences</p>
	</footer>
</div>

<style>
	.landing {
		min-height: 100vh;
		background: var(--color-bg);
		position: relative;
		overflow: hidden;
	}

	/* Background Effects */
	.background-effects {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(100px);
	}

	.orb-1 {
		width: 600px;
		height: 600px;
		background: rgba(255, 62, 0, 0.15);
		top: -200px;
		left: -100px;
		animation: float 20s ease-in-out infinite;
	}

	.orb-2 {
		width: 500px;
		height: 500px;
		background: rgba(255, 87, 34, 0.08);
		bottom: -150px;
		right: -100px;
		animation: float 25s ease-in-out infinite reverse;
	}

	@keyframes float {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(30px, 20px);
		}
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 62, 0, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 62, 0, 0.03) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent);
	}

	/* Navigation */
	.nav {
		position: relative;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.dot {
		width: 6px;
		height: 6px;
		background: var(--color-accent);
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	.dot:nth-child(2) {
		animation-delay: 0.15s;
		background: var(--color-accent-dim);
	}

	.dot:nth-child(3) {
		animation-delay: 0.3s;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.4;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}

	.logo-text {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin-left: 4px;
	}

	.nav-login {
		font-family: var(--font-display);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		text-decoration: none;
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		transition: all 0.2s ease;
	}

	.nav-login:hover {
		color: var(--color-text-primary);
		border-color: var(--color-accent);
		background: var(--color-accent-subtle);
	}

	/* Hero Section */
	.hero {
		position: relative;
		z-index: 10;
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 2rem 6rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}

	.hero-content {
		max-width: 540px;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		padding: 0.5rem 1rem;
		border-radius: 100px;
		margin-bottom: 2rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		background: var(--color-accent);
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	.title {
		font-family: var(--font-display);
		font-size: 3.5rem;
		font-weight: 800;
		line-height: 1.1;
		margin: 0 0 1.5rem;
		letter-spacing: -0.02em;
	}

	.title-line {
		display: block;
		color: var(--color-text-primary);
	}

	.title-line.accent {
		color: var(--color-accent);
	}

	.subtitle {
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin: 0 0 2.5rem;
	}

	.cta-group {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.cta-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-bg);
		background: var(--color-accent);
		padding: 0.875rem 1.5rem;
		border-radius: 10px;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.cta-primary:hover {
		background: var(--color-accent-dim);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px -8px rgba(255, 62, 0, 0.5);
	}

	.cta-secondary {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		text-decoration: none;
		padding: 0.875rem 1.5rem;
		transition: color 0.2s ease;
	}

	.cta-secondary:hover {
		color: var(--color-text-primary);
	}

	/* Terminal Visual */
	.hero-visual {
		display: flex;
		justify-content: center;
	}

	.terminal {
		width: 100%;
		max-width: 420px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		overflow: hidden;
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.03),
			0 20px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0.875rem 1rem;
		background: var(--color-surface-elevated);
		border-bottom: 1px solid var(--color-border);
	}

	.terminal-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.terminal-dot.red {
		background: #ff5f57;
	}

	.terminal-dot.yellow {
		background: #febc2e;
	}

	.terminal-dot.green {
		background: #28c840;
	}

	.terminal-title {
		font-family: var(--font-display);
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
		margin-left: auto;
	}

	.terminal-body {
		padding: 1rem 0;
	}

	.code-line {
		display: flex;
		align-items: flex-start;
		padding: 0.125rem 1rem;
		font-family: var(--font-display);
		font-size: 0.8125rem;
		line-height: 1.6;
	}

	.line-number {
		width: 24px;
		color: var(--color-text-tertiary);
		user-select: none;
		flex-shrink: 0;
	}

	.code-comment {
		color: var(--color-text-tertiary);
	}

	.code-text {
		color: var(--color-text-secondary);
	}

	.code-var {
		color: var(--color-accent);
		font-weight: 500;
	}

	/* Features Section */
	.features {
		position: relative;
		z-index: 10;
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 2rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	.feature {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 16px;
		padding: 2rem;
		transition: all 0.2s ease;
	}

	.feature:hover {
		border-color: var(--color-accent);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px -8px rgba(255, 62, 0, 0.15);
	}

	.feature-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-accent-subtle);
		border-radius: 12px;
		color: var(--color-accent);
		margin-bottom: 1.25rem;
	}

	.feature h3 {
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0 0 0.75rem;
	}

	.feature p {
		font-family: var(--font-display);
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin: 0;
	}

	/* Footer */
	.footer {
		position: relative;
		z-index: 10;
		text-align: center;
		padding: 3rem 2rem;
		border-top: 1px solid var(--color-border-subtle);
	}

	.footer p {
		font-family: var(--font-display);
		font-size: 0.875rem;
		color: var(--color-text-tertiary);
		margin: 0;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.hero {
			grid-template-columns: 1fr;
			text-align: center;
			gap: 3rem;
		}

		.hero-content {
			max-width: 600px;
			margin: 0 auto;
		}

		.cta-group {
			justify-content: center;
		}

		.features {
			grid-template-columns: 1fr;
			max-width: 500px;
		}
	}

	@media (max-width: 768px) {
		.title {
			font-size: 2.5rem;
		}

		.subtitle {
			font-size: 1rem;
		}

		.cta-group {
			flex-direction: column;
		}

		.cta-primary,
		.cta-secondary {
			width: 100%;
			justify-content: center;
			text-align: center;
		}
	}

	@media (max-width: 480px) {
		.nav {
			padding: 1rem;
		}

		.hero {
			padding: 2rem 1rem 4rem;
		}

		.title {
			font-size: 2rem;
		}

		.features {
			padding: 2rem 1rem;
		}

		.feature {
			padding: 1.5rem;
		}
	}
</style>
