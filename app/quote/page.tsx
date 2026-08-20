import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/components/quote/quote-form";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a mobile detailing quote from NOVA Detailing.",
};

export default function QuotePage() {
  return (
    <section className="section page-hero">
      <div className="site-shell">
        <div className="section-header">
          <p className="eyebrow enter">Quote</p>
          <h1 className="enter" style={{ "--enter-delay": "100ms" } as React.CSSProperties}>
            Request a <span className="shine-text">quote</span>
          </h1>
          <p className="muted enter" style={{ "--enter-delay": "200ms" } as React.CSSProperties}>
            Tell us a little about your vehicle. Photos are optional, and NOVA will contact you to
            confirm details and availability.
          </p>
        </div>

        <Suspense fallback={<div className="card muted">Loading quote form…</div>}>
          <QuoteForm />
        </Suspense>
      </div>
    </section>
  );
}
