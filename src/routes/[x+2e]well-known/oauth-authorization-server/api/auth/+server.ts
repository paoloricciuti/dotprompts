import { oAuthDiscoveryMetadata } from 'better-auth/plugins';
import { auth } from '$lib/auth';
import { cors } from '$lib';

const handler = oAuthDiscoveryMetadata(auth);

export async function GET({ request }) {
	return handler(request);
}

export const OPTIONS = cors;
