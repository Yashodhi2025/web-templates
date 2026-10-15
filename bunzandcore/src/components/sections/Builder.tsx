import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/animations/primitives";
import { flyToCart, useCart } from "@/lib/cart";
import { money } from "@/lib/brand";
import heroBurger from "@/assets/hero-burger.png";

interface Layer { id: string; label: string; price: number; cls: string; h: number }
const layers: Layer[] = [
  { id: "lettuce", label: "Lettuce", price: 0.5, cls: "bg-[oklch(0.72_0.19_135)] rounded-[40%]", h: 14 },
  { id: "tomato", label: "Tomato", price: 0.6, cls: "bg-ketchup rounded-full", h: 12 },
  { id: "onion", label: "Red onion", price: 0.4, cls: "bg-[oklch(0.62_0.15_330)] rounded-full", h: 8 },
  { id: "cheese", label: "Cheddar", price: 1.2, cls: "bg-[oklch(0.84_0.16_85)] rounded-md", h: 10 },
  { id: "bacon", label: "Bacon", price: 2, cls: "bg-[oklch(0.5_0.14_30)] rounded-full", h: 10 },
  { id: "patty2", label: "Extra patty", price: 3.5, cls: "bg-[oklch(0.32_0.06_40)] rounded-[45%]", h: 26 },
];
const BASE = 9;

export function Builder() {
  const [on, setOn] = useState<string[]>(["lettuce", "cheese"]);
  const stack = useRef<HTMLDivElement>(null);
  const prev = useRef<string[]>(on);
  const add = useCart((s) => s.add);
  const total = BASE + layers.filter((l) => on.includes(l.id)).reduce((a, l) => a + l.price, 0);

  useEffect(() => {
    const added = on.filter((x) => !prev.current.includes(x));
    prev.current = on;
    if (!added.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    import("gsap").then(({ gsap }) => {
      added.forEach((id) => {
        const el = stack.current?.querySelector(`[data-layer="${id}"]`);
        if (el) gsap.fromTo(el, { y: -220, opacity: 0, rotate: -8 }, { y: 0, opacity: 1, rotate: 0, duration: 0.7, ease: "bounce.out" });
      });
    });
  }, [on]);

  const toggle = (id: string) => setOn((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <section aria-labelledby="build-h" className="section-light relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-ketchup">Build-your-burger</p>
          <SplitText id="build-h" text="Your stack. Your rules." className="display-xl text-6xl md:text-8xl" />
          <p className="mt-6 max-w-md text-charcoal/70">Start with a smash patty on toasted brioche, then pile it high. Watch it build in real time.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {layers.map((l) => {
              const active = on.includes(l.id);
              return (
                <button key={l.id} aria-pressed={active} onClick={() => toggle(l.id)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all ${active ? "border-charcoal bg-charcoal text-cream" : "border-charcoal/20 hover:border-charcoal"}`}>
                  {active ? "✓ " : "+ "}{l.label} <span className="opacity-60">{money(l.price)}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div>
              <p className="text-sm text-charcoal/60">Your price</p>
              <p className="display-xl text-6xl tabular-nums" aria-live="polite">{money(total)}</p>
            </div>
            <Button variant="hero" size="xl" onClick={(e) => {
              flyToCart(e.currentTarget, heroBurger);
              const names = layers.filter((l) => on.includes(l.id)).map((l) => l.label);
              add({ id: "custom", key: `custom-${on.sort().join("-")}`, name: "Custom Stack", price: total, image: heroBurger, note: names.join(" · ") || "Plain" });
              toast.success("Custom Stack added");
            }}>Add my stack</Button>
          </div>
        </div>

        <div ref={stack} className="relative mx-auto flex w-full max-w-sm flex-col items-center py-10" aria-label="Burger preview">
          <div className="h-24 w-[86%] rounded-t-[999px] bg-[oklch(0.7_0.14_60)] shadow-inner">
            <div className="flex flex-wrap justify-center gap-3 px-10 pt-6 opacity-80">{Array.from({ length: 10 }).map((_, i) => <span key={i} className="h-1.5 w-3 rounded-full bg-cream" />)}</div>
          </div>
          {[...layers].reverse().filter((l) => on.includes(l.id)).map((l) => (
            <div key={l.id} data-layer={l.id} className={`-mt-1 w-[94%] shadow-md ${l.cls}`} style={{ height: l.h }} />
          ))}
          <div className="-mt-1 h-7 w-[92%] rounded-[45%] bg-[oklch(0.32_0.06_40)]" />
          <div className="h-12 w-[86%] rounded-b-3xl bg-[oklch(0.7_0.14_60)]" />
          <div className="mt-4 h-4 w-[70%] rounded-full bg-charcoal/15 blur-md" />
        </div>
      </div>
    </section>
  );
}
