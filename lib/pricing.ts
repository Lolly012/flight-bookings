import type { FlightSummary } from "@/lib/types";

export function createPriceBreakdown(flight: FlightSummary) {
  return {
    baseFare: flight.price,
    taxes: flight.taxes,
    serviceFee: flight.serviceFee,
    agencyMarkup: flight.agencyMarkup,
    total: flight.finalPrice,
    currency: flight.currency,
  };
}

export function calculateCustomerPrice(basePrice: number, markupPercent = 0, fixedMarkup = 0) {
  const percentage = basePrice * (markupPercent / 100);
  return Math.round(basePrice + fixedMarkup + percentage);
}
