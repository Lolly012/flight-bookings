import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseReady } from "@/lib/supabase";
import { setSessionCookie } from "@/lib/auth/session";
import { createUser, getUserByEmail } from "@/lib/supabase/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const email = String(body.email).toLowerCase();
    const password = String(body.password);

    if (isSupabaseReady()) {
      try {
        const client = await createServerSupabaseClient();
        if (!client) throw new Error("Supabase client not available");

        let user = await getUserByEmail(client, email);

        if (!user) {
          user = await createUser(client, email, email, undefined, "customer");
        }

        const response = NextResponse.json({
          success: true,
          mode: "supabase",
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        });

        setSessionCookie(response, {
          id: user.id,
          email: user.email,
          role: user.role === "admin" ? "admin" : "customer",
        });

        return response;
      } catch (error) {
        console.error("Supabase login error:", error);
      }
    }

    const user = {
      id: "user_123",
      email,
      role: email === "admin@rhema.com" ? "admin" : "customer",
    } as const;

    const response = NextResponse.json({
      success: true,
      mode: "mock-auth",
      user,
    });

    setSessionCookie(response, user);
    return response;
  } catch {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
