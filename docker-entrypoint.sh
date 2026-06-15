#!/bin/sh
set -e

# ── Development mode ────────────────────────────────────────────────────────
if [ "${NODE_ENV}" = "development" ] || [ "${DEV}" = "true" ]; then
  echo "🚀 Starting in development mode..."
  if [ ! -d node_modules ]; then
    npm ci
  fi
  npx prisma generate || true
  exec npm run dev
fi

# ── Production mode ─────────────────────────────────────────────────────────
DB_HOST="${DB_HOST:-postgres-db}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USER:-postgres}"

echo "⏳ Waiting for PostgreSQL at ${DB_HOST}:${DB_PORT}..."
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" >/dev/null 2>&1; do
  echo "   PostgreSQL is unavailable - retrying in 2s..."
  sleep 2
done
echo "✅ PostgreSQL is ready!"

# Apply Prisma schema (for the custom tables: AdminUser, Job, Candidate, etc.)
echo "📦 Applying Prisma schema migrations..."
npx prisma db push || true

# Payload CMS handles its own schema automatically on first run via push: true
# No separate migration step needed for Payload tables.

# Optional: seed Prisma data (admin users, jobs)
if [ "${DB_SEED}" = "true" ] || [ "${SEED_DB}" = "true" ]; then
  echo "🌱 Seeding Prisma database..."
  npm run db:seed || true
fi

# Optional: seed Payload CMS pages with initial content
if [ "${CMS_SEED}" = "true" ]; then
  echo "🌱 Seeding Payload CMS pages..."
  node scripts/seed-cms.mjs || true
fi

echo "🎉 Starting application..."
exec npm start
