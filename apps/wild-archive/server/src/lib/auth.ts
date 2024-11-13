import { betterAuth, type BetterAuthOptions } from "better-auth";
import { db } from "@/db/index.ts";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { users } from "@/db/schema/user.ts";
import { accounts, sessions, verifications } from "@/db/schema/auth.ts";

const databaseMapping: Partial<BetterAuthOptions> = {
    user: {
        modelName: "users",
        fields: {
            emailVerified: "email_verified",
            createdAt: "created_at",
            updatedAt: 'updated_at',
            image: 'avatar'
        }
    },
    session: {
        modelName: "sessions",
        fields: {
            expiresAt: "expires_at",
            ipAddress: "ip_address",
            userAgent: "user_agent",
            userId: "user_id"
        }
    },
    account: {
        modelName: "accounts",
        fields: {
            accountId: "account_id",
            providerId: "provider_id",
            userId: "user_id",
            accessToken: "access_token",
            refreshToken: "refresh_token",
            idToken: "id_token",
            expiresAt: "expires_at",
        }
    },
    verification: {
        modelName: "verifications",
        fields: {
            expiresAt: "expires_at"
        }
    }
}

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            users
        },
        usePlural: true
    }),
    ...databaseMapping,
    emailAndPassword: {
        enabled: true,
    }
})

