import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { user } from './auth-schema';
import { sql } from 'drizzle-orm';

export const prompts = sqliteTable('prompts', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	user_id: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	description: text('description').notNull(),
	prompt: text('prompt').notNull(),
	as_tool: integer('as_tool', { mode: 'boolean' }).default(false),
	inputs: text('inputs').default(''),
	created_at: integer('created_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
	updated_at: integer('updated_at', { mode: 'timestamp_ms' })
		.$onUpdate(() => new Date())
		.notNull()
});

export * from './auth-schema';
