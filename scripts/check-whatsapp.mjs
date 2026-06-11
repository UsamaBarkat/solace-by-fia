// Smoke-check for buildWhatsAppLink logic.
// Run with: node scripts/check-whatsapp.mjs
// Mirrors lib/whatsapp.ts exactly — edit both if the format changes.

const WA_NUMBER = "923143083863";

function buildWhatsAppLink(product) {
  const message = product
    ? `Assalam o Alaikum! I'm interested in:\n${product.name} (${product.code}) — PKR ${product.salePrice ?? product.price}.\nIs this available?`
    : `Assalam o Alaikum! I'd like to find out more about Solace by Fia's collections. What's currently available?`;

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Case 1: product with a salePrice — should use salePrice (3800), not price (4500)
const withSale = {
  code: "SBF-LWN-001",
  name: "3 Piece Embroidered Lawn Suit",
  price: 4500,
  salePrice: 3800,
};

// Case 2: product with no salePrice — should use price (3200)
const noSale = {
  code: "SBF-LWN-002",
  name: "3 Piece Digital Print Lawn Suit",
  price: 3200,
};

// Case 3: no product — generic sticky-button message
const generic = undefined;

console.log("── Case 1: product with sale price ─────────────────────────");
console.log(buildWhatsAppLink(withSale));
console.log();
console.log("── Case 2: product without sale price ───────────────────────");
console.log(buildWhatsAppLink(noSale));
console.log();
console.log("── Case 3: generic (sticky button, no product) ──────────────");
console.log(buildWhatsAppLink(generic));
