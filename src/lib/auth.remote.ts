import { form, getRequestEvent, query } from '$app/server';
import { BETTER_AUTH_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { auth } from './auth';
import { parseString } from 'set-cookie-parser';

export const user = query(async () => {
	const { request } = getRequestEvent();
	const user = await auth.api.getSession({
		headers: request.headers
	});
	if (!user) {
		redirect(302, '/login');
	}
	return user;
});

async function login_social(provider: 'github' | 'google') {
	const { cookies } = getRequestEvent();
	const response = await auth.api.signInSocial({
		returnHeaders: true,
		body: {
			provider,
			callbackURL: BETTER_AUTH_URL + '/dashboard'
		}
	});

	const set_cookie = response.headers.get('set-cookie');
	if (set_cookie) {
		const { name, value, ...options } = parseString(set_cookie);
		cookies.set(name, value, options as never);
	}
	if (response.response.redirect && response.response.url) {
		redirect(302, response.response.url!);
	}
}

export const login = form(async () => {
	await login_social('github');
});

export const login_with_google = form(async () => {
	await login_social('google');
});

export const logout = form(async () => {
	const { request, cookies } = getRequestEvent();
	const response = await auth.api.signOut({
		returnHeaders: true,
		headers: request.headers
	});

	const set_cookie = response.headers.get('set-cookie');
	if (set_cookie) {
		const { name, value, ...options } = parseString(set_cookie);
		cookies.set(name, value, options as never);
	}
});
