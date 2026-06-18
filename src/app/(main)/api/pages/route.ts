import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getSession } from "@/lib/auth";

// GET /api/pages — list all pages (public, no auth required)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "pages",
      limit,
      page,
      overrideAccess: true,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/pages error:", error);
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

// POST /api/pages — create a new page (requires admin session)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, seo, sections } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { errors: [{ message: "title and slug are required" }] },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config: configPromise });

    const newPage = await payload.create({
      collection: "pages",
      data: {
        title,
        slug: slug.toLowerCase().replace(/\s+/g, "-"),
        seo: seo || {},
        sections: sections || [],
      },
      overrideAccess: true,
    });

    return NextResponse.json(newPage, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/pages error:", error);
    if (error?.message?.includes("unique")) {
      return NextResponse.json(
        { errors: [{ message: "A page with this slug already exists." }] },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { errors: [{ message: "Failed to create page" }] },
      { status: 500 }
    );
  }
}
