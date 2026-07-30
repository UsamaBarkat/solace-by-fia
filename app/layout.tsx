import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingPetals from "@/components/FloatingPetals";
import WhatsAppButton from "@/components/WhatsAppButton";
import Analytics from "@/components/Analytics";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_NAME = "Solace by Fia";
const SITE_DESCRIPTION =
  "Hand-embroidered women's clothing — kurtas made with love in Pakistan. Order on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL("https://solace-by-fia.vercel.app"),
  // Pages set their own full "<Page> — Solace by Fia" titles, so no template here.
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Solace by Fia",
    "Pakistani women's clothing",
    "hand-embroidered kurta",
    "Pima lawn kurta",
    "unstitched",
    "WhatsApp order",
  ],
  icons: { icon: "/solace-logo-full.png" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/solace-logo-full.png",
        width: 800,
        height: 797,
        alt: "Solace by Fia",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/solace-logo-full.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">
        {/* Petals sit at z-0 behind everything */}
        <FloatingPetals />

        {/* Content wrapper lifted above petals */}
        <div className="relative flex flex-col min-h-screen" style={{ zIndex: 1 }}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        {/* Sticky WhatsApp button — fixed, always on top */}
        <WhatsAppButton />

        {/* GA4 (loads only when NEXT_PUBLIC_GA_ID is set) */}
        <Analytics />
      </body>
    </html>
  );
}
