import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingPetals from "@/components/FloatingPetals";
import WhatsAppButton from "@/components/WhatsAppButton";

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

export const metadata: Metadata = {
  title: "Solace by Fia",
  description: "Women's clothing — unstitched, stitched, chaddar",
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
      </body>
    </html>
  );
}
