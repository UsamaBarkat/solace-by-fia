import type { Metadata } from "next";
import Link from "next/link";
import { getClearance } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Clearance — Solace by Fia",
  description:
    "Hand-embroidered kurtas and chaddars at reduced prices — limited clearance pieces from Solace by Fia.",
};

export default function ClearancePage() {
  const products = getClearance();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Page header */}
      <header className="mb-8 max-w-2xl">
        <p className="font-body text-xs uppercase tracking-widest text-ink/70 mb-1">
          Reduced
        </p>
        <h1 className="font-display text-4xl text-ink mb-3">Clearance</h1>
        <p className="font-body text-sm text-ink/70 leading-relaxed">
          A handpicked edit of hand-embroidered pieces now at reduced prices. Limited
          stock — once they&rsquo;re gone, they&rsquo;re gone.
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
