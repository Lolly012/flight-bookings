import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    companyName: "Rhema Travel & Tours",
    currency: "NGN",
    serviceFee: 12000,
    apiProvider: "mock-provider",
    paymentMode: "sandbox",
    emailProvider: "mock-email-provider",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, settings: body });
  } catch {
    return NextResponse.json({ error: "Settings update failed" }, { status: 500 });
  }
}
