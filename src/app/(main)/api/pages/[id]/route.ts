import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getSession } from "@/lib/auth";

// GET /api/pages/[id] — fetch single page by ID (public)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const payload = await getPayload({ config: configPromise });

    const page = await payload.findByID({
      collection: "pages",
      id,
      overrideAccess: true,
    });

    return NextResponse.json(page);
  } catch (error: any) {
    console.error("GET /api/pages/[id] error:", error);
    if (error?.status === 404 || error?.message?.includes("not found")) {
      return NextResponse.json(
        { errors: [{ message: "Page not found" }] },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { errors: [{ message: "Failed to fetch page" }] },
      { status: 500 }
    );
  }
}

// PATCH /api/pages/[id] — update page (requires admin session)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const payload = await getPayload({ config: configPromise });

    const updated = await payload.update({
      collection: "pages",
      id,
      data: body,
      overrideAccess: true,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PATCH /api/pages/[id] error:", error);
    if (error?.status === 404 || error?.message?.includes("not found")) {
      return NextResponse.json(
        { errors: [{ message: "Page not found" }] },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { errors: [{ message: "Failed to update page" }] },
      { status: 500 }
    );
  }
}

// DELETE /api/pages/[id] — delete page (requires admin session)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const payload = await getPayload({ config: configPromise });

    await payload.delete({
      collection: "pages",
      id,
      overrideAccess: true,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/pages/[id] error:", error);
    return NextResponse.json(
      { errors: [{ message: "Failed to delete page" }] },
      { status: 500 }
    );
  }
}
