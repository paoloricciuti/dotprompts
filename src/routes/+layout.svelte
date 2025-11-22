<script lang="ts">
	import '@fontsource-variable/fira-code';
	import './layout.css';
	import favicon from '$lib/assets/logo.svg';
	import { page } from '$app/state';

	let { children } = $props();

	const description =
		'All your prompts in one place. Organize, manage, and access your AI prompts with ease using .prompts.';
	const title = '.prompts';
	const og_image = '/og.png';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content={description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={page.url.toString()} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={og_image} />
	<meta name="twitter:image:alt" content={title} />
	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.toString()} />
	<meta property="og:image" content={og_image} />
	<meta property="og:image:alt" content={title} />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="1008" />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content=".prompts" />
	<meta property="og:locale" content="EN_US" />
</svelte:head>

{@render children?.()}
