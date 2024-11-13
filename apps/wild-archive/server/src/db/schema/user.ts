import {
	boolean,
	date,
	foreignKey,
	integer,
	jsonb,
	numeric,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	text,
	time,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { files } from "./file.ts";
import { attributeTypesEnum } from "./common.ts";

export const user_roles = pgEnum("user_roles", ["admin", "user"]);

/**
 * 用户表：存储必要的用户信息。
 */
export const users = pgTable("users", {
	id: text("id").primaryKey(), // 用户唯一标识符，自动生成的主键。
	name: varchar({ length: 255 }).notNull().unique(), // 用户的真实姓名，不能为空。
	email: varchar({ length: 255 }).notNull().unique(), // 用户的电子邮件，不能为空且唯一。
	email_verified: boolean('email_verified').notNull(),
	password: varchar({ length: 255 }).notNull(), // 用户密码，不能为空。
	nickname: varchar({ length: 255 }), // 用户的昵称，可选字段。
	avatar: integer("avatar"), // 用户头像
	banner: integer("banner"), // 个人主页封面
	bio: text("bio"), // 个人简介
	created_at: timestamp("created_at").default(sql`now()`).notNull(), // 用户创建时间，默认当前时间。
	updated_at: timestamp('updated_at').notNull(),
	last_seen_at: timestamp("last_seen_at"), // 用户最后一次登录时间。
	role: user_roles("role").default("user").notNull(), // 用户角色，使用 user_roles 枚举，必须指定。
});

/**
 * 属性分类枚举：定义用户属性的分类。
 */
export const userAttributeCategoryEnum = pgEnum("user_attribute_category", [
	"personal", // 个人信息
	"social", // 社交信息
]);

/**
 * 用户属性定义表：定义用户可拥有的额外属性。
 */
export const extraAttributeKeys = pgTable("user_extra_attribute_keys", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(), // 属性的唯一标识符，自动生成的主键。
	attribute_key: varchar("attribute_key", { length: 50 }).notNull().unique(), // 属性的名称，例如 "birthday", "hobbies", "mood" 等，必须唯一。
	description: text("description"), // 对属性的描述。
	type: attributeTypesEnum("type").notNull(), // 属性的类型，使用 attributeTypesEnum 来限定。
	category: userAttributeCategoryEnum("category").notNull(), // 属性的分类，使用 attributeCategoryEnum 来限定。
	is_public: boolean("is_public").default(false).notNull(), // 是否对外展示，由管理员设定，默认不对外展示。
});

/**
 * 用户额外属性值表：存储每个用户的额外属性值。
 */
export const extraAttributeValues = pgTable(
	"user_extra_attribute_values",
	{
		user_id: text("user_id")
			.notNull()
			.references(() => users.id), // 引用用户表中的用户 ID，不能为空。
		extra_key_id: integer("extra_key_id")
			.notNull()
			.references(() => extraAttributeKeys.id), // 引用属性定义表中的属性 ID，不能为空。
		value: jsonb(),
		user_is_public: boolean("user_is_public").default(false).notNull(), // 用户可以设定该属性是否对外公开，默认不公开。
	},
	(table) => [
		{
			pk: primaryKey({ columns: [table.user_id, table.extra_key_id] }), // 以用户 ID 和属性 ID 为主键。
			user_id_idx: uniqueIndex("user_id_idx").on(table.user_id),
		},
	],
);


