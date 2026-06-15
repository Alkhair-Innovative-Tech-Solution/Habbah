import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPrefixes = ["/admin/dashboard", "/admin/messages", "/admin/cms"];

  const needsProtection = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );

  if (needsProtection) {
    const token = request.cookies.get("habbah_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
