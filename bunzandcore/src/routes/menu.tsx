import { createFileRoute } from "@tanstack/react-router";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SplitText } from "@/components/animations/primitives";
import { ProductCard } from "@/components/ProductCard";
import { categories, menu, type Category } from "@/data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — BUNZ & CO." },
      { name: "description", content: "Burgers, buns, mojitos, soft drinks, sides and desserts. Browse the full BUNZ & CO. menu and order online." },
      { property: "og:title", content: "Menu — BUNZ & CO." },
      { property: "og:description", content: "Burgers, buns, mojitos, sides and desserts — order online." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [cat, setCat] = useState<Category | "All">("All");
  const [q, setQ] = useState("");
  const [veg, setVeg] = useState(false);
  const [spicy, setSpicy] = useState(false);
  const grid = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () =>
      menu.filter(
        (m) =>
          (cat === "All" || m.category === cat) &&
          (!veg || m.tags.includes("veg")) &&
          (!spicy || m.tags.includes("spicy")) &&
          (m.name + m.description).toLowerCase().includes(q.toLowerCase()),
      ),
    [cat, q, veg, spicy],
  );

  /** Animate the visible cards whenever the filter changes. Only transform/opacity are touched — React keeps full ownership of the DOM nodes. */
  const first = useRef(true);
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tween: { kill: () => void } | undefined;
    import("gsap").then(({ gsap }) => {
      const els = grid.current?.querySelectorAll(".flip-item");
      if (!els?.length) return;
      tween = gsap.fromTo(els, { opacity: 0, y: 24, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.04, clearProps: "transform,opacity" });
    });
    return () => tween?.kill();
  }, [items]);

  return (
    <div className="pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sauce">The full lineup</p>
        <SplitText as="h1" onScroll={false} text="Pick your poison." className="display-xl text-6xl md:text-9xl" />
      </div>

      <div className="sticky top-20 z-30 mt-10 md:top-24">
        <div className="mx-auto max-w-7xl px-3 md:px-6">
          <div className="flex flex-col gap-3 rounded-3xl glass p-3 lg:flex-row lg:items-center">
            <div role="tablist" aria-label="Categories" className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
              {(["All", ...categories] as const).map((c) => (
                <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c ? "bg-sauce text-charcoal" : "text-cream/75 hover:bg-cream/10"}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="flex flex-1 items-center gap-2 lg:justify-end">
              <button aria-pressed={veg} onClick={() => setVeg(!veg)} className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold ${veg ? "bg-lime text-charcoal" : "bg-secondary"}`}>🌱 Veg</button>
              <button aria-pressed={spicy} onClick={() => setSpicy(!spicy)} className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold ${spicy ? "bg-ketchup text-cream" : "bg-secondary"}`}>🌶 Spicy</button>
              <div className="relative min-w-0 flex-1 lg:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <label htmlFor="menu-search" className="sr-only">Search menu</label>
                <Input id="menu-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="h-10 rounded-full border-none bg-secondary pl-9" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div ref={grid} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((m) => (
            <div key={m.id} className="flip-item"><ProductCard item={m} /></div>
          ))}
        </div>
        {items.length === 0 && <p className="py-20 text-center text-muted-foreground">Nothing matches that craving. Try another search.</p>}
      </div>
    </div>
  );
}
