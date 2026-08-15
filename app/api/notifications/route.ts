import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json({
      success: true,
      provider: "mock-email-provider",
      message: "Notification queued successfully",
      payload: body,
    });
  } catch {
    return NextResponse.json({ error: "Notification dispatch failed" }, { status: 500 });
  }
}
