import type { Metadata } from "next";
import { listReviews } from "@/lib/aws/content";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Customer reviews for NOVA Detailing.",
};

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const reviews = await listReviews();

  return (
    <section className="section page-hero">
      <div className="site-shell">
        <div className="section-header">
          <p className="eyebrow enter">Reviews</p>
          <h1 className="enter" style={{ "--enter-delay": "100ms" } as React.CSSProperties}>
            Customer <span className="shine-text">reviews</span>
          </h1>
          <p className="muted enter" style={{ "--enter-delay": "200ms" } as React.CSSProperties}>
            Reviews are published manually by NOVA Detailing.
          </p>
        </div>

        {reviews.length ? (
          <div className="grid grid-3" data-reveal-stagger="110">
            {reviews.map((review) => (
              <blockquote className="card review-card" key={review.id} data-reveal="up">
                <span className="quote-mark" aria-hidden="true">
                  &ldquo;
                </span>
                {review.rating && (
                  <p className="stars" aria-label={`${review.rating} out of 5 stars`}>
                    {"★".repeat(review.rating)}
                  </p>
                )}
                <p>{review.text}</p>
                <footer className="muted">
                  — {review.customerName}
                  {review.vehicle ? `, ${review.vehicle}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="card muted" data-reveal="zoom">
            Customer reviews will appear here once NOVA publishes them.
          </div>
        )}
      </div>
    </section>
  );
}
