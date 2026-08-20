import Link from "next/link";
import { callHref, siteConfig, smsHref } from "@/lib/site";

export default function QuoteSuccessPage() {
  return (
    <section className="section page-hero">
      <div className="site-shell max-w-2xl">
        <p className="badge enter">
          <span className="dot" />
          Request received
        </p>
        <h1 className="enter" style={{ "--enter-delay": "100ms" } as React.CSSProperties}>
          Thanks — <span className="shine-text">we&apos;ve got it.</span>
        </h1>
        <p className="muted enter" style={{ "--enter-delay": "200ms" } as React.CSSProperties}>
          NOVA has received your quote request and a confirmation email has been sent. This does not
          book an appointment yet; NOVA will contact you to confirm the details and availability.
        </p>
        <p className="enter" style={{ "--enter-delay": "260ms" } as React.CSSProperties}>
          For the fastest response, text us directly.
        </p>
        <div className="button-row enter" style={{ "--enter-delay": "340ms" } as React.CSSProperties}>
          <a className="button" href={smsHref}>
            Text NOVA
          </a>
          <a className="button secondary" href={callHref}>
            Call {siteConfig.phoneDisplay}
          </a>
          <Link className="button secondary" href="/">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
