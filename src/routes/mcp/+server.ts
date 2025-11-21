import { auth } from '$lib/auth.js';
import { create_server } from '$lib/mcp/index.js';
import { withMcpAuth } from 'better-auth/plugins';

const handler = withMcpAuth(auth, async (request, session) => {
	const transport = await create_server(session);
	return (await transport.respond(request)) ?? new Response('', { status: 404 });
});

export function GET({ request }) {
	return handler(request);
}

export function POST({ request }) {
	return handler(request);
}

export function DELETE({ request }) {
	return handler(request);
}
