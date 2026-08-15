import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseSessionUser } from "@/lib/auth/session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/login" || pathname === "/register" || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const auth = request.cookies.get("auth_user");
    const session = parseSessionUser(auth?.value);

    if (!session || !session.role || session.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
