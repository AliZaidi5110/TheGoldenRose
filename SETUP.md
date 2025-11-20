# Setup Instructions

## Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Open in Browser**
Navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The production files will be in the `dist/` folder.

## Preview Production Build

```bash
npm run preview
```

## Project Features Implemented

### ✅ Hero Section
- Gradient background with pattern overlay
- Live "Open Now" status indicator with pulse animation
- Dual CTA buttons (Order Now, Call Us)
- Quick info badges (Rating, Delivery time, Min order)
- Animated logo display

### ✅ Navigation Bar
- Sticky header that stays on top while scrolling
- Mobile-responsive hamburger menu
- "Order Now" button in header
- Active page highlighting
- Smooth color transitions

### ✅ Why Choose Us Section
- 4 key benefits with gradient card backgrounds
- Icon-based visual representation
- Hover effects on cards

### ✅ Featured Products
- 4 most popular items
- Product badges (Bestseller, Popular, New, Trending)
- Star ratings (4.6 - 4.9)
- Hover effects with scale and overlay
- Quick add buttons
- "View All Products" CTA

### ✅ How It Works
- 4-step ordering process
- Numbered gradient circles
- Visual connection lines between steps
- Clear, concise descriptions

### ✅ Special Offers Section
- Live countdown timer (hours, minutes, seconds)
- Promotional messaging (15% off on £20+)
- Gradient background with overlay
- Animated "LIMITED TIME OFFER" badge

### ✅ Customer Testimonials
- 4 customer reviews
- Avatar initials
- 5-star rating system
- Hover shadow effects

### ✅ Products/Menu Page
- Search bar with icon
- Category filtering (All, Drinks, Groceries, Dairy, Confectionery, Baking, Pet Food, Frozen)
- Active filter highlighting
- Product count display
- Responsive grid (1-4 columns)
- Empty state for no results
- Call-to-action section

### ✅ Product Cards
- High-quality images
- Star ratings
- Category badges
- Price display
- Hover effects (scale, shadow, overlay)
- Quick add button
- Add to cart icon button

### ✅ Contact Page
- Business information with icons
- Google Maps iframe
- Contact form (name, email, message)
- Opening hours
- Social media links
- Responsive layout

### ✅ Footer
- Business logo and description
- Social media icons (Facebook, WhatsApp)
- Quick links navigation
- Contact information with icons
- Opening hours
- Newsletter subscription
- Payment methods display
- Privacy policy and terms links
- Copyright information

## Customization

### Update Business Information

Edit `src/components/Footer.jsx` and `src/pages/Contact.jsx`:
- Address
- Phone number
- Email
- Opening hours
- Social media links

### Update Products

Edit `src/data/products.js`:
- Add/remove products
- Update prices
- Change categories
- Modify ratings

### Update Colors

Edit `tailwind.config.js` to customize the color palette.

### Update Logo

Replace `assets/Logo.png` with your logo (recommended size: 256x256px).

## Technical Stack

- **React 18.2.0** - UI framework
- **React Router DOM 6.22.0** - Client-side routing
- **Tailwind CSS 3.4.1** - Utility-first CSS
- **Vite 5.1.0** - Build tool and dev server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Lazy loading for images
- Optimized bundle size
- Fast refresh in development
- Production build minification
- CSS purging for unused styles

## Deployment

### Netlify
```bash
npm run build
# Deploy the dist/ folder
```

### Vercel
```bash
npm run build
# Deploy the dist/ folder
```

### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder to gh-pages branch
```

## Support

For issues or questions, contact: thegoldenrose@example.com
