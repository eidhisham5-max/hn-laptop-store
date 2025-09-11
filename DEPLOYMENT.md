# Production Deployment Guide

## Prerequisites

1. **Domain & Hosting**: Set up your domain and hosting provider (Vercel, Netlify, or VPS)
2. **Supabase Project**: Create a production Supabase project
3. **Paymob Account**: Set up Paymob payment gateway account
4. **SSL Certificate**: Ensure HTTPS is enabled

## Environment Setup

### 1. Create Production Environment File

Create `.env.local` with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com

# Paymob Payment Gateway
PAYMOB_API_KEY=your_paymob_api_key
PAYMOB_HMAC_SECRET=your_paymob_hmac_secret
PAYMOB_INTEGRATION_ID=your_paymob_integration_id
PAYMOB_IFRAME_ID=your_paymob_iframe_id

# Application Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production

# Security
NEXTAUTH_SECRET=your_nextauth_secret_key_here
NEXTAUTH_URL=https://yourdomain.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### 2. Supabase Production Setup

1. Create a new Supabase project for production
2. Run the database setup script from `SUPABASE_SETUP.md`
3. Enable Row Level Security (RLS) policies
4. Set up proper authentication settings
5. Configure storage buckets for product images

### 3. Paymob Configuration

1. Register at [Paymob](https://www.paymob.com/)
2. Get your API credentials from the dashboard
3. Configure webhook URL: `https://yourdomain.com/api/paymob/webhook`
4. Test payment flow in sandbox mode first

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**:
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **Environment Variables**: Add all production env vars in Vercel dashboard

3. **Custom Domain**: Configure in Vercel dashboard

4. **Build Settings**: Vercel auto-detects Next.js

### Option 2: Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**: Add in Netlify dashboard

### Option 3: VPS/Server

1. **Install Dependencies**:
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx
   ```

2. **Build Application**:
   ```bash
   npm install
   npm run build
   npm start
   ```

3. **Nginx Configuration**:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
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

## Database Migration

1. **Backup Development Data** (if needed):
   ```bash
   node scripts/backup.js
   ```

2. **Run Production Seed**:
   ```bash
   NODE_ENV=production node scripts/seed.js
   ```

## Security Checklist

- [ ] All environment variables are set
- [ ] HTTPS is enabled
- [ ] RLS policies are active in Supabase
- [ ] Admin email is configured
- [ ] Paymob webhook is secured with HMAC
- [ ] Rate limiting is enabled
- [ ] Input validation is working
- [ ] No hardcoded secrets in code

## Performance Optimization

- [ ] Image optimization is enabled (WebP/AVIF)
- [ ] Bundle analysis shows no large chunks
- [ ] Database queries are optimized
- [ ] CDN is configured for static assets
- [ ] Caching headers are set

## Monitoring Setup

### 1. Error Tracking
- Set up Sentry or similar service
- Monitor API errors and client-side errors

### 2. Analytics
- Google Analytics for user behavior
- Supabase Analytics for database performance

### 3. Uptime Monitoring
- Use UptimeRobot or similar service
- Monitor critical endpoints

## Post-Deployment Testing

1. **Functional Tests**:
   - [ ] Home page loads
   - [ ] Product browsing works
   - [ ] Add to cart functionality
   - [ ] Checkout process (COD)
   - [ ] Payment gateway integration
   - [ ] Order tracking
   - [ ] Admin panel access
   - [ ] Product management (CRUD)

2. **Performance Tests**:
   - [ ] Page load times < 3 seconds
   - [ ] Mobile responsiveness
   - [ ] Payment processing time

3. **Security Tests**:
   - [ ] Admin routes are protected
   - [ ] API endpoints validate input
   - [ ] No sensitive data in client code

## Maintenance

### Regular Tasks
- Monitor error logs
- Update dependencies monthly
- Backup database weekly
- Review analytics monthly

### Scaling Considerations
- Database connection pooling
- CDN for static assets
- Load balancing for high traffic
- Database read replicas

## Troubleshooting

### Common Issues

1. **Build Failures**: Check environment variables
2. **Database Connection**: Verify Supabase credentials
3. **Payment Issues**: Check Paymob configuration
4. **Admin Access**: Verify admin email setting

### Support Contacts
- Supabase: [Support Portal](https://supabase.com/support)
- Paymob: [Support Center](https://www.paymob.com/support)
- Next.js: [Documentation](https://nextjs.org/docs)
