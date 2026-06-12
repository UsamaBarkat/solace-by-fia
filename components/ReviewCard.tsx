import Image from "next/image";
import type { Review } from "@/lib/products";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="bg-white rounded-2xl border border-petal p-6 flex flex-col gap-3 h-full">
      <Stars rating={review.rating} />
      <blockquote className="font-body text-sm text-ink/70 leading-relaxed flex-1">
        &ldquo;{review.comment}&rdquo;
      </blockquote>
      {review.photo && (
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-petal">
          <Image
            src={review.photo}
            alt={`Photo shared by ${review.name} with her review`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <figcaption className="font-body text-sm font-semibold text-ink">
        {review.name}
      </figcaption>
    </figure>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          width="16"
          height="16"
          aria-hidden="true"
          className={i <= rating ? "fill-rose" : "fill-blossom/50"}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
