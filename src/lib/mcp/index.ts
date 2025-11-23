#!/usr/bin/env node

import { McpServer, type Icons } from 'tmcp';
import { ValibotJsonSchemaAdapter } from '@tmcp/adapter-valibot';
import * as v from 'valibot';
import { HttpTransport } from '@tmcp/transport-http';
import type { OAuthAccessToken } from 'better-auth/plugins';
import { db } from '$lib/server/db';
import { prompts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { prompt, tool } from 'tmcp/utils';
import { create_prompt, update_prompt, delete_prompt, get_prompts } from '$lib/prompts.utils';
import { CreatePromptSchema, UpdatePromptSchema, DeletePromptSchema } from '$lib/prompts.schema';
import slugify from 'slugify';
import logo from '$lib/assets/logo.png?inline';

const icons: Icons['icons'] = [
	{
		src: logo,
		mimeType: 'image/png'
	}
];

export async function create_server(session: OAuthAccessToken) {
	const user_prompts = await db.select().from(prompts).where(eq(prompts.user_id, session.userId));

	const server = new McpServer(
		{
			name: 'dotprompts',
			version: '1.0.0',
			description: 'All your favorite prompts, wherever you need them.',
			icons
		},
		{
			adapter: new ValibotJsonSchemaAdapter(),
			capabilities: {
				tools: {},
				prompts: {}
			}
		}
	);

	server.tool(
		{
			name: 'create-prompt',
			description: 'Create a new prompt to your personal collection',
			schema: CreatePromptSchema,
			title: 'Create a new prompt',
			icons
		},
		async (prompt) => {
			try {
				const inserted = await create_prompt(prompt, session.userId);
				return tool.text(JSON.stringify(inserted));
			} catch {
				return tool.error("Can't create this prompt");
			}
		}
	);

	server.tool(
		{
			name: 'update-prompt',
			description: 'Update an existing prompt with new information',
			schema: UpdatePromptSchema,
			title: 'Update an existing prompt',
			icons
		},
		async (prompt) => {
			try {
				const updated = await update_prompt(prompt, session.userId);
				return tool.text(JSON.stringify(updated));
			} catch {
				return tool.error("Can't update a prompt that is not yours");
			}
		}
	);

	server.tool(
		{
			name: 'delete-prompt',
			description: 'Delete an existing prompt with new information',
			schema: DeletePromptSchema,
			title: 'Delete an existing prompt',
			icons,
			annotations: {
				destructiveHint: true
			}
		},
		async (prompt) => {
			try {
				await delete_prompt(prompt, session.userId);
				return tool.text('Deleted successfully');
			} catch {
				return tool.error("Can't delete a prompt that is not yours");
			}
		}
	);

	server.tool(
		{
			name: 'list-prompts',
			description: 'List the available prompts',
			title: 'List the available prompts',
			icons,
			annotations: {
				readOnlyHint: true
			}
		},
		async () => {
			try {
				const prompts = await get_prompts(session.userId);
				return tool.text(JSON.stringify(prompts));
			} catch {
				return tool.error('You need to be logged in to see your prompts');
			}
		}
	);

	for (const user_prompt of user_prompts) {
		let schema: v.ObjectSchema<Record<string, v.StringSchema<undefined>>, undefined> | undefined;
		let variables: string[] = [];
		if (user_prompt.inputs) {
			variables = user_prompt.inputs.split(',');
			schema = v.object(Object.fromEntries(variables.map((variable) => [variable, v.string()])));
		}

		function get_prompt(inputs: Record<string, string>) {
			let message = user_prompt.prompt;
			for (const variable of variables) {
				let input = inputs[variable];
				input = input.replace(new RegExp(`{{(${variables.join('|')})}}`, 'g'), (_, $1) => {
					return `\\{\\{${$1}\\}\\}`;
				});
				message = message.replaceAll(`{{${variable}}}`, input);
			}
			return message;
		}

		if (user_prompt.as_tool) {
			server.tool(
				{
					name: 'get-prompt-' + slugify(user_prompt.title),
					description: user_prompt.description,
					title: "Get the '" + user_prompt.title + "' prompt",
					schema,
					icons,
					annotations: {
						readOnlyHint: true
					}
				},
				async (inputs) => {
					return tool.text(get_prompt(inputs));
				}
			);
		}

		server.prompt(
			{
				name: slugify(user_prompt.title),
				description: user_prompt.description,
				title: slugify(user_prompt.title),
				schema
			},
			async (inputs) => {
				return prompt.message(get_prompt(inputs));
			}
		);
	}

	return new HttpTransport(server, {
		path: null,
		cors: true
	});
}
