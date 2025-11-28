import { cors } from '$lib';
import { auth } from '$lib/auth.js';
import { create_server } from '$lib/mcp/index.js';
import { withMcpAuth } from 'better-auth/plugins';

const handler = withMcpAuth(auth, async (request, session) => {
	const transport = await create_server(session);
	return (await transport.respond(request)) ?? new Response('', { status: 404 });
});

export function GET() {
	// 405 since on vercel the SSE stream would still fail after 5 minutes
	return new Response(null, { status: 405 });
}

export async function POST({ request }) {
	const response = await handler(request);
	if (response) {
		response.headers.set('Access-Control-Allow-Origin', '*');
		response.headers.set('Access-Control-Allow-Headers', '*');
	}
	return response;
}

export async function DELETE({ request }) {
	const response = await handler(request);
	if (response) {
		response.headers.set('Access-Control-Allow-Origin', '*');
		response.headers.set('Access-Control-Allow-Headers', '*');
	}
	return response;
}

export const OPTIONS = cors;
