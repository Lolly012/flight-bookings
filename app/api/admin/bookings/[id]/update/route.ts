import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseReady } from "@/lib/supabase";

const updateSchema = z.object({
  status: z.enum(["pending", "confirmed", "ticketed", "cancelled", "completed", "failed", "expired"]),
  paymentStatus: z.enum(["pending", "successful", "failed", "refunded", "partially_refunded"]).optional(),
  notes: z.string().optional(),
});

export async function PATCH(
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
    const parsed = updateSchema.parse(body);

    const client = await createServerSupabaseClient();
    if (!client) throw new Error("Supabase unavailable");

    const updateData: Record<string, unknown> = {
      status: parsed.status,
      updated_at: new Date().toISOString(),
    };

    if (parsed.paymentStatus) {
      updateData.payment_status = parsed.paymentStatus;
    }

    const { data, error } = await client
      .from("bookings")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (parsed.notes) {
      await client.from("audit_logs").insert({
        action: "booking_status_updated",
        entity: "bookings",
        details: {
          booking_id: id,
          status: parsed.status,
          payment_status: parsed.paymentStatus,
          notes: parsed.notes,
        },
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Admin booking update error:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
