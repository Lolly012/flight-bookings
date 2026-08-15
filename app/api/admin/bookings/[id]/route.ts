import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseReady } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseReady()) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 503 }
    );
  }

  try {
    const client = await createServerSupabaseClient();
    if (!client) throw new Error("Supabase unavailable");

    const { data: booking, error: bookingError } = await client
      .from("bookings")
      .select(
        `
        *,
        booking_passengers (*),
        payments (*)
      `
      )
      .eq("id", id)
      .single();

    if (bookingError) throw bookingError;

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Admin booking detail error:", error);
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}
