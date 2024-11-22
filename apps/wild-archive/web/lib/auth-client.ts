import { createAuthClient } from "better-auth/react"

export const ac = createAuthClient({
    baseURL: process.env.NODE_ENV === 'production' ? `${process.env.PRODUCTION_BASE_URL}/api` : 'http://localhost:2333/api'
})