import type { Product } from "@/lib/products";

const WA_NUMBER = "923143083863";

export function buildWhatsAppLink(product?: Product): string {
  const message = product
    ? `Assalam o Alaikum! I'm interested in:\n${product.name} (${product.code}) — PKR ${product.salePrice ?? product.price}.\nIs this available?`
    : `Assalam o Alaikum! I'd like to find out more about Solace by Fia's collections. What's currently available?`;

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
