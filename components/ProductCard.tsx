import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { code, name, category, price, salePrice, inStock, badges, images } = product;

  return (
    <Link
      href={`/product/${code}`}
      className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
    >
      {/* Image area — front fades to closeup on hover/active */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-petal">
        <Image
          src={images.front}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover card-fade transition-opacity duration-500 group-hover:opacity-0 group-active:opacity-0"
        />
        <Image
          src={images.closeup}
          alt={`${name} — embroidery detail`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover card-fade card-closeup opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100"
          aria-hidden="true"
        />

        {/* Badges */}
        {badges && badges.length > 0 && (
          <ul
            className="absolute top-3 left-3 flex flex-wrap gap-1.5"
            aria-label="Product labels"
          >
            {badges.map((badge) => (
              <li
                key={badge}
                className={`font-body text-xs font-semibold px-2 py-0.5 rounded-full ${
                  badge === "Sale"
                    ? "bg-rose text-white"
                    : "bg-white/90 text-ink"
                }`}
              >
                {badge}
              </li>
            ))}
          </ul>
        )}

        {/* Out of stock */}
        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-end justify-center pb-4">
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-ink">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5 space-y-1">
        <p className="font-body text-xs uppercase tracking-widest text-ink/70">{category}</p>
        <h3 className="font-display text-base text-ink leading-snug group-hover:text-rose transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {salePrice ? (
            <>
              <span className="font-body font-semibold text-rose">
                PKR {salePrice.toLocaleString()}
              </span>
              <span className="font-body text-sm text-ink/70 line-through">
                PKR {price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="font-body font-semibold text-ink">
              PKR {price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
