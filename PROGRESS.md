# Solace by Fia — Build Progress

> See `SOLACE-SHOWCASE-SPEC.md` §4 for the full task list and acceptance criteria.
> See `CLAUDE.md` for tech constraints and golden rules.

## Completed

- [x] **Task 1 — Scaffold** `create-next-app` (Next.js 16 + TypeScript + Tailwind v4); `next.config.ts` set to `output: "export"` + `images: { unoptimized: true }`.
- [x] **Task 2 — Design tokens + fonts** 5 brand colours in `@theme {}` (`globals.css`); Fraunces (display) + Inter (body) loaded via `next/font`; `@theme inline` used for font vars to avoid double-var resolution issue.
- [x] **Task 3 — Seed data** `data/products.json` (9 products, 3 per category); `data/reviews.json` (6 entries); `lib/products.ts` exports `getAll`, `getByCode`, `getByCategory`, `getRelated`, `getAllReviews`.
- [x] **Task 4 — `lib/whatsapp.ts`** `buildWhatsAppLink(product?)` — pre-filled product message or generic sticky-button message; `salePrice ?? price`; `encodeURIComponent` encoding verified.
- [x] **Task 5 — Layout shell** `Header` (sticky, Fraunces logo, hamburger on mobile), `Footer` (3-column grid, socials, policy placeholders), `WhatsAppButton` (fixed rose pill, bottom-right), `FloatingPetals` (6 mobile / 14 desktop, `transform`/`opacity` only, CSS `prefers-reduced-motion` disables entire container).

- [x] **Task 6 — ProductCard + ProductGrid** CSS-only cross-fade (group-hover + group-active) from front → closeup; sale price + badges + out-of-stock state; responsive 1→2→3 col grid; reduced-motion hides closeup entirely.
- [x] **Task 7 — Shop page + filters** `/shop` with `Filters.tsx` (category pills, fabric pills, in-stock toggle, Clear all); `ShopClient.tsx` manages state + filters products client-side; aria-live result count; empty state with reset.

- [x] **Task 8 — Product detail page** `generateStaticParams` generates all 9 static pages; `ProductGallery.tsx` (client, thumbnail switcher); `Accordion.tsx` (native `<details>`/`<summary>`, no JS); breadcrumb nav; price/meta/stock/description; WhatsApp CTA ("Enquire" for out-of-stock); related products strip; per-page metadata.

- [x] **Task 9 — Collections landing** `/collections/[slug]` with `generateStaticParams` over the 3 category slugs; per-collection title/tagline/description; category-switcher pills; reuses `ProductGrid` via `getByCategory`; bad slug → `notFound()`; cross-link to `/shop`.

- [x] **Task 10 — Home page** Hero (petal wash, garment image, artisan eyebrow, Shop Now + WhatsApp CTAs); `CollectionCard` ×3; New Arrivals strip (products with "New" badge, 4-col grid); brand-story band; 3 `ReviewCard`s from reviews.json; `InstagramGrid` (curated static 3×2, links to profile); rose WhatsApp CTA band; blossom hairlines between bands (spec §3.6 — Task 10's "gold-hairline" wording is stale from old palette).

- [x] **Task 11 — About, Reviews, Contact** `/about` (story band, 3 brand values incl. artisans, founder quote, rose CTA band); `/reviews` (full grid from reviews.json, computed 4.7 average, `ReviewCard` extended to show optional review photo); `/contact` (WhatsApp/Instagram/Facebook link cards + COD note, no form).

- [x] **Photo integration** 9 real screenshots converted PNG→JPEG into `public/products/` as front images (mapping chosen by fabric/label match); 6 into `public/instagram/`; `products.json` back/closeup/dupatta paths point at the front image so nothing 404s.

- [x] **Photo reconciliation** Retaken screenshots integrated (zero half-white images); prices synced from photo labels; all 9 names/fabrics/descriptions rewritten to honestly match photos; categories now 3 unstitched / 5 stitched / 1 chaddar (photos are source of truth; CHD codes kept on two stitched kurtas).
- [x] **Task 12 — Polish + accessibility + meta** AA contrast sweep (all muted ink text → `text-ink/70` ≈ 4.9:1; sub-/70 opacities fail on white); footer link + toggle-track focus rings; global `prefers-reduced-motion` belt-and-braces rule in globals.css; stale copy sweep (hero, about, shop/home/reviews metadata, size guide); reviews.json rewritten to reference current products, broken `photo` field removed; lint + build clean. **Verified: Lighthouse Accessibility 100.**

- [x] **Task 13 — Performance pass** All 15 images re-encoded from source PNGs at q70 (products native ~500px, Instagram downscaled to 400px): total image weight 1.40MB → 0.86MB (−39%). Verified in built output: only the hero image is preloaded (LCP), 17 below-fold images lazy-load, fonts are preloaded woff2 with `font-display:swap`. Build clean. **Verified: Lighthouse Performance 96 on the production static export — both spec targets (≥90 perf, ≥90 a11y) cleared.**

- [x] **Task 14 — Deploy** Repo pushed to GitHub (`UsamaBarkat/solace-by-fia`), connected to Vercel, auto-deploys on push to `master`.

## 🎉 v1 complete — all 14 tasks done

**Live URL: https://solace-by-fia.vercel.app**

Lighthouse (production): Performance 96 · Accessibility 100. Spec success criteria met: 3 collections, 9 products, WhatsApp ordering on every product, sticky WhatsApp button, mobile-first at 360px, petals behind content + disabled under reduced-motion.

---

## v1.1 — Structure update (see `STRUCTURE-UPDATE-SPEC.md`)

Reorganised the site from **fabric categories** (unstitched/stitched/chaddar) to **piece count (2pc / 3pc) + sale status**. Structure only — sample products kept as placeholders; real product data lands in a later round.

- [x] **Task 1 — Data model + helpers** Added `pieceCount` ("2pc"|"3pc") and `isNew` to every product in `products.json` (5×2pc / 4×3pc; 5 New; 8 Clearance). `lib/products.ts`: added `getByPieceCount`, `getNewArrivals`, `getClearance`; `getRelated` now relates by `pieceCount`; `getByCategory` kept temporarily (consumers removed in Task 6).
- [x] **Task 2 — Navigation** Header + mobile drawer menu → Home · New Arrivals · Shop · Clearance · Reviews · Contact. About dropped from menu, kept in footer. Footer Explore links updated to match.
- [x] **Task 3 — New Arrivals page** `/new-arrivals` renders `getNewArrivals()` in `ProductGrid` with on-brand header, product count, metadata.
- [x] **Task 4 — Shop 2pc/3pc filter** `Filters.tsx` replaced category+fabric with a prominent piece-count filter (All / 2pc / 3pc); in-stock toggle kept; fabric removed. `ProductCard` label now shows piece count instead of category. Shop subheading rewritten.
- [x] **Task 5 — Clearance page** `/clearance` renders `getClearance()` (products with a `salePrice`) with header, count, metadata.
- [x] **Task 6 — Retire fabric collections** Deleted `/collections/[slug]` route; `getByCategory` removed; `CollectionCard` now takes a generic `href`; product breadcrumb's category crumb removed (`CATEGORY_LABEL` deleted). Home band reheaded "Where to begin" with three cards → New Arrivals / Shop / Clearance.
- [x] **Task 7 — Contact + delivery info** Contact page wired with real details: WhatsApp `0314 3083863`, WhatsApp Community, Instagram, Facebook (canonical links), + delivery block (TCS all Pakistan, 7–9 days, flat Rs 200). Product Delivery accordion updated to match; Returns left as placeholder with `TODO: client to provide returns policy`. Product detail "Category" meta row → "Piece Count".
- [x] **Task 8 — Logo** Kept the Fraunces text wordmark; grey-background PDF not used in header; code comment notes a transparent-PNG swap pending from client. Footer Instagram/Facebook updated to canonical links + WhatsApp Community added.
- [x] **Task 9 — Verify + sync docs** `npm run build` clean; `SOLACE-SHOWCASE-SPEC.md` updated (success criteria, folder structure, data model, pages, tasks, validate) to describe the piece-count + Clearance structure; stale "unstitched/stitched/chaddar as categories" copy swept (hero, footer, about, layout/home/shop metadata); this `PROGRESS.md` updated.

> Pending from client: design references for a theme round, returns policy. Size Guide on the product page still references unstitched/stitched as genuine garment types (accurate to the catalog), not as navigation.

---

## v1.2 — Real product catalog + logo (live)

The placeholder sample products are **replaced with the brand's real catalog**, and the real logo is wired in.

- [x] **21 real products** `data/products.json` now holds 21 heavy embroidered Pima lawn kurtas (`SBF-HK-001…021`), all **1-piece**, New + on sale. Photos in `public/products/` renamed `sbf-hk-0NN.jpg`; old `sbf-lwn/std/chd` sample images removed. Each product has one photo (front/back/closeup share the same file).
- [x] **1pc filter** `PieceCount` type now includes `"1pc"`. Shop `Filters` renders only the piece-count options present in the data (stable `1pc → 2pc → 3pc` order) — currently **All / 1pc**; 2pc/3pc reappear automatically if added.
- [x] **Single-image galleries** `ProductGallery` de-duplicates by image `src` and hides the thumbnail strip when only one distinct image exists.
- [x] **Real logo** Header now uses `public/solace-logo-wordmark.png` (h-11 mobile → md:h-14 desktop, links home, alt "Solace by Fia"); the text wordmark + "swap later" note are gone. `public/solace-logo-full.png` set as the favicon and Open Graph image (default `app/favicon.ico` removed; `metadataBase` set).
- [x] **Home + copy fixes** Three "Where to begin" cards use distinct covers (HK-003 / HK-014 / HK-012); Instagram grid uses 6 real product photos; hero + Shop subheading rewritten to "hand-embroidered Pima lawn kurtas, 1-piece".

**Live:** https://solace-by-fia.vercel.app — 21 real products + real logo deployed.
