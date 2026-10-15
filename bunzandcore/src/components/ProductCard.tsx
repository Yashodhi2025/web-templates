import { useRef, useState } from "react";
import { Flame, Leaf, Plus, Star, Minus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tilt } from "@/components/animations/primitives";
import type { MenuItem } from "@/data/menu";
import { flyToCart, useCart } from "@/lib/cart";
import { money } from "@/lib/brand";

export function TagBadges({ tags }: { tags: MenuItem["tags"] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.includes("veg") && <span className="inline-flex items-center gap-1 rounded-full bg-lime/15 px-2 py-0.5 text-xs font-semibold text-lime"><Leaf className="h-3 w-3" />Veg</span>}
      {tags.includes("spicy") && <span className="inline-flex items-center gap-1 rounded-full bg-ketchup/20 px-2 py-0.5 text-xs font-semibold text-ketchup"><Flame className="h-3 w-3" />Spicy</span>}
      {tags.includes("new") && <span className="rounded-full bg-sauce/20 px-2 py-0.5 text-xs font-semibold text-sauce">New</span>}
      {tags.includes("bestseller") && <span className="rounded-full bg-cream/10 px-2 py-0.5 text-xs font-semibold">Bestseller</span>}
    </div>
  );
}

export function ProductCard({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const add = useCart((s) => s.add);
  const btn = useRef<HTMLButtonElement>(null);
  const quickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    flyToCart(btn.current, item.image);
    add({ id: item.id, name: item.name, price: item.price, image: item.image });
    toast.success(`${item.name} added to bag`);
  };
  return (
    <>
      <Tilt max={6} data-cursor="VIEW" className="group h-full">
        <article onClick={() => setOpen(true)} className="shine flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl glass">
          <div className="relative aspect-square overflow-hidden">
            <img src={item.image} alt={item.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-charcoal/70 px-2.5 py-1 text-xs font-semibold backdrop-blur"><Star className="h-3 w-3 fill-sauce text-sauce" />{item.rating}</span>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <TagBadges tags={item.tags} />
            <h3 className="font-display text-xl font-bold">{item.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="font-display text-2xl font-bold">{money(item.price)}</span>
              <button ref={btn} onClick={quickAdd} data-cursor="ADD" aria-label={`Add ${item.name} to bag`} className="grid h-11 w-11 place-items-center rounded-full bg-sauce text-charcoal transition-transform hover:rotate-90 hover:scale-110">
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </article>
      </Tilt>
      <ProductDialog item={item} open={open} onOpenChange={setOpen} />
    </>
  );
}

const sizes = [{ l: "Regular", p: 0 }, { l: "Large", p: 2 }];
const addons = [{ l: "Extra cheese", p: 1.5 }, { l: "Bacon", p: 2 }, { l: "Avocado", p: 1.8 }, { l: "Jalapeños", p: 0.8 }];

export function ProductDialog({ item, open, onOpenChange }: { item: MenuItem; open: boolean; onOpenChange: (o: boolean) => void }) {
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState<number[]>([]);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const btn = useRef<HTMLButtonElement>(null);
  const unit = item.price + (sizes[size]?.p ?? 0) + extras.reduce((a, i) => a + (addons[i]?.p ?? 0), 0);
  const note = [sizes[size]?.l, ...extras.map((i) => addons[i]?.l)].filter(Boolean).join(" · ");
  const submit = () => {
    flyToCart(btn.current, item.image);
    add({ id: item.id, name: item.name, price: unit, image: item.image, qty, note });
    toast.success(`${qty}× ${item.name} added`);
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92dvh] overflow-y-auto border-glass-border bg-card p-0 sm:max-w-2xl" data-lenis-prevent>
        <div className="grid sm:grid-cols-2">
          <img src={item.image} alt={item.name} className="aspect-square h-full w-full object-cover" />
          <div className="flex flex-col gap-4 p-6">
            <TagBadges tags={item.tags} />
            <DialogTitle className="font-display text-3xl font-extrabold">{item.name}</DialogTitle>
            <DialogDescription className="text-cream/75">{item.description}</DialogDescription>
            <p className="text-xs text-muted-foreground">{item.calories} kcal · ★ {item.rating}</p>
            <div>
              <p className="mb-2 text-sm font-semibold">Size</p>
              <div className="flex gap-2">
                {sizes.map((s, i) => (
                  <button key={s.l} onClick={() => setSize(i)} className={`rounded-full px-4 py-2 text-sm transition ${size === i ? "bg-sauce text-charcoal" : "glass"}`}>
                    {s.l}{s.p ? ` +${money(s.p)}` : ""}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Add-ons</p>
              <div className="flex flex-wrap gap-2">
                {addons.map((a, i) => {
                  const on = extras.includes(i);
                  return (
                    <button key={a.l} aria-pressed={on} onClick={() => setExtras(on ? extras.filter((x) => x !== i) : [...extras, i])} className={`rounded-full px-3 py-1.5 text-xs transition ${on ? "bg-lime text-charcoal" : "glass"}`}>
                      {a.l} +{money(a.p)}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-auto flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 rounded-full glass p-1">
                <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-9 w-9 place-items-center rounded-full bg-secondary"><Minus className="h-4 w-4" /></button>
                <span className="w-6 text-center tabular-nums">{qty}</span>
                <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="grid h-9 w-9 place-items-center rounded-full bg-secondary"><Plus className="h-4 w-4" /></button>
              </div>
              <Button ref={btn} variant="hero" size="lg" className="h-11 flex-1" onClick={submit}>Add · {money(unit * qty)}</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
