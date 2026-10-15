import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Lenis smooth scroll synced to GSAP ScrollTrigger via gsap.ticker. */
export function SmoothScroll() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup = () => {};
    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.1 });
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();
    return () => cleanup();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const l = (window as unknown as { __lenis?: { scrollTo: (n: number, o: object) => void } }).__lenis;
    l?.scrollTo(0, { immediate: true });
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => setTimeout(() => ScrollTrigger.refresh(), 300));
  }, [path]);

  return null;
}
