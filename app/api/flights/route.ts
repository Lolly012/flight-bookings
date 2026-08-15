import { NextResponse } from "next/server";
import { airports, flightOffers } from "@/lib/flight-data";

export async function GET() {
  return NextResponse.json({
    source: "mock",
    metadata: {
      provider: "mock-provider",
      testMode: true,
      note: "This is development inventory, not live supplier data.",
    },
    airports,
    flights: flightOffers,
  });
}
