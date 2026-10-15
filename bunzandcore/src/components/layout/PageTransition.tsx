import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Overlay wipe on every route change after the first. */
export function PageTransition() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const first = useRef(true);
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!el.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(el.current, { yPercent: 0 }, { yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.05 });
    });
  }, [path]);
  return <div ref={el} aria-hidden className="pointer-events-none fixed inset-0 z-[100] translate-y-[-100%] bg-gradient-sauce" />;
}
