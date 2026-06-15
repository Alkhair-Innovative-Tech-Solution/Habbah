import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Pages } from "./collections/Pages";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { seedCmsPages } from "./seed/seedCmsPages";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    meta: {
      titleSuffix: " - Habbah CMS",
      title: "Habbah CMS",
      description: "Manage Habbah Educational Trust website content",
      icons: [{ url: "/favicon.ico" }],
    },

  },

  collections: [Users, Media, Pages],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    migrationDir: "src/payload-migrations",
    push: true,
    blocksAsJSON: true,
    schemaName: "payload",
  }),

  secret: process.env.PAYLOAD_SECRET || "fallback-secret-change-in-production",

  typescript: {
    outputFile: "src/payload-types.ts",
  },

  routes: {
    admin: "/cms-admin",
  },

  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB
    },
  },

  cors: [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL || "",
  ].filter(Boolean),

  /**
   * onInit: runs once after Payload + DB connection is established.
   * Seeds all 7 website pages with initial content if they don't exist yet.
   * This is idempotent — safe to run on every restart.
   */
  onInit: async (payload) => {
    await seedCmsPages(payload);
  },
});
