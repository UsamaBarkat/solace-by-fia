export default function Home() {
  return (
    <main className="min-h-screen bg-white p-12 flex flex-col gap-10 max-w-xl">

      {/* 1 — Fraunces heading (font-display) on white background */}
      <h1 className="font-display text-5xl text-ink leading-tight">
        Solace by Fia
      </h1>

      {/* 2 — Inter body (font-body) */}
      <p className="font-body text-lg text-ink leading-relaxed">
        Women&rsquo;s clothing — unstitched, stitched, chaddar. Handcrafted with
        care; each piece tells a story of artisan craftsmanship.
      </p>

      {/* 3 — Rose colour swatch: bg-rose should be #A23E5F (deep pinkish-red) */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-rose flex-shrink-0" />
        <div>
          <p className="font-body font-semibold text-ink">bg-rose</p>
          <p className="font-body text-sm text-ink opacity-60">#A23E5F — deep rose brand accent</p>
        </div>
      </div>

      {/* 4 — rose button (full bg-rose + text-white) */}
      <div>
        <span className="bg-rose text-white font-body font-medium px-6 py-3 rounded-full inline-block">
          Order on WhatsApp
        </span>
      </div>

      {/* 5 — petal + blossom swatches */}
      <div className="flex gap-3">
        <div className="flex-1 bg-petal rounded-lg p-4 font-body text-sm text-ink">
          bg-petal
        </div>
        <div className="flex-1 bg-blossom rounded-lg p-4 font-body text-sm text-ink">
          bg-blossom
        </div>
      </div>

    </main>
  );
}
