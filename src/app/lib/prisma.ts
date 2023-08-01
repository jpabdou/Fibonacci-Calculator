import { PrismaClient } from '@prisma/client';

// best practice for instatiating PrismaClient on Next.js to prevent multiple instances of PrismaClient from opening with multiple reloads, according to https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
