<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1gpRghA6T9t8DAjw9tnID1WzxgNOJ6CDC

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy env template and fill values:
   `cp .env.example .env.local`  # set GEMINI_API_KEY, DATABASE_URL (server), ADMIN_TOKEN, CORS_ORIGINS
3. Run the app:
   `npm run dev`

Backend (Fastify):
- From `server/`, run `npm install` once, then `npm run dev` for API.
- Required env: GEMINI_API_KEY, DATABASE_URL, ADMIN_TOKEN, HOST, PORT, LOG_LEVEL, NODE_ENV, CORS_ORIGINS.
- Apply migrations (Postgres): `psql $DATABASE_URL -f server/migrations/001_bookings.sql`
- Admin bookings endpoint `/api/bookings` requires `Authorization: Bearer $ADMIN_TOKEN`.

Tests and checks:
- `npm run lint` / `npm run typecheck` / `npm test`
