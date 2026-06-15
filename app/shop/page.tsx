import type { Metadata } from "next";
import { getAll } from "@/lib/products";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop — Solace by Fia",
  description:
    "Browse hand-embroidered kurtas in 2-piece & 3-piece styles, all handcrafted by Solace by Fia.",
};

export default function ShopPage() {
  const products = getAll();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <p className="font-body text-xs uppercase tracking-widest text-ink/70 mb-1">
        Collection
      </p>
      <h1 className="font-display text-4xl text-ink mb-2">Shop All</h1>
      <p className="font-body text-sm text-ink/70 mb-8">
        Hand-embroidered kurtas in 2pc &amp; 3pc — handcrafted with love.
      </p>

      <ShopClient products={products} />
    </div>
  );
}
