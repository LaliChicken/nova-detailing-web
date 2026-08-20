import Link from "next/link";
import { HeroVehicle } from "@/components/home/hero-vehicle";
import { smsHref } from "@/lib/site";

const stats = [
  ["From $70", "Flat package pricing"],
  ["1–4 hrs", "Typical service window"],
  ["SF → SJ", "Bay Area coverage"],
  ["Text first", "Direct line to NOVA"],
];

export function Hero() {
  return (
    <section className="section section-flush hero">
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-orb orb-1" />
        <span className="hero-orb orb-2" />
        <span className="hero-beam" />
      </div>

      <div className="site-shell hero-grid">
        <div className="hero-copy">
          <p className="badge enter" style={{ "--enter-delay": "80ms" } as React.CSSProperties}>
            <span className="dot" />
            Now booking across the Bay
          </p>

          <h1 className="enter" style={{ "--enter-delay": "180ms" } as React.CSSProperties}>
            Professional mobile detailing, <span className="shine-text">brought to you.</span>
          </h1>

          <p
            className="hero-lede enter"
            style={{ "--enter-delay": "300ms" } as React.CSSProperties}
          >
            Interior and exterior detailing across the Bay Area, from San Francisco to San Jose. We
            arrive with everything needed — you keep your day.
          </p>

          <div className="button-row enter" style={{ "--enter-delay": "400ms" } as React.CSSProperties}>
            <Link href="/quote" className="button">
              Request a Quote
            </Link>
            <a href={smsHref} className="button secondary">
              Text Us
            </a>
          </div>

          <dl className="hero-stats enter" style={{ "--enter-delay": "520ms" } as React.CSSProperties}>
            {stats.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-visual enter" style={{ "--enter-delay": "300ms" } as React.CSSProperties}>
          <span className="hero-orbit" aria-hidden="true" />
          <div className="hero-stage">
            <HeroVehicle />
          </div>
          <span className="hero-chip chip-1">Interior + Exterior</span>
          <span className="hero-chip chip-2">Paint correction</span>
          <span className="hero-chip chip-3">We come to you</span>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue-label">Scroll</span>
        <span className="scroll-cue-track">
          <span className="scroll-cue-dot" />
        </span>
      </div>
    </section>
  );
}
