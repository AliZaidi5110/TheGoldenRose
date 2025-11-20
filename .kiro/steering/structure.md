# Project Structure

## Directory Organization

```
the-golden-rose/
├── assets/              # Static assets (images, logo)
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── data/           # Static data and constants
│   ├── pages/          # Page-level components
│   ├── App.jsx         # Root application component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles with Tailwind directives
├── .kiro/              # Kiro AI assistant configuration
│   └── steering/       # AI guidance documents
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## Component Architecture

### `/src/components/`
Reusable UI components used across multiple pages:
- `Navbar.jsx` - Sticky navigation with mobile menu
- `Footer.jsx` - Site footer with contact info and social links
- `ProductCard.jsx` - Product display card with hover effects

### `/src/pages/`
Page-level components mapped to routes:
- `Home.jsx` - Landing page with hero section
- `Products.jsx` - Product catalog grid
- `About.jsx` - Our story and legacy of Rosemary Jennings (1952-2022)
- `Contact.jsx` - Contact form and business information

### `/src/data/`
Static data files:
- `products.js` - Product catalog with images, prices, categories

## Routing Structure

- `/` - Home page
- `/products` - Products catalog
- `/about` - About us and our story
- `/contact` - Contact page

## Asset Management

- All product images stored in `/assets/` folder
- Images imported directly in `products.js`
- Logo used in navbar and favicon

## Styling Conventions

- Tailwind utility classes for all styling
- Custom color palette: `golden` and `forest` variants (legacy), primary colors are orange-red gradients
- Responsive breakpoints: mobile-first approach
- Hover effects: scale, shadow, color transitions, gradient overlays
- Gradient backgrounds: `from-orange-500 to-red-500` for primary CTAs
- Rounded corners: `rounded-2xl` for cards, `rounded-full` for buttons
- Animations: pulse, bounce, smooth transitions

## Key Design Patterns

- **CTAs**: Gradient buttons with hover scale effects
- **Cards**: White background with shadow, hover lift effect
- **Badges**: Rounded full with gradient backgrounds
- **Icons**: SVG icons with consistent sizing
- **Ratings**: 5-star system with yellow stars
- **Timers**: Countdown display for promotions
