"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/products";
import Filters, { type FilterState } from "@/components/Filters";
import ProductGrid from "@/components/ProductGrid";

const DEFAULT_FILTERS: FilterState = {
  pieceCount: "all",
  inStockOnly: false,
};

const PIECE_ORDER = ["1pc", "2pc", "3pc"];

export default function ShopClient({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Only offer piece-count options that actually have products, in a stable order.
  const pieceCounts = useMemo(() => {
    const present = new Set(products.map((p) => p.pieceCount));
    return PIECE_ORDER.filter((p) => present.has(p as Product["pieceCount"]));
  }, [products]);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (filters.pieceCount !== "all" && p.pieceCount !== filters.pieceCount) return false;
        if (filters.inStockOnly && !p.inStock) return false;
        return true;
      }),
    [products, filters]
  );

  return (
    <div className="space-y-6">
      <Filters pieceCounts={pieceCounts} value={filters} onChange={setFilters} />

      <p className="font-body text-sm text-ink/70" aria-live="polite" aria-atomic="true">
        {filtered.length === products.length
          ? `${products.length} products`
          : `${filtered.length} of ${products.length} products`}
      </p>

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <div className="py-24 text-center space-y-3">
          <p className="font-display text-2xl text-ink">No products found</p>
          <p className="font-body text-sm text-ink/70">
            Try removing a filter to see more results.
          </p>
          <button
            type="button"
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="mt-1 font-body text-sm text-rose underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
