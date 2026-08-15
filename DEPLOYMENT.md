# Deployment Guide

Deploy your flight booking template to production **without any live API keys**. The template works perfectly with mock data.

## Deployment Options

### Option 1: Vercel (Recommended)

**Easiest, most popular, free tier available.**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

**Benefits:**
- ✅ One-click deployment
- ✅ Free tier (great for selling)
- ✅ Automatic SSL/HTTPS
- ✅ Environment variables UI
- ✅ Automatic previews for PRs
- ✅ Serverless functions included

**Pricing:**
- Hobby: Free
- Pro: $20/month
- Enterprise: Custom

**Setup:**
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Select this repository
4. Click Deploy
5. Add environment variables (optional):
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```

Done! Your app is live at `your-project.vercel.app`

### Option 2: Netlify

**Similar to Vercel, great alternative.**

```bash
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

Or connect GitHub:
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub
3. Select repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Deploy

### Option 3: Docker (Any Server)

**For VPS, DigitalOcean, Heroku, AWS, etc.**

**File:** `Dockerfile`

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

**Build & Deploy:**

```bash
# Build image
docker build -t flight-booking .

# Run locally
docker run -p 3000:3000 flight-booking

# Push to registry
docker tag flight-booking:latest your-registry/flight-booking
docker push your-registry/flight-booking
```

### Option 4: Traditional Node.js Server

**For cPanel, AWS EC2, DigitalOcean Droplets, etc.**

```bash
# On your server
cd /var/www/flight-booking
git clone <your-repo> .
npm install

# Build
npm run build

# Install PM2 (process manager)
npm install -g pm2

# Start
pm2 start npm --name "flight-booking" -- start

# Auto-restart on reboot
pm2 startup
pm2 save
```

**Nginx Config:**

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 5: Heroku

**Easiest for quick demos.**

```bash
npm install -g heroku

heroku login
heroku create your-app-name
git push heroku main

heroku open
```

### Option 6: Railway

**Modern, simple alternative to Heroku.**

1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. Select repository
4. Railway auto-detects Next.js
5. Deploy automatically

## Environment Variables

### Minimal (Mock Mode Only)

Leave all optional:

```env
# No variables needed - everything works!
```

The app works perfectly with just the defaults.

### With Supabase (Optional)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

### Full Setup (Real Providers)

```env
# Database
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Flight Provider (Choose one)
AMADEUS_CLIENT_ID=your-client-id
AMADEUS_CLIENT_SECRET=your-secret

# Payment Provider (Choose one)
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## Deployment Checklist

- [ ] Choose hosting platform
- [ ] Connect GitHub repository
- [ ] Set build command: `npm run build`
- [ ] Set start command: `npm start` (or use platform defaults)
- [ ] Add environment variables (optional, leave blank for mock mode)
- [ ] Set Node version: 18+ (recommended 20)
- [ ] Enable HTTPS (automatic on most platforms)
- [ ] Test homepage at your domain
- [ ] Test flight search
- [ ] Test booking flow
- [ ] Test admin dashboard at `/admin`

## Performance Optimizations

### Image Optimization

The app uses Next.js Image Optimization automatically:

```typescript
import Image from "next/image";

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

### Database Query Optimization

Indexes are already set up in `sql/schema.sql`:

```sql
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
```

### Caching

Add caching headers in `next.config.ts`:

```typescript
export const revalidate = 3600; // 1 hour ISR
```

## Scaling Strategies

### Phase 1: Getting Started (Current)

- Single Vercel deployment
- Mock data
- Works for demos and testing
- **Cost: Free**

### Phase 2: Adding Real Flights

- Integrate Amadeus or Kiwix
- Switch to Supabase for data
- Add payment provider (Stripe/Flutterwave)
- **Cost: $10-50/month**

### Phase 3: Production Scale

- Load balancing (if on traditional server)
- Database read replicas
- CDN for static assets
- Caching layer (Redis)
- **Cost: $100-500/month**

### Phase 4: Enterprise

- Multi-region deployment
- Database sharding
- API rate limiting
- Advanced monitoring
- **Cost: $1000+/month**

## Monitoring & Logging

### Vercel Dashboard

- Built-in monitoring
- Real-time logs
- Error alerts
- Performance metrics

### Add Sentry (Error Tracking)

```bash
npm install @sentry/nextjs
```

```typescript
// next.config.ts
import { withSentryConfig } from "@sentry/nextjs";

const withSentryConfig = withSentryConfig(
  nextConfig,
  {
    org: "your-org",
    project: "flight-booking",
  }
);

export default withSentryConfig;
```

### Add Vercel Analytics

Automatic in Vercel. See dashboard at:
`vercel.com/projects/your-project/analytics`

## SSL/HTTPS

### Vercel & Netlify

Automatic, included.

### Self-Hosted

Use Let's Encrypt with Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

Then reference in Nginx:

```nginx
ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
```

## Maintenance & Updates

### Update Dependencies

```bash
npm update
npm audit fix
npm run build
npm start
```

### Database Backups (Supabase)

Automatic daily backups. Access at:
https://app.supabase.com → Project → Settings → Backups

### Monitoring Uptime

Use services like:
- UptimeRobot (free)
- Pingdom
- Hetrixtools

Set to check: `https://yourdomain.com/api/health`

## Troubleshooting

### Build Fails

Check logs in your hosting platform dashboard.

**Common issues:**
- Missing environment variables
- Node version mismatch
- Missing dependencies: `npm install`

### App Crashes After Deploy

Check live logs:

**Vercel:**
```bash
vercel logs
```

**Docker:**
```bash
docker logs <container-id>
```

**PM2:**
```bash
pm2 logs flight-booking
```

### Database Connection Issues

If using Supabase:
1. Check URL and keys in `.env.local`
2. Verify Supabase project is running
3. Check network (Supabase might be rate-limiting)

### Slow Performance

1. Check database indexes in Supabase
2. Enable caching: `NEXT_PUBLIC_REVALIDATE=3600`
3. Use CDN for static assets
4. Upgrade hosting plan

## Multi-Tenant Deployment (Advanced)

To serve multiple customers from one codebase:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const subdomain = host.split(".")[0];
  
  if (subdomain !== "www" && subdomain !== "app") {
    request.nextUrl.searchParams.set("customer", subdomain);
  }
  
  return NextResponse.rewrite(request.nextUrl);
}
```

Then each customer gets:
- `customer1.yourdomain.com` → Their branded version
- `customer2.yourdomain.com` → Their branded version
- `app.yourdomain.com` → Admin dashboard

See [SELLING.md](SELLING.md#monetization-strategies) for more on multi-tenant SaaS.

## Cost Estimates

| Platform | Free Tier | Monthly |
|----------|-----------|---------|
| Vercel | Yes | $20-50 |
| Netlify | Yes | $0-500 |
| Heroku | No (ended free tier) | $50+ |
| DigitalOcean | $5 credit | $5-20 |
| AWS | 1 year free | $10-100 |
| Railway | Free tier | $5-20 |
| Supabase (DB) | Yes | $25+ |

**Total Minimum:** $0 (Vercel free tier + mock data)
**Recommended:** $25-50/month (Vercel + Supabase)

---

Ready to deploy? Choose a platform above and follow the steps. Everything works without live API keys!
