import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section page-hero">
      <div className="site-shell max-w-2xl">
        <p className="eyebrow enter">404</p>
        <h1 className="enter" style={{ "--enter-delay": "100ms" } as React.CSSProperties}>
          Page <span className="shine-text">not found.</span>
        </h1>
        <p className="muted enter" style={{ "--enter-delay": "200ms" } as React.CSSProperties}>
          The page you were after has moved or never existed.
        </p>
        <div className="button-row enter" style={{ "--enter-delay": "280ms" } as React.CSSProperties}>
          <Link href="/" className="button">
            Back home
          </Link>
          <Link href="/quote" className="button secondary">
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
