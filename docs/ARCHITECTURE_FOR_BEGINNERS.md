# Magariyetu architecture — a beginner's map

This document explains the project as a building. You do not need to understand every file before making a safe change.

## The big picture

```text
Visitor's browser
  └─ Next.js pages and React components (src/app/(site), src/components)
       ├─ Payload Local API (server-side page reads)
       ├─ Custom API routes (src/app/api) for special jobs
       └─ Payload CMS (payload.config.ts + src/collections)
            └─ PostgreSQL database

External services: M-Pesa · WhatsApp · Email · SMS · Vercel Blob
```

Next.js is responsible for the screens. Payload is responsible for structured data, permissions, authentication, the staff admin area, and its automatic REST endpoints. They deliberately live in one repository and deploy together.

## A listing from seller to buyer

1. A seller uses the form at `/sell`; `SellWizard.tsx` collects details and images.
2. `Listings.ts` defines which fields are stored and starts new listings as `pending-review`.
3. A moderator reviews the listing in `/admin`, then makes it `active`.
4. Listing and search pages read active records from Payload.
5. A buyer views a listing or taps WhatsApp. The site increments `views` and creates an `Inquiries` record so the seller can see interest.
6. The seller manages listings and lead totals in `/dashboard`.

## Directory guide

| Location | What it is for |
|---|---|
| `src/app/(site)/` | Public routes. Each `page.tsx` is a page URL; folders create URL paths. |
| `src/app/dashboard/` | Signed-in seller/dealer workspace. |
| `src/app/(payload)/` | Payload's admin screen and automatic API mount. Leave its generated admin files alone. |
| `src/app/api/` | Custom server endpoints for work that ordinary create/read/update/delete cannot do: contact, OTP, duty calculation, WhatsApp webhook, and more. |
| `src/components/` | Reusable UI pieces. Keep page-specific data loading in a page where possible; keep repeated display and interaction here. |
| `src/collections/` | The database blueprint. One file normally equals one Payload collection/table, including fields and access rules. |
| `src/lib/` | Server-side helpers. Provider credentials and calls belong here, not inside React components. |
| `src/migrations/` | Database history. Add a migration when changing production data structure. |
| `public/` | Assets sent directly to browsers: favicon, manifest and static images. |
| `scripts/` | One-off developer jobs, currently including CRSP imports. |
| `docs/` | Operating instructions and product decisions. |

## Important files and their jobs

- `payload.config.ts`: joins all collections, database, storage and admin configuration.
- `next.config.mjs`: tells Next.js to run with Payload.
- `src/app/layout.tsx`: site-wide HTML metadata, favicon references, and structured data.
- `src/app/(site)/layout.tsx`: public navigation, main content area, footer, and cookie preferences.
- `src/components/site/Navbar.tsx` / `Footer.tsx`: shared public navigation and social links.
- `src/collections/Listings.ts`: the main marketplace record, moderation, listing limits, and fraud signals.
- `src/collections/Users.ts` / `Dealers.ts`: accounts and dealer storefronts.
- `src/collections/FeaturedOrders.ts`: M-Pesa boost payment ledger and the live boost prices.
- `src/lib/mpesa.ts`: the only module that should call Safaricom Daraja.
- `src/lib/whatsapp.ts`: WhatsApp Cloud API validation, sending and media download.
- `src/lib/security.ts`: shared safety rules; do not duplicate these checks in components.
- `.env.example`: the complete safe template for environment variables. Values go in `.env` locally and in the deployment provider in production.

## Safe development rules

1. Never expose a secret with `NEXT_PUBLIC_`; that prefix makes it visible in the browser.
2. Do not make the client decide a payment succeeded. Only the M-Pesa callback may feature a listing.
3. When a field needs different permission rules, solve that in the collection or API route, not only by hiding a button.
4. Test a change with `npm run build` before deploying.
5. When changing a database schema for a live deployment, generate and run a migration; do not rely only on the admin UI.

For field-by-field collection details and full request flows, continue to [`ARCHITECTURE.md`](ARCHITECTURE.md).
