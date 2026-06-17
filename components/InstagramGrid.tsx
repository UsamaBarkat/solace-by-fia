import Image from "next/image";

const IG_URL = "https://www.instagram.com/solacebyfia";

/* Curated static grid (spec §1.4: no live Instagram API in v1).
   Uses 6 of the current product photos; every tile links to the profile. */
const POSTS = [
  { src: "/products/sbf-hk-001.jpg", alt: "Heavy embroidered Pima lawn kurta in lavender purple" },
  { src: "/products/sbf-hk-002.jpg", alt: "Heavy embroidered Pima lawn kurta in pink" },
  { src: "/products/sbf-hk-005.jpg", alt: "Heavy embroidered Pima lawn kurta in black with multicolour florals" },
  { src: "/products/sbf-hk-014.jpg", alt: "Heavy embroidered Pima lawn kurta in forest green" },
  { src: "/products/sbf-hk-016.jpg", alt: "Heavy embroidered Pima lawn kurta in shocking pink on lemon" },
  { src: "/products/sbf-hk-020.jpg", alt: "Heavy embroidered Pima lawn kurta in peach" },
];

export default function InstagramGrid() {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      {POSTS.map((post) => (
        <a
          key={post.src}
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${post.alt} — view on Instagram`}
          className="group relative aspect-square rounded-lg overflow-hidden bg-petal focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
        >
          <Image
            src={post.src}
            alt={post.alt}
            fill
            sizes="(max-width: 768px) 33vw, 200px"
            className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105"
          />
          {/* Hover veil */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-rose/0 group-hover:bg-rose/20 transition-colors motion-reduce:transition-none"
          />
        </a>
      ))}
    </div>
  );
}
