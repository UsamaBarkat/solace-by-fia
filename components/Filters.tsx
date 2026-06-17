"use client";

export interface FilterState {
  pieceCount: string;
  inStockOnly: boolean;
}

interface FiltersProps {
  /** Piece-count values present in the data, e.g. ["1pc","2pc"] — "All" is prepended. */
  pieceCounts: string[];
  value: FilterState;
  onChange: (f: FilterState) => void;
}

const BASE_FOCUS = "focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2";

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`font-body text-sm px-4 py-2 rounded-full border transition-colors cursor-pointer ${BASE_FOCUS} ${
        active
          ? "bg-rose text-white border-rose"
          : "bg-white border-blossom text-ink hover:border-rose hover:text-rose"
      }`}
    >
      {children}
    </button>
  );
}

export default function Filters({ pieceCounts, value, onChange }: FiltersProps) {
  const set = (patch: Partial<FilterState>) => onChange({ ...value, ...patch });
  const isDefault = value.pieceCount === "all" && !value.inStockOnly;

  const options = [{ value: "all", label: "All" }, ...pieceCounts.map((p) => ({ value: p, label: p }))];

  return (
    <div className="bg-petal/60 rounded-2xl px-5 py-5 space-y-5">
      {/* Piece count — primary Shop filter */}
      <fieldset>
        <legend className="font-body text-xs uppercase tracking-widest text-ink/70 mb-2.5">
          Pieces
        </legend>
        <div className="flex flex-wrap gap-2">
          {options.map(({ value: v, label }) => (
            <Pill key={v} active={value.pieceCount === v} onClick={() => set({ pieceCount: v })}>
              {label}
            </Pill>
          ))}
        </div>
      </fieldset>

      {/* In-stock toggle + Clear all */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={value.inStockOnly}
            onChange={(e) => set({ inStockOnly: e.target.checked })}
            className="peer sr-only"
          />
          {/* visual toggle track — carries the focus ring for the sr-only checkbox */}
          <span
            aria-hidden="true"
            className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-rose peer-focus-visible:outline-offset-2 ${
              value.inStockOnly ? "bg-rose" : "bg-blossom/60"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                value.inStockOnly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </span>
          <span className="font-body text-sm text-ink">In stock only</span>
        </label>

        {!isDefault && (
          <button
            type="button"
            onClick={() => onChange({ pieceCount: "all", inStockOnly: false })}
            className={`font-body text-xs text-rose underline underline-offset-2 hover:no-underline ${BASE_FOCUS}`}
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
