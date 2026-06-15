import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    strategies: [
      {
        name: "habbah-sso",
        authenticate: async ({ headers, payload }) => {
          try {
            const cookieHeader = headers.get("cookie");
            if (!cookieHeader) return { user: null };

            // Parse habbah_session cookie
            const match = cookieHeader.match(/habbah_session=([^;]+)/);
            if (!match) return { user: null };
            const token = match[1];

            // Dynamically import prisma to prevent Next.js bundler errors
            const { prisma } = await import("../lib/prisma");

            // Verify session in Prisma
            const session = await prisma.session.findUnique({
              where: { token },
              include: { user: true },
            });

            if (!session || session.expiresAt < new Date()) {
              return { user: null };
            }

            const prismaUser = session.user;

            // Only allow ADMIN and SUPER_ADMIN roles to log in to CMS
            if (prismaUser.role !== "SUPER_ADMIN" && prismaUser.role !== "ADMIN") {
              return { user: null };
            }

            // Find or create matching user in Payload CMS
            const payloadUsers = await payload.find({
              collection: "users",
              where: {
                email: {
                  equals: prismaUser.email,
                },
              },
              limit: 1,
            });

            let payloadUser = payloadUsers.docs[0];

            if (!payloadUser) {
              // Create user in Payload with matching email and role
              payloadUser = await payload.create({
                collection: "users",
                data: {
                  email: prismaUser.email,
                  name: prismaUser.name,
                  role: prismaUser.role === "SUPER_ADMIN" ? "super_admin" : "admin",
                  // Dummy password because Payload auth collections require a password
                  password: "sso-login-placeholder-password-123456!",
                },
              });
            }

            return {
              user: {
                ...payloadUser,
                collection: "users",
              },
            };
          } catch (err) {
            console.error("SSO auth strategy error:", err);
            return { user: null };
          }
        },
      },
    ],
  },
  admin: {
    useAsTitle: "email",
    group: "Admin",
  },
  access: {
    read: ({ req: { user } }) => user?.role === "super_admin",
    create: ({ req: { user } }) => user?.role === "super_admin",
    update: ({ req: { user } }) => user?.role === "super_admin",
    delete: ({ req: { user } }) => user?.role === "super_admin",
    admin: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      defaultValue: "super_admin",
      required: true,
    },
  ],
};
