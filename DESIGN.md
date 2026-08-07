---
version: alpha
name: Quicklly Grocery Delivery Template
description: A dense, high-utility marketplace interface for authentic South Asian groceries and food delivery, emphasizing accessibility, trust metrics, and a clean, retail-forward aesthetic.
colors:
  primary: "#10b981"
  primary-dark: "#059669"
  text-primary: "#171717"
  text-secondary: "#737373"
  background: "#ffffff"
  surface-muted: "#f5f5f5"
  border-subtle: "#e5e5e5"
  accent-red: "#991B1B"
typography:
  family: "Inter, sans-serif"
  weights:
    regular: 400
    medium: 500
    semibold: 600
  sizes:
    xs: 12px
    sm: 14px
    base: 16px
    lg: 18px
    xl: 20px
    h2: 30px
    h1: 60px
spacing:
  base: 4px
  container-max: 1360px
rounded:
  pill: 9999px
  card: 0px
  button: 9999px
  input: 12px
components:
  - Top Bar Promotion
  - Search Bar (Integrated)
  - Location Selector (Pill)
  - Product Card (Grid/Carousel)
  - Quantity Stepper
  - Trust Metric Row
  - Category Tile
  - Quicklly Pass Membership Card
---

## Overview
The Quicklly design system is built for a high-volume e-commerce environment focusing on Indian groceries and meal services. The visual tone is professional and reliable, utilizing a white-label retail approach with a distinct brand green (`#10b981`) used for calls-to-action and primary accents. The layout is dense but organized, featuring a combination of horizontal scrolling lists (for mobile accessibility) and rigid grids (for desktop browsing). High-quality food photography is the primary visual driver, contrasted against a strictly neutral UI framework. Notably, images maintain sharp corners (`border-radius: 0`) while interactive elements like buttons and search bars utilize highly rounded profiles.

## Colors
- **Brand Palette**: The primary brand green (`#10b981`) signifies freshness and growth. A darker shade (`#059669`) is used for hover states.
- **Neutral Palette**: A grayscale range from pure black (`#000000`) for headers to `neutral-50` (`#f9f9f9`) for section backgrounds. Borders use a consistent `neutral-200` or `neutral-100` (`#e5e5e5`).
- **Functional Colors**: Success/Primary accents are brand-green. Discount badges utilize a soft red background (`#FEE2E2`) with dark red text (`#991B1B`) for high visibility without being aggressive.

## Typography
- **Primary Font**: Inter (San Serif). The system relies on precise weight management to establish hierarchy.
- **Hierarchy**:
    - **Hero Titles**: Semi-bold, tight tracking, 36px to 60px depending on viewport.
    - **Section Headers**: Semi-bold, 24px to 30px.
    - **Product Titles**: 14px Semi-bold, leading-snug, limited to two lines.
    - **Metadata**: 12px Medium, neutral-500 for store names and weights.

## Layout
- **Container**: Max-width of 1360px centered horizontally.
- **Grid System**:
    - Categories: 2-column mobile / 6-column desktop.
    - Products: 2-column mobile / 5-column desktop.
    - Footer: Multi-column arrangement (6 columns on desktop).
- **Spacing**: Generous vertical section padding (48px to 96px) to separate different service offerings (Groceries vs. Meal Kits).

## Elevation & Depth
- **Surfaces**: The design is primarily flat. Backgrounds alternate between white and `neutral-50` to define sections.
- **Shadows**: Minimal usage. A light shadow-sm is applied to the global header only upon scrolling.
- **Buttons**: Floating action buttons (FABs) on product cards use a subtle border and background shift rather than heavy shadows.

## Shapes
- **Image Radius**: 0px (Strictly sharp corners for photography).
- **Button Radius**: Pill-shaped (9999px) for primary and secondary CTAs.
- **Input Radius**: 12px (Rounded-xl) for search bars and inputs.
- **Pill Tags**: 9999px for location selectors and discount badges.

## Components
- **Header**: Sticky component featuring a location selector, expansive search bar with internal action button, and account/cart actions.
- **Product Card**: Features a `neutral-50` square image container, a title, store attribution, price, and a conditional hover-state add button or quantity stepper.
- **Search Bar**: A combined component with an internal magnifying glass icon and a high-contrast "Search" button nested within the input area.
- **Trust Bar**: A four-segment horizontal strip with linear icons and large numeric metrics.

## Page Sections
### Promotional Strip
A high-contrast `neutral-900` bar at the top of the viewport containing a discount code in brand-green and a dismissible close icon.

### Global Header & Navigation
A two-tier header. The top tier handles functional utilities (search, account, cart). The lower tier provides a horizontal scrolling menu of categories (Grocery, Meal Kits, etc.) with a specific emphasis on the "Quicklly Pass" highlighted in brand-green.

### Hero Section
A split-layout section with a large-scale title and dual CTAs on the left, and a full-bleed sharp-edged image on the right. Includes a static pagination indicator (dots).

### Shop by Category
A grid of square tiles with sharp-edged photography and semi-bold captions. Uses a subtle scale transition (`1.05x`) on hover.

### Keeping Shopping Row
A horizontal scrolling carousel of product cards with navigational arrows. Features specific states for "Added to Cart" (stepper) and "Out of Stock" (grayscale + opacity 60%).

### Quicklly Pass Membership
A highlight section featuring a 3D-rotated card graphic with a QR code. Uses a checklist layout to detail benefits like free delivery and priority support.

### App Download
A dark-themed (`neutral-900`) section with high-contrast white buttons for App Store and Google Play, paired with a simplified mobile device silhouette.

## Motion & Interaction
- **Header Scroll**: Transitions from transparent to a white background with a `shadow-sm` after 10px of scroll.
- **Button Hover**: Smooth transitions (`0.2s ease-in-out`) for background color and opacity changes.
- **Product Interaction**: Add-to-cart buttons scale and reveal on hover in desktop views; they transition to a "Checkmark" icon upon selection.
- **Image Hover**: Category and blog images use a slow transform scale (`duration-500`) to provide depth.

## Do's and Don'ts
- **Do**: Use uppercase tracking-widest for small labels and tags.
- **Do**: Keep image corners sharp (0px radius).
- **Do**: Use brand-green sparingly for primary actions only.
- **Don't**: Use rounded corners on photography containers.
- **Don't**: Mix serif and sans-serif fonts; maintain a strict Inter-only system.

## Accessibility
- **Contrast**: High contrast (black/white) used for all essential textual information.
- **Affordance**: Clear visual distinction between "Out of Stock" and available items via grayscale filters.
- **Navigation**: Horizontal scrolling elements are marked with `hide-scrollbar` to maintain visual cleanliness while allowing swipe gestures.

## Assets
1. `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap` (Primary Font)
2. `https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=1200` (Hero Spices)
3. `https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg` (Indian Sweets)
4. `https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg` (Meal Kits)
5. `https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&q=80&w=400` (Roti Kit)
6. `https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg` (Organic Grocery)
7. `https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400` (Gifting Category)
8. `https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400` (Atta Product)
9. `https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp` (Snack Product)
10. `https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400` (Tea Product)
11. `https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400` (Biryani)
12. `https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400` (Paneer)
13. `https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400` (Samosa)
14. `https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400` (Dal Makhani)
15. `https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=400` (Naan)
16. `https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&q=80&w=800` (Meal Service Editorial)
17. `https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600` (Blog Recipe)
18. `https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js` (Icon System)

### Exported Codebase Asset Inventory
1. embed: https://fonts.gstatic.com
   Context: index.html: markup attribute; index.html: absolute url literal
2. other: https://cdn.tailwindcss.com
   Context: index.html: markup attribute; index.html: absolute url literal
3. other: https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=400
   Context: index.html: markup attribute; index.html: absolute url literal
4. other: https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800
   Context: index.html: markup attribute; index.html: absolute url literal
5. other: https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=800
   Context: index.html: markup attribute; index.html: absolute url literal
6. other: https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600
   Context: index.html: markup attribute; index.html: absolute url literal
7. other: https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600
   Context: index.html: markup attribute; index.html: absolute url literal
