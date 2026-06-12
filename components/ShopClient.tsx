"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/products";
import Filters, { type FilterState } from "@/components/Filters";
import ProductGrid from "@/components/ProductGrid";

const DEFAULT_FILTERS: FilterState = {
  category: "all",
  fabric: "all",
  inStockOnly: false,
};

export default function ShopClient({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const fabrics = useMemo(
    () => Array.from(new Set(products.map((p) => p.fabric))).sort(),
    [products]
  );

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (filters.category !== "all" && p.category !== filters.category) return false;
        if (filters.fabric !== "all" && p.fabric !== filters.fabric) return false;
        if (filters.inStockOnly && !p.inStock) return false;
        return true;
      }),
    [products, filters]
  );

  return (
    <div className="space-y-6">
      <Filters fabrics={fabrics} value={filters} onChange={setFilters} />

      <p className="font-body text-sm text-ink/50" aria-live="polite" aria-atomic="true">
        {filtered.length === products.length
          ? `${products.length} products`
          : `${filtered.length} of ${products.length} products`}
      </p>

      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <div className="py-24 text-center space-y-3">
          <p className="font-display text-2xl text-ink">No products found</p>
          <p className="font-body text-sm text-ink/50">
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
