import { PrismaClient } from '@prisma/client';

declare global {
  var __prismaClient__: PrismaClient | undefined;
}

const prisma = global.__prismaClient__ ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.__prismaClient__ = prisma;
}

export default prisma;
