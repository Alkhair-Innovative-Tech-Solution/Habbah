FROM node:20-bookworm-slim AS base
WORKDIR /app

# Install only what's needed for build + runtime
RUN apt-get update && apt-get install -y \
    openssl \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# ── deps stage: install production + dev deps ──────────────────────────────
FROM base AS deps
COPY package*.json ./
# Copy prisma schema so the postinstall `prisma generate` step can find it
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci

# ── builder stage: build Next.js app ───────────────────────────────────────
FROM deps AS builder
COPY . .

# Prisma client needs to be generated before build
RUN npx prisma generate

# next build calls getPayload() at build time which needs DATABASE_URL.
# We pass a dummy value so the import resolves; actual DB is connected at runtime.
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ENV PAYLOAD_SECRET="build-time-placeholder-secret"
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── runner stage: only production files ────────────────────────────────────
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy over node_modules and built app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/scripts ./scripts

# Entrypoint
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["npm", "start"]