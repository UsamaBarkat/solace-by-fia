# Solace by Fia

**Live site: https://solace-by-fia.vercel.app**

An e-commerce storefront for **Solace by Fia**, a Pakistani women's clothing brand specialising in hand-embroidered kurtas. The store owner manages the full product catalogue herself through a headless CMS, and orders are placed over WhatsApp — mirroring how the brand already sells to its customers.

## Highlights

- **Self-service catalogue** — products live in [Sanity](https://www.sanity.io/) (headless CMS). The owner adds, edits, and removes products in **Sanity Studio** with no developer involvement.
- **Automatic publishing** — a Sanity → Vercel webhook triggers a rebuild on any product change, so edits go live in ~1–2 minutes.
- **WhatsApp ordering** — every product's "Order on WhatsApp" button deep-links to a pre-filled message (product name + code). No payment gateway, by design — it matches the brand's existing sales flow.
- **Analytics** — Google Analytics 4 tracks visits and a custom `whatsapp_order_click` event to measure order intent.
- **Mobile-first & fast** — designed at 360px up; Lighthouse (mobile) **Performance 96 · Accessibility 100**.

## Tech stack

- **Next.js** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4** (design tokens in `app/globals.css`)
- **Sanity** headless CMS (`next-sanity`, `@sanity/image-url`)
- Fonts via `next/font` — Fraunces (display) + Inter (body)
- Statically exported (`output: 'export'`) and deployed on **Vercel**

## How it works

Products are fetched from Sanity via GROQ **at build time** and rendered as static pages, so the site stays fast and cheap to host. `lib/products.ts` exposes typed helpers (`getAll`, `getByCode`, `getNewArrivals`, `getClearance`, …) over the Sanity data; product images are served from Sanity's CDN. When the owner publishes a change in Studio, the webhook rebuilds and redeploys the site.

```
Sanity Studio ──edit/publish──▶ Sanity (content lake)
      │                              │
      └── webhook ──▶ Vercel deploy hook ──▶ rebuild ──▶ live site
```

## Local development

```bash
npm install

# .env.local (the production dataset is public-read — no token needed)
# NEXT_PUBLIC_SANITY_PROJECT_ID=p4xuisrx
# NEXT_PUBLIC_SANITY_DATASET=production

npm run dev      # http://localhost:3000
npm run build    # production build (static export to ./out)
npm run lint
```

## Project structure

```
app/            # App Router pages (home, shop, new-arrivals, clearance, product/[code], …)
components/     # UI: ProductCard, ProductGallery, Filters, Header/Footer, FloatingPetals, …
lib/
  products.ts   # typed helpers over Sanity (GROQ) — same shape the UI consumes
  sanity.ts     # Sanity client + image URL builder
  whatsapp.ts   # buildWhatsAppLink(product)
data/reviews.json   # customer reviews (not managed in the CMS)
```

The Sanity Studio (schema + config) lives in a separate repository: [`solace-studio`](https://github.com/UsamaBarkat/solace-studio).

## Notes

- Product data comes from Sanity; customer reviews are a small local JSON file.
- No customer accounts, cart, or on-site payments — ordering is intentionally WhatsApp-based.
