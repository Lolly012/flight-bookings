import type { SupabaseClient } from "@supabase/supabase-js";
import type { PassengerInfo, BookingCreateInput, BookingCreateResult, BookingStatus, PaymentStatus, FlightSummary } from "@/lib/types";

export async function getUserByEmail(client: SupabaseClient | null, email: string) {
  if (!client) return null;

  const { data, error } = await client
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function createUser(
  client: SupabaseClient | null,
  email: string,
  fullName: string,
  passwordHash?: string,
  role: string = "customer"
) {
  if (!client) return null;

  const { data, error } = await client.from("users").insert({
    email,
    full_name: fullName,
    password_hash: passwordHash,
    role,
  }).select().single();

  if (error) throw error;
  return data;
}

export async function createBooking(
  client: SupabaseClient | null,
  {
    userId,
    bookingReference,
    flight,
    passengers,
    status = "pending",
    paymentStatus = "pending",
    basefare,
    taxes,
    serviceFee,
    agencyMarkup,
    finalPrice,
    currency,
  }: {
    userId?: string;
    bookingReference: string;
    flight: FlightSummary;
    passengers: PassengerInfo[];
    status?: BookingStatus;
    paymentStatus?: PaymentStatus;
    basefare: number;
    taxes: number;
    serviceFee: number;
    agencyMarkup: number;
    finalPrice: number;
    currency: string;
  }
) {
  if (!client) return null;

  const { data: booking, error: bookingError } = await client
    .from("bookings")
    .insert({
      booking_reference: bookingReference,
      user_id: userId,
      status,
      payment_status: paymentStatus,
      origin_code: flight.origin,
      destination_code: flight.destination,
      departure_at: flight.departureAt,
      arrival_at: flight.arrivalAt,
      base_fare: basefare,
      taxes,
      service_fee: serviceFee,
      agency_markup: agencyMarkup,
      final_customer_price: finalPrice,
      currency,
    })
    .select()
    .single();

  if (bookingError) throw bookingError;

  for (const passenger of passengers) {
    const { error: passengerError } = await client.from("booking_passengers").insert({
      booking_id: booking.id,
      title: passenger.title,
      first_name: passenger.firstName,
      middle_name: passenger.middleName,
      last_name: passenger.lastName,
      date_of_birth: passenger.dateOfBirth,
      gender: passenger.gender,
      nationality: passenger.nationality,
      passport_number: passenger.passportNumber,
      passport_expiry: passenger.passportExpiry,
      passport_issuing_country: passenger.passportIssuingCountry,
      email: passenger.email,
      phone: passenger.phone,
    });

    if (passengerError) throw passengerError;
  }

  return booking;
}

export async function getBookingByReference(client: SupabaseClient | null, bookingReference: string) {
  if (!client) return null;

  const { data, error } = await client
    .from("bookings")
    .select(
      `
      *,
      booking_passengers (*)
    `
    )
    .eq("booking_reference", bookingReference)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function updateBookingStatus(
  client: SupabaseClient | null,
  bookingId: string,
  status: BookingStatus,
  paymentStatus?: PaymentStatus
) {
  if (!client) return null;

  const updateData: Record<string, unknown> = { status };
  if (paymentStatus) {
    updateData.payment_status = paymentStatus;
  }

  const { data, error } = await client
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createPayment(
  client: SupabaseClient | null,
  bookingId: string,
  provider: string,
  amount: number,
  currency: string,
  status: PaymentStatus = "pending",
  providerReference?: string,
  rawPayload?: Record<string, unknown>
) {
  if (!client) return null;

  const { data, error } = await client
    .from("payments")
    .insert({
      booking_id: bookingId,
      provider,
      provider_reference: providerReference,
      amount,
      currency,
      status,
      raw_payload: rawPayload,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPaymentByBookingId(client: SupabaseClient | null, bookingId: string) {
  if (!client) return null;

  const { data, error } = await client
    .from("payments")
    .select("*")
    .eq("booking_id", bookingId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function listUserBookings(client: SupabaseClient | null, userId: string, limit = 20) {
  if (!client) return [];

  const { data, error } = await client
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
