import { z } from "zod";

export const searchSchema = z.object({
  from: z.string().min(2),
  to: z.string().min(2),
  departureDate: z.string().min(1),
  returnDate: z.string().optional(),
  adults: z.coerce.number().int().min(1).max(9),
  children: z.coerce.number().int().min(0).max(8),
  infants: z.coerce.number().int().min(0).max(4),
  cabinClass: z.enum(["Economy", "Premium Economy", "Business", "First"]),
  tripType: z.enum(["round-trip", "one-way", "multi-city"]).default("round-trip"),
});

export const passengerSchema = z.object({
  title: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  dateOfBirth: z.string().min(1),
  nationality: z.string().optional(),
});

export const bookingSchema = z.object({
  flightId: z.string().min(1),
  passengers: z.array(passengerSchema).min(1),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  extras: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});
