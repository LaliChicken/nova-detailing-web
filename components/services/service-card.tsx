import Link from "next/link";
import type { ServicePackage } from "@/types/service";

export function ServiceCard({ service }: { service: ServicePackage }) {
  return (
    <article
      className={`card service-card${service.popular ? " featured" : ""}`}
      data-reveal="up"
    >
      {service.popular && <span className="ribbon">Most requested</span>}

      <p className="eyebrow">Detail package</p>
      <h3>{service.name}</h3>

      <p className="price">
        ${service.price}
        <span className="price-suffix">flat</span>
      </p>

      <p className="muted">{service.description}</p>

      {service.features.length > 0 && (
        <ul className="feature-list">
          {service.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      )}

      <Link href={`/quote?service=${service.id}`} className="button secondary service-card-cta">
        Request this service
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
