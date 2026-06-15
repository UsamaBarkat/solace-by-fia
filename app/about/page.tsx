import type { Metadata } from "next";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About — Solace by Fia",
  description:
    "The story behind Solace by Fia — handcrafted women's clothing made with local artisans across Pakistan.",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Story ──────────────────────────────────────────────── */}
      <section className="bg-petal/50">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-5">
          <p className="font-body text-xs uppercase tracking-widest text-rose">
            Our story
          </p>
          <h1 className="font-display text-4xl text-ink leading-snug">
            Clothing that carries warmth
          </h1>
          <p className="font-body text-base text-ink/70 leading-relaxed">
            Solace by Fia began on Instagram, with a handful of embroidered kurtas and a
            belief that clothing made by hand carries a warmth no machine can match.
            What started as a small page has grown into a community of women who value
            craft over fast fashion — pieces made slowly, worn often, and loved for years.
          </p>
        </div>
      </section>

      {/* ── Brand values ───────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <h2 className="font-display text-xl text-ink">Made by hand</h2>
            <p className="font-body text-sm text-ink/70 leading-relaxed">
              Every kurta and chaddar passes through skilled hands — resham and zari
              embroidery, block printing, hand-knotted fringes. Small imperfections are
              part of the story; no two pieces are exactly alike.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-xl text-ink">Made with artisans</h2>
            <p className="font-body text-sm text-ink/70 leading-relaxed">
              We work directly with local embroiderers, weavers and tailors across
              Pakistan. Buying from us supports the households behind every stitch —
              fair work, paid fairly, on their own terms.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-xl text-ink">Made to last</h2>
            <p className="font-body text-sm text-ink/70 leading-relaxed">
              We choose soft, breathable cottons and lawns that age gracefully, and
              finish every piece properly — so the kurta you order today becomes the
              one you reach for, season after season.
            </p>
          </div>
        </div>
      </section>

      {/* ── Fia's note ─────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 pb-14">
        <div className="bg-white border border-petal rounded-2xl p-8 text-center space-y-4">
          <p className="font-display text-2xl text-rose" aria-hidden="true">&ldquo;</p>
          <blockquote className="font-body text-base text-ink/70 leading-relaxed italic">
            I started Solace because getting dressed should feel like a small comfort —
            something beautiful that&rsquo;s truly yours. Every order is packed by hand,
            and every message is answered by me. Thank you for being part of this.
          </blockquote>
          <p className="font-body text-sm font-semibold text-ink">— Fia, founder</p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="bg-rose">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-4">
          <h2 className="font-display text-2xl text-white">See the craft up close</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/shop"
              className="bg-white text-rose font-body font-semibold text-sm px-7 py-3 rounded-full hover:bg-petal active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Browse the collection
            </Link>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white font-body font-semibold text-sm px-7 py-3 rounded-full hover:bg-white/10 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Say salaam on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
