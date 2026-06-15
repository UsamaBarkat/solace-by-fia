import type { Metadata } from "next";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact — Solace by Fia",
  description:
    "Get in touch with Solace by Fia — order on WhatsApp or find us on Instagram and Facebook.",
};

const SOCIALS = [
  {
    label: "WhatsApp",
    handle: "0314 3083863",
    note: "Fastest way to order — we usually reply within the hour.",
    href: buildWhatsAppLink(),
  },
  {
    label: "WhatsApp Community",
    handle: "Join the group",
    note: "First looks at new arrivals, restocks and sale alerts.",
    href: "https://chat.whatsapp.com/ItHe8FGLBqIALfrpM9m9yO",
  },
  {
    label: "Instagram",
    handle: "@solacebyfia",
    note: "New arrivals, behind-the-scenes and styling ideas.",
    href: "https://www.instagram.com/solacebyfia",
  },
  {
    label: "Facebook",
    handle: "Solace by Fia",
    note: "Collection updates and announcements.",
    href: "https://www.facebook.com/share/17oXZL8cFD/",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="text-center mb-10">
        <p className="font-body text-xs uppercase tracking-widest text-ink/70 mb-1">
          Get in touch
        </p>
        <h1 className="font-display text-4xl text-ink mb-3">Contact</h1>
        <p className="font-body text-sm text-ink/70 max-w-md mx-auto">
          No forms, no waiting — message us directly and a real person (usually Fia
          herself) will reply.
        </p>
      </header>

      <ul role="list" className="space-y-4">
        {SOCIALS.map(({ label, handle, note, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-white border border-petal rounded-2xl px-6 py-5 hover:border-rose transition-colors focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
            >
              <div>
                <p className="font-display text-lg text-ink group-hover:text-rose transition-colors">
                  {label}
                </p>
                <p className="font-body text-sm font-medium text-rose">{handle}</p>
                <p className="font-body text-sm text-ink/70 mt-0.5">{note}</p>
              </div>
              <span
                aria-hidden="true"
                className="text-rose text-xl transition-transform motion-reduce:transition-none group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 bg-petal/60 rounded-2xl px-6 py-6">
        <p className="font-body text-xs uppercase tracking-widest text-ink/70 mb-3 text-center">
          Delivery &amp; ordering
        </p>
        <ul role="list" className="space-y-2 max-w-md mx-auto">
          <li className="font-body text-sm text-ink/80 flex gap-2">
            <span aria-hidden="true" className="text-rose">•</span>
            Shipping all over Pakistan via <span className="font-medium">TCS</span>.
          </li>
          <li className="font-body text-sm text-ink/80 flex gap-2">
            <span aria-hidden="true" className="text-rose">•</span>
            Delivery in <span className="font-medium">7–9 days</span>.
          </li>
          <li className="font-body text-sm text-ink/80 flex gap-2">
            <span aria-hidden="true" className="text-rose">•</span>
            Flat delivery charge of <span className="font-medium">Rs 200</span> nationwide.
          </li>
          <li className="font-body text-sm text-ink/80 flex gap-2">
            <span aria-hidden="true" className="text-rose">•</span>
            Send the product name or code on WhatsApp and we&rsquo;ll confirm
            availability, price and delivery.
          </li>
        </ul>
      </div>
    </div>
  );
}
