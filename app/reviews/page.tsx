import type { Metadata } from "next";
import { getAllReviews } from "@/lib/products";
import ReviewCard from "@/components/ReviewCard";

export const metadata: Metadata = {
  title: "Reviews — Solace by Fia",
  description:
    "What our customers say about Solace by Fia — handcrafted suits, kurtas and chaddars, reviewed by the women who wear them.",
};

export default function ReviewsPage() {
  const reviews = getAllReviews();
  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="text-center mb-10 max-w-2xl mx-auto">
        <p className="font-body text-xs uppercase tracking-widest text-ink/40 mb-1">
          Customer love
        </p>
        <h1 className="font-display text-4xl text-ink mb-3">Reviews</h1>
        <p className="font-body text-sm text-ink/60">
          Rated {average.toFixed(1)} out of 5 across {reviews.length} reviews — every
          one from a real WhatsApp order.
        </p>
      </header>

      <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.name}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
}
