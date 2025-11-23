import { user as get_user } from '$lib/auth.remote';
import { and, desc, eq } from 'drizzle-orm';
import { extract_inputs } from './inputs.utils';
import type { CreatePrompt, DeletePrompt, UpdatePrompt } from './prompts.schema';
import { db } from './server/db';
import { prompts } from './server/db/schema';

export async function user_or_fallback(id?: string) {
	return id ? { user: { id } } : await get_user();
}

export async function get_prompts(id?: string) {
	const user = await user_or_fallback(id);
	return await db
		.select()
		.from(prompts)
		.where(eq(prompts.user_id, user.user.id))
		.orderBy(desc(prompts.created_at));
}

export async function create_prompt(
	{ prompt, title, description, as_tool }: CreatePrompt,
	id?: string
) {
	const user = await user_or_fallback(id);
	const [inserted_prompt] = await db
		.insert(prompts)
		.values({
			user_id: user.user.id,
			title,
			prompt,
			description,
			as_tool,
			inputs: extract_inputs(prompt)
		})
		.returning();
	return inserted_prompt;
}

export async function update_prompt(
	{ id, prompt, title, description, as_tool }: UpdatePrompt,
	user_id?: string
) {
	const user = await user_or_fallback(user_id);

	// Verify ownership
	const existing = await db
		.select()
		.from(prompts)
		.where(and(eq(prompts.id, id), eq(prompts.user_id, user.user.id)))
		.get();

	if (!existing) {
		throw new Error('Forbidden');
	}

	const [updated] = await db
		.update(prompts)
		.set({
			title,
			prompt,
			description,
			as_tool,
			inputs: extract_inputs(prompt),
			updated_at: new Date()
		})
		.where(and(eq(prompts.id, id), eq(prompts.user_id, user.user.id)))
		.returning();
	return updated;
}

export async function delete_prompt({ id }: DeletePrompt, user_id?: string) {
	const user = await user_or_fallback(user_id);

	// Verify ownership
	const existing = await db
		.select()
		.from(prompts)
		.where(and(eq(prompts.id, id), eq(prompts.user_id, user.user.id)))
		.get();

	if (!existing) {
		throw new Error('Forbidden');
	}
	await db.delete(prompts).where(and(eq(prompts.id, id), eq(prompts.user_id, user.user.id)));
}
