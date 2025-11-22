import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';

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
	({ event, resolve }) => {
		return svelteKitHandler({ event, resolve, auth, building });
	}
);
