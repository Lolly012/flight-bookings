import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseReady } from "@/lib/supabase";

const refundSchema = z.object({
  amount: z.number().positive(),
  reason: z.string().min(3),
  status: z.enum(["pending", "completed", "failed"]).default("pending"),
});

export async function POST(
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
    const body = await request.json();
    const parsed = refundSchema.parse(body);

    const client = await createServerSupabaseClient();
    if (!client) throw new Error("Supabase unavailable");

    const { data: booking, error: bookingError } = await client
      .from("bookings")
      .select("id, final_customer_price, payment_status")
      .eq("id", id)
      .single();

    if (bookingError) throw bookingError;

    if (parsed.amount > booking.final_customer_price) {
      return NextResponse.json(
        { error: "Refund amount exceeds booking price" },
        { status: 400 }
      );
    }

    const { data: refund, error: refundError } = await client
      .from("refunds")
      .insert({
        booking_id: id,
        amount: parsed.amount,
        reason: parsed.reason,
        status: parsed.status,
      })
      .select()
      .single();

    if (refundError) throw refundError;

    if (parsed.status === "completed") {
      await client
        .from("bookings")
        .update({ payment_status: "partially_refunded" })
        .eq("id", id);

      await client.from("audit_logs").insert({
        action: "refund_issued",
        entity: "refunds",
        details: {
          booking_id: id,
          refund_id: refund.id,
          amount: parsed.amount,
          reason: parsed.reason,
        },
      });
    }

    return NextResponse.json(refund);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Admin refund error:", error);
    return NextResponse.json({ error: "Failed to create refund" }, { status: 500 });
  }
}
