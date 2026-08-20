"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  ["Services", "/services"],
  ["Gallery", "/gallery"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      headerRef.current?.style.setProperty("--scroll-progress", String(progress));
      setScrolled(window.scrollY > 24);
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Navigating away should never leave the mobile panel hanging open.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-shell header-inner">
        <Link href="/" className="brand" aria-label="NOVA Detailing home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
              <path
                d="M16 2l3.4 9.2L28.6 15l-9.2 3.4L16 28l-3.4-9.6L3.4 15l9.2-3.8L16 2z"
                fill="url(#brandSpark)"
              />
              <defs>
                <linearGradient id="brandSpark" x1="3" y1="2" x2="29" y2="28">
                  <stop stopColor="#8ec5ff" />
                  <stop offset="1" stopColor="#35e0e8" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="brand-text">
            NOVA <span className="brand-sub">Detailing</span>
          </span>
        </Link>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${pathname === href ? " is-active" : ""}`}
            >
              {label}
            </Link>
          ))}
          <Link href="/quote" className="button">
            Get a Quote
          </Link>
        </nav>

        <button
          type="button"
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-nav" className="mobile-nav" data-open={menuOpen} aria-hidden={!menuOpen}>
        <div className="site-shell mobile-nav-inner">
          {navItems.map(([label, href], index) => (
            <Link
              key={href}
              href={href}
              className="mobile-nav-link"
              style={{ transitionDelay: `${menuOpen ? index * 60 + 60 : 0}ms` }}
              tabIndex={menuOpen ? undefined : -1}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="button"
            style={{ transitionDelay: `${menuOpen ? navItems.length * 60 + 60 : 0}ms` }}
            tabIndex={menuOpen ? undefined : -1}
          >
            Get a Quote
          </Link>
        </div>
      </div>

      <span className="header-progress" aria-hidden="true" />
    </header>
  );
}
