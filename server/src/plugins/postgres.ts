import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import pg from 'pg';

const { Pool } = pg;

declare module 'fastify' {
  interface FastifyInstance {
    pg: pg.Pool;
  }
}

const postgresPluginAsync: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    fastify.log.warn('DATABASE_URL not set - database features disabled');
    // Create a mock pool that throws helpful errors
    const mockPool = {
      query: () => {
        throw new Error('Database not configured. Set DATABASE_URL environment variable.');
      },
      connect: () => {
        throw new Error('Database not configured. Set DATABASE_URL environment variable.');
      },
      end: () => Promise.resolve(),
    } as unknown as pg.Pool;

    fastify.decorate('pg', mockPool);
    return;
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  // Test connection
  try {
    const client = await pool.connect();
    fastify.log.info('Connected to PostgreSQL database');
    client.release();
  } catch (err) {
    fastify.log.error(
      'Failed to connect to PostgreSQL: %s',
      err instanceof Error ? err.message : String(err)
    );
    throw err;
  }

  fastify.decorate('pg', pool);

  // Close pool on server shutdown
  fastify.addHook('onClose', async () => {
    fastify.log.info('Closing PostgreSQL connection pool');
    await pool.end();
  });
};

export const postgresPlugin = fp(postgresPluginAsync, {
  name: 'postgres',
});
