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
        if (req.url === '/health' || req.url === '/api/detect-language') return true;
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

    // Language detection endpoint - server-side IP geolocation
    const COUNTRY_TO_LANG: Record<string, string> = {
      AL: 'sq', XK: 'sq',
      IT: 'it', SM: 'it', VA: 'it',
      DE: 'de', AT: 'de', CH: 'de', LI: 'de',
      FR: 'fr', BE: 'fr', MC: 'fr', LU: 'fr',
      TR: 'tr',
      GR: 'el', CY: 'el',
      ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es',
    };

    fastify.get('/api/detect-language', async (request) => {
      // Get client IP from Fly.io headers or fallback
      const clientIp = (request.headers['fly-client-ip']
        || request.headers['x-forwarded-for']?.toString().split(',')[0]?.trim()
        || request.ip) as string;

      try {
        // Server-side geo-IP lookup (ip-api.com: free, no key needed, 45 req/min)
        const res = await fetch(`http://ip-api.com/json/${clientIp}?fields=countryCode`, {
          signal: AbortSignal.timeout(2000),
        });
        if (res.ok) {
          const data = await res.json() as { countryCode?: string };
          if (data.countryCode && COUNTRY_TO_LANG[data.countryCode]) {
            return { language: COUNTRY_TO_LANG[data.countryCode] };
          }
        }
      } catch {
        // IP lookup failed, fall through to default
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
