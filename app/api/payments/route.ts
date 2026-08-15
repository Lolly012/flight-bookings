import { NextResponse } from "next/server";
import { createMockPaymentIntent } from "@/lib/payment";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = Number(body.amount || 0);
    const intent = createMockPaymentIntent(amount, body.currency || "NGN");

    return NextResponse.json({
      success: true,
      mode: "sandbox",
      payment: intent,
    });
  } catch {
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
