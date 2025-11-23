import { form, query } from '$app/server';
import { db } from '$lib/server/db';
import { prompts } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import * as v from 'valibot';
import { CreatePromptSchema, UpdatePromptSchema } from '$lib/prompts.schema';
import {
	create_prompt as do_create_prompt,
	delete_prompt as do_delete_prompt,
	get_prompts as do_get_prompts,
	update_prompt as do_update_prompt,
	user_or_fallback
} from './prompts.utils';

export const get_prompts = query(async () => {
	return await do_get_prompts();
});

export const get_prompt = query(v.string(), async (id) => {
	const user = await user_or_fallback();
	const prompt = await db
		.select()
		.from(prompts)
		.where(and(eq(prompts.id, id), eq(prompts.user_id, user.user.id)))
		.get();

	if (!prompt) {
		error(404, 'Prompt not found');
	}

	return prompt;
});

export const create_prompt = form(CreatePromptSchema, async (prompt) => {
	await do_create_prompt(prompt);
	// Refresh prompts
	await get_prompts().refresh();
});

export const update_prompt = form(UpdatePromptSchema, async (prompt) => {
	try {
		await do_update_prompt(prompt);
	} catch {
		error(403, 'Forbidden');
	}
	await get_prompts().refresh();
	await get_prompt(prompt.id).refresh();
});

export const delete_prompt = form(
	v.object({
		id: v.string()
	}),
	async (prompt) => {
		try {
			await do_delete_prompt(prompt);
		} catch {
			error(403, 'Forbidden');
		}
		await get_prompts().refresh();
	}
);
