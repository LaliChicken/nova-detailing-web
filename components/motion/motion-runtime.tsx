"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";
const STAGGER_SELECTOR = "[data-reveal-stagger]";
const DEFAULT_STAGGER_MS = 90;

/**
 * Drives the scroll choreography for the whole site.
 *
 * Server components only need to add `data-reveal="<variant>"` to an element —
 * this runtime handles the observing, the stagger, and the cursor glow, so no
 * section has to become a client component just to animate.
 */
export function MotionRuntime() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      root.removeAttribute("data-motion");
      return;
    }

    // Tells the pre-paint script in the document head that the runtime took
    // over, so its "reveal everything" safety timeout stands down.
    root.setAttribute("data-motion", "on");
    root.setAttribute("data-motion-ready", "true");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    // Elements inside a stagger container cascade in, one after the next.
    function applyStagger(scope: ParentNode) {
      const containers = [
        ...(scope instanceof Element && scope.matches(STAGGER_SELECTOR) ? [scope] : []),
        ...Array.from(scope.querySelectorAll<HTMLElement>(STAGGER_SELECTOR)),
      ];

      for (const container of containers as HTMLElement[]) {
        const step = Number(container.dataset.revealStagger) || DEFAULT_STAGGER_MS;
        const children = Array.from(container.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
        children.forEach((child, index) => {
          if (child.dataset.revealDelay) return;
          child.style.setProperty("--reveal-delay", `${index * step}ms`);
        });
      }
    }

    function register(scope: ParentNode) {
      applyStagger(scope);

      const targets = [
        ...(scope instanceof Element && scope.matches(REVEAL_SELECTOR) ? [scope] : []),
        ...Array.from(scope.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)),
      ] as HTMLElement[];

      for (const target of targets) {
        if (target.dataset.revealBound === "true") continue;
        target.dataset.revealBound = "true";

        if (target.dataset.revealDelay) {
          target.style.setProperty("--reveal-delay", `${target.dataset.revealDelay}ms`);
        }
        if (target.dataset.revealDuration) {
          target.style.setProperty("--reveal-duration", `${target.dataset.revealDuration}ms`);
        }

        observer.observe(target);
      }
    }

    register(document.body);

    // Client-side navigations swap the DOM without remounting this component.
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (node.nodeType === Node.ELEMENT_NODE) register(node as Element);
        }
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Cursor-tracked glow on cards, throttled to one frame.
    let frame = 0;
    function handlePointerMove(event: PointerEvent) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const card = (event.target as Element | null)?.closest<HTMLElement>(".card");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
