# Quicklly Business Reference

> Status: authoritative product reference for this workspace  
> Last verified against the live product: 2026-08-15  
> Primary product: [quicklly.com](https://www.quicklly.com/)  
> Purpose: keep product, design, engineering, and content decisions aligned with how the business actually works.

## 1. Executive Summary

Quicklly is a multi-vendor marketplace for South Asian households in the United States. It is not a single online grocery store. Customers can discover products and services from local stores, nationwide sellers, specialist makers, restaurants, cultural-service providers, and digital-subscription partners through one Quicklly account.

The core customer promise is convenience across fragmented supply: one place to find culturally relevant groceries, prepared food, meal kits, sweets, gifts, fashion, events, astrology/puja services, and selected subscriptions.

Quicklly owns the customer-facing discovery, cart, checkout, account, offers, and support experience. Individual sellers still keep store-level commercial and fulfillment rules such as minimum order value, inventory, delivery method, delivery date, and shipping fee.

## 2. Business Model

### Marketplace layer

- Quicklly aggregates multiple independent sellers and service providers.
- Sellers may serve a local delivery radius, ship nationwide, or deliver a digital/service product.
- Quicklly presents a shared storefront and account while preserving seller identity throughout product discovery, cart, checkout, and order tracking.

### Customer value

- Access authentic South Asian products that may be hard to find locally.
- Shop multiple sellers without learning a separate site or account for every seller.
- Combine eligible seller carts into one customer-facing checkout and payment flow.
- Reorder, manage recurring deliveries, save products, and track rewards in one account.

### Likely revenue surfaces

The live storefront does not expose the complete commercial contract with sellers. The following are reasonable product-level revenue surfaces and must be validated before financial implementation:

- Marketplace commission or seller service fee.
- Delivery, shipping, packaging, and small-order fees.
- Quicklly Pass membership revenue.
- Margin or commission on prepaid partner subscriptions.
- Sponsored placement, promotions, and seller-funded discounts.
- Service fees for events, gifting, catering, astrology, and puja bookings.

## 3. Marketplace Entities

### Customer

A signed-in customer has one Quicklly identity with profile information, saved addresses, order history, wishlist, rewards, wallet/gift-card value, membership state, and recurring orders.

### Seller / Store

A seller is the fulfillment and commercial owner of a set of products. Each seller can define:

- Product catalog and inventory.
- Service area or nationwide eligibility.
- Minimum order value.
- Standard and expedited delivery options.
- Delivery dates or time slots.
- Shipping, packaging, or small-order charges.
- Substitution behavior for grocery items.
- Whether recurring delivery is supported.

### Product

Products belong to a seller and a business category. A product cannot be treated as seller-neutral because price, stock, minimum-order contribution, shipping, tax treatment, and delivery eligibility may differ by seller.

### Store Cart

A store cart is the set of cart lines fulfilled by one seller. Store carts are the operational unit inside the unified cart.

### Unified Cart

The customer sees one cart containing multiple store carts. The unified cart total is the sum of seller subtotals plus fees, tax, shipping, tip, discounts, wallet value, and other adjustments.

### Unified Order

The customer sees one checkout and one order-level payment. Underneath, the system must preserve seller-level fulfillment groups so each store can have its own status, delivery promise, and charges.

## 4. Multi-Store Cart and Checkout

This is a defining product rule.

```text
Quicklly cart
├── Store cart A
│   ├── products
│   ├── store minimum
│   ├── delivery method/date
│   └── store fees
├── Store cart B
│   ├── products
│   ├── store minimum
│   ├── delivery method/date
│   └── store fees
└── Unified checkout
    ├── category subtotals
    ├── discounts / vouchers / rewards / wallet
    ├── tax and other fees
    ├── shipping and minimum charges
    ├── optional tip where applicable
    └── one customer-facing payment total
```

### Confirmed checkout behavior

- Multiple sellers can appear in the same cart.
- The cart groups products under seller names.
- Minimum order value is evaluated per seller, not only on the global total.
- Each seller can have a different fulfillment date.
- The checkout presents seller groups separately while maintaining one order summary.
- The live order summary has category subtotal buckets for groceries, food, gift cards, events, puja, apparel, subscriptions, ultra-fast delivery, and Only Luxury.
- Fees can include estimated shipping, minimum-order charges, tax/other fees, and tip.
- Quicklly Pass savings can be promoted during checkout.

### Product invariant

Never flatten a multi-store cart into a single undifferentiated product list. Every cart line must retain its seller, fulfillment type, subscription frequency if present, and applicable delivery promise.

## 5. Location and Availability

Location is a first-class input, not a cosmetic preference.

- The selected address controls which local sellers appear.
- Nationwide sellers may remain available even when no nearby store serves the address.
- Delivery date, shipping cost, product availability, and fulfillment method depend on location.
- Address changes can invalidate cart lines; the product must warn the customer and offer a recovery path.

Design and engineering implication: location state must be visible in the shared header and available to every commerce page.

## 6. Fulfillment Types

Quicklly supports several fulfillment models:

- Local/same-day grocery delivery.
- Scheduled local delivery.
- Nationwide standard shipping.
- Expedited nationwide shipping.
- Restaurant or prepared-food delivery.
- Curbside pickup where supported.
- Scheduled cultural services or virtual appointments.
- Digital code delivery for prepaid subscriptions.
- Recurring physical-product delivery.

The checkout must not imply that every seller or product will arrive together.

## 7. Subscription Models

The word “subscription” describes three distinct products in Quicklly. They must not share one oversimplified implementation.

### A. Quicklly Pass membership

Quicklly Pass is a marketplace membership. Its value can include free eligible delivery, pickup savings, extra discounts, coupons, no packaging fee, and lower/no minimums where terms allow.

Observed live plans on 2026-08-15:

- Standard: $6.99/month.
- Platinum: $11.99/month.

The live product states that Pass can be cancelled and used repeatedly, subject to eligibility. Benefits vary by plan, store, and promotion.

### B. Recurring physical-product subscription

Selected specialist stores let customers build a box and choose a frequency:

- One time.
- Weekly.
- Bi-weekly.
- Monthly.

The customer also chooses a delivery method/date and products. Recurring deliveries appear in My Upcoming Orders and must support future management actions such as editing, skipping, or pausing.

The frequency may change product pricing. Treat each recurring line as a schedule-backed commitment, not just a cart label.

### C. Prepaid partner subscription

The aha offering is a prepaid digital voucher sold in one-month or one-year variants. After payment, the customer receives a coupon code and redeems it with the partner.

Confirmed aha rules:

- It does not auto-renew through Quicklly.
- Quicklly can send an expiry reminder.
- It is prepaid and non-refundable mid-term.
- Activation occurs on the partner’s redemption surface.

This is a digital product purchase, not the same lifecycle as Quicklly Pass or a recurring physical box.

## 8. Main Business Categories

- Grocery and organic grocery.
- Ready-to-eat food and meal kits.
- Roti kits.
- Chai, tea, and coffee kits.
- Indian sweets and snacks.
- Gifting and gift cards.
- Catering.
- Fashion and Only Luxury.
- Events and cultural experiences.
- Astrology and puja services.
- Prepaid entertainment subscriptions such as aha.
- Quicklly Pass membership.

## 9. Signed-In Account Area

The account is the customer’s control center across all marketplace verticals.

### My Account

- Profile and verified contact information.
- Saved addresses and the default shopping address.
- Address-level store availability.

### My Orders

- Unified order history.
- Seller-level fulfillment groups within each order.
- Category, status, delivery, and total information.
- Reorder and support entry points.

### My Upcoming Orders

- Future recurring physical-product deliveries.
- Frequency, next delivery date, price, and seller.
- Edit, skip, and pause controls.

### My Wishlist

- Saved seller-specific products.
- Current price and stock should be revalidated before adding to cart.

### Circle Rewards

- Wallet balance.
- Referral count and history.
- Cashback earned and claimed.

### Gift Cards

- Purchase digital gift value.
- Redeem a code into eligible account wallet value.
- Apply eligible value at checkout.

### Quicklly Pass

- Current membership state and plan.
- Benefits and savings.
- Upgrade, downgrade, or cancellation entry points.

### Shubhpuja Orders

- Puja/astrology order history.
- Practitioner, schedule, preparation notes, and remote join information where applicable.

### Change Password

- Credential security and password update.

## 10. Promotions, Rewards, and Payment Value

The live checkout supports several value instruments:

- Promotional discounts and store-funded offers.
- E-vouchers.
- Reward points.
- Wallet balance.
- Gift-card value after redemption.
- Quicklly Pass benefits.

Eligibility can vary by seller, category, cart minimum, geography, and campaign. Discounts must be calculated against the correct seller/category scope and explained close to the affected subtotal.

## 11. Product and UX Principles

1. Always show the seller for a product.
2. Preserve store grouping in cart, checkout, order history, and support views.
3. Explain store minimums before checkout.
4. Show delivery promises per seller; never imply one combined package.
5. Keep location visible and easy to change.
6. Distinguish Quicklly Pass, recurring product delivery, and prepaid partner subscriptions.
7. Show fees where they arise and identify their scope.
8. Revalidate wishlist and reordered products before adding them to cart.
9. Keep empty states actionable with one clear next step.
10. Treat the shared header, category drawer, account identity, and cart as persistent cross-category infrastructure.

## 12. Workspace Page Map

### Shared storefront

- `index.html` — signed-in storefront home and shared shell source of truth.
- `shop-by-stores.html` — seller discovery.
- `category.html` — grocery catalog reference.

### Category and service pages

- `meal-kits.html`
- `indian-sweets.html`
- `roti-kit.html`
- `organic.html`
- `gifting.html`
- `aha.html`
- `catering.html`
- `events.html`
- `astrology.html`
- `chai-tea-coffee.html`
- `only-luxury.html`

### Signed-in account pages

- `my-account.html`
- `my-orders.html`
- `my-upcoming-orders.html`
- `my-wishlist.html`
- `circle-rewards.html`
- `gift-cards.html`
- `quicklly-pass-dashboard.html`
- `shubhpuja-orders.html`
- `change-password.html`

## 13. Known Prototype Boundaries

- The workspace is a frontend prototype and does not connect to Quicklly production APIs.
- Account values and order records in the workspace are demonstration data.
- Store availability, inventory, price, fees, tax, and delivery dates must eventually come from backend services.
- Authentication, payment, wallet, voucher, gift-card redemption, membership changes, and recurring-order mutations require production services and security review.

## 14. How to Maintain This Reference

Update this file when any of the following changes:

- A new business category or seller model is introduced.
- Cart grouping, checkout, fees, or minimum-order rules change.
- A subscription lifecycle changes.
- Account navigation or ownership changes.
- Quicklly Pass plan structure or benefits change.
- A verified live-product observation contradicts this document.

When a detail is inferred rather than confirmed, label it as an inference and validate it before using it for financial, legal, or backend implementation.
