import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './server/db';
import {
	BETTER_AUTH_URL,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';
import { mcp } from 'better-auth/plugins';

export const auth = betterAuth({
	plugins: [
		mcp({
			loginPage: '/login'
		})
	],
	baseURL: BETTER_AUTH_URL,
	emailAndPassword: {
		enabled: false
	},
	socialProviders: {
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
			redirectURI: BETTER_AUTH_URL + '/api/auth/callback/github'
		},
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			redirectURI: BETTER_AUTH_URL + '/api/auth/callback/google'
		}
	},
	database: drizzleAdapter(db, {
		provider: 'sqlite'
	})
});
