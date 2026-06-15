# Solace by Fia — Structure Update (v1.1)
## Spec-Driven change to the existing showcase site

> **Read first:** `CLAUDE.md`, then `SOLACE-SHOWCASE-SPEC.md`, then this file.
> This is a **change spec** to the already-built, deployed site — not a rebuild. All the
> Golden Rules in CLAUDE.md still apply: **spec wins, one task at a time, show result and
> wait for approval, no scope creep.** Do the tasks below in order.

---

## 1. WHY
The client approved the showcase and wants the site reorganised the way they actually sell.
Products move from **fabric categories** (unstitched / stitched / chaddar) to **piece count
+ sale status**. We also now have the brand's real operational details to wire in. Real
product data comes in a *later* round — this update changes **structure only** and keeps the
existing sample products as placeholders so the new sections have something to show.

## 2. WHAT CHANGES (and what stays)

**New navigation (menu):** Home · New Arrivals · Shop · Clearance · Reviews · Contact
- "Shop" is the all-products page with a prominent **2pc / 3pc** filter (the client calls
  this section "2pc and 3pc").
- Homepage **stays** as the landing page.
- "About" leaves the main menu but the page stays (reachable from the home story band +
  footer).

**Product grouping changes:**
- Old fabric categories (unstitched/stitched/chaddar) are **retired** for navigation.
- **New Arrivals** = products flagged new. **Clearance** = products with a sale price.
- **Shop** is filtered by **piece count (2pc / 3pc)** + in-stock.

**Stays the same:** the white/pink theme + petals, product cards (front→closeup hover),
product detail pages, WhatsApp ordering, Reviews page, performance/accessibility work.

## 3. NON-GOALS (not in this update)
- No real products yet (they arrive in a later round and will replace the sample data).
- No theme/design overhaul yet (separate round, once the client sends design references).
- No cart, payments, accounts (still Phase 2–3).
- Don't rewrite the **Returns** policy — client hasn't given it yet (leave the placeholder,
  flagged).

## 4. REAL DATA TO WIRE IN (exact values)
- **WhatsApp orders:** `03143083863` → link `https://wa.me/923143083863` (already correct).
- **Delivery:** 7–9 days. **Flat rate Rs 200.** Shipping **all over Pakistan via TCS.**
- **WhatsApp Community:** `https://chat.whatsapp.com/ItHe8FGLBqIALfrpM9m9yO`
- **Instagram:** `https://www.instagram.com/solacebyfia`
- **Facebook:** `https://www.facebook.com/share/17oXZL8cFD/`

## 5. DATA MODEL CHANGES — `data/products.json`
Add two fields to **every** product:
- `pieceCount`: `"2pc"` | `"3pc"` — the Shop filter key.
- `isNew`: `true` | `false` — drives the New Arrivals page.

Keep the existing `pieces` field as the descriptive display text (e.g. "3 Piece — Shirt,
Trouser, Dupatta"). Keep `salePrice` — its presence means the product is in **Clearance**.
The old `category` field can stay in the data (harmless) but is no longer used for
navigation or filtering. For the existing sample products, set sensible `pieceCount` /
`isNew` values so every new section has content to display.

**`lib/products.ts` helpers:**
- Add `getByPieceCount(count)` → products matching "2pc"/"3pc".
- Add `getNewArrivals()` → products where `isNew === true`.
- Add `getClearance()` → products where `salePrice` is defined.
- Change `getRelated` to relate by **same `pieceCount`** (was category).
- `getByCategory` is no longer used — remove it and its imports.

---

## 6. TASKS (in order; each small, with acceptance criteria)

1. **Data model + helpers**
   - Add `pieceCount` and `isNew` to every product in `products.json`; set values so both
     2pc and 3pc, and both New and non-New, and at least 2–3 Clearance items exist.
   - Update `lib/products.ts` per §5. Remove `getByCategory`.
   - *Acceptance:* `getByPieceCount`, `getNewArrivals`, `getClearance` return correct sets;
     `getRelated` uses pieceCount; TypeScript strict passes.

2. **Navigation (Header, mobile drawer, Footer)**
   - Menu: Home · New Arrivals · Shop · Clearance · Reviews · Contact. Update footer Explore
     links to match. Drop "About" from the main menu (keep it in the footer). Active-route
     styling on the new links.
   - *Acceptance:* all links present and route correctly on desktop + mobile hamburger.

3. **New Arrivals page** — `/new-arrivals`
   - Renders `getNewArrivals()` in `ProductGrid`; on-brand header + product count; per-page
     metadata.
   - *Acceptance:* shows only `isNew` products; static page appears in build output.

4. **Shop page — swap to 2pc/3pc filter**
   - Replace the old category/fabric filters with a prominent **piece-count** filter
     (All / 2pc / 3pc). Keep the in-stock toggle. Remove the fabric filter entirely.
   - *Acceptance:* 2pc/3pc filtering works instantly; in-stock works; no leftover
     category/fabric filter UI or code.

5. **Clearance page** — `/clearance`
   - Renders `getClearance()`; header explains these are discounted pieces; product count;
     metadata. Cards already show the strikethrough sale price.
   - *Acceptance:* shows only products with a `salePrice`; static page builds.

6. **Retire fabric collections**
   - Remove the `/collections/[slug]` route and any links/imports to it. Replace the home
     **"Our Collections"** band with three cards linking to **New Arrivals**, **Shop
     (2pc & 3pc)**, and **Clearance**. Update the band's heading accordingly.
   - *Acceptance:* `/collections/unstitched` now 404s; the home band links to the three new
     sections; build has no broken imports.

7. **Contact page + delivery info**
   - Contact page shows the real details from §4: WhatsApp number + link, delivery (7–9
     days, Rs 200 flat rate), TCS all-Pakistan shipping, WhatsApp Community link, Instagram,
     Facebook. Update the **product-page Delivery accordion** text to match (7–9 days, Rs 200
     flat, TCS). **Leave the Returns accordion placeholder as-is** but add a code comment
     `TODO: client to provide returns policy`.
   - *Acceptance:* contact page + delivery accordion show the real info; all links open
     correctly.

8. **Logo (pending — do not force a bad logo)**
   - The supplied logo is a PDF on a **grey background** — unsuitable for the white header.
     **Keep the current Fraunces "Solace by Fia" text wordmark** for now. Do **not** place
     the grey-background image in the header. Add a code comment noting the header logo will
     be swapped for a **transparent PNG** when the client provides one.
   - *Acceptance:* header is unchanged and clean; the note is in place.

9. **Verify + sync docs**
   - Run `npm run build` — must be clean. Update the parts of `SOLACE-SHOWCASE-SPEC.md` that
     describe fabric categories so they describe the piece-count + Clearance structure
     instead. Update `PROGRESS.md` to record this v1.1 structure update.
   - *Acceptance:* build passes; the two docs reflect the new structure.

---

## 7. VALIDATE (before re-deploying)
- [ ] Menu shows Home · New Arrivals · Shop · Clearance · Reviews · Contact, mobile + desktop.
- [ ] New Arrivals shows only new products; Clearance shows only sale products.
- [ ] Shop filter switches between 2pc and 3pc correctly; in-stock toggle works.
- [ ] Old `/collections/...` URLs 404; home section cards link to the three new pages.
- [ ] Contact page + product delivery accordion show: 7–9 days, Rs 200 flat, TCS, real links.
- [ ] WhatsApp order button still opens with the product pre-filled (test on a phone).
- [ ] `npm run build` clean; redeploy to Vercel; check the live URL on a phone.
