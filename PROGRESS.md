# Solace by Fia — Build Progress

> See `SOLACE-SHOWCASE-SPEC.md` §4 for the full task list and acceptance criteria.
> See `CLAUDE.md` for tech constraints and golden rules.

## Completed

- [x] **Task 1 — Scaffold** `create-next-app` (Next.js 16 + TypeScript + Tailwind v4); `next.config.ts` set to `output: "export"` + `images: { unoptimized: true }`.
- [x] **Task 2 — Design tokens + fonts** 5 brand colours in `@theme {}` (`globals.css`); Fraunces (display) + Inter (body) loaded via `next/font`; `@theme inline` used for font vars to avoid double-var resolution issue.
- [x] **Task 3 — Seed data** `data/products.json` (9 products, 3 per category); `data/reviews.json` (6 entries); `lib/products.ts` exports `getAll`, `getByCode`, `getByCategory`, `getRelated`, `getAllReviews`.
- [x] **Task 4 — `lib/whatsapp.ts`** `buildWhatsAppLink(product?)` — pre-filled product message or generic sticky-button message; `salePrice ?? price`; `encodeURIComponent` encoding verified.
- [x] **Task 5 — Layout shell** `Header` (sticky, Fraunces logo, hamburger on mobile), `Footer` (3-column grid, socials, policy placeholders), `WhatsAppButton` (fixed rose pill, bottom-right), `FloatingPetals` (6 mobile / 14 desktop, `transform`/`opacity` only, CSS `prefers-reduced-motion` disables entire container).

## Up next

- [ ] **Task 6 — ProductCard + ProductGrid** Card: front→closeup cross-fade on hover/tap, name, price (strike-through sale), badges, link to detail page. Grid: responsive 1→2→3/4 col. Reduced-motion disables the cross-fade.
