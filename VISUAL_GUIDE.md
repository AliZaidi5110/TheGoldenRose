# Visual Design Guide

## 🎨 Color Palette

### Primary Colors
- **Orange-Red Gradient**: `from-orange-500 to-red-500` (#f97316 → #dc2626)
- **Yellow Accent**: `yellow-400` (#facc15)
- **White**: `white` (#ffffff)
- **Gray Background**: `gray-50` (#f9fafb)

### Text Colors
- **Headings**: `gray-900` (#111827)
- **Body**: `gray-600` (#4b5563)
- **Light Text**: `gray-300` (#d1d5db)

### Gradient Variations
- **Orange-Yellow**: `from-yellow-500 to-orange-500`
- **Green**: `from-green-500 to-emerald-500`
- **Blue**: `from-blue-500 to-indigo-500`

---

## 📐 Layout Structure

### Hero Section
```
┌─────────────────────────────────────────┐
│  [Pulse] Open Now • Delivery in 30 mins │
│                                          │
│         THE GOLDEN ROSE                  │
│      Fresh, Fast & Delicious            │
│  Your local fresh & everyday essentials │
│                                          │
│  [Order Now Button] [Call Us Button]    │
│                                          │
│  ⭐ 4.8★  ⏰ 30 min  💰 Min £5          │
└─────────────────────────────────────────┘
```

### Navigation Bar
```
┌─────────────────────────────────────────┐
│ [Logo] The Golden Rose                  │
│                                          │
│  Home  Menu  Contact  [Order Now]       │
└─────────────────────────────────────────┘
```

### Product Card
```
┌──────────────────┐
│                  │
│  [Product Image] │
│   [Badge: New]   │
│                  │
├──────────────────┤
│ ⭐⭐⭐⭐⭐ 4.8    │
│ Product Name     │
│ £1.65    [+ Add] │
└──────────────────┘
```

### Featured Products Grid
```
┌────────┬────────┬────────┬────────┐
│Product1│Product2│Product3│Product4│
│ Badge  │ Badge  │ Badge  │ Badge  │
│ ⭐⭐⭐⭐│ ⭐⭐⭐⭐│ ⭐⭐⭐⭐│ ⭐⭐⭐⭐│
│ £1.65  │ £3.89  │ £7.49  │ £1.89  │
└────────┴────────┴────────┴────────┘
```

### How It Works
```
    ①           ②           ③           ④
  Browse  →   Add to   →  Checkout →  Enjoy!
   Menu       Cart
```

### Countdown Timer
```
┌─────────────────────────────────────────┐
│      LIMITED TIME OFFER                  │
│   Special Weekend Deal!                  │
│   Get 15% off on orders above £20       │
│                                          │
│   [23] : [45] : [30]                    │
│   Hours  Minutes Seconds                 │
│                                          │
│   [Order Now & Save]                     │
└─────────────────────────────────────────┘
```

### Testimonial Card
```
┌──────────────────────────┐
│ [SJ] Sarah Johnson       │
│      ⭐⭐⭐⭐⭐           │
│                          │
│ "Best local shop in      │
│  Blackburn! Always       │
│  fresh products..."      │
└──────────────────────────┘
```

---

## 🎭 Interactive States

### Button States
- **Default**: Gradient background, white text
- **Hover**: Darker gradient, scale up (105%)
- **Active**: Pressed effect

### Card States
- **Default**: White background, subtle shadow
- **Hover**: Lift up (-translate-y-2), larger shadow
- **Image Hover**: Scale up (110%)

### Navigation States
- **Default**: Gray text
- **Hover**: Orange text
- **Active**: Orange text with bottom border

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- 1 column grid
- Stacked buttons
- Hamburger menu
- Full-width cards

### Tablet (768px - 1024px)
- 2 column grid
- Side-by-side buttons
- Expanded menu
- Medium cards

### Desktop (> 1024px)
- 3-4 column grid
- Horizontal layout
- Full navigation
- Large cards

---

## ✨ Animations

### Pulse Animation
```css
animate-pulse (2s infinite)
```
Used for: "Open Now" indicator

### Bounce Animation
```css
animate-bounce
```
Used for: "LIMITED TIME OFFER" badge

### Hover Scale
```css
hover:scale-105 (transition 300ms)
```
Used for: Buttons, cards, images

### Fade In
```css
opacity-0 → opacity-100
```
Used for: Overlays, quick add buttons

---

## 🎯 Typography Scale

### Headings
- **H1**: `text-5xl md:text-7xl` (48px → 72px)
- **H2**: `text-4xl` (36px)
- **H3**: `text-2xl` (24px)
- **H4**: `text-xl` (20px)

### Body Text
- **Large**: `text-lg` (18px)
- **Base**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Extra Small**: `text-xs` (12px)

### Font Weights
- **Bold**: `font-bold` (700)
- **Semibold**: `font-semibold` (600)
- **Medium**: `font-medium` (500)
- **Normal**: `font-normal` (400)

---

## 🔲 Spacing System

### Padding
- **Small**: `p-4` (16px)
- **Medium**: `p-6` (24px)
- **Large**: `p-8` (32px)

### Margin
- **Small**: `mb-4` (16px)
- **Medium**: `mb-6` (24px)
- **Large**: `mb-8` (32px)
- **Extra Large**: `mb-12` (48px)

### Gap
- **Grid Gap**: `gap-6` (24px)
- **Flex Gap**: `gap-4` (16px)

---

## 🎨 Shadow System

### Cards
- **Default**: `shadow-md`
- **Hover**: `shadow-xl` or `shadow-2xl`

### Buttons
- **Default**: `shadow-md`
- **Hover**: `shadow-lg`

### Badges
- **Always**: `shadow-lg`

---

## 📐 Border Radius

### Buttons
- **Primary**: `rounded-full` (9999px)
- **Secondary**: `rounded-lg` (8px)

### Cards
- **Product Cards**: `rounded-2xl` (16px)
- **Small Cards**: `rounded-xl` (12px)

### Badges
- **Always**: `rounded-full` (9999px)

### Images
- **Container**: `rounded-lg` or `rounded-2xl`

---

## 🎯 Icon Sizes

### Small Icons
- `w-4 h-4` (16px) - Star ratings, inline icons

### Medium Icons
- `w-5 h-5` (20px) - Button icons, navigation

### Large Icons
- `w-6 h-6` (24px) - Social media, footer

### Extra Large Icons
- `w-8 h-8` (32px) - Feature icons, benefits

---

## 🌈 Gradient Patterns

### Primary CTA
```css
bg-gradient-to-r from-orange-500 to-red-500
```

### Feature Cards
```css
bg-gradient-to-br from-orange-50 to-red-50
```

### Hero Background
```css
bg-gradient-to-br from-orange-600 via-red-600 to-red-700
```

### Icon Backgrounds
```css
bg-gradient-to-br from-orange-500 to-red-500
```

---

## 📊 Grid Layouts

### Products Grid
```css
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

### Features Grid
```css
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

### Testimonials Grid
```css
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

### Footer Grid
```css
grid-cols-1 md:grid-cols-4
```

---

This visual guide helps maintain consistency across the entire website design.
