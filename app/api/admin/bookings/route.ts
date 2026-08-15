import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseReady } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  if (!isSupabaseReady()) {
    return NextResponse.json(
      {
        bookings: [],
        total: 0,
        message: "Supabase not configured",
      },
      { status: 200 }
    );
  }

  try {
    const client = await createServerSupabaseClient();
    if (!client) throw new Error("Supabase unavailable");

    let query = client.from("bookings").select("*", { count: "exact" });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, count, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json({
      bookings: data,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Admin bookings list error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
