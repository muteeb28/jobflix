import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient() {
    const base = process.env.DATABASE_URL ?? ''
    // In dev, Turbopack hot-reloads can create new client instances before old
    // connections are closed, exhausting the pool. Cap at 3 connections with a
    // longer timeout so the pool never fills up on rapid reloads.
    const sep = base.includes('?') ? '&' : '?'
    const url =
        process.env.NODE_ENV !== 'production'
            ? `${base}${sep}connection_limit=3&pool_timeout=30`
            : base

    return new PrismaClient({
        datasources: { db: { url } },
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
