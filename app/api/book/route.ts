import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseReady } from "@/lib/supabase";
import { SupabaseFlightProvider } from "@/lib/supabase/flight-provider";
import { flightProvider as mockProvider } from "@/lib/flight-provider";
import { bookingSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.parse(body);

    let provider;
    if (isSupabaseReady()) {
      try {
        const client = await createServerSupabaseClient();
        provider = new SupabaseFlightProvider(client);
      } catch (error) {
        console.error("Supabase client error:", error);
        provider = mockProvider;
      }
    } else {
      provider = mockProvider;
    }

    const result = await provider.createBooking({
      flightId: parsed.flightId,
      passengers: parsed.passengers,
    });

    return NextResponse.json({
      success: true,
      booking: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json({ error: "Booking creation failed" }, { status: 500 });
  }
}
