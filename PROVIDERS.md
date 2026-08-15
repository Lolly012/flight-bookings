# Provider Integration Guide

This template uses a **provider abstraction pattern**, allowing you to swap flight, payment, and auth providers without changing your application code.

## Architecture

```
Application
    ↓
Provider Interface (Abstract)
    ├─ MockProvider (Built-in, for testing)
    ├─ SupabaseProvider (Database-backed)
    ├─ AmadeusProvider (Real flights) ← Add this
    ├─ StripeProvider (Payments) ← Add this
    └─ CustomProvider (Your own) ← Add this
```

## Flight Providers

### Current Implementation

**Location:** `lib/supabase/flight-provider.ts`

```typescript
export interface FlightProvider {
  searchFlights(search: SearchParams): Promise<FlightSummary[]>;
  getFlightDetails(flightId: string): Promise<FlightSummary | null>;
  getBookingByReference(reference: string): Promise<...>;
  createBooking(input: {...}): Promise<BookingCreateResult>;
}
```

Your implementation just needs to follow this interface!

### Adding Amadeus Provider (Example)

**File:** `lib/amadeus/flight-provider.ts`

```typescript
import type { FlightProvider } from "@/lib/supabase/flight-provider";
import { Amadeus } from "amadeus";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

export class AmadeusFlightProvider implements FlightProvider {
  async searchFlights(search: SearchParams): Promise<FlightSummary[]> {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: search.from,
      destinationLocationCode: search.to,
      departureDate: search.departureDate,
      adults: search.adults,
      children: search.children,
      infants: search.infants,
      travelClass: search.cabinClass,
    });

    return response.data.map((offer) => ({
      id: `${offer.id}`,
      airline: offer.validatingAirlineCodes[0],
      flightNumber: offer.itineraries[0].segments[0].number,
      // Map remaining fields...
    }));
  }

  async createBooking(input: {...}): Promise<BookingCreateResult> {
    const booking = await amadeus.booking.flightOrders.post({
      data: this.formatBookingData(input),
    });

    return {
      bookingReference: booking.id,
      status: "confirmed",
      // Return result...
    };
  }

  // Implement other methods...
}
```

**Update:** `lib/supabase.ts`

```typescript
import { AmadeusFlightProvider } from "@/lib/amadeus/flight-provider";

export function createFlightProvider() {
  if (process.env.AMADEUS_CLIENT_ID) {
    return new AmadeusFlightProvider();
  }
  
  // Fallback to Supabase, then mock
  if (isSupabaseReady()) {
    return new SupabaseFlightProvider(client);
  }
  
  return mockProvider;
}
```

**Environment Variables:** `.env.local`

```env
AMADEUS_CLIENT_ID=your_amadeus_client_id
AMADEUS_CLIENT_SECRET=your_amadeus_secret
```

### Other Flight Providers

#### Kiwix API (Budget Flights)

**Package:** `npm install kiwix-api`

```typescript
import { Kiwix } from "kiwix-api";

const kiwix = new Kiwix({
  apiKey: process.env.KIWIX_API_KEY,
});

export class KiwixFlightProvider implements FlightProvider {
  async searchFlights(search: SearchParams) {
    const results = await kiwix.flights.search({
      departure: search.from,
      arrival: search.to,
      departDate: search.departureDate,
      returnDate: search.returnDate,
      passengers: search.adults + search.children + search.infants,
    });

    return results.map(flight => ({...}));
  }
}
```

#### Sabre API (Enterprise)

```typescript
import { Sabre } from "sabre-sdk";

const sabre = new Sabre({
  clientId: process.env.SABRE_CLIENT_ID,
  clientSecret: process.env.SABRE_SECRET,
});

export class SabreFlightProvider implements FlightProvider {
  // Similar implementation
}
```

#### Your Own Backend

If you have existing flight data:

```typescript
export class CustomFlightProvider implements FlightProvider {
  async searchFlights(search: SearchParams) {
    const response = await fetch(`${process.env.YOUR_API_URL}/flights`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.YOUR_API_KEY}`,
      },
      body: JSON.stringify(search),
    });

    const data = await response.json();
    return data.flights.map(f => ({...}));
  }
}
```

## Payment Providers

### Current Implementation

**Location:** `lib/payment.ts`

```typescript
export interface PaymentProvider {
  createPaymentIntent(
    amount: number,
    currency: string,
    bookingReference: string
  ): Promise<{
    clientSecret: string;
    publishableKey: string;
  }>;
  
  verifyPayment(
    transactionId: string,
    expectedAmount: number
  ): Promise<boolean>;
}
```

### Adding Stripe Provider (Example)

**File:** `lib/stripe/payment-provider.ts`

```typescript
import Stripe from "stripe";
import type { PaymentProvider } from "@/lib/payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export class StripePaymentProvider implements PaymentProvider {
  async createPaymentIntent(
    amount: number,
    currency: string,
    bookingReference: string
  ) {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata: {
        bookingReference,
      },
    });

    return {
      clientSecret: intent.client_secret!,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
    };
  }

  async verifyPayment(paymentIntentId: string, expectedAmount: number) {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    return (
      intent.status === "succeeded" &&
      intent.amount === Math.round(expectedAmount * 100)
    );
  }
}
```

**Update:** `app/api/payments/route.ts`

```typescript
import { StripePaymentProvider } from "@/lib/stripe/payment-provider";

const paymentProvider = new StripePaymentProvider();

export async function POST(request: Request) {
  const { amount, currency, bookingReference } = await request.json();

  const { clientSecret, publishableKey } = await paymentProvider.createPaymentIntent(
    amount,
    currency,
    bookingReference
  );

  return NextResponse.json({
    clientSecret,
    publishableKey,
  });
}
```

**Environment Variables:** `.env.local`

```env
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

### Other Payment Providers

#### Flutterwave (Popular in Africa)

```typescript
import { Flutterwave } from "flutterwave-node-v3";

export class FlutterwavePaymentProvider implements PaymentProvider {
  private flutterwave = new Flutterwave(
    process.env.FLUTTERWAVE_PUBLIC_KEY,
    process.env.FLUTTERWAVE_SECRET_KEY
  );

  async createPaymentIntent(amount: number, currency: string, bookingRef: string) {
    const payload = {
      tx_ref: bookingRef,
      amount: amount,
      currency: currency,
      customer: {
        email: "customer@example.com",
      },
      customizations: {
        title: "Rhema Travel",
        description: "Flight Booking Payment",
      },
    };

    const response = await this.flutterwave.Payment.initiate(payload);
    return { link: response.data.link };
  }
}
```

#### PayPal

```typescript
import { PayPalClient } from "@paypal/checkout-server-sdk";

export class PayPalPaymentProvider implements PaymentProvider {
  private client = new PayPalClient.PayPalHttpClient(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );

  async createPaymentIntent(amount: number, currency: string, bookingRef: string) {
    const request = new PayPalCheckout.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [{
        amount: { currency_code: currency, value: amount.toString() },
        custom_id: bookingRef,
      }],
    });

    const response = await this.client.execute(request);
    return { orderId: response.result.id };
  }
}
```

## Authentication Providers

### Current Implementation

**Location:** `lib/supabase/auth.ts` and `app/api/auth/`

Currently uses Supabase Auth with mock fallback. You can add:

### Adding Firebase Auth (Example)

```typescript
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export const auth = getAuth(firebaseApp);

export async function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
```

### Adding Auth0

```typescript
import { ManagementClient } from "auth0";

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

export async function createUser(email: string, password: string) {
  return management.users.create({
    connection: "Username-Password-Authentication",
    email,
    password,
  });
}
```

## Database Providers

### Current: Supabase (PostgreSQL)

Located: `lib/supabase/db.ts`

To switch databases:

### Adding MongoDB

```typescript
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("travel_bookings");

export async function createBooking(input: BookingInput) {
  const result = await db.collection("bookings").insertOne({
    bookingReference: input.bookingReference,
    passengers: input.passengers,
    status: input.status,
    createdAt: new Date(),
  });

  return result;
}
```

### Adding Firebase Realtime Database

```typescript
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const db = getDatabase();

export async function createBooking(input: BookingInput) {
  const bookingRef = ref(db, `bookings/${input.bookingReference}`);
  await set(bookingRef, input);
}
```

## Testing Without Live Keys

All the above examples work **without live API keys**:

1. During development, the template falls back to mock data
2. Deploy with mock data to test the flow
3. Add real provider keys only when ready
4. No changes to application code needed

## Switching Providers at Runtime

Create a provider factory:

```typescript
// lib/provider-factory.ts

export function getFlightProvider() {
  if (process.env.FLIGHT_PROVIDER === "amadeus") {
    return new AmadeusFlightProvider();
  }
  if (process.env.FLIGHT_PROVIDER === "kiwix") {
    return new KiwixFlightProvider();
  }
  if (process.env.FLIGHT_PROVIDER === "sabre") {
    return new SabreFlightProvider();
  }
  return mockProvider;
}

export function getPaymentProvider() {
  if (process.env.PAYMENT_PROVIDER === "stripe") {
    return new StripePaymentProvider();
  }
  if (process.env.PAYMENT_PROVIDER === "flutterwave") {
    return new FlutterwavePaymentProvider();
  }
  return mockPaymentProvider;
}
```

Then in your API routes:

```typescript
// app/api/search/route.ts

const flightProvider = getFlightProvider();
const results = await flightProvider.searchFlights(params);
```

## Best Practices

1. **Always implement the interface** - Don't break the contract
2. **Handle errors gracefully** - Fall back to mock on API failures
3. **Cache credentials** - Use environment variables, never hardcode
4. **Log everything** - Track which provider is being used
5. **Test with mock first** - Ensure flow works before adding real provider
6. **Version your API calls** - Providers change their APIs
7. **Document requirements** - Each provider needs setup docs for your customers

## Adding Documentation for Your Customers

When selling, include:

1. **PROVIDERS.md** (this file) - How to integrate providers
2. **AMADEUS_SETUP.md** - Specific Amadeus integration guide
3. **STRIPE_SETUP.md** - Specific Stripe integration guide
4. **etc.**

Each guide should include:
- How to get API keys
- Where to add them in `.env.local`
- Which endpoints to test
- Expected errors and solutions

---

**The beauty of this architecture:** Your customers can use ANY combination of providers. They're not locked into Amadeus or Stripe. They can start with your mock data, then integrate their own providers when ready.
