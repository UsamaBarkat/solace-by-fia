"use client";

/* ============================================================================
 * VACATION POPUP — TEMPORARY
 * ----------------------------------------------------------------------------
 * A one-per-session modal announcing the vacation closure.
 * To REMOVE when vacation ends: delete this file and remove the <VacationPopup />
 * line (and its import) from app/layout.tsx. Nothing else references it.
 * ==========================================================================*/

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "solace-vacation-popup-seen";
const WHATSAPP_URL = "https://wa.me/923143083863";

export default function VacationPopup() {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false); // drives the entrance transition
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Show once per browser session (sessionStorage). Persists across page
  // navigations within the tab; reappears on a fresh visit / new tab.
  useEffect(() => {
    try {
      if (!sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setOpen(true);
      }
    } catch {
      // sessionStorage unavailable (e.g. privacy mode) — show once anyway
      setOpen(true);
    }
  }, []);

  // Entrance transition + focus + scroll lock + Escape-to-close while open.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    closeButtonRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 motion-reduce:transition-none ${
        entered ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Overlay — click to dismiss */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="vacation-title"
        aria-describedby="vacation-message"
        className={`relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-blossom/40 transition-all duration-300 motion-reduce:transition-none ${
          entered ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close (X) */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-ink/50 transition-colors hover:text-rose focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="5" y1="5" x2="15" y2="15" />
            <line x1="15" y1="5" x2="5" y2="15" />
          </svg>
        </button>

        <h2 id="vacation-title" className="font-display text-3xl text-ink">
          <span aria-hidden="true">🌸</span> We&rsquo;re on vacation!
        </h2>

        <p className="mt-3 font-body text-sm font-semibold uppercase tracking-widest text-rose">
          Closed until 20 July 2026
        </p>

        <p id="vacation-message" className="mt-4 font-body text-base leading-relaxed text-ink/70">
          You can still message us on WhatsApp — we&rsquo;ll respond as soon as we&rsquo;re
          back <span aria-hidden="true">❤️</span>
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-rose px-6 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-rose/90 active:scale-95 motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
          >
            Message on WhatsApp
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-full border border-rose px-6 py-3 font-body text-sm font-semibold text-rose transition-colors hover:bg-petal focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
