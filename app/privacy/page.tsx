import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <section className="section page-hero">
      <div className="site-shell max-w-3xl">
        <p className="eyebrow enter">Privacy</p>
        <h1 className="enter" style={{ "--enter-delay": "100ms" } as React.CSSProperties}>
          Privacy <span className="shine-text">policy</span>
        </h1>
        <p className="muted enter" style={{ "--enter-delay": "200ms" } as React.CSSProperties}>
          Draft placeholder. Before launch, this page must be replaced with the final policy
          describing how NOVA collects, uses, stores, retains, and deletes customer contact
          information, vehicle details, locations, and uploaded photos.
        </p>

        <div className="stack" data-reveal-stagger="90">
          <div data-reveal="up">
            <h2>Information collected</h2>
            <p>
              Name, phone number, email address, vehicle information, service location, requested
              services, messages, and optional vehicle photographs.
            </p>
          </div>
          <div data-reveal="up">
            <h2>Purpose</h2>
            <p>
              Information is used to evaluate quote requests, contact customers, schedule detailing
              services, and operate the business.
            </p>
          </div>
          <div data-reveal="up">
            <h2>Photo retention</h2>
            <p>
              Quote-request photos are currently configured for automatic deletion from storage
              after 90 days. This value can be changed in the infrastructure configuration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
