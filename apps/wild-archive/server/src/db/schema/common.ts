import { pgEnum } from 'drizzle-orm/pg-core';

/**
 * 可见性枚举：定义用户档案的可见性。
 */
export const visibility_enum = pgEnum('visibility_enum', [
  'public', // 公开
  'private', // 私有
  'protected', // 密码保护
]);

/**
 * 属性类型枚举：定义用户额外属性的类型。
 */
export const attributeTypesEnum = pgEnum('attribute_types', [
  'text', // 文本类型
  'number', // 数字类型
  'switch', // 开关类型
  'date', // 日期类型
  'time', // 时间类型
  'datetime', // 日期时间类型
  'file', // 文件类型
]);
