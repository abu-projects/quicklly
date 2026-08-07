# Quicklly Website Redesign

# Screen Inventory & Suggested Redesign Phases

> **Status:** Discovery in Progress (Provisional)
>
> This document is intended for project estimation and planning. The screen count will be finalized after completing the remaining discovery for Checkout, Orders, Programs, and hidden flows.

---

# Executive Summary

| Metric                         |  Estimate |
| ------------------------------ | --------: |
| Core Screen Templates          |    **58** |
| Modals / Drawers / Overlays    | **10–15** |
| Empty / Error / Success States |  **8–12** |
| Total UI Assets                | **76–85** |

**Recommended pricing should be based on approximately 55–60 core screens**, not every dynamic page individually.

---

# Phase 1 — Foundation & Storefront

**Estimated Screens:** 12

| ID    | Screen             | Type     | Status |
| ----- | ------------------ | -------- | ------ |
| P1-01 | Global Header      | Shared   | ✅     |
| P1-02 | Mega Navigation    | Shared   | ✅     |
| P1-03 | Mobile Navigation  | Shared   | ✅     |
| P1-04 | Footer             | Shared   | ✅     |
| P1-05 | Home               | Unique   | ✅     |
| P1-06 | Search             | Shared   | ✅     |
| P1-07 | Search Suggestions | Overlay  | ⏳     |
| P1-08 | Search Results     | Template | ⏳     |
| P1-09 | Category Listing   | Template | ✅     |
| P1-10 | Store Listing      | Template | ✅     |
| P1-11 | Shop by Stores     | Template | ⏳     |
| P1-12 | Deals / Promotions | Template | ⏳     |

---

# Phase 2 — Product, Cart & Checkout

**Estimated Screens:** 13

| ID    | Screen                   | Type      | Status |
| ----- | ------------------------ | --------- | ------ |
| P2-01 | Product Details          | Template  | ✅     |
| P2-02 | Product Gallery          | Component | ✅     |
| P2-03 | Product Specifications   | Section   | ✅     |
| P2-04 | Product Description      | Section   | ✅     |
| P2-05 | Product FAQ              | Section   | ✅     |
| P2-06 | Cart Drawer              | Drawer    | ✅     |
| P2-07 | Empty Cart               | State     | ✅     |
| P2-08 | Minimum Order Warning    | State     | ✅     |
| P2-09 | Cart Upsell              | State     | ✅     |
| P2-10 | Checkout - Customer Info | Flow      | ⏳     |
| P2-11 | Checkout - Delivery      | Flow      | ⏳     |
| P2-12 | Checkout - Payment       | Flow      | ⏳     |
| P2-13 | Order Success / Failure  | Flow      | ⏳     |

---

# Phase 3 — Customer Account & Orders

**Estimated Screens:** 14

| ID    | Screen               | Type       | Status |
| ----- | -------------------- | ---------- | ------ |
| P3-01 | My Account Dashboard | Unique     | ✅     |
| P3-02 | Update Profile       | Form       | ⏳     |
| P3-03 | Change Password      | Form       | ⏳     |
| P3-04 | Address Book         | Management | ⏳     |
| P3-05 | Add Address          | Modal      | ✅     |
| P3-06 | Edit Address         | Modal      | ✅     |
| P3-07 | Wishlist             | Listing    | ⏳     |
| P3-08 | My Orders            | Listing    | ⏳     |
| P3-09 | Upcoming Orders      | Listing    | ⏳     |
| P3-10 | Order Details        | Details    | ❌     |
| P3-11 | Order Tracking       | Timeline   | ❌     |
| P3-12 | Invoice              | Document   | ❌     |
| P3-13 | Returns / Reorder    | Flow       | ❌     |
| P3-14 | Account Navigation   | Shared     | ✅     |

---

# Phase 4 — Programs & Rewards

**Estimated Screens:** 8

| ID    | Screen                  | Status |
| ----- | ----------------------- | ------ |
| P4-01 | Quicklly Pass           | ⏳     |
| P4-02 | Quicklly Pass Dashboard | ⏳     |
| P4-03 | Refer a Friend          | ⏳     |
| P4-04 | Circle Rewards          | ⏳     |
| P4-05 | Gift Cards              | ⏳     |
| P4-06 | Brand Ambassador        | ❌     |
| P4-07 | Student Ambassador      | ❌     |
| P4-08 | Be a Hero / Shubhpuja   | ❌     |

---

# Phase 5 — Marketing & Corporate

**Estimated Screens:** 11

| ID    | Screen             | Status |
| ----- | ------------------ | ------ |
| P5-01 | About              | ⏳     |
| P5-02 | Contact            | ⏳     |
| P5-03 | FAQ                | ⏳     |
| P5-04 | Careers            | ⏳     |
| P5-05 | Blog Listing       | ⏳     |
| P5-06 | Blog Details       | ❌     |
| P5-07 | Press              | ⏳     |
| P5-08 | Reviews            | ⏳     |
| P5-09 | Privacy Policy     | ⏳     |
| P5-10 | Terms & Conditions | ⏳     |
| P5-11 | Seller Portal      | ❌     |

---

# Phase 6 — Authentication & Utilities

**Estimated Screens:** 10

| ID    | Screen                         | Type    |
| ----- | ------------------------------ | ------- |
| P6-01 | Login                          | Modal   |
| P6-02 | Phone Login                    | Modal   |
| P6-03 | Signup                         | Modal   |
| P6-04 | OTP Verification               | Modal   |
| P6-05 | Forgot Password                | Flow    |
| P6-06 | Country Selector               | Modal   |
| P6-07 | Address Picker                 | Modal   |
| P6-08 | Ask Quicklly                   | Support |
| P6-09 | Share Cart Popup               | Popup   |
| P6-10 | Error / Empty / Loading States | System  |

---

# Estimated Screen Count

| Category                   | Count |
| -------------------------- | ----: |
| Storefront                 |    12 |
| Product + Cart + Checkout  |    13 |
| Customer Account           |    14 |
| Programs & Rewards         |     8 |
| Marketing                  |    11 |
| Authentication & Utilities |    10 |

---

# Total Estimated Scope

| Item                 |     Count |
| -------------------- | --------: |
| Core Screens         |    **58** |
| Modals / Drawers     | **10–15** |
| Empty / Error States |  **8–12** |
| Total UI Assets      | **76–85** |

---

# Recommended Project Structure

```
Phase 1
├── Design System
├── Navigation
├── Home
├── Search
├── Listing Pages

Phase 2
├── Product Details
├── Cart
├── Checkout
├── Payment
├── Success / Failure

Phase 3
├── Dashboard
├── Orders
├── Wishlist
├── Address
├── Profile

Phase 4
├── Quicklly Pass
├── Rewards
├── Gift Cards
├── Referral
├── Ambassador Programs

Phase 5
├── About
├── Contact
├── Blog
├── FAQ
├── Careers
├── Legal

Phase 6
├── Login
├── Signup
├── OTP
├── Popups
├── Utility Flows
```

---

# Notes

- Dynamic product pages, category pages, blog articles, and legal pages should be treated as **templates**, not unique screens.
- Pricing should be based on **58 core screens**, plus a reusable design system and shared components.
- Final screen count may increase slightly after discovering the remaining Checkout, Order Tracking, Invoice, and Program flows.
