# HN Laptop Store

A modern, production-ready e-commerce platform for selling laptops, built with Next.js 14, Supabase, and Tailwind CSS. Includes a complete Design System, admin dashboard, secure Paymob payments, E2E tests, and deployment tooling.

## Features

- 🛒 **Product Catalog**: Listing, filters (brand/category/condition/price), search, grid/list view
- 🛍️ **Cart & Checkout**: Add to cart, order summary, success page, order tracking
- 💳 **Payments (Paymob)**: Initiation API, hosted iframe flow, HMAC webhook verification
- 👨‍💼 **Admin Dashboard**: Products CRUD, orders management, basic analytics
- 📱 **Responsive UI**: Desktop/Tablet/Mobile with polished components and micro-interactions
- 🔐 **Auth**: Supabase Auth for session handling and admin access
- 🖼️ **Images**: `next/image` with remote patterns and optimization
- ✅ **Testing**: Playwright E2E smoke flow (home → product → cart → checkout)
- 🚀 **Deployment**: Docker/Nginx, CI/CD, monitoring, backup/restore scripts

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Design Tokens, class-variance-authority
- **Backend**: Supabase (Postgres, Auth, Storage)
- **Payments**: Paymob Accept (Egypt)
- **Testing**: Playwright
- **Deployment**: Docker, Nginx, GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hn-laptop-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your Supabase and Paymob credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
   PAYMOB_API_KEY=your_paymob_api_key
   PAYMOB_HMAC_SECRET=your_paymob_hmac_secret
   PAYMOB_INTEGRATION_ID=your_paymob_integration_id
   PAYMOB_IFRAME_ID=your_paymob_iframe_id
   ```

4. **Set up the database**
   
   Follow the instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to create the database schema and insert sample data.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript check
- `npm run analyze` - Analyze production bundle
- `npm run test:e2e` - Run Playwright tests (headed)
- `npm run e2e:headless` - Run Playwright tests headless
- `npm run backup` / `npm run restore` - DB backup/restore helpers
- `npm run health-check` - API health probe
- `npm run build:production` - Build with analysis flags
- `npm run deploy:check` - CI sanity checks

## Project Structure

```
hn-laptop-store/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   │   ├── orders/        # Order management
│   │   └── products/      # Product management
│   ├── cart/              # Shopping cart pages
│   ├── components/        # Reusable components
│   ├── data/              # Data access layer
│   ├── orders/            # Customer order tracking
│   └── products/          # Product pages
├── public/                # Static assets
├── supabaseClient.js      # Supabase configuration (consolidated)
└── tailwind.config.js     # Tailwind configuration
```

## Database Schema

The application uses the following main tables:

- **brands**: Product brands (Apple, Dell, HP, etc.)
- **products**: Product information and specifications
- **product_images**: Product image URLs
- **orders**: Customer orders
- **order_items**: Individual items in each order
 - Columns include pricing and `discount`. See `SUPABASE_SETUP.md` and `fix-database.sql`.

## Key Features

### Product Management
- Add/edit/delete products
- Upload product images
- Manage product status (Active/Inactive)
- Set pricing and discounts

### Order Processing
- Customer order placement
- Order status tracking
- Admin order management
- Order history for customers

### Shopping Experience
- Advanced product filtering
- Search functionality
- Shopping cart with real-time updates
- Responsive product cards

## Deployment

### Vercel

1. Connect repo and set environment variables
2. Ensure image domains are configured in `next.config.ts`
3. Deploy (auto build)

### Docker + Nginx (Production)

See `DEPLOYMENT.md`, `Dockerfile`, `docker-compose.yml`, and `nginx.conf` for a reverse proxy setup, HTTPS termination, and environment configuration. CI example in `.github/workflows/deploy.yml`.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes (for admin) |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Admin email for UI hints | No |
| `PAYMOB_API_KEY` | Paymob API key | Yes (payments) |
| `PAYMOB_HMAC_SECRET` | Paymob webhook HMAC secret | Yes (webhook) |
| `PAYMOB_INTEGRATION_ID` | Paymob card integration ID | Yes (payments) |
| `PAYMOB_IFRAME_ID` | Paymob iframe ID | Yes (payments) |

## Testing & QA

- E2E smoke: `npm run test:e2e` (requires dev server)
- Accessibility: keyboard navigation, skip-link, roles/labels added; basic WCAG AA contrast via Tailwind tokens
- Performance: code-splitting for product pages, debounce search, optimized images

## Documentation Index

- Design System: `DESIGN_SYSTEM.md`
- Component Library: `COMPONENT_LIBRARY_GUIDE.md`
- Wireframes: `DESIGN_WIREFRAMES.md`
- Figma-text specs: `FIGMA_DESIGNS_OVERVIEW.md` and `designs/*`
- Responsive notes: `RESPONSIVE_OPTIMIZATION.md`
- Supabase setup: `SUPABASE_SETUP.md`
- Database fixes: `fix-database.sql`
- Deployment guide: `DEPLOYMENT.md`, `PRODUCTION_CHECKLIST.md`
- Final report: `FINAL_REPORT.md`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@hnlaptopstore.com or create an issue in the repository.

## Roadmap

- [ ] Social login providers
- [ ] Deeper analytics & dashboards
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Multi-language support

---

Built with ❤️ using Next.js and Supabase