# Supabase Backend Integration

## Overview
The flight booking app now has full Supabase backend persistence and authentication integration while maintaining a mock fallback layer for development without credentials.

## Files Created

### Database Layer
- **[lib/supabase/db.ts](lib/supabase/db.ts)**
  - `getUserByEmail()` - Fetch user by email
  - `createUser()` - Create new user record
  - `createBooking()` - Persist booking and passengers to database
  - `getBookingByReference()` - Retrieve booking with passengers
  - `updateBookingStatus()` - Update booking/payment status
  - `createPayment()` - Record payment transaction
  - `getPaymentByBookingId()` - Fetch payment details
  - `listUserBookings()` - List user's booking history

### Authentication Layer
- **[lib/supabase/auth.ts](lib/supabase/auth.ts)**
  - `signUpWithEmail()` - Register new user
  - `signInWithEmail()` - Authenticate user
  - `signOut()` - Logout
  - `getServerSession()` - Server-side session retrieval
  - `getCurrentUser()` - Browser-side user fetch

### Flight Provider
- **[lib/supabase/flight-provider.ts](lib/supabase/flight-provider.ts)**
  - `SupabaseFlightProvider` class - Database-backed provider
  - `searchFlights()` - Search with DB persistence ready
  - `createBooking()` - Create booking with DB storage
  - `confirmBooking()` - Mark booking as confirmed
  - Automatic fallback to mock data when Supabase unavailable

## Files Updated

### Authentication Endpoints
- **[app/api/auth/login/route.ts](app/api/auth/login/route.ts)**
  - Uses Supabase when configured
  - Falls back to mock auth if not
  - Sets secure session cookie

- **[app/api/auth/register/route.ts](app/api/auth/register/route.ts)**
  - Creates user in Supabase
  - Checks for duplicate emails
  - Returns session cookie

### Booking Endpoints
- **[app/api/search/route.ts](app/api/search/route.ts)**
  - Routes to Supabase provider when available
  - Fallback to mock provider
  - Reports source in response

- **[app/api/book/route.ts](app/api/book/route.ts)**
  - Creates booking in Supabase database
  - Persists passenger information
  - Records payment intent

- **[app/api/booking/confirm/route.ts](app/api/booking/confirm/route.ts)**
  - Confirms booking status
  - Updates payment status
  - Supabase-backed persistence

## Architecture Pattern

```
Client Request
    ↓
API Route (checks isSupabaseReady())
    ↓
    ├─ If Supabase configured
    │  └─ createServerSupabaseClient()
    │     └─ SupabaseFlightProvider / db helpers
    │        └─ Database operations
    │
    └─ If Supabase not configured
       └─ MockFlightProvider
          └─ In-memory mock data
```

## Environment Setup Required

To enable Supabase persistence, set these in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

When these are not set, the app automatically uses mock data and in-memory operations.

## Key Features

1. **Zero-downtime fallback** - Works with or without Supabase configured
2. **Type-safe database layer** - Full TypeScript support with Supabase types
3. **Session-based auth** - Secure cookies with proper scoping
4. **Multi-passenger bookings** - Stores all passenger info in booking_passengers table
5. **Payment tracking** - Records payment intents linked to bookings
6. **Audit-ready** - Database schema supports full audit logging

## Next Steps

1. Deploy Supabase instance and run `sql/schema.sql`
2. Set environment variables in production
3. Implement real provider integrations (Amadeus, Kiwix, etc.)
4. Add PDF ticket generation
5. Implement webhook handlers for payment providers
