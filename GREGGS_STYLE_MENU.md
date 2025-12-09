# Greggs-Style Menu System

## ✅ Features Implemented

### 1. Menu Page (`/menu`)
- **Clean Greggs-style layout** with navy blue (#00335b) color scheme
- **Horizontal category navigation** - scrollable on mobile, sticky on scroll
- **Product grid** - 2 columns mobile, 3-4 columns desktop
- **Product cards** with:
  - Product image
  - Product name (bold navy blue)
  - Size information
  - Price display
  - Hover effects (shadow + lift animation)
  - Badge support (Coming Soon, etc.)

### 2. Product Modal Popup
When clicking any product:
- **Large product image** display
- **Product details**: name, price, size, description, rating
- **Quantity selector** with +/- buttons
- **Two action buttons**:
  - "Add to Cart" - adds to cart and closes modal
  - "Buy Now" - adds to cart and redirects to checkout

### 3. Shopping Cart System
- **Cart icon** in navbar (top right) with live item count badge
- **LocalStorage persistence** - cart survives page refresh
- **Real-time updates** - cart count updates instantly
- **Add to cart** from product modal
- **Quick checkout** with Buy Now button

### 4. Checkout Page (`/checkout`)
- **Cart item management**:
  - View all items with images
  - Update quantities
  - Remove items
  - See individual prices
- **Order summary**:
  - Subtotal calculation
  - Delivery fee (FREE over £5, otherwise £2.50)
  - Total price
- **Action buttons**:
  - Place Order
  - Continue Shopping
- **Empty cart state** with call-to-action

### 5. Navigation Updates
- **Desktop navbar**: Home, Menu, About, Contact, Cart Icon, Order Now button
- **Mobile navbar**: Responsive with hamburger menu + cart icon
- **All links updated** to point to new `/menu` route

## 📁 Files Created

1. `src/pages/Menu.jsx` - Main menu page with Greggs-style layout
2. `src/components/ProductModal.jsx` - Product detail popup
3. `src/pages/Checkout.jsx` - Shopping cart and checkout page

## 📝 Files Modified

1. `src/components/Navbar.jsx` - Added cart icon with counter
2. `src/App.jsx` - Added new routes for Menu and Checkout
3. `src/index.css` - Added scrollbar-hide utility
4. `src/pages/Home.jsx` - Updated all links to point to /menu

## 🎨 Design Features

### Color Scheme (Greggs-inspired)
- **Primary**: Navy blue (#00335b)
- **Accent**: Orange-red gradient (from-orange-500 to-red-500)
- **Background**: Clean white
- **Hover**: Light shadows and lift effects

### Responsive Design
- **Mobile**: 2-column grid, horizontal scrolling categories
- **Tablet**: 3-column grid
- **Desktop**: 4-column grid, full navigation

### Animations
- Smooth hover effects on product cards
- Scale and shadow transitions
- Modal fade-in/out
- Cart count badge pulse

## 🛒 Shopping Flow

1. **Browse** → User visits `/menu` and browses products
2. **Select** → User clicks product to open modal
3. **Add to Cart** → User adjusts quantity and clicks "Add to Cart"
4. **Cart Updates** → Cart icon shows item count
5. **Checkout** → User clicks cart icon or "Buy Now"
6. **Review** → User reviews items, adjusts quantities
7. **Order** → User clicks "Place Order"

## 📦 Product Data

All products use real images from your assets folder:
- Vimto, Branston Beans, Lakeland Butter
- Maltesers, Cadbury Creme Egg
- Jacks Flours, Sugar
- Whiskas Cat Food
- Strawberry Cones
- 6 Traditional British Sweets

## 🚀 How to Use

1. **View Menu**: Navigate to `/menu` or click "Menu" in navbar
2. **Filter by Category**: Click category buttons to filter products
3. **View Product**: Click any product card to see details
4. **Add to Cart**: Select quantity and click "Add to Cart"
5. **Checkout**: Click cart icon in navbar
6. **Place Order**: Review cart and click "Place Order"

## 🎯 Key Features Match Greggs

✅ Clean, minimalist design
✅ Navy blue brand color
✅ Horizontal category navigation
✅ Product grid layout
✅ Click-to-view product details
✅ Add to cart functionality
✅ Shopping cart with checkout
✅ Responsive mobile design
✅ Smooth animations
✅ Professional UI/UX

## 🔄 Cart Persistence

The cart uses `localStorage` to persist data:
- Cart survives page refresh
- Cart survives browser close/reopen
- Cart syncs across all pages
- Real-time updates via custom events

## 📱 Mobile Optimization

- Touch-friendly buttons
- Horizontal scrolling categories
- Responsive grid (2 columns)
- Mobile-optimized modal
- Sticky category bar
- Hamburger menu navigation
