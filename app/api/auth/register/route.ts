import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseReady } from "@/lib/supabase";
import { setSessionCookie } from "@/lib/auth/session";
import { createUser, getUserByEmail } from "@/lib/supabase/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || !body.password || !body.name) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const email = String(body.email).toLowerCase();
    const name = String(body.name);

    if (isSupabaseReady()) {
      try {
        const client = await createServerSupabaseClient();
        if (!client) throw new Error("Supabase client not available");

        const existing = await getUserByEmail(client, email);
        if (existing) {
          return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const user = await createUser(client, email, name, undefined, "customer");

        const response = NextResponse.json({
          success: true,
          mode: "supabase",
          user: {
            id: user.id,
            email: user.email,
            name: user.full_name,
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
        console.error("Supabase registration error:", error);
      }
    }

    const user = {
      id: "user_456",
      email,
      role: "customer",
    } as const;

    const response = NextResponse.json({
      success: true,
      mode: "mock-auth",
      user,
    });

    setSessionCookie(response, user);
    return response;
  } catch {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
