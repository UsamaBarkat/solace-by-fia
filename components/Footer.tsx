import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-petal bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3">

        {/* Brand */}
        <div className="flex flex-col gap-2">
          <span className="font-display text-lg text-rose">Solace by Fia</span>
          <p className="font-body text-sm text-ink/70 leading-relaxed max-w-xs">
            Handcrafted women&rsquo;s clothing — unstitched, stitched &amp; chaddar.
            Supporting local artisans.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-3">
          <p className="font-body text-xs uppercase tracking-widest text-ink/70">Explore</p>
          <nav aria-label="Footer navigation" className="flex flex-col gap-1.5">
            {[
              { href: "/shop",    label: "Shop" },
              { href: "/about",   label: "About" },
              { href: "/reviews", label: "Reviews" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-sm text-ink/70 hover:text-rose transition-colors focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Socials + policy placeholders */}
        <div className="flex flex-col gap-3">
          <p className="font-body text-xs uppercase tracking-widest text-ink/70">Connect</p>
          <div className="flex flex-col gap-1.5">
            <a href="https://instagram.com/solacebyfia" target="_blank" rel="noopener noreferrer"
               className="font-body text-sm text-ink/70 hover:text-rose transition-colors focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2">
              Instagram
            </a>
            <a href="https://facebook.com/solacebyfia" target="_blank" rel="noopener noreferrer"
               className="font-body text-sm text-ink/70 hover:text-rose transition-colors focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2">
              Facebook
            </a>
            <a href="https://wa.me/923143083863" target="_blank" rel="noopener noreferrer"
               className="font-body text-sm text-ink/70 hover:text-rose transition-colors focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2">
              WhatsApp
            </a>
          </div>
          <div className="flex flex-col gap-1.5 mt-2">
            <span className="font-body text-xs text-ink/70">Privacy Policy</span>
            <span className="font-body text-xs text-ink/70">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-petal">
        <p className="max-w-6xl mx-auto px-4 py-4 font-body text-xs text-ink/70 text-center">
          © {new Date().getFullYear()} Solace by Fia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
