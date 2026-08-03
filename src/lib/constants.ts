/**
 * Seeded in prisma/seed.js as a catch-all "General Interest / Open
 * Application" job (id: 4, category: "General") so the volunteer/general
 * application flow can attach to a real Job row instead of needing a
 * separate table. It must never show up as a listed vacancy on the public
 * Careers page, and its applications are shown separately (not mixed in
 * with real job applications) in the admin dashboard.
 */
export const GENERAL_INTEREST_JOB_ID = 4;
