import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { ServiceArea } from "@/components/home/service-area";
import { Ticker } from "@/components/home/ticker";
import { ServiceCard } from "@/components/services/service-card";
import { services } from "@/data/services";
import { listGalleryJobs, listReviews } from "@/lib/aws/content";
import { callHref, siteConfig, smsHref } from "@/lib/site";

export const dynamic = "force-dynamic";

const advantages = [
  {
    title: "Mobile service",
    text: "NOVA comes to your location — home, office, or curbside.",
    icon: "M3 16V8h11v8M14 11h4l3 4v1h-7M6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  },
  {
    title: "Clear pricing",
    text: "Detail packages from $70, with no size or condition surcharges.",
    icon: "M20.6 12.6L12 4H4v8l8.6 8.6a2 2 0 002.8 0l5.2-5.2a2 2 0 000-2.8zM7.5 7.5h.01",
  },
  {
    title: "Bay Area",
    text: "Service from San Francisco all the way down to San Jose.",
    icon: "M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  },
  {
    title: "Direct contact",
    text: "Text or call NOVA directly — no call centers, no bots.",
    icon: "M21 12a8 8 0 11-3.2-6.4M21 5v4h-4",
  },
];

export default async function HomePage() {
  const [gallery, reviews] = await Promise.all([listGalleryJobs(), listReviews()]);
  const featuredGallery = gallery.filter((item) => item.featured).slice(0, 3);
  const featuredReviews = reviews.filter((item) => item.featured).slice(0, 3);

  return (
    <>
      <Hero />
      <Ticker />

      <section className="section">
        <div className="site-shell">
          <div className="section-header" data-reveal="up">
            <p className="eyebrow">Services</p>
            <h2>Clear package pricing.</h2>
            <p className="muted">
              Package prices do not increase based on vehicle size or condition.
            </p>
          </div>

          <div className="grid grid-4" data-reveal-stagger="110">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="button-row" data-reveal="up">
            <Link href="/services" className="button secondary">
              View all services
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-shell">
          <div className="section-header" data-reveal="up">
            <p className="eyebrow">Why NOVA</p>
            <h2>Built around convenience and direct communication.</h2>
          </div>

          <div className="grid grid-4" data-reveal-stagger="110">
            {advantages.map((advantage) => (
              <div className="card advantage-card" key={advantage.title} data-reveal="swoosh">
                <span className="icon-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={advantage.icon} />
                  </svg>
                </span>
                <h3>{advantage.title}</h3>
                <p className="muted">{advantage.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-shell">
          <div className="section-header" data-reveal="up">
            <p className="eyebrow">Gallery</p>
            <h2>Real work, including before-and-after results.</h2>
          </div>

          {featuredGallery.length ? (
            <div className="grid grid-3" data-reveal-stagger="120">
              {featuredGallery.map((job) => (
                <article className="card" key={job.id} data-reveal="zoom">
                  <h3>{job.title}</h3>
                  {job.vehicle && <p>{job.vehicle}</p>}
                  <p className="muted">
                    Gallery imagery will render here once uploaded through the admin CMS.
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="card muted" data-reveal="zoom">
              Featured gallery work will appear here after NOVA uploads its first entries.
            </div>
          )}

          <div className="button-row" data-reveal="up">
            <Link className="button secondary" href="/gallery">
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      <HowItWorks />
      <ServiceArea />

      {featuredReviews.length > 0 && (
        <section className="section">
          <div className="site-shell">
            <div className="section-header" data-reveal="up">
              <p className="eyebrow">Reviews</p>
              <h2>What customers say.</h2>
            </div>

            <div className="grid grid-3" data-reveal-stagger="120">
              {featuredReviews.map((review) => (
                <blockquote className="card review-card" key={review.id} data-reveal="up">
                  <span className="quote-mark" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p>{review.text}</p>
                  <footer className="muted">— {review.customerName}</footer>
                </blockquote>
              ))}
            </div>

            <div className="button-row" data-reveal="up">
              <Link className="button secondary" href="/reviews">
                See Customer Reviews
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section section-flush">
        <div className="site-shell">
          <div className="cta-panel" data-reveal="zoom">
            <span className="cta-glow" aria-hidden="true" />
            <p className="eyebrow">Get started</p>
            <h2>Ready to get your car detailed?</h2>
            <p className="muted">
              Tell us what you need, or text NOVA directly for the fastest response.
            </p>
            <div className="button-row">
              <Link href="/quote" className="button">
                Request a Quote
              </Link>
              <a href={smsHref} className="button secondary">
                Text {siteConfig.phoneDisplay}
              </a>
              <a href={callHref} className="button secondary">
                Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
