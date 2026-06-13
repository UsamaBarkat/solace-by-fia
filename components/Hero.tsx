import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Hero({ product }: { product: Product }) {
  return (
    <section className="bg-petal/50">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid gap-10 md:grid-cols-2 md:items-center">

        {/* Copy */}
        <div className="space-y-6 text-center md:text-left">
          <p className="font-body text-xs uppercase tracking-widest text-rose">
            Made with love · Supporting local artisans
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
            Handcrafted elegance,
            <br />
            stitched with <span className="text-rose">solace</span>
          </h1>
          <p className="font-body text-base text-ink/70 leading-relaxed max-w-md mx-auto md:mx-0">
            Hand-embroidered kurtas — unstitched and ready-to-wear — and heirloom
            chaddars, each piece made to be loved for years.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link
              href="/shop"
              className="bg-rose text-white font-body font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-rose/90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
            >
              Shop Now
            </Link>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-rose border border-rose font-body font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-petal active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Garment image */}
        <div className="relative aspect-[3/4] max-w-sm w-full mx-auto rounded-2xl overflow-hidden bg-blossom/30">
          <Image
            src={product.images.front}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
