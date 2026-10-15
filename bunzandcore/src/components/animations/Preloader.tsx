import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";

/** Logo reveal + percentage counter, then a curtain wipe. Shown once per session. */
export function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("bunz-loaded") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    let ctx: { revert: () => void } | undefined;
    import("gsap").then(({ gsap }) => {
      ctx = gsap.context(() => {
        const counter = { v: 0 };
        const tl = gsap.timeline({
          onComplete: () => {
            sessionStorage.setItem("bunz-loaded", "1");
            setDone(true);
          },
        });
        tl.from(".pl-letter", { yPercent: 110, stagger: 0.05, duration: 0.7, ease: "power4.out" })
          .to(counter, { v: 100, duration: 1.4, ease: "power2.inOut", onUpdate: () => setPct(Math.round(counter.v)) }, 0)
          .to(".pl-inner", { opacity: 0, y: -30, duration: 0.4 })
          .to(".pl-curtain", { yPercent: -100, stagger: 0.08, duration: 0.8, ease: "power4.inOut" }, "-=0.1");
      }, root);
    });
    return () => ctx?.revert();
  }, []);

  if (done) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[120]" role="status" aria-label="Loading">
      <div className="pl-curtain absolute inset-0 bg-sauce" />
      <div className="pl-curtain absolute inset-0 bg-charcoal">
        <div className="pl-inner flex h-full flex-col items-center justify-center gap-6">
          <div className="flex overflow-hidden display-xl text-6xl md:text-8xl">
            {brand.name.split("").map((c, i) => (
              <span key={i} className="pl-letter inline-block whitespace-pre">{c}</span>
            ))}
          </div>
          <div className="font-display text-xl tabular-nums text-sauce">{pct}%</div>
        </div>
      </div>
    </div>
  );
}
