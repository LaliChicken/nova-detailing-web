import type { Metadata } from "next";
import { ServiceCard } from "@/components/services/service-card";
import { addOns, services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "NOVA Detailing mobile detailing packages and add-ons.",
};

const facts = [
  ["Duration", "Approximately 1–4 hours."],
  ["Service area", "San Francisco to San Jose."],
  ["Customer provides", "Water and electricity."],
  ["Payment", "Zelle, Venmo, or cash."],
];

export default function ServicesPage() {
  return (
    <>
      <section className="section page-hero section-flush">
        <div className="site-shell">
          <p className="eyebrow enter">Services</p>
          <h1 className="enter" style={{ "--enter-delay": "100ms" } as React.CSSProperties}>
            Detailing <span className="shine-text">services</span>
          </h1>
          <p
            className="muted max-w-2xl enter"
            style={{ "--enter-delay": "200ms" } as React.CSSProperties}
          >
            Professional mobile detailing throughout the Bay Area. Package prices do not increase
            based on vehicle size or condition.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="site-shell grid grid-2" data-reveal-stagger="110">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="site-shell">
          <div className="section-header" data-reveal="up">
            <p className="eyebrow">Add-ons</p>
            <h2>Additional services</h2>
          </div>
          <div className="grid grid-2" data-reveal-stagger="120">
            {addOns.map((addOn) => (
              <article className="card" key={addOn.id} data-reveal="swoosh">
                <h3>{addOn.name}</h3>
                <p className="price">{addOn.priceLabel}</p>
                <p className="muted">{addOn.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-shell grid grid-4" data-reveal-stagger="90">
          {facts.map(([title, text]) => (
            <div className="card" key={title} data-reveal="up">
              <h3>{title}</h3>
              <p className="muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="site-shell max-w-3xl" data-reveal="left">
          <p className="eyebrow">Policies</p>
          <h2>Cancellation and rescheduling</h2>
          <p>Cancellation fee: $20.</p>
          <p className="muted">
            Rescheduling requires $20. Final wording will be updated once NOVA confirms whether this
            is a fee or a deposit credited toward service.
          </p>
        </div>
      </section>
    </>
  );
}
