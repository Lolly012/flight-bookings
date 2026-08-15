export type Currency = "NGN" | "USD" | "GBP" | "EUR";
export type BookingStatus = "pending" | "confirmed" | "ticketed" | "cancelled" | "completed" | "failed" | "expired";
export type PaymentStatus = "pending" | "successful" | "failed" | "refunded" | "partially_refunded";
export type CabinClass = "Economy" | "Premium Economy" | "Business" | "First";

export interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: CabinClass;
  tripType?: "round-trip" | "one-way" | "multi-city";
}

export interface FlightSummary {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  aircraft: string;
  origin: string;
  destination: string;
  departureAt: string;
  arrivalAt: string;
  durationMinutes: number;
  stops: number;
  cabin: CabinClass;
  baggage: string;
  refundable: boolean;
  changePolicy: string;
  currency: Currency;
  price: number;
  taxes: number;
  serviceFee: number;
  agencyMarkup: number;
  finalPrice: number;
  fareConditions: string[];
}

export interface PassengerInfo {
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender?: string;
  nationality?: string;
  passportNumber?: string;
  passportExpiry?: string;
  passportIssuingCountry?: string;
  email: string;
  phone: string;
}

export interface BookingCreateInput {
  flightId: string;
  passengers: PassengerInfo[];
  extras?: Record<string, string | number | boolean>;
  contactEmail?: string;
  contactPhone?: string;
}

export interface BookingCreateResult {
  bookingReference: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  currency: Currency;
  flight: FlightSummary;
}
