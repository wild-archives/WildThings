import {
	boolean,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import { users } from "./user.ts";
import { attributeTypesEnum, visibility_enum } from "./common.ts";
import { sql } from "drizzle-orm";
import { files } from "./file.ts";

export const archives = pgTable("archives", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	user_id: integer().references(() => users.id),
	is_verified: boolean().default(false),
	visibility: visibility_enum().default("public"),
	password: varchar({ length: 255 }),
	created_at: timestamp("created_at").default(sql`now()`).notNull(),
	avatar: integer().references(() => files.id),
});

/**
 * 属性分类枚举：定义用户属性的分类。
 */
export const archiveAttributeCategoryEnum = pgEnum("archive_attribute_category", [
	"species", // 种族信息
	"personality", // 个性信息
]);

/**
 * 设定属性定义表：定义用户可拥有的额外属性。
 */
export const archiveExtraAttributeKeys = pgTable("archive_extra_attribute_keys", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(), // 属性的唯一标识符，自动生成的主键。
	attribute_key: varchar("attribute_key", { length: 50 }).notNull().unique(), // 属性的名称，例如 "birthday", "hobbies", "mood" 等，必须唯一。
	description: text("description"), // 对属性的描述。
	type: attributeTypesEnum("type").notNull(), // 属性的类型，使用 attributeTypesEnum 来限定。
	category: archiveAttributeCategoryEnum("species").notNull(), // 属性的分类，使用 attributeCategoryEnum 来限定。
	is_public: boolean("is_public").default(false).notNull(), // 是否对外展示，由管理员设定，默认不对外展示。
});

/**
 * 设定额外属性值表：存储每个用户的额外属性值。
 */
export const archiveExtraAttributeValues = pgTable(
	"archive_extra_attribute_values",
	{
		archive_id: integer("archive_id")
			.notNull()
			.references(() => archives.id), // 引用用户表中的用户 ID，不能为空。
		extra_key_id: integer("extra_key_id")
			.notNull()
			.references(() => archiveExtraAttributeKeys.id), // 引用属性定义表中的属性 ID，不能为空。
		value: jsonb(),
		user_is_public: boolean("user_is_public").default(false).notNull(), // 用户可以设定该属性是否对外公开，默认不公开。
	},
	(table) => [
		{
			pk: primaryKey({ columns: [table.archive_id, table.extra_key_id] }), // 以用户 ID 和属性 ID 为主键。
			archive_id_idx: uniqueIndex("archive_id_idx").on(table.archive_id),
		},
	],
);


