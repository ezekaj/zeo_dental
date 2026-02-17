import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { chatRoutes } from './routes/chat.js';
import { bookingRoutes } from './routes/booking.js';
import { receptionistRoutes } from './routes/receptionist.js';
import { postgresPlugin } from './plugins/postgres.js';
import { initCrmSync } from './services/crmSync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: { colorize: true },
          }
        : undefined,
  },
});

async function start() {
  try {
    const adminToken = process.env.ADMIN_TOKEN;

    // Security headers
    await fastify.register(helmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: [
            "'self'",
            'data:',
            'https://images.unsplash.com',
            'https://*.pexels.com',
            'https://i.pinimg.com',
          ],
          mediaSrc: ["'self'", 'https://videos.pexels.com', 'https://cdn.pixabay.com'],
          connectSrc: ["'self'", 'https://generativelanguage.googleapis.com'],
          frameSrc: ["'self'", 'https://www.google.com'],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    });

    // Basic rate limiting to protect public endpoints
    await fastify.register(rateLimit, {
      max: parseInt(process.env.RATE_LIMIT_MAX || '200', 10),
      timeWindow: process.env.RATE_LIMIT_WINDOW || '1 minute',
      allowList: req => {
        // Allow internal health checks and optionally authenticated admin calls
        if (req.url === '/health') return true;
        if (adminToken && req.headers.authorization === `Bearer ${adminToken}`) return true;
        return false;
      },
    });

    // Register CORS
    const parsedOrigins = process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
          .map(o => o.trim())
          .filter(Boolean)
      : undefined;

    await fastify.register(cors, {
      origin: parsedOrigins
        ? parsedOrigins
        : process.env.NODE_ENV === 'production'
          ? [
              'https://zeodentalclinic.com',
              'https://www.zeodentalclinic.com',
              'https://zeo-dental.fly.dev',
            ]
          : true,
      methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Register Postgres plugin
    await fastify.register(postgresPlugin);

    // Initialize CRM sync (optional - only if env vars are set)
    initCrmSync(fastify.log);

    // Register API routes
    await fastify.register(chatRoutes, { prefix: '/api' });
    await fastify.register(bookingRoutes, { prefix: '/api' });
    await fastify.register(receptionistRoutes, { prefix: '/api' });

    // Serve static files (React build)
    const publicPath = join(__dirname, '..', 'public');
    await fastify.register(fastifyStatic, {
      root: publicPath,
      prefix: '/',
    });

    // SPA fallback - serve index.html for all non-API routes
    fastify.setNotFoundHandler(async (request, reply) => {
      if (request.url.startsWith('/api')) {
        return reply.status(404).send({ error: 'API endpoint not found' });
      }
      return reply.sendFile('index.html');
    });

    // Health check endpoint
    fastify.get('/health', async () => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    // Language detection endpoint - uses Accept-Language header from the browser
    const LANG_MAP: Record<string, string> = {
      sq: 'sq', en: 'en', it: 'it', de: 'de', fr: 'fr', tr: 'tr', el: 'el', es: 'es',
    };
    const SUPPORTED = new Set(Object.keys(LANG_MAP));

    fastify.get('/api/detect-language', async (request) => {
      const acceptLang = request.headers['accept-language'] || '';
      // Parse Accept-Language: "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7"
      const langs = acceptLang
        .split(',')
        .map(part => {
          const [lang, q] = part.trim().split(';q=');
          return { lang: lang.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
        })
        .sort((a, b) => b.q - a.q);

      for (const { lang } of langs) {
        if (SUPPORTED.has(lang)) {
          return { language: lang };
        }
      }
      return { language: 'en' };
    });

    // Start server
    const host = process.env.HOST || '0.0.0.0';
    const port = parseInt(process.env.PORT || '3000', 10);

    await fastify.listen({ port, host });
    fastify.log.info(`Server running at http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Graceful shutdown
const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
signals.forEach(signal => {
  process.on(signal, async () => {
    fastify.log.info(`Received ${signal}, shutting down gracefully...`);
    await fastify.close();
    process.exit(0);
  });
});

start();
