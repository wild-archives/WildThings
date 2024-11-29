import type { Context } from "hono";
import { db } from "@/db/index.ts";
import { users, extraAttributeValues, extraAttributeKeys } from "@/db/schema/user.ts";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

export interface UpdateUserProfileInput {
    nickname?: string;
    avatar?: number;
    banner?: number;
    bio?: string;
}

export const getUserInfo = async (ctx: Context) => {
    const user = ctx.get('user');
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    // Use specific columns instead of selecting all to leverage covering index
    const [userInfo] = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
            nickname: users.nickname,
            avatar: users.avatar,
            banner: users.banner,
            role: users.role,
            // Only include these if really needed
            bio: users.bio,
            created_at: users.created_at,
            last_seen_at: users.last_seen_at
        })
        .from(users)
        .where(eq(users.id, user.userId))
        .limit(1);

    if (!userInfo) {
        throw new HTTPException(404, { message: "User not found" });
    }

    return userInfo;
};

export const updateUserProfile = async (ctx: Context, input: UpdateUserProfileInput) => {
    const user = ctx.get('user');
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    const updateData: Partial<typeof users.$inferInsert> = {
        ...input,
        updated_at: new Date()
    };

    await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, user.userId));

    return await getUserInfo(ctx);
};

export const getUserExtraAttributes = async (ctx: Context) => {
    const user = ctx.get('user');
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    // Optimize join order and leverage composite index
    const attributes = await db
        .select({
            value: extraAttributeValues.value,
            user_is_public: extraAttributeValues.user_is_public,
            attribute_key: {
                id: extraAttributeKeys.id,
                key: extraAttributeKeys.attribute_key,
                type: extraAttributeKeys.type,
                category: extraAttributeKeys.category,
                is_public: extraAttributeKeys.is_public,
                // Only include description if really needed
                description: extraAttributeKeys.description
            }
        })
        .from(extraAttributeKeys)
        .innerJoin(
            extraAttributeValues,
            eq(extraAttributeValues.extra_key_id, extraAttributeKeys.id)
        )
        .where(eq(extraAttributeValues.user_id, user.userId));

    return attributes;
};

export const updateLastSeen = async (ctx: Context) => {
    const user = ctx.get('user');
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }
    await db
        .update(users)
        .set({
            last_seen_at: new Date(),
            updated_at: new Date()
        })
        .where(eq(users.id, user.userId));
};