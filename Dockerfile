# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app

# Copy package files for frontend
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy frontend source and build
COPY . .
ARG VITE_ELFSIGHT_WIDGET_ID=f2d6942e44a24e68b5643809a1f1cabb
ENV VITE_ELFSIGHT_WIDGET_ID=$VITE_ELFSIGHT_WIDGET_ID
RUN npm run build

# Stage 2: Build Fastify server
FROM node:20-alpine AS server-build
WORKDIR /app/server

# Copy server package files
COPY server/package*.json ./
# Cache bust for dependency changes
ARG CACHE_BUST=1
RUN npm ci

# Copy server source and build
COPY server/ .
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS production
WORKDIR /app

# Cache bust for production dependencies
ARG PROD_CACHE_BUST=1

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S fastify -u 1001

# Copy server build and dependencies (rate-limit v9.x for Fastify 4.x)
COPY --from=server-build /app/server/dist ./dist
COPY --from=server-build /app/server/node_modules ./node_modules
COPY --from=server-build /app/server/package.json ./

# Copy frontend build to public directory
COPY --from=frontend-build /app/dist ./public

# Set ownership
RUN chown -R fastify:nodejs /app

USER fastify

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start server
CMD ["node", "dist/index.js"]
