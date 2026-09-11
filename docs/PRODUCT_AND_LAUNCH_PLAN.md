# Product, revenue and launch plan

This is the business decision companion to the code. Prices marked **live** match the current code. Recommendations marked **proposed** are not yet switched on and must be approved before implementation.

## Who Magariyetu serves

- Buyers who need a transparent way to compare cars, work vehicles, machinery and parts.
- Individual sellers who need a simple listing and direct WhatsApp leads.
- Dealers who need a branded stock page, lead totals and more inventory capacity.
- Service providers who need local discovery and credible public profiles.

The product message is: **“Make a better vehicle decision before the first call.”** It is stronger and more specific than saying the site is simply a marketplace.

## Listing and promotion pricing

| Seller type | Active listings | Price | What happens after the cap |
|---|---:|---:|---|
| Individual seller — live | 3 | KES 0 | Mark one sold/expired before posting another. |
| Dealer Free — live | 5 | KES 0/month | Upgrade to Pro. |
| Dealer Pro — live | 40 | KES 3,500/month | Upgrade to Premium. |
| Dealer Premium — live | Unlimited | KES 9,000/month | Includes homepage placement rotation and priority review. |

The caps are enforced in `src/collections/Listings.ts`; dealer plans are displayed in `/pricing`. Subscription collection/renewal payments still need a production billing implementation, so staff should not promise automated renewals until that is built.

### Live promotional products

| Product | Price | Result |
|---|---:|---|
| 3-day boost | KES 150 | Higher search placement for one listing. |
| 7-day boost | KES 300 | Higher search placement for one listing. |
| 30-day boost | KES 1,000 | Higher search placement for one listing. |
| 7-day homepage spotlight | KES 2,500 | Placement in the homepage featured rotation. |

Each promotion is paid by M-Pesa STK push. A listing is only marked featured after the payment callback verifies the order.

### Recommended next commercial test (proposed)

Offer an individual “Seller Plus” pack: **10 active listings for KES 750/month**. Keep the free three-listing allowance; do not charge a casual seller before the marketplace has a reliable supply of buyers. Measure conversion for 60 days before adding more tiers.

Other ethical revenue streams: paid inspections, dealer verification review fee, clearly labelled finance/insurance referrals, and a fixed-price dealer bulk-upload/onboarding service. Never sell a “verified” badge or disguise paid placement as trust.

## WhatsApp status and next step

Click-to-WhatsApp is already available through `NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER` and inquiry logging. The project also includes a WhatsApp Cloud API webhook and sender module, but it only sends/receives after the Meta tokens in `.env` are configured.

Before launch: register and verify the business in Meta, set the webhook URL to `/api/whatsapp/webhook`, store the access token only in deployment secrets, and use approved templates for outbound messages outside the 24-hour customer-service window. Make WhatsApp opt-in clear on every form.

## Cookies, data collection and analytics

The site now shows a preference panel. Essential sign-in/security cookies are always used. Analytics are not loaded unless a visitor selects “Allow analytics”; the current choice is stored in browser local storage. No provider is connected by default.

Use a privacy-respecting analytics product with Kenyan legal review before launch. Track only useful aggregated events: page views, search submitted, listing viewed, WhatsApp lead clicked, sell flow completed, listing approved, boost paid, dealer created. Do not send phone numbers, chassis/VIN values, message content, or full URLs containing personal data to analytics.

The application now includes a consent-aware first-party starting point: `AnalyticsEvents` stores only hashed anonymous browser IDs and page events after a visitor accepts analytics. `/dashboard/analytics` gives admins seven-day visitor/page-view figures and current user, listing and dealer totals. Create and apply a Payload database migration before deploying this collection to production.

The operations dashboard should show daily/weekly: unique visitors, signed-in users, active listings, pending listings, active dealers, WhatsApp/form/phone leads, lead-to-listing rate, promotion revenue, and moderation turnaround. Seller dashboards already have listing views and inquiry counts; platform-wide reporting is a future admin dashboard task.

The privacy and terms pages contain placeholders that must be completed and reviewed by a Kenyan-qualified advocate before production. Confirm ODPC registration obligations, retention periods, processor contracts and breach-response duties.

## Security launch baseline

- Use unique production secrets, HTTPS, managed Postgres backups and private verification-document storage.
- Configure Turnstile and a shared Redis rate limiter; the code calls these out as production requirements.
- Keep M-Pesa and WhatsApp tokens server-side; rotate them after staff changes.
- Restrict `/admin` to moderators and admins, require strong passwords/MFA where supported, and review audit logs weekly.
- Scan uploads, limit image size/type, review reports, and keep a tested restore procedure.
- Do a dependency update and penetration/security review before handling payments or sensitive identity documents at scale.

## Marketing approach and materials

Start county-by-county instead of trying to advertise to all Kenya at once. Seed credible dealer inventory in Nairobi, Kiambu and Mombasa, then make buyer search demand in those same areas. The goal is liquidity: enough real listings in each category that a visitor sees a reason to return.

Core channels:

1. Search content: make/model/county pages, duty-calculator guides and practical buyer checklists.
2. Dealer partnerships: a free onboarding window, CSV stock upload help and a simple “Verified dealer” explainer.
3. Short video: walkarounds, import-duty explainers and scam-avoidance clips for TikTok, Instagram, YouTube and Facebook.
4. WhatsApp: shareable listing cards and saved-search alerts only for opted-in users.
5. Local trust: inspection partners, mechanics, SACCOs and vehicle events.

Create these first: a one-page dealer sales sheet, A5 QR-code handouts for yards, editable social listing-card templates, 15-second vehicle walkaround template, trust-badge explainer, duty-calculator explainer, and a monthly dealer performance report. Every asset needs one call to action: “Browse”, “Post a listing”, or “Verify your dealership” — not all three.

## Future development order

1. Production database, secret management, backups, rate limiting and legal review.
2. Reliable dealer subscription billing and an admin-wide operations analytics dashboard.
3. Better fraud controls: duplicate image/VIN checks, report queues and stronger moderation tooling.
4. Vehicle inspections, inspection scheduling and finance/insurance integrations.
5. Saved-search alerts, dealer inventory feeds and richer marketplace reporting.
6. Escrow or buyer-protection only after legal, operational and dispute-resolution capacity exists.
