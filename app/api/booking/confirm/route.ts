import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseReady } from "@/lib/supabase";
import { SupabaseFlightProvider } from "@/lib/supabase/flight-provider";
import { updateBookingStatus } from "@/lib/supabase/db";

const confirmSchema = z.object({
  bookingReference: z.string().min(1),
  paymentReference: z.string().min(1),
  paymentStatus: z.enum(["successful", "failed", "pending"]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = confirmSchema.parse(body);

    if (parsed.paymentStatus !== "successful") {
      return NextResponse.json({ error: "Payment must be confirmed before booking is confirmed" }, { status: 400 });
    }

    if (isSupabaseReady()) {
      try {
        const client = await createServerSupabaseClient();
        const provider = new SupabaseFlightProvider(client);
        await provider.confirmBooking(parsed.bookingReference, parsed.paymentReference);
      } catch (error) {
        console.error("Supabase confirmation error:", error);
      }
    }

    return NextResponse.json({
      success: true,
      bookingReference: parsed.bookingReference,
      status: "confirmed",
      paymentStatus: parsed.paymentStatus,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json({ error: "Confirmation failed" }, { status: 500 });
  }
}
