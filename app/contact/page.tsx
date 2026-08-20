import type { Metadata } from "next";
import Link from "next/link";
import { callHref, siteConfig, smsHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Text, call, or request a quote from NOVA Detailing.",
};

export default function ContactPage() {
  return (
    <section className="section page-hero">
      <div className="site-shell max-w-3xl">
        <p className="badge enter">
          <span className="dot" />
          Usually replies within the hour
        </p>
        <h1 className="enter" style={{ "--enter-delay": "100ms" } as React.CSSProperties}>
          Contact <span className="shine-text">NOVA Detailing</span>
        </h1>
        <p className="muted enter" style={{ "--enter-delay": "200ms" } as React.CSSProperties}>
          For the fastest response, send us a text.
        </p>

        <div className="button-row enter" style={{ "--enter-delay": "300ms" } as React.CSSProperties}>
          <a className="button" href={smsHref}>
            Text {siteConfig.phoneDisplay}
          </a>
          <a className="button secondary" href={callHref}>
            Call
          </a>
          <Link className="button secondary" href="/quote">
            Request a Quote
          </Link>
        </div>

        <div className="grid grid-2 mt-10" data-reveal-stagger="120">
          <div className="card" data-reveal="left">
            <h3>Service area</h3>
            <p className="muted">{siteConfig.serviceArea}</p>
          </div>
          <div className="card" data-reveal="right">
            <h3>Mobile requirements</h3>
            <p className="muted">
              Access to water and electricity is required at the service location.
            </p>
          </div>
        </div>

        <p className="mt-8" data-reveal="up">
          <a href={siteConfig.socialUrl} target="_blank" rel="noreferrer" className="link-underline">
            NOVA Detailing social media
          </a>
        </p>
      </div>
    </section>
  );
}
