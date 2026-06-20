# Solace by Fia — Self-Service Product Management (Sanity CMS) — v2.0
## Spec-Driven change to the live site

> **Read first:** `CLAUDE.md`, `SOLACE-SHOWCASE-SPEC.md`, and the prior update specs.
> Golden Rules still apply: spec wins, one task at a time, show result and wait for
> approval, no scope creep. Some tasks are run by the developer (account setup, CLI
> deploys) and are marked **[Dev]**; build tasks are **[Claude Code]**.

---

## 1. WHY
The client wants to add / edit / delete products herself, without the developer. We'll use
**Sanity**, a headless CMS. Sanity provides a ready-made, friendly editor (**Sanity Studio**)
where the owner (and staff) log in and manage products. The public website reads products
**from Sanity** instead of the local `data/products.json` file. **Ordering stays on
WhatsApp — completely unchanged.**

## 2. WHAT CHANGES / STAYS
**Changes (all behind the scenes):**
- Products move from `data/products.json` → **Sanity** (hosted content database).
- A new **Sanity Studio** (hosted editor) is where products are managed.
- The site fetches products from Sanity at build time; a **webhook auto-rebuilds** the site
  when content changes (live in ~1–2 minutes).

**Stays the same:**
- The entire public site — design, pages, theme, petals, WhatsApp ordering — unchanged for
  customers.
- Static hosting on Vercel — still fast, still free.

## 3. NON-GOALS
- No order capture or order management (orders stay on WhatsApp).
- No customer accounts, no payments.
- No change to the customer-facing experience.

## 4. SAFETY — the site is LIVE (critical)
- All **website-repo** changes happen on a new **`sanity-cms` git branch**. Vercel builds it
  as a **preview deployment** (a separate, private URL). The live site (`main`) is untouched
  until everything works on the preview. **Merge to `main` only after full testing.**
- The **Sanity Studio is a separate project/folder** — it cannot break the website.

## 5. DECISIONS (recorded)
- **Editor:** Sanity Studio, deployed **separately** (hosted free at `<name>.sanity.studio`).
  The owner invites herself + staff as editors in Sanity (Sanity handles login — no auth to
  build). Free tier supports the owner plus a small number of additional editors — enough for now.
- **Dataset:** `production`, set to **public read** (the catalog is public anyway) → no secret
  token needed for the website to read it.
- **Update flow:** build-time fetch + a **Sanity → Vercel deploy-hook webhook** that triggers
  a rebuild on any product change (~1–2 min to go live). Keeps the site static and fast.
- **Images:** managed in Sanity (uploaded through Studio). The existing 21 product images are
  migrated into Sanity so everything lives in one place.
- **Scope:** products only.

## 6. ACCOUNTS / TOOLS
- **Sanity** (free): account + project → gives a **Project ID** and **Dataset** (`production`).
  *(Dev creates this — Task 0.)*
- **Vercel** (already set up): we'll add a **Deploy Hook** URL (Project Settings → Git → Deploy
  Hooks) and point a Sanity webhook at it.

## 7. PRODUCT SCHEMA (Sanity `product` document — mirrors current data)
- `title` (string) — product name
- `code` (slug) — unique, used in URL `/product/{code}`
- `category` (string)
- `collection` (string)
- `fabric` (string)
- `pieces` (string) — descriptive ("1 Piece — Embroidered Shirt (3 metres)")
- `pieceCount` (string: `1pc` | `2pc` | `3pc`)
- `isNew` (boolean)
- `price` (number)
- `salePrice` (number, optional)
- `inStock` (boolean)
- `badges` (array of strings)
- `imageFront` (image), `imageBack` (image, optional), `imageCloseup` (image, optional)
- `description` (text)

## 8. PLAN

### A. Sanity Studio (separate project)
- Scaffold a **standalone** Studio (`npm create sanity@latest`) in its own folder
  `solace-studio`, using the Project ID + `production` dataset. Define the `product` schema.
- Deploy with `npx sanity deploy` → client URL like `solace-by-fia.sanity.studio`.
- Owner invites herself + staff as editors in sanity.io project members.

### B. Migrate the 21 products
- A one-time script (run locally) reads the current `data/products.json`, uploads each
  product's image(s) to Sanity as assets, and creates a `product` document per item with all
  fields. Verify exactly 21 documents appear in Studio.

### C. Website repo (on the `sanity-cms` branch)
- Install `next-sanity` and `@sanity/image-url`.
- Add a Sanity client (`lib/sanity.ts`) reading `NEXT_PUBLIC_SANITY_PROJECT_ID` and
  `NEXT_PUBLIC_SANITY_DATASET` from env (public dataset → no token).
- **Rewrite `lib/products.ts`** so every existing helper (`getAll`, `getByCode`,
  `getByPieceCount`, `getNewArrivals`, `getClearance`, `getRelated`, `getAllReviews` stays as
  is) fetches from Sanity via GROQ **but keeps the same function signatures and return shapes**,
  so the pages/components don't need to change.
- Map Sanity image assets to URLs via `@sanity/image-url`; allow Sanity image URLs in
  `next.config` (site is static-export with `images.unoptimized: true`, so just permit them).
- Keep `data/products.json` in the repo as reference until verified, then it can be removed.
- Products are fetched **at build time** (SSG) — same static output as now.

### D. Auto-rebuild on content change
- Create a Vercel **Deploy Hook** URL.
- In Sanity, add a **webhook** that calls that URL on create/update/delete of `product`
  documents.
- Result: client publishes in Studio → site rebuilds → live in ~1–2 min.

### E. Go live
- Test fully on the `sanity-cms` **preview** deployment.
- Merge `sanity-cms` → `main`; set the two `NEXT_PUBLIC_SANITY_*` env vars in Vercel
  production; confirm the live site reads from Sanity.

## 9. TASKS (in order)
0. **[Dev]** Create a free Sanity account + project. Note the **Project ID** and dataset
   (`production`). *(Acceptance: you have the Project ID written down.)*
1. **[Claude Code]** Scaffold a standalone Sanity Studio in folder `solace-studio` using the
   Project ID + `production` dataset; define the `product` schema (§7). Run it locally to
   confirm it opens. *(Dev logs in when the CLI prompts.)*
   *Acceptance:* Studio runs locally and shows an empty "Product" document type.
2. **[Dev + Claude Code]** Deploy the Studio (`npx sanity deploy`); pick a hostname.
   *Acceptance:* `<name>.sanity.studio` opens and shows an empty product list.
3. **[Claude Code]** Write and run the migration script importing the 21 products + their
   images from `data/products.json` into Sanity.
   *Acceptance:* exactly 21 products appear in Studio with correct names, prices, and images.
4. **[Claude Code]** Create the **`sanity-cms` branch**. Add the Sanity client + env vars;
   rewrite `lib/products.ts` to fetch from Sanity (same signatures); wire image URLs. Run
   `npm run build`, confirm clean.
   *Acceptance:* build passes; helpers return the 21 products from Sanity.
5. **[Dev + Claude Code]** Push the branch → Vercel **preview** deploy. Set the two
   `NEXT_PUBLIC_SANITY_*` env vars in Vercel for the preview. Open the preview URL.
   *Acceptance:* all 21 products show on the preview, pulled from Sanity; Shop / New Arrivals /
   Clearance / product pages all work; WhatsApp ordering unchanged.
6. **[Dev + Claude Code]** Create a Vercel Deploy Hook + a Sanity webhook pointing to it.
   *Acceptance:* editing a product in Studio + publishing triggers a rebuild and the change
   shows on the preview within ~2 min.
7. **[Dev]** Final dry run: add a test product in Studio → it appears on the preview after
   rebuild → delete it → it disappears.
   *Acceptance:* add/edit/delete all work end to end on the preview.
8. **[Claude Code]** Merge `sanity-cms` → `main`; ensure the two env vars are set in Vercel
   **production**; confirm the live site reads from Sanity. Update `PROGRESS.md`.
   *Acceptance:* live site shows all products from Sanity; build green; no broken images.

## 10. VALIDATE (before handing the editor to the client)
- [ ] Client can log into Sanity Studio and see all 21 products.
- [ ] Adding / editing / deleting a product in Studio updates the live site within ~2 min.
- [ ] Shop, New Arrivals, Clearance, and every product page work exactly as before — now from
      Sanity.
- [ ] WhatsApp ordering unchanged and working.
- [ ] Live site builds cleanly; no broken images.
