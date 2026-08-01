FROM node:20-bookworm AS base
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

COPY . .

RUN npx prisma generate

# next build statically imports API routes to collect page data, which
# instantiates PrismaClient at module scope. Prisma 7's client engine
# validates its adapter at construction time, so a DATABASE_URL must be
# present even though no connection is actually made during the build.
# The real value is supplied at runtime via docker-compose.
ENV DATABASE_URL="postgresql://postgres:password@postgres-db:5432/habbah_db"
RUN npm run build

# Install postgres client tools so startup can wait for DB readiness
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["npm", "start"]