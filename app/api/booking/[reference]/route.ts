import { NextResponse } from "next/server";
import { flightProvider } from "@/lib/flight-provider";

export async function GET(_: Request, { params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  const result = await flightProvider.getBookingByReference(reference);

  if (!result) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ booking: result });
}
