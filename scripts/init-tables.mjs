import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd(), true);

const { buildConfig } = await import("payload");
const { postgresAdapter } = await import("@payloadcms/db-postgres");
const { lexicalEditor } = await import("@payloadcms/richtext-lexical");
const { default: Pages } = await import("../src/collections/Pages");
const { default: Users } = await import("../src/collections/Users");
const { default: Media } = await import("../src/collections/Media");

const config = await buildConfig({
  admin: { user: "users" },
  collections: [Users, Media, Pages],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    push: true,
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  routes: { admin: "/cms-admin" },
});

const { getPayload } = await import("payload");
const payload = await getPayload({ config });
console.log("Payload initialized. Tables should now exist.");
const { db } = payload;
console.log("DB adapter:", db.name);
process.exit(0);
