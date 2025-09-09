# HN Laptop Store

A modern e-commerce platform for selling laptops, built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- 🛒 **Product Catalog**: Browse laptops with advanced filtering and search
- 🛍️ **Shopping Cart**: Add products to cart with real-time updates
- 💳 **Order Management**: Complete checkout process with order tracking
- 👨‍💼 **Admin Panel**: Manage products, orders, and inventory
- 📱 **Responsive Design**: Mobile-first design with modern UI
- 🔐 **Authentication**: Secure admin access (coming soon)
- 🖼️ **Image Management**: Product images with gallery support

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel (recommended)

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
   
   Fill in your Supabase credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
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
- `npm run seed` - Seed database with sample data (coming soon)

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
├── supabaseClient.js      # Supabase configuration
└── tailwind.config.js     # Tailwind configuration
```

## Database Schema

The application uses the following main tables:

- **brands**: Product brands (Apple, Dell, HP, etc.)
- **products**: Product information and specifications
- **product_images**: Product image URLs
- **orders**: Customer orders
- **order_items**: Individual items in each order

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

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes (for admin) |
| `NEXT_PUBLIC_APP_URL` | Application URL | No |
| `NEXT_PUBLIC_STORAGE_BUCKET` | Supabase storage bucket name | No |

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

- [ ] User authentication and registration
- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced admin analytics
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Multi-language support

---

Built with ❤️ using Next.js and Supabase