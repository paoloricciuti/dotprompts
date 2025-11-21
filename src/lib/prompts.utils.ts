import { user as get_user } from '$lib/auth.remote';
import { and, desc, eq } from 'drizzle-orm';
import * as v from 'valibot';
import { db } from './server/db';
import { prompts } from './server/db/schema';
function extract_inputs(prompt: string) {
	const regex = /\{\{(.*?)\}\}/g;
	return [...prompt.matchAll(regex)].map((match) => match[1].trim()).join(',');
}

export const CreatePromptSchema = v.object({
	title: v.pipe(
		v.string(),
		v.nonEmpty('Title is required'),
		v.description('The title of the prompt')
	),
	description: v.pipe(
		v.string(),
		v.nonEmpty('Description is required'),
		v.description('The description of the prompt')
	),
	prompt: v.pipe(
		v.string(),
		v.nonEmpty('Prompt is required'),
		v.description(
			'The acual prompt, it can use variables like this {{variable_name}} that will be substituted when invoked with the respective input'
		)
	),
	as_tool: v.pipe(
		v.optional(v.boolean()),
		v.description('Whether to expose this prompt also as a tool (other than a prompt) in MCP')
	)
});

export const UpdatePromptSchema = v.object({
	id: v.pipe(v.string(), v.description('The id of the prompt to update')),
	title: v.pipe(
		v.string(),
		v.nonEmpty('Title is required'),
		v.description('The title of the prompt')
	),
	description: v.pipe(
		v.string(),
		v.nonEmpty('Description is required'),
		v.description('The description of the prompt')
	),
	prompt: v.pipe(
		v.string(),
		v.nonEmpty('Prompt is required'),
		v.description(
			'The acual prompt, it can use variables like this {{variable_name}} that will be substituted when invoked with the respective input'
		)
	),
	as_tool: v.pipe(
		v.optional(v.boolean(), false),
		v.description('Whether to expose this prompt also as a tool (other than a prompt) in MCP')
	)
});

export const DeletePromptSchema = v.object({
	id: v.pipe(v.string(), v.description('The id of the prompt to delete'))
});

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
	{ prompt, title, description, as_tool }: v.InferInput<typeof CreatePromptSchema>,
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
	{ id, prompt, title, description, as_tool }: v.InferInput<typeof UpdatePromptSchema>,
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

export async function delete_prompt(
	{ id }: v.InferInput<typeof DeletePromptSchema>,
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
	await db.delete(prompts).where(and(eq(prompts.id, id), eq(prompts.user_id, user.user.id)));
}
