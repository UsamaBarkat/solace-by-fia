import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getByCategory, type Category } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

type Props = { params: Promise<{ slug: string }> };

const COLLECTIONS: Record<
  Category,
  { title: string; tagline: string; description: string }
> = {
  unstitched: {
    title: "Unstitched",
    tagline: "Fabric, as you like it",
    description:
      "Premium unstitched suits in lawn and chiffon — cut and stitched your way. Each 3-piece comes with shirt, trouser and dupatta fabric, ready for your tailor.",
  },
  stitched: {
    title: "Stitched",
    tagline: "Ready when you are",
    description:
      "Ready-to-wear kurtas, co-ords and formals — stitched with care so you can skip the tailor. Standard S–XL sizing; WhatsApp us your measurements if unsure.",
  },
  chaddar: {
    title: "Chaddar",
    tagline: "Wrapped in heritage",
    description:
      "Hand-embroidered chaddars and shawls in pashmina, silk and lawn — heirloom wraps that finish any outfit with warmth and grace.",
  },
};

const SLUGS = Object.keys(COLLECTIONS) as Category[];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = COLLECTIONS[slug as Category];
  if (!collection) return {};
  return {
    title: `${collection.title} — Solace by Fia`,
    description: collection.description.slice(0, 155),
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Category)) notFound();

  const category = slug as Category;
  const collection = COLLECTIONS[category];
  const products = getByCategory(category);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Collection header */}
      <header className="mb-8 max-w-2xl">
        <p className="font-body text-xs uppercase tracking-widest text-ink/40 mb-1">
          {collection.tagline}
        </p>
        <h1 className="font-display text-4xl text-ink mb-3">{collection.title}</h1>
        <p className="font-body text-sm text-ink/60 leading-relaxed">
          {collection.description}
        </p>
      </header>

      {/* Category switcher */}
      <nav aria-label="Collections" className="flex flex-wrap gap-2 mb-8">
        {SLUGS.map((s) => (
          <Link
            key={s}
            href={`/collections/${s}`}
            aria-current={s === category ? "page" : undefined}
            className={`font-body text-sm px-3 py-1.5 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2 ${
              s === category
                ? "bg-rose text-white border-rose"
                : "bg-white border-blossom text-ink hover:border-rose hover:text-rose"
            }`}
          >
            {COLLECTIONS[s].title}
          </Link>
        ))}
      </nav>

      <p className="font-body text-sm text-ink/50 mb-6">
        {products.length} {products.length === 1 ? "product" : "products"}
      </p>

      <ProductGrid products={products} />

      {/* Cross-link to full shop */}
      <p className="mt-10 font-body text-sm text-ink/60">
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
