# Quick Start Guide

Get the flight booking platform running in **2 minutes** with zero API keys.

## Step 1: Install Dependencies (30 seconds)

```bash
git clone <your-repo>
cd test-vs-claude-app
npm install
```

## Step 2: Start Development Server (10 seconds)

```bash
npm run dev
```

Output:
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

## Step 3: Open in Browser (Instant)

Visit: **http://localhost:3000**

✅ **Done!** The app is running with mock data.

---

## What You Can Test Right Now

### 1. Homepage
- View hero section with call-to-action
- Browse destinations
- See trust section

**URL:** `http://localhost:3000`

### 2. Flight Search
- Enter search: Lagos (LOS) to London (LHR)
- Date: tomorrow
- Passengers: 1 adult
- Class: Economy

**URL:** `http://localhost:3000/search`

**Mock results:**
- 5 flights with real airlines
- Prices: ₦150K-₦400K
- Flight times: 7-9 hours
- Baggage: 23-30kg included

### 3. Book a Flight
- Select a flight
- Enter passenger details:
  - Name: John Doe
  - Email: john@example.com
  - Phone: +234 8000000000
- See booking confirmation

**URL:** `http://localhost:3000/booking`

### 4. Manage Booking
- Look up by reference: e.g., "RRT-ABC123"
- Enter last name: Doe
- View booking details

**URL:** `http://localhost:3000/manage-booking`

### 5. Admin Dashboard
- View all bookings in real-time table
- Filter by status (Pending, Confirmed, etc.)
- Click "View" to see booking details
- Update booking status
- See passenger information

**URL:** `http://localhost:3000/admin`

**Note:** Admin panel is accessible to anyone in development. In production, it's protected by authentication.

---

## Test Account (Mock)

```
Email: traveller@example.com
Password: password123

Admin Login:
Email: admin@rhema.com
Password: password123
```

---

## File Structure

```
test-vs-claude-app/
├── app/                      # Pages and routes
│   ├── page.tsx             # Homepage
│   ├── search/              # Search page
│   ├── booking/             # Booking flow
│   ├── admin/               # Admin dashboard
│   └── api/                 # Backend endpoints
├── components/              # Reusable components
├── lib/                     # Business logic
│   ├── flight-provider.ts   # Mock flight provider
│   ├── flight-data.ts       # Mock flight inventory
│   ├── pricing.ts           # Price calculations
│   ├── types.ts             # TypeScript types
│   └── supabase/            # Real database integrations
├── sql/                     # Database schema
├── public/                  # Static files
├── .env.example             # Environment variables template
├── SELLING.md              # Marketplace selling guide
├── PROVIDERS.md            # Provider integration guide
├── DEPLOYMENT.md           # Production deployment guide
└── .env.scenarios.md       # Environment examples
```

---

## Common Commands

```bash
# Install dependencies
npm install

# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Clean build cache
rm -rf .next node_modules
npm install
npm run build
```

---

## Customization (Easy)

### Change Colors

Edit: `tailwind.config.ts`

```typescript
// From
colors: {
  slate: { 50: '#f8fafc', ... },
  sky: { 500: '#0ea5e9', ... },
}

// To
colors: {
  slate: { 50: '#f8fafc', ... },
  amber: { 500: '#f59e0b', ... },
}
```

### Change Logo

Replace file: `public/logo.png`

Edit: `app/page.tsx` → Hero section

### Change Pricing

Edit: `lib/pricing.ts`

```typescript
// Add 20% markup + ₦10,000 fee
const agencyMarkup = baseFare * 0.20 + 10000;
```

### Change Routes/Flights

Edit: `lib/flight-data.ts`

Add new routes, airlines, prices

---

## Deploy in 3 Steps

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel login
vercel
```

Your app is live at: `your-project.vercel.app`

### Option 2: Docker

```bash
docker build -t flight-booking .
docker run -p 3000:3000 flight-booking
```

Visit: `http://localhost:3000`

### Option 3: Any Node.js Server

```bash
npm run build
npm start
```

Server runs on port 3000

---

## Add Real Providers (Later)

Don't need to add now! But when you do:

### Add Flight Search (Amadeus)

1. Sign up: [developers.amadeus.com](https://developers.amadeus.com)
2. Get API key
3. Add to `.env.local`:
   ```
   AMADEUS_CLIENT_ID=your_id
   AMADEUS_CLIENT_SECRET=your_secret
   ```
4. Flights automatically switch from mock to real!

### Add Payments (Stripe)

1. Sign up: [stripe.com](https://stripe.com)
2. Get Secret Key
3. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_live_xxxxx
   ```
4. Payments automatically switch from mock to real!

See [PROVIDERS.md](PROVIDERS.md) for detailed integration guides.

---

## Selling Tips

### What to Tell Customers

> "This is a complete, working flight booking platform. It runs immediately with mock data - no API keys needed for demos. When you're ready for real flights/payments, just add your provider credentials. Everything works out of the box."

### Pricing Suggestions

- **$99** - Single license (personal use)
- **$299** - Business license (sell to others)
- **$999** - Enterprise (with customization support)
- **Monthly SaaS** - $99-$999 per month

### Package You Sell

Include:
- ✅ Complete source code (Next.js)
- ✅ Database schema (PostgreSQL)
- ✅ Admin panel
- ✅ API routes
- ✅ Documentation
- ✅ Setup guides
- ✅ Provider integration examples

Exclude:
- ❌ Live API credentials
- ❌ Hosted version (unless SaaS)
- ❌ Technical support (unless premium)

---

## Next Steps

1. **Test everything** - Ensure all flows work
2. **Customize branding** - Add your logo and colors
3. **Read docs** - SELLING.md, PROVIDERS.md, DEPLOYMENT.md
4. **Deploy** - Put it live on Vercel/your server
5. **Create marketplace listing** - Gumroad, Envato, etc.
6. **Add documentation** - For your customers
7. **Get feedback** - Improve based on customer needs

---

## Troubleshooting

### App won't start

```bash
# Clear cache
rm -rf .next node_modules package-lock.json

# Reinstall
npm install

# Start
npm run dev
```

### Port 3000 already in use

```bash
# Use different port
PORT=3001 npm run dev
```

### TypeScript errors

```bash
# Type check
npx tsc --noEmit

# If errors, check lib/types.ts
```

### Build fails

```bash
# Check Next.js version
npm list next

# Ensure Node 18+
node --version

# Try build
npm run build
```

---

## Questions?

- **How to integrate Amadeus?** → See PROVIDERS.md
- **How to deploy?** → See DEPLOYMENT.md
- **What are environment variables?** → See .env.scenarios.md
- **How to add payments?** → See PROVIDERS.md (Payment Providers)
- **How to customize?** → Edit files in `app/`, `lib/`, `components/`

---

**You're all set! Happy selling! 🚀**
