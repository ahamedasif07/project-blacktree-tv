import { PrismaClient } from '../../generated';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import config from '../../config';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a connection pool
const pool = new pg.Pool({ connectionString: config.database.url });
const adapter = new PrismaPg(pool);

// Initialize Prisma Client with the adapter
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter,
  log: config.nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (config.nodeEnv !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
