import Image from "next/image";

const IG_URL = "https://instagram.com/solacebyfia";

/* Curated static grid (spec §1.4: no live Instagram API in v1).
   Images live in /public/instagram/; every tile links to the profile. */
const POSTS = [
  { src: "/instagram/post-1.jpg", alt: "Pink fabric with tone-on-tone rose embroidery" },
  { src: "/instagram/post-2.jpg", alt: "Navy kurta with white and pink floral embroidery" },
  { src: "/instagram/post-3.jpg", alt: "Pink kurta embroidered with teal florals" },
  { src: "/instagram/post-4.jpg", alt: "Off-white fabric with wisteria-purple floral sprays" },
  { src: "/instagram/post-5.jpg", alt: "Sage kurta fabric with coral floral vines" },
  { src: "/instagram/post-6.jpg", alt: "Periwinkle-blue kurta with violet floral embroidery" },
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
