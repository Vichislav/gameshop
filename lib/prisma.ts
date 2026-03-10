/* import { PrismaClient } from '@prisma/client'


console.log('DATABASE_URL from env:', process.env.DATABASE_URL); // добавить

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment');
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma */

import { PrismaClient } from '@prisma/client'

// Проверяем наличие URL (он уже должен быть в process.env)
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined')
}

// Создаём клиент без передачи опций – в Prisma 5 он сам подхватит DATABASE_URL
const prisma = new PrismaClient()

export default prisma
