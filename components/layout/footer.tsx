import Link from "next/link";
import { callHref, siteConfig, smsHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="grid grid-3 footer-top">
          <div data-reveal="up">
            <strong className="footer-brand">NOVA Detailing</strong>
            <p className="muted">Mobile detailing throughout the San Francisco Bay Area.</p>
            <p className="badge">
              <span className="dot" />
              Text for fastest response
            </p>
          </div>

          <nav className="stack text-sm" aria-label="Footer navigation" data-reveal="up" data-reveal-delay="80">
            <Link href="/services" className="link-underline">Services</Link>
            <Link href="/gallery" className="link-underline">Gallery</Link>
            <Link href="/reviews" className="link-underline">Reviews</Link>
            <Link href="/quote" className="link-underline">Request a Quote</Link>
            <Link href="/privacy" className="link-underline">Privacy</Link>
          </nav>

          <div className="stack text-sm" data-reveal="up" data-reveal-delay="160">
            <a href={smsHref} className="link-underline">Text: {siteConfig.phoneDisplay}</a>
            <a href={callHref} className="link-underline">Call: {siteConfig.phoneDisplay}</a>
            <a href={siteConfig.socialUrl} target="_blank" rel="noreferrer" className="link-underline">
              Social media
            </a>
            <span className="muted">Zelle • Venmo • Cash</span>
          </div>
        </div>

        <div className="footer-bottom muted">
          <span>© 2026 NOVA Detailing</span>
          <span>Bay Area • Mobile • By appointment</span>
        </div>
      </div>
    </footer>
  );
}
