interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  return (
    <details className="group border-b border-blossom/50" open={defaultOpen}>
      <summary className="flex items-center justify-between py-4 cursor-pointer font-body font-medium text-sm text-ink hover:text-rose transition-colors focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2">
        {title}
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          className="flex-shrink-0 transition-transform duration-200 motion-reduce:transition-none group-open:rotate-180"
        >
          <path d="M3 6l5 5 5-5" />
        </svg>
      </summary>
      <div className="pb-5 font-body text-sm text-ink/70 leading-relaxed">
        {children}
      </div>
    </details>
  );
}
