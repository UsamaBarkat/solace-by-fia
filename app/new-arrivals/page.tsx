import type { Metadata } from "next";
import Link from "next/link";
import { getNewArrivals } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "New Arrivals — Solace by Fia",
  description:
    "The latest hand-embroidered kurtas and chaddars to land at Solace by Fia — fresh pieces, just in.",
};

export default function NewArrivalsPage() {
  const products = getNewArrivals();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Page header */}
      <header className="mb-8 max-w-2xl">
        <p className="font-body text-xs uppercase tracking-widest text-ink/70 mb-1">
          Just In
        </p>
        <h1 className="font-display text-4xl text-ink mb-3">New Arrivals</h1>
        <p className="font-body text-sm text-ink/70 leading-relaxed">
          The latest pieces to land at Solace by Fia — freshly added hand-embroidered
          kurtas and chaddars, ready to order on WhatsApp.
        </p>
      </header>

      <p className="font-body text-sm text-ink/70 mb-6">
        {products.length} {products.length === 1 ? "product" : "products"}
      </p>

      <ProductGrid products={products} />

      {/* Cross-link to full shop */}
      <p className="mt-10 font-body text-sm text-ink/70">
        Looking for something else?{" "}
        <Link
          href="/shop"
          className="text-rose underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
        >
          Browse all products
        </Link>
      </p>
    </div>
  );
}
