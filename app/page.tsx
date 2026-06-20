import type { Metadata } from "next";
import Link from "next/link";
import { getAll, getNewArrivals, getByPieceCount, getClearance, getAllReviews, type Product } from "@/lib/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import Hero from "@/components/Hero";
import CollectionCard from "@/components/CollectionCard";
import ProductGrid from "@/components/ProductGrid";
import ReviewCard from "@/components/ReviewCard";
import InstagramGrid from "@/components/InstagramGrid";

export const metadata: Metadata = {
  title: "Solace by Fia — Handcrafted Women's Clothing",
  description:
    "Hand-embroidered kurtas in 2-piece & 3-piece styles, made with love in Pakistan. Order on WhatsApp.",
};

/* Thin blossom hairline between bands (spec §3.6) */
function Hairline() {
  return <hr className="border-0 h-px bg-blossom/40 max-w-6xl mx-auto" />;
}

export default function Home() {
  const products = getAll();
  const newArrivals = products.filter((p) => p.badges?.includes("New")).slice(0, 4);
  const reviews = getAllReviews().slice(0, 3);
  const heroProduct = products[0];

  // Three entry points into the shop (replaces the old fabric collections). Covers are
  // chosen dynamically with fallbacks (distinct where possible) so the build never breaks
  // if a product is deleted in the CMS.
  const fallback: Product | undefined = products[0];
  const naCover = getNewArrivals()[0] ?? fallback;
  const shopCover =
    getByPieceCount("1pc").find((p) => p.code !== naCover?.code) ??
    products.find((p) => p.code !== naCover?.code) ??
    fallback;
  const clearanceCover =
    getClearance().find((p) => p.code !== naCover?.code && p.code !== shopCover?.code) ??
    fallback;

  const sections = [
    { href: "/new-arrivals", title: "New Arrivals", tagline: "Just in",  coverProduct: naCover },
    { href: "/shop",         title: "Shop all",     tagline: "Browse",   coverProduct: shopCover },
    { href: "/clearance",    title: "Clearance",    tagline: "Reduced",  coverProduct: clearanceCover },
  ].filter(
    (s): s is { href: string; title: string; tagline: string; coverProduct: Product } =>
      Boolean(s.coverProduct)
  );

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <Hero product={heroProduct} />

      {/* ── Ways to shop ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <p className="font-body text-xs uppercase tracking-widest text-ink/70 mb-1">
            Explore
          </p>
          <h2 className="font-display text-3xl text-ink">Where to begin</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {sections.map(({ href, title, tagline, coverProduct }) => (
            <CollectionCard
              key={href}
              href={href}
              title={title}
              tagline={tagline}
              coverProduct={coverProduct}
            />
          ))}
        </div>
      </section>

      <Hairline />

      {/* ── New Arrivals ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-ink/70 mb-1">
              Just in
            </p>
            <h2 className="font-display text-3xl text-ink">New Arrivals</h2>
          </div>
          <Link
            href="/shop"
            className="font-body text-sm text-rose underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={newArrivals} maxCols={4} />
      </section>

      {/* ── Brand story band ──────────────────────────────────── */}
      <section className="bg-petal/50">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-5">
          <p className="font-body text-xs uppercase tracking-widest text-rose">
            Our story
          </p>
          <h2 className="font-display text-3xl text-ink leading-snug">
            Every stitch tells a story
          </h2>
          <p className="font-body text-base text-ink/70 leading-relaxed">
            Solace by Fia began with a simple belief: clothing made by hand carries a
            warmth no machine can match. We work with local artisans across Pakistan —
            embroiderers, weavers and tailors — so every kurta and chaddar supports the
            hands that made it.
          </p>
          <Link
            href="/about"
            className="inline-block font-body text-sm font-semibold text-rose underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
          >
            Read our story
          </Link>
        </div>
      </section>

      {/* ── Customer love ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <p className="font-body text-xs uppercase tracking-widest text-ink/70 mb-1">
            Customer love
          </p>
          <h2 className="font-display text-3xl text-ink">What our customers say</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
        <p className="text-center mt-8">
          <Link
            href="/reviews"
            className="font-body text-sm text-rose underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
          >
            Read all reviews
          </Link>
        </p>
      </section>

      <Hairline />

      {/* ── Instagram ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <p className="font-body text-xs uppercase tracking-widest text-ink/70 mb-1">
            @solacebyfia
          </p>
          <h2 className="font-display text-3xl text-ink">Follow along</h2>
        </div>
        <InstagramGrid />
      </section>

      {/* ── WhatsApp CTA band ─────────────────────────────────── */}
      <section className="bg-rose">
        <div className="max-w-3xl mx-auto px-4 py-14 text-center space-y-5">
          <h2 className="font-display text-3xl text-white leading-snug">
            Found something you love?
          </h2>
          <p className="font-body text-base text-white/80">
            Message us on WhatsApp — we&rsquo;ll confirm availability, size and delivery
            in minutes.
          </p>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-rose font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-petal active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
