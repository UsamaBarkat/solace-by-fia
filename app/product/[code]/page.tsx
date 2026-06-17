import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAll, getByCode, getRelated } from "@/lib/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import ProductGallery from "@/components/ProductGallery";
import Accordion from "@/components/Accordion";
import ProductGrid from "@/components/ProductGrid";

type Props = { params: Promise<{ code: string }> };

export function generateStaticParams() {
  return getAll().map((p) => ({ code: p.code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const product = getByCode(code);
  if (!product) return {};
  return {
    title: `${product.name} — Solace by Fia`,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductPage({ params }: Props) {
  const { code } = await params;
  const product = getByCode(code);
  if (!product) notFound();

  const related = getRelated(product, 4);
  const waLink  = buildWhatsAppLink(product);

  return (
    <>
      {/* ── Main product section ────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-body text-xs text-ink/70">
          <Link href="/" className="hover:text-rose transition-colors">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/shop" className="hover:text-rose transition-colors">Shop</Link>
          <span aria-hidden="true">›</span>
          <span className="text-ink/70 truncate max-w-[140px]">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Info column */}
          <div className="space-y-6">

            {/* Name + code */}
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-ink/70 mb-1">
                {product.collection}
              </p>
              <h1 className="font-display text-3xl text-ink leading-snug mb-1">
                {product.name}
              </h1>
              <p className="font-body text-xs text-ink/70 tracking-wide">
                Code: <span className="font-medium">{product.code}</span>
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              {product.salePrice ? (
                <>
                  <span className="font-display text-3xl text-rose">
                    PKR {product.salePrice.toLocaleString()}
                  </span>
                  <span className="font-body text-lg text-ink/70 line-through">
                    PKR {product.price.toLocaleString()}
                  </span>
                  <span className="font-body text-xs font-semibold text-rose bg-rose/10 px-2 py-0.5 rounded-full">
                    Save PKR {(product.price - product.salePrice).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="font-display text-3xl text-ink">
                  PKR {product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Meta grid */}
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-y border-blossom/40 py-5">
              <div>
                <dt className="font-body text-xs uppercase tracking-widest text-ink/70 mb-0.5">Fabric</dt>
                <dd className="font-body text-sm text-ink">{product.fabric}</dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-widest text-ink/70 mb-0.5">Pieces</dt>
                <dd className="font-body text-sm text-ink">{product.pieces}</dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-widest text-ink/70 mb-0.5">Piece Count</dt>
                <dd className="font-body text-sm text-ink">{product.pieceCount}</dd>
              </div>
              <div>
                <dt className="font-body text-xs uppercase tracking-widest text-ink/70 mb-0.5">Availability</dt>
                <dd className="flex items-center gap-1.5">
                  <span
                    className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                      product.inStock ? "bg-green-500" : "bg-ink/25"
                    }`}
                    aria-hidden="true"
                  />
                  <span className={`font-body text-sm ${product.inStock ? "text-green-700" : "text-ink/70"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </dd>
              </div>
            </dl>

            {/* Description */}
            <p className="font-body text-sm text-ink/70 leading-relaxed">
              {product.description}
            </p>

            {/* Badges */}
            {product.badges && product.badges.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label="Product labels">
                {product.badges.map((b) => (
                  <li
                    key={b}
                    className={`font-body text-xs font-semibold px-3 py-1 rounded-full ${
                      b === "Sale" ? "bg-rose text-white" : "bg-petal text-ink"
                    }`}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {/* WhatsApp CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${product.name} on WhatsApp`}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-rose text-white font-body font-semibold text-sm hover:bg-rose/90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
            >
              <WhatsAppIcon />
              {product.inStock ? "Order on WhatsApp" : "Enquire on WhatsApp"}
            </a>

            {/* Accordions */}
            <div className="border-t border-blossom/50">
              <Accordion title="Size Guide">
                <p>
                  Our unstitched kurta fabrics come in generous standard cuts for your tailor.
                  For stitched pieces, sizes run S–XL — please mention your size when ordering.
                  Approximate chest measurements: S 34–36&quot;, M 36–38&quot;, L 38–40&quot;, XL 40–42&quot;.
                </p>
                <p className="mt-2">
                  Unsure? WhatsApp us your measurements and we&apos;ll advise the best fit before
                  you order.
                </p>
              </Accordion>

              <Accordion title="Delivery">
                <p>
                  We ship all over Pakistan via TCS. Delivery time: 7–9 working days.
                </p>
                <p className="mt-2">
                  Flat delivery charge of PKR 200 nationwide, confirmed when you place your
                  order via WhatsApp.
                </p>
              </Accordion>

              <Accordion title="Returns & Exchanges">
                <p>
                  <span className="font-medium">Returns &amp; Exchange Policy</span> (Exchange
                  only — no refunds).
                </p>
                <ol className="mt-2 list-decimal pl-5 space-y-1.5">
                  <li>
                    Exchange is valid within 3 days of purchase, on a valid reason, after the
                    case is checked and confirmed.
                  </li>
                  <li>
                    For an exchange, the customer is responsible for all shipping and handling
                    costs.
                  </li>
                  <li>
                    Exchanges are issued as Solace Cash — you can purchase anything of the same
                    or higher value.
                  </li>
                  <li>Unstitched articles, once stitched, cannot be exchanged.</li>
                  <li>Discounted items cannot be returned or exchanged.</li>
                </ol>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related products ────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-petal/40 py-12 mt-4">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-display text-2xl text-ink mb-6">You may also like</h2>
            <ProductGrid products={related} maxCols={4} />
          </div>
        </section>
      )}
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
