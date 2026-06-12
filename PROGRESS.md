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

## Up next

- [ ] **Task 9 — Collections landing (`/collections/[slug]`)** Slugs: unstitched, stitched, chaddar. Reuse ProductGrid filtered by category. Bad slug → 404.
