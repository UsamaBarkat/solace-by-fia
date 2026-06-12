import { getAll } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  const products = getAll();
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <p className="font-body text-xs uppercase tracking-widest text-ink/40 mb-1">Task 6 test page</p>
      <h1 className="font-display text-3xl text-ink mb-2">All Products</h1>
      <p className="font-body text-sm text-ink/50 mb-8">
        {products.length} products · hover a card to see the cross-fade
      </p>
      <ProductGrid products={products} />
    </div>
  );
}
