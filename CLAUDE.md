# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zeo Dental Clinic - A premium dental clinic website with AI-powered chat assistant. Built with React 19, TypeScript, Vite, Fastify backend, and Google Gemini AI. Deployed on Fly.io.

## Commands

```bash
# Frontend
npm install          # Install frontend dependencies
npm run dev          # Start Vite dev server on http://localhost:5173
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run typecheck    # TypeScript type checking

# Server (in server/ directory)
cd server && npm install  # Install server dependencies
npm run dev               # Start Fastify dev server on http://localhost:3000
npm run build             # Build server for production

# Deployment
fly deploy           # Deploy to Fly.io
```

## Architecture

```
┌─────────────────────────────────────────┐
│           Fly.io Machine                │
│  ┌─────────────────────────────────┐   │
│  │     Fastify Server (Node.js)    │   │
│  │  ┌───────────┬────────────────┐ │   │
│  │  │  Static   │   API Routes   │ │   │
│  │  │  /dist/*  │  /api/chat     │ │   │
│  │  │           │  /api/booking  │ │   │
│  │  └───────────┴────────────────┘ │   │
│  └─────────────────────────────────┘   │
│                  │                      │
│                  ▼                      │
│  ┌─────────────────────────────────┐   │
│  │       Fly Postgres              │   │
│  │    (bookings table)             │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Single Page Application with view-based routing** (no react-router):
- `App.tsx` manages view state (`home | booking | service-detail`) via `useState`
- Navigation uses `window.history.pushState` for URL updates without page reload
- Browser back/forward handled via `popstate` event listener

**Key Architectural Patterns:**
- Flat component structure in `/components` - no nested directories
- Centralized data in `constants.ts` (services, doctors, testimonials)
- Type definitions in `types.ts`
- AI service isolated in `services/geminiService.ts`
- Backend in `server/` directory (Fastify)

**API Endpoints:**
- `POST /api/chat` - Gemini AI proxy with conversation history
- `POST /api/booking` - Create booking with validation
- `GET /api/bookings` - List bookings (admin)
- `GET /health` - Health check endpoint

**Path Alias:** `@/*` maps to project root (configured in vite.config.ts and tsconfig.json)

## Server Structure

```
server/
├── src/
│   ├── index.ts              # Fastify entry point
│   ├── types.ts              # TypeScript types
│   ├── routes/
│   │   ├── chat.ts           # POST /api/chat (Gemini proxy)
│   │   └── booking.ts        # POST /api/booking
│   └── plugins/
│       └── postgres.ts       # Database connection pool
├── migrations/
│   └── 001_bookings.sql      # Database schema
├── package.json
├── tsconfig.json
└── Dockerfile
```

## Environment Setup

**Development (frontend .env.local):**
```bash
# Not needed for development - API calls go to localhost:3000
```

**Server (server/.env or Fly.io secrets):**
```bash
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://...  # Auto-set by Fly Postgres
```

## Fly.io Deployment

```bash
# Initial setup
fly apps create zeo-dental
fly postgres create --name zeo-dental-db
fly postgres attach zeo-dental-db --app zeo-dental
fly secrets set GEMINI_API_KEY=your_key_here

# Deploy
fly deploy

# Run migrations
fly postgres connect -a zeo-dental-db
\i server/migrations/001_bookings.sql
```

## Component Relationships

```
App.tsx
├── Navbar (receives scrolled state, currentView, onNavigate)
├── Home View
│   ├── Hero → Services → WhyChooseUs → Team → Testimonials
│   └── Each section has an id for anchor navigation
├── BookingSection (form with real API submission to /api/booking)
├── ServiceDetail (dynamic content from SERVICES constant)
├── Footer
└── ChatWidget (uses /api/chat endpoint)
```

## Navigation Pattern

`onNavigate(view, sectionId?, serviceParam?)` is the central navigation handler:
- View switching triggers URL pushState
- Section scrolling accounts for 80px navbar offset
- Service context passed to booking/detail views via `serviceParam`

## Production Readiness Assessment: 90/100

**Implemented:**
- Error boundaries with recovery UI
- ESLint + Prettier for code quality
- Vitest testing infrastructure with 90+ tests
- Comprehensive SEO (meta tags, Open Graph, JSON-LD schema)
- Accessibility fixes (ARIA labels, keyboard navigation, skip links)
- Fastify server for secure Gemini API proxy
- Image loading with skeleton and fallback states
- CI/CD pipeline with GitHub Actions → Fly.io
- Postgres database for booking storage
- Network status detection hooks
- Docker multi-stage build for deployment
- Health checks and graceful shutdown

**Remaining for 100%:**
- Email notification integration (booking confirmations)
- Analytics/monitoring setup (consider Posthog or Plausible)
- i18n support (if international audience needed)
- PWA setup (service worker, offline support)
- Rate limiting on API endpoints
- Admin dashboard for booking management
