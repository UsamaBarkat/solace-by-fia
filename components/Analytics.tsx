import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/* GA4 via the official gtag.js setup. Renders nothing unless NEXT_PUBLIC_GA_ID is set
   (so dev builds, which don't load .env.production, stay analytics-free). */
export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
