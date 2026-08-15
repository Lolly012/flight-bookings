import type { NextResponse } from "next/server";

export interface SessionUser {
  id: string;
  email: string;
  role: "customer" | "admin";
}

export const SESSION_COOKIE_NAME = "auth_user";

export function getMockSession(): SessionUser | null {
  return {
    id: "user_123",
    email: "traveller@example.com",
    role: "customer",
  };
}

export function isAdminRole(role?: string) {
  return role === "admin";
}

export function serializeSessionUser(user: SessionUser) {
  return JSON.stringify(user);
}

export function parseSessionUser(raw: string | undefined): SessionUser | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<SessionUser>;
    if (!parsed.id || !parsed.email || !parsed.role) {
      return null;
    }

    return {
      id: parsed.id,
      email: parsed.email,
      role: parsed.role === "admin" ? "admin" : "customer",
    };
  } catch {
    return null;
  }
}

export function setSessionCookie(response: NextResponse, user: SessionUser) {
  response.cookies.set(SESSION_COOKIE_NAME, serializeSessionUser(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.delete(SESSION_COOKIE_NAME);
}
