# Habbah Project Context

## Project Overview
Next.js 16 + Payload CMS 3.85.0 application for Habbah (idara Al-Khair). The app serves pages (Home, About, Application Process, Success Stories, Contact, Careers, Volunteer) with an admin panel for content management.

## Tech Stack
- **Framework**: Next.js 16.2.6 (App Router, Turbopack)
- **CMS**: Payload CMS 3.85.0
- **Database**: PostgreSQL (via Prisma for app data + Payload/Drizzle for CMS)
- **Editor**: @payloadcms/richtext-lexical
- **DB Adapter**: @payloadcms/db-postgres
- **Styling**: Tailwind CSS
- **Runtime**: Node.js 22 (Windows)

## Build Commands
```bash
npm run build    # Full production build (also runs TypeScript check)
npm run dev      # Dev server with Turbopack
```

No lint or typecheck commands exist outside the build.

## Route Structure
- `/` - Home page
- `/about`, `/application-process`, `/success-stories`, `/contact`, `/careers`, `/volunteer` - Public pages
- `/admin` - Custom admin dashboard (existing, separate from Payload)
- `/cms-admin` - Payload CMS admin panel (route group: `(payload)`)
- `/api/[[...slug]]` - Payload REST API
- Various `/api/admin/*`, `/api/auth/*`, `/api/jobs/*` etc. - Custom API routes

## Payload CMS Setup
- **Collections**: Pages, Users, Media
- **Block types** (12): Hero, Text, CardsGrid, Stats, Testimonials, CTA, Timeline, Partners, Team, MapSection, ContactForm, JobsSection
- **Pages collection**: 7 pre-defined slugs (home, about, application-process, success-stories, contact, careers, volunteer); blocks-based section system
- **Admin route**: `/cms-admin` (custom route to avoid conflict with existing `/admin`)
- **Config file**: `src/payload.config.ts`
- **Import map**: `src/app/(payload)/cms-admin/importMap.js` (auto-generated, currently empty since no custom components)
- **Layout**: `src/app/(payload)/layout.tsx` (wraps admin pages with RootLayout)

## Database
- PostgreSQL with both Prisma-managed tables (AdminUser, Job, Candidate, Volunteer, etc.) and Payload/Drizzle-managed tables
- Payload uses Drizzle ORM; Prisma used for app-specific models
- Enums can conflict between Prisma and Drizzle/Payload - use schema separation if needed

## Windows-Specific Issues
1. `npx payload generate:importmap` fails on Windows + Node 22 due to CJS/ESM compatibility in `loadEnv.js`
   - **Workaround**: `node_modules/payload/dist/bin/loadEnv.js` is patched to handle `@next/env` CJS import
   - Import map is auto-generated during Payload init at runtime (with `ignoreResolveError: true`)
2. `tsx` with `--import` flag causes CJS loader issues on Windows

## Sidebar Configuration
- `src/components/admin/Sidebar.tsx`: CMS submenu links to Payload admin (`/cms-admin/collections/pages`, `/cms-admin/collections/media`, `/cms-admin/collections/users`)

## Navigation
- Navbar: Careers and Volunteer links removed
- Footer: Careers and Volunteer links present; 4 Initiatives links removed
