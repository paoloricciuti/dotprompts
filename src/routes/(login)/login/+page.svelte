<script lang="ts">
	import { login, login_with_google } from '$lib/auth.remote';
</script>

<main class="login-card">
	<div class="brand">
		<div class="logo-mark">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<h1>.prompts</h1>
		<p class="tagline">Craft. Curate. Create.</p>
	</div>

	<form {...login} class="login-form">
		<button type="submit" class="login-btn">
			<svg
				width="24"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
				class="github-icon"
			>
				<path
					d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
				/>
			</svg>
			<span>Continue with GitHub</span>
		</button>
	</form>

	<form {...login_with_google} class="login-form">
		<button type="submit" class="login-btn">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				viewBox="-3 0 262 262"
				preserveAspectRatio="xMidYMid"
				><path
					d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
					fill="#4285F4"
				/><path
					d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
					fill="#34A853"
				/><path
					d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
					fill="#FBBC05"
				/><path
					d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
					fill="#EB4335"
				/></svg
			>
			<span>Continue with Google</span>
		</button>
	</form>

	<footer class="login-footer">
		<p>Your prompts, beautifully organized</p>
	</footer>
</main>

<style>
	.login-card {
		width: 100%;
		max-width: 420px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 24px;
		padding: 3.5rem 2.5rem;
		position: relative;
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.03),
			0 20px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.brand {
		text-align: center;
		margin-bottom: 3rem;
	}

	.logo-mark {
		display: flex;
		justify-content: center;
		gap: 6px;
		margin-bottom: 1.5rem;
	}

	.dot {
		width: 8px;
		height: 8px;
		background: var(--color-accent);
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	.dot:nth-child(2) {
		animation-delay: 0.2s;
		background: var(--color-accent-dim);
	}

	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.4;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.1);
		}
	}

	h1 {
		font-family: var(--font-display);
		font-size: 2.75rem;
		font-weight: 900;
		color: var(--color-text-primary);
		margin: 0 0 0.5rem;
		letter-spacing: -0.02em;
	}

	.tagline {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 300;
		color: var(--color-text-secondary);
		margin: 0;
		letter-spacing: 0.15em;
		text-transform: uppercase;
	}

	.login-form {
		margin-bottom: 1rem;
	}

	.login-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		background: var(--color-surface-elevated);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		color: var(--color-text-primary);
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			color 0.2s ease,
			transform 0.2s ease;
	}

	.login-btn:hover {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: var(--color-bg);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px -8px rgba(255, 62, 0, 0.4);
	}

	.login-btn:active {
		transform: translateY(0);
	}

	.github-icon {
		width: 20px;
		height: 20px;
	}

	.login-footer {
		margin-top: 2.5rem;
		text-align: center;
	}

	.login-footer p {
		font-family: var(--font-display);
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		margin: 0;
	}

	@media (max-width: 480px) {
		.login-card {
			padding: 2.5rem 1.5rem;
		}

		h1 {
			font-size: 2.25rem;
		}
	}
</style>
