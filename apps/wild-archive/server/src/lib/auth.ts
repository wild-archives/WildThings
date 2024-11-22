import { betterAuth, type BetterAuthOptions } from "better-auth";
import { db } from "@/db/index.ts";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { users } from "@/db/schema/user.ts";
import { accounts, sessions, verifications } from "@/db/schema/auth.ts";

const databaseMapping: Partial<BetterAuthOptions> = {
    user: {
        fields: {
            emailVerified: "email_verified",
            createdAt: "created_at",
            updatedAt: 'updated_at',
            image: 'avatar'
        }
    },
    session: {
        fields: {
            expiresAt: "expires_at",
            ipAddress: "ip_address",
            userAgent: "user_agent",
            userId: "user_id"
        }
    },
    account: {
        fields: {
            accountId: "account_id",
            providerId: "provider_id",
            userId: "user_id",
            accessToken: "access_token",
            refreshToken: "refresh_token",
            idToken: "id_token",
            expiresAt: "expires_at",
        },
        accountLinking: {
            enabled: true,
        }
    },
    verification: {
        fields: {
            expiresAt: "expires_at"
        }
    }
}

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
        schema: {
            users,
            sessions,
            accounts,
            verifications
        },
    }),
    ...databaseMapping,
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        twitter: {
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
        },
    },
    advanced: {
        cookiePrefix: "wildthings-wildbox"
    },
    trustedOrigins: ['http://localhost:2333'],
    logger: {
        verboseLogging: true
    }
})