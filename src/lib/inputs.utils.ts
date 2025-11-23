export function extract_inputs(prompt: string) {
	const regex = /\{\{(.*?)\}\}/g;
	return [...new Set([...prompt.matchAll(regex)].map((match) => match[1].trim()))].join(',');
}
