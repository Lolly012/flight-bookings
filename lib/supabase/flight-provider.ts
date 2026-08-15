import type { SupabaseClient } from "@supabase/supabase-js";
import type { SearchParams, FlightSummary, BookingCreateResult } from "@/lib/types";
import { flightOffers } from "@/lib/flight-data";
import { createBooking, getBookingByReference, updateBookingStatus, createPayment } from "@/lib/supabase/db";
import { createPriceBreakdown } from "@/lib/pricing";

export class SupabaseFlightProvider {
  constructor(private client: SupabaseClient | null) {}

  async searchFlights(search: SearchParams): Promise<FlightSummary[]> {
    const matches = flightOffers.filter((flight) => {
      if (search.from && flight.origin !== search.from) return false;
      if (search.to && flight.destination !== search.to) return false;
      if (search.cabinClass && flight.cabin !== search.cabinClass) return false;
      return true;
    });

    return matches.map((flight) => ({
      ...flight,
      departureAt: flight.departureAt,
      arrivalAt: flight.arrivalAt,
    }));
  }

  async getFlightDetails(flightId: string): Promise<FlightSummary | null> {
    const flight = flightOffers.find((item) => item.id === flightId);
    return flight ?? null;
  }

  async getBookingByReference(reference: string): Promise<{ reference: string; flight: FlightSummary } | null> {
    const bookingRecord = await getBookingByReference(this.client, reference);
    if (!bookingRecord) return null;

    const flight = flightOffers.find(
      (f) => f.origin === bookingRecord.origin_code && f.destination === bookingRecord.destination_code
    );
    if (!flight) return null;

    return {
      reference,
      flight,
    };
  }

  async createBooking(input: {
    flightId: string;
    passengers: unknown[];
    userId?: string;
    currency?: string;
  }): Promise<BookingCreateResult> {
    const flight = await this.getFlightDetails(input.flightId);
    if (!flight) throw new Error("Flight no longer available");

    const reference = `RRT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const priceBreakdown = createPriceBreakdown(flight);

    try {
      const booking = await createBooking(this.client, {
        userId: input.userId,
        bookingReference: reference,
        flight,
        passengers: input.passengers as Parameters<typeof createBooking>[1]["passengers"],
        status: "pending",
        paymentStatus: "pending",
        basefare: priceBreakdown.baseFare,
        taxes: priceBreakdown.taxes,
        serviceFee: priceBreakdown.serviceFee,
        agencyMarkup: priceBreakdown.agencyMarkup,
        finalPrice: priceBreakdown.total,
        currency: input.currency || flight.currency,
      });

      if (booking) {
        await createPayment(this.client, booking.id, "mock", priceBreakdown.total, flight.currency, "pending");
      }
    } catch (error) {
      console.error("Error creating booking in database:", error);
    }

    return {
      bookingReference: reference,
      status: "pending",
      paymentStatus: "pending",
      amount: priceBreakdown.total,
      currency: flight.currency,
      flight,
    };
  }

  async confirmBooking(bookingReference: string, paymentReference: string) {
    const booking = await getBookingByReference(this.client, bookingReference);
    if (!booking) throw new Error("Booking not found");

    const updated = await updateBookingStatus(this.client, booking.id, "confirmed", "successful");
    return updated;
  }
}
