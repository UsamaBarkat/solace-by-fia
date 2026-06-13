import Image from "next/image";
import Link from "next/link";
import type { Category, Product } from "@/lib/products";

interface Props {
  category: Category;
  title: string;
  tagline: string;
  coverProduct: Product;
}

export default function CollectionCard({ category, title, tagline, coverProduct }: Props) {
  return (
    <Link
      href={`/collections/${category}`}
      className="group block rounded-2xl overflow-hidden relative aspect-[4/5] bg-petal focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
    >
      <Image
        src={coverProduct.images.front}
        alt={`${title} collection — ${coverProduct.name}`}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105"
      />
      {/* Ink gradient for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-body text-xs uppercase tracking-widest text-white/90 mb-0.5">
          {tagline}
        </p>
        <p className="font-display text-2xl text-white flex items-center gap-2">
          {title}
          <span aria-hidden="true" className="transition-transform motion-reduce:transition-none group-hover:translate-x-1">→</span>
        </p>
      </div>
    </Link>
  );
}
