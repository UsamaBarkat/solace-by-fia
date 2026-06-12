import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

interface Props {
  products: Product[];
  maxCols?: 3 | 4;
}

export default function ProductGrid({ products, maxCols = 3 }: Props) {
  const colClass = maxCols === 4
    ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul
      role="list"
      className={`grid grid-cols-1 gap-x-5 gap-y-8 ${colClass}`}
    >
      {products.map((product) => (
        <li key={product.code}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
