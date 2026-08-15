import { NextResponse } from "next/server";
import { getMockSession } from "@/lib/auth/session";

export async function GET() {
  const session = getMockSession();
  return NextResponse.json({
    authenticated: Boolean(session),
    user: session,
  });
}
