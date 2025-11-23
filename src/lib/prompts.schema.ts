import * as v from 'valibot';

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

export type CreatePrompt = v.InferInput<typeof CreatePromptSchema>;
export type UpdatePrompt = v.InferInput<typeof UpdatePromptSchema>;
export type DeletePrompt = v.InferInput<typeof DeletePromptSchema>;
