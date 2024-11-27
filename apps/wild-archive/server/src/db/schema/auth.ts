import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user.ts';

/**
 * 会话表：存储用户的登录会话信息
 */
export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 36 }).primaryKey(), // 会话ID，使用UUID格式
  expires_at: timestamp('expires_at').notNull(), // 会话过期时间
  ip_address: varchar('ip_address', { length: 45 }), // 用户IP地址，支持IPv4和IPv6
  user_agent: varchar('user_agent', { length: 255 }), // 用户浏览器和设备信息
  user_id: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => users.id), // 关联的用户ID
  created_at: timestamp('created_at').notNull(), // 记录创建时间
  updated_at: timestamp('updated_at').notNull(), // 记录更新时间
  token: varchar('token', { length: 255 }),
});

/**
 * 账户表：存储用户的第三方账号关联信息
 */
export const accounts = pgTable('accounts', {
  id: varchar('id', { length: 36 }).primaryKey(), // 账户记录ID
  account_id: varchar('account_id', { length: 36 }).notNull(), // 第三方平台的账户ID
  provider_id: varchar('provider_id', { length: 36 }).notNull(), // 第三方平台标识（如：github、google等）
  user_id: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => users.id), // 关联的用户ID
  access_token: varchar('access_token', { length: 255 }), // OAuth访问令牌
  refresh_token: varchar('refresh_token', { length: 255 }), // OAuth刷新令牌
  id_token: varchar('id_token', { length: 255 }), // OAuth身份令牌
  access_token_expires_at: timestamp('access_token_expires_at'), // 令牌过期时间
  refresh_token_expires_at: timestamp('refresh_token_expires_at'), // 刷新令牌过期时间
  password: varchar('password', { length: 255 }), // 加密后的密码哈希
  scope: varchar('scope', { length: 255 }), // 访问范围
  created_at: timestamp('created_at').notNull(), // 记录创建时间
  updated_at: timestamp('updated_at').notNull(), // 记录更新时间
});

/**
 * 验证表：存储邮箱验证、重置密码等验证信息
 */
export const verifications = pgTable('verifications', {
  id: varchar('id', { length: 36 }).primaryKey(), // 验证记录ID
  identifier: varchar('identifier', { length: 255 }).notNull(), // 验证标识符（如：邮箱地址）
  value: varchar('value', { length: 255 }).notNull(), // 验证码或令牌
  expires_at: timestamp('expires_at').notNull(), // 验证信息过期时间
  created_at: timestamp('created_at').notNull(), // 记录创建时间
  updated_at: timestamp('updated_at').notNull(), // 记录更新时间
});
