"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImages } from "@/lib/products";

interface Props {
  images: ProductImages;
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const thumbs = [
    { src: images.front,   label: "Front" },
    { src: images.back,    label: "Back" },
    { src: images.closeup, label: "Detail" },
    ...(images.dupatta ? [{ src: images.dupatta, label: "Dupatta" }] : []),
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-petal">
        <Image
          key={thumbs[active].src}
          src={thumbs[active].src}
          alt={`${name} — ${thumbs[active].label}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Product images">
        {thumbs.map((t, i) => (
          <button
            key={t.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${t.label} view`}
            aria-pressed={active === i}
            className={`relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden bg-petal border-2 transition-colors focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2 ${
              active === i
                ? "border-rose"
                : "border-transparent hover:border-blossom"
            }`}
          >
            <Image
              src={t.src}
              alt={`${name} — ${t.label}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
