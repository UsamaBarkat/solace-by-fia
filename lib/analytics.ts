declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/* Fires a GA4 `whatsapp_order_click` event. Include the product code/name where known
   (per-product button); omit them for the generic sticky button. No-op if GA isn't loaded. */
export function trackWhatsAppOrderClick(product?: { code?: string; name?: string }): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "whatsapp_order_click", {
    product_code: product?.code,
    product_name: product?.name,
  });
}
