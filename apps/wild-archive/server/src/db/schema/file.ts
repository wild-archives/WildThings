import { sql } from "drizzle-orm";
import {
	pgTable,
	integer,
	numeric,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { users } from "./user.ts";

/**
 * 文件管理表：管理用户上传的文件，文件存储在 S3。
 */
export const files = pgTable("files", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(), // 文件的唯一标识符，自动生成的主键。
	user_id: integer("user_id")
		.notNull()
		.references(() => users.id), // 引用用户表中的用户 ID，不能为空。
	file_key: varchar("file_key", { length: 255 }).notNull(), // 文件在 S3 中的唯一标识符，用于定位文件。
	file_name: varchar("file_name", { length: 255 }).notNull(), // 用户上传的文件名。
	file_size: numeric("file_size").notNull(), // 文件大小，以字节为单位。
	content_type: varchar("content_type", { length: 100 }).notNull(), // 文件的 MIME 类型。
	uploaded_at: timestamp("uploaded_at").default(sql`now()`).notNull(), // 文件上传时间，默认当前时间。
});
