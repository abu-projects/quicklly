---
version: alpha
name: Quicklly Grocery Delivery App Template
description: A high-fidelity mobile application design system focused on South Asian grocery delivery, featuring complex cart management, multi-store checkout flows, and specialized logistics for local and nationwide shipping.
colors:
  primary: "#047857"
  primary-dark: "#065F46"
  primary-light: "#ECFDF5"
  text-main: "#171717"
  text-muted: "#737373"
  background-page: "#F9FAFB"
  background-well: "#F5F5F5"
  border: "#E5E5E5"
  white: "#FFFFFF"
  warning: "#D97706"
  error: "#B91C1C"
typography:
  family: "'Inter', sans-serif"
  h1: "text-4xl, tracking-tighter, font-semibold"
  h2: "text-2xl, tracking-tight, font-semibold"
  h3: "text-lg, font-semibold"
  body-md: "text-sm, font-normal"
  caption: "text-xs, font-medium"
spacing:
  base: "16px"
  container-px: "24px"
  item-gap: "16px"
rounded:
  container: "48px"
  panel: "12px"
  button: "9999px"
  input: "12px"
components:
  buttons: "rounded-full, font-medium, px-4, py-3.5"
  inputs: "rounded-xl, bg-[#F5F5F5], border-[#E5E5E5], text-sm, h-12"
  cards: "bg-white, rounded-xl, border-[#E5E5E5], shadow-sm"
---

## Overview
Quicklly is a high-density mobile delivery application tailored for the South Asian diaspora. The visual personality is clean and utility-driven, utilizing a deep emerald green (`#047857`) as the signature brand color. The layout prioritizes vertical stack information density, especially in complex checkout scenarios involving multiple store types (Local vs. Nationwide). The application follows a strict iOS-style container pattern with rounded corners, pill-shaped buttons, and a bottom-weighted navigation and action hierarchy.

## Colors
- **Brand Core**: Emerald Green (`#047857`) used for primary actions, branding, and success states.
- **Logistics & UI**: A scale of greyscale from `#F9FAFB` (background) to `#171717` (text) provides high legibility.
- **Feedback Systems**: Soft green tints (`#ECFDF5`) signify savings and valid states, while deep amber (`#D97706`) warns of minimum delivery thresholds.

## Typography
- **Primary Font**: Inter (Google Fonts), sans-serif.
- **Scale**: Heavy reliance on `text-sm` (14px) for body content to accommodate high information density. Headers use `tracking-tight` or `tracking-tighter` to maintain a modern, compact aesthetic even at larger sizes.

## Layout
- **Structure**: Native mobile (393x852px) container with a simulated iOS environment (Dynamic Island and Home Indicator).
- **Grid**: Single column vertical scroll for most pages; horizontal scrollers for product categories and 'Buy Again' sections.
- **Safe Zones**: Top-bar (status) and bottom-nav are fixed or sticky, ensuring core navigation is always within thumb reach.

## Elevation & Depth
- **Surfaces**: Primary content lives on white cards with 1px borders (`#E5E5E5`).
- **Modals**: Uses the 'Bottom Sheet' pattern with a semi-transparent overlay (`rgba(23, 23, 23, 0.4)`) to focus user attention on configuration tasks.
- **Shadows**: Subtle `shadow-sm` on active navigation bars and primary action containers.

## Shapes
- **Enclosures**: Large 48px radii for the primary device mockup frame. 12px radii for internal cards and input fields.
- **Interactive Elements**: Buttons are exclusively pill-shaped (rounded-full) to provide a soft, approachable feel amidst the text-heavy UI.

## Components
- **Navigation Bar**: Multi-row top bars including address selectors, search inputs, and filter chips.
- **Bottom Navigation**: 5-icon system with 2xl icon sizes and caption labels.
- **Product Card**: Vertical orientation with square image, meta-info (weight/count), price, and a circular green add button.
- **Promo Card**: Features a dashed border separator and a 4px left-accent bar in brand emerald.
- **Status Indicators**: Pill-shaped badges (e.g., Q PASS) and circular radio buttons for delivery selection.

## Page Sections

### Splash Screen
Full-bleed emerald background. Centered high-contrast branding in white. Features a spinning refresh icon to indicate loading state.

### Sign Up Flow
Clean white background with localized header. Features a mix of traditional inputs and social auth buttons (Apple/Google). Employs a fixed footer for the 'Log in' secondary action.

### Homepage
Complex multi-zone layout. Header includes a location selector and search bar. Hero section uses a deep green card with an icon watermark. Grid of categories (Grocery, Sweets, Gifting) followed by horizontal product carousels.

### Multi-Store Cart
Aggregated view of items from different sources. Uses a 'Well' pattern (grey backgrounds) to group items by store. Distinct labeling for 'Local Delivery' vs 'Nationwide Shipping' with separate sub-totals.

### Checkout & Estimates
Detail-heavy interface for selecting delivery speeds (Standard vs Priority). Includes sections for Address change, Delivery Instructions, Promo Codes, and Wallet/Reward point redemption.

## Motion & Interaction
- **Loading**: An `animate-spin` effect on the splash screen refresh icon.
- **Hover/Active**: All primary buttons use standard opacity shifts. Input focus state highlighted by border color shifts to primary emerald.
- **Overlays**: Bottom sheets slide up to cover 40-60% of the screen height, accompanied by a backdrop fade.

## Do's and Don'ts
- **Do**: Use emerald green for all conversion-related actions.
- **Do**: Maintain 1px border consistency between different card types.
- **Don't**: Use sharp corners on buttons; stick to the rounded-full pill language.
- **Don't**: Overcomplicate the palette; stick to white, grey, and emerald.

## Accessibility
- **Contrast**: High-contrast text (`#171717`) on white or light grey backgrounds.
- **Touch Targets**: Buttons and inputs maintain a minimum 48px height where possible for mobile ergonomics.
- **Labels**: Use of descriptive icons (Iconify) paired with text labels in the bottom navigation.

## Assets
1.  **Icon Library**: https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js
2.  **Primary Font**: https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap
3.  **Fresh Produce Image**: https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg
4.  **Organic Category**: https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg
5.  **Meat/Poultry Category**: https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg
6.  **Tomatoes Product**: https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=200&q=80
7.  **Eggs Product**: https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=200&q=80
8.  **Blueberries Product**: https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=200&q=80

### Exported Codebase Asset Inventory
1. other: https://cdn.tailwindcss.com
   Context: index.html: markup attribute; index.html: absolute url literal
2. other: https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=200&amp;q=80
   Context: index.html: markup attribute; index.html: absolute url literal
3. other: https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=200&amp;q=80
   Context: index.html: markup attribute; index.html: absolute url literal
4. other: https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=200&amp;q=80
   Context: index.html: markup attribute; index.html: absolute url literal
