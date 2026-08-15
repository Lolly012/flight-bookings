import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseReady } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  if (!isSupabaseReady()) {
    return NextResponse.json({ results: [] });
  }

  try {
    const client = await createServerSupabaseClient();
    if (!client) throw new Error("Supabase unavailable");

    const results = await client
      .from("bookings")
      .select("id, booking_reference, origin_code, destination_code, final_customer_price, status, created_at")
      .or(`booking_reference.ilike.%${query}%`)
      .limit(10);

    if (results.error) throw results.error;

    return NextResponse.json({ results: results.data || [] });
  } catch (error) {
    console.error("Booking search error:", error);
    return NextResponse.json({ results: [] });
  }
}
