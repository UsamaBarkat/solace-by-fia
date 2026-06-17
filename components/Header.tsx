"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/",              label: "Home" },
  { href: "/new-arrivals",  label: "New Arrivals" },
  { href: "/shop",          label: "Shop" },
  { href: "/clearance",     label: "Clearance" },
  { href: "/reviews",       label: "Reviews" },
  { href: "/contact",       label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-petal">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Solace by Fia — home"
          className="rounded focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
        >
          <Image
            src="/solace-logo-wordmark.png"
            alt="Solace by Fia"
            width={157}
            height={56}
            priority
            className="h-11 w-auto md:h-14"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-body text-sm tracking-wide transition-colors hover:text-rose focus-visible:outline-2 focus-visible:outline-rose ${
                isActive(href) ? "text-rose" : "text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 -mr-2 text-ink rounded focus-visible:outline-2 focus-visible:outline-rose"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <><line x1="4" y1="4" x2="18" y2="18" /><line x1="18" y1="4" x2="4" y2="18" /></>
            ) : (
              <><line x1="2" y1="6"  x2="20" y2="6"  /><line x1="2" y1="11" x2="20" y2="11" /><line x1="2" y1="16" x2="20" y2="16" /></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="md:hidden border-t border-petal bg-white/95">
          <ul className="flex flex-col py-1">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3 font-body text-sm tracking-wide transition-colors hover:text-rose hover:bg-petal focus-visible:outline-2 focus-visible:outline-rose ${
                    isActive(href) ? "text-rose bg-petal/40" : "text-ink"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
