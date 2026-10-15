import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Grid2x2, List, SearchX } from "lucide-react";
import { Flip } from "gsap/Flip";
import { gsap, reduced } from "@/hooks/use-motion";
import { priceOf, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/brand";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(Flip);

export type ShopSearch = { brand?: string; min?: number; max?: number; sort?: string };

export function ShopPage({ title, items, initial }: { title: string; items: Product[]; initial: ShopSearch }) {
  const allBrands = [...new Set(items.map((p) => p.brand))];
  const ceil = Math.max(...items.map(priceOf));
  const [sel, setSel] = useState<string[]>(initial.brand ? [initial.brand] : []);
  const [range, setRange] = useState<[number, number]>([initial.min ?? 0, initial.max ?? ceil]);
  const [ram, setRam] = useState<number[]>([]);
  const [conds, setConds] = useState<string[]>([]);
  const [sort, setSort] = useState(initial.sort ?? "popular");
  const [list, setList] = useState(false);
  const [shown, setShown] = useState(9);
  const grid = useRef<HTMLDivElement>(null);
  const flip = useRef<Flip.FlipState | null>(null);
  const isPhone = items[0]?.category === "phone";

  const capture = () => { if (grid.current && !reduced()) flip.current = Flip.getState(grid.current.querySelectorAll("[data-flip-id]")); };
  const toggle = <T,>(arr: T[], v: T, set: (a: T[]) => void) => { capture(); set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]); };

  const results = useMemo(() => {
    const r = items.filter((p) => {
      const v = priceOf(p);
      return (!sel.length || sel.includes(p.brand)) && v >= range[0] && v <= range[1] && (!ram.length || ram.includes(p.numeric.ram)) && (!conds.length || conds.includes(p.condition));
    });
    const s = { popular: (a: Product, b: Product) => b.reviews - a.reviews, new: (a: Product, b: Product) => b.createdAt - a.createdAt, low: (a: Product, b: Product) => priceOf(a) - priceOf(b), high: (a: Product, b: Product) => priceOf(b) - priceOf(a), rating: (a: Product, b: Product) => b.rating - a.rating }[sort] ?? (() => 0);
    return [...r].sort(s);
  }, [items, sel, range, ram, conds, sort]);

  useLayoutEffect(() => {
    if (!flip.current) return;
    Flip.from(flip.current, { duration: 0.6, ease: "power3.inOut", stagger: 0.03, absolute: true, onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }), onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }) });
    flip.current = null;
  }, [results, list]);

  const rams = [...new Set(items.map((p) => p.numeric.ram))].filter(Boolean).sort((a, b) => a - b);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32">
      <header className="mb-10">
        <h1 className="font-display text-5xl font-extrabold md:text-7xl animate-in fade-in slide-in-from-bottom-6 duration-700">{title}</h1>
        <p className="mt-2 text-muted-foreground">{results.length} results</p>
      </header>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="glass h-fit space-y-8 rounded-3xl p-6 lg:sticky lg:top-24">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">Brand</legend>
            <div className="space-y-2">
              {allBrands.map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm"><Checkbox checked={sel.includes(b)} onCheckedChange={() => toggle(sel, b, setSel)} />{b}</label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">Price</legend>
            <Slider min={0} max={ceil} step={1000} value={range} onValueChange={(v) => { capture(); setRange([v[0], v[1]]); }} />
            <p className="mt-2 text-xs text-muted-foreground">{formatPrice(range[0])} – {formatPrice(range[1])}</p>
          </fieldset>
          {isPhone && (
            <>
              <fieldset>
                <legend className="mb-3 text-sm font-semibold">RAM</legend>
                <div className="flex flex-wrap gap-2">
                  {rams.map((r) => <button key={r} onClick={() => toggle(ram, r, setRam)} className={cn("rounded-full border px-3 py-1 text-xs", ram.includes(r) && "border-primary bg-primary text-primary-foreground")}>{r}GB</button>)}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-3 text-sm font-semibold">Condition</legend>
                <div className="space-y-2">
                  {["New", "Open box", "Refurbished"].map((c) => <label key={c} className="flex items-center gap-2 text-sm"><Checkbox checked={conds.includes(c)} onCheckedChange={() => toggle(conds, c, setConds)} />{c}</label>)}
                </div>
              </fieldset>
            </>
          )}
          <Button variant="ghost" size="sm" onClick={() => { capture(); setSel([]); setRam([]); setConds([]); setRange([0, ceil]); }}>Reset filters</Button>
        </aside>
        <div>
          <div className="mb-6 flex items-center justify-between gap-3">
            <Select value={sort} onValueChange={(v) => { capture(); setSort(v); }}>
              <SelectTrigger className="w-48 rounded-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
                <SelectItem value="low">Price: low to high</SelectItem>
                <SelectItem value="high">Price: high to low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
            <div className="glass flex rounded-full p-1">
              <button aria-label="Grid view" onClick={() => { capture(); setList(false); }} className={cn("rounded-full p-2", !list && "bg-accent")}><Grid2x2 className="h-4 w-4" /></button>
              <button aria-label="List view" onClick={() => { capture(); setList(true); }} className={cn("rounded-full p-2", list && "bg-accent")}><List className="h-4 w-4" /></button>
            </div>
          </div>
          {results.length === 0 ? (
            <div className="grid place-items-center py-24 text-center animate-in fade-in zoom-in-95">
              <SearchX className="h-14 w-14 animate-float text-muted-foreground" />
              <p className="mt-4 font-display text-2xl">No signal.</p>
              <p className="text-muted-foreground">Try widening your filters.</p>
            </div>
          ) : (
            <div ref={grid} className={cn("grid gap-5", list ? "grid-cols-1" : "sm:grid-cols-2 xl:grid-cols-3")}>
              {results.slice(0, shown).map((p) => <ProductCard key={p.id} product={p} list={list} />)}
            </div>
          )}
          {shown < results.length && (
            <div className="mt-10 text-center"><Button variant="secondary" className="rounded-full" onClick={() => setShown(shown + 6)}>Load more</Button></div>
          )}
        </div>
      </div>
    </div>
  );
}

export const validateShopSearch = (s: Record<string, unknown>): ShopSearch => ({
  brand: typeof s.brand === "string" ? s.brand : undefined,
  min: s.min !== undefined ? Number(s.min) : undefined,
  max: s.max !== undefined ? Number(s.max) : undefined,
  sort: typeof s.sort === "string" ? s.sort : undefined,
});
