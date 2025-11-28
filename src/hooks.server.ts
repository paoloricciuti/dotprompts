import { auth } from '$lib/auth';
import { isAuthPath, svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { cors } from '$lib';

export const handle = sequence(
	async ({ event, resolve }) => {
		if (
			event.route.id === '/' &&
			(await auth.api.getSession({
				headers: event.request.headers
			}))
		) {
			redirect(302, '/dashboard');
		}
		return resolve(event);
	},
	async ({ event, resolve }) => {
		if (event.request.method === 'OPTIONS' && isAuthPath(event.url.toString(), {})) {
			return cors();
		}
		return resolve(event);
	},
	async ({ event, resolve }) => {
		return svelteKitHandler({ event, resolve, auth, building });
	}
);
