import { flightOffers, airports } from "@/lib/flight-data";
import type { SearchParams, FlightSummary } from "@/lib/types";

export interface FlightProvider {
  searchFlights(search: SearchParams): Promise<FlightSummary[]>;
  getFlightDetails(flightId: string): Promise<FlightSummary | null>;
  getBookingByReference(reference: string): Promise<{ reference: string; flight: FlightSummary } | null>;
  createBooking(input: { flightId: string; passengers: unknown[] }): Promise<{ bookingReference: string; flight: FlightSummary }>; 
}

export class MockFlightProvider implements FlightProvider {
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
    const flight = flightOffers[0];
    return reference ? { reference, flight: { ...flight } } : null;
  }

  async createBooking(input: { flightId: string; passengers: unknown[] }): Promise<{ bookingReference: string; flight: FlightSummary }> {
    const flight = await this.getFlightDetails(input.flightId);
    if (!flight) throw new Error("Flight no longer available");
    const reference = `RRT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    return { bookingReference: reference, flight };
  }
}

export const flightProvider = new MockFlightProvider();
export const mockAirportInventory = airports;
